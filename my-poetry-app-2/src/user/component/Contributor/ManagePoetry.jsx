import { useEffect, useMemo } from "react";
import { Typography } from "@mui/material";



export default function ManagePoetry() {


  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.adminUserDetail.data); // adjust state slice name
  const allTransaction = useSelector((state) => state.adminTransaction.data);
  const allLoan = useSelector((state) => state.adminLoanApproval.loanData);

  const allTransferTransaction = useSelector((state) => state.adminTranferTransaction.data);
  const allBillTransaction = useSelector((state) => state.bill.data);

const loanTotal = useMemo(() => {
  return allTransaction.reduce((sum, item) => sum + Number(item.AMOUNT || 0), 0);
  }, [allTransaction]);


  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchAllTrans());
    dispatch(fetchAllTransfer());
    dispatch(fetchAllBillTrans());
    dispatch(fetchAllLoan())
}, [dispatch]);

  // Line Chart 
 const transactionVolumeData = useMemo(() => {
  if (!Array.isArray(allTransaction) || allTransaction.length === 0) {
    return { dates: [], totals: [] };
  }

  // Step 1: Pre-group dates into counts
  const grouped = {};

  for (const tx of allTransaction) {
    try {
      const parsedDate = parse(
        tx.TRANSACTIONDATE,
        "dd-MMM-yy hh.mm.ss.SSSSSS a",
        new Date()
      );

      const dateOnly = startOfDay(parsedDate);
      const dateKey = format(dateOnly, "yyyy-MM-dd");
      grouped[dateKey] = (grouped[dateKey] || 0) + 1;
    } catch (error) {
      // Optionally log only in development
      if (import.meta.env?.MODE === 'development') {
        console.warn("Invalid date:", tx.TRANSACTIONDATE);
      }
    }
  }

  // Step 2: Build a consistent 30-day timeline
  const today = startOfDay(new Date());
  const startDate = subDays(today, 29);
  const allDates = eachDayOfInterval({ start: startDate, end: today });

  return {
    dates: allDates,
    totals: allDates.map((date) => {
      const key = format(date, "yyyy-MM-dd");
      return grouped[key] || 0;
    }),
  };
}, [allTransaction]);




  // Bar Chart
  const transactionTypeData = useMemo(() => {
  if (!Array.isArray(allTransferTransaction) || !Array.isArray(allBillTransaction)) return [0, 0, 0];

  const transferCount = allTransferTransaction.filter(

    
    (tx) => tx.TYPE?.toLowerCase() === 'transfer'
  ).length;

  const billCount = allBillTransaction.length;

  const loanCount = 0; // or set manually for now

  

  return [transferCount, billCount, loanCount];
}, [allTransferTransaction, allBillTransaction]);

  return (
    <div className="bg-white px-8 py-6 rounded-2xl w-full">
      <Typography variant="body2" fontSize={15} fontWeight={"bold"} sx={{ color: "#DC2A54" }} paddingBottom={"16px"}>
        A D M I N&nbsp;&nbsp;&nbsp; D A S H B O A R D
      </Typography>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#f14f75] hover:bg-[#d33a5e] transition-all duration-300 rounded-xl p-4 shadow text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Total Users</Typography>
          <Typography fontSize={24} fontWeight="bold">{allUsers?.length ?? 0}</Typography>
        </div>

        <div className="bg-[#f12655] hover:bg-[#ad1b3c] transition-all duration-300 rounded-xl p-4 shadow text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Total Transactions</Typography>
          <Typography fontSize={24} fontWeight="bold">{allTransaction?.length ?? 0}</Typography>
        </div>

        <div className="bg-[#bf1e43] hover:bg-[#8c1a35] transition-all duration-300 rounded-xl p-4 shadow text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Total Deposits</Typography>
          <Typography fontSize={24} fontWeight="bold">RM {loanTotal}</Typography>
        </div>

        <div className="bg-[#981835] hover:bg-[#78112d] transition-all duration-300 rounded-xl p-4 text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Loan Applications</Typography>
          <Typography fontSize={24} fontWeight="bold">{allLoan?.length  ?? 0}</Typography>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-10">
        {/* Line Chart */}
          <div className="bg-gray-100 p-4 select-none rounded-xl shadow-[0_0_10px_rgba(0,0,0,0)] 
              hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-shadow duration-300 h-[330px]">
            <Typography fontWeight="bold" fontSize={14} className="mb-2" sx={{ color: "#DC2A54" }} paddingBottom={"16px"}>
              Transaction Volume (Last 30 Days)
            </Typography>
            {transactionVolumeData.dates.length > 0 && transactionVolumeData.totals.length > 0 && (
              <LineChart
                xAxis={[{
                  scaleType: "time",
                  data: transactionVolumeData.dates,
                  valueFormatter: (date) => format(date, "dd MMM"),
                }]}
                series={[{ data: transactionVolumeData.totals }]}
                height={250} // adjusted to fit inside 330px container
              />
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-100 p-4 select-none rounded-xl shadow-[0_0_10px_rgba(0,0,0,0)] 
              hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-shadow duration-300 h-[330px]">
            <Typography fontWeight="bold" fontSize={14} className="mb-2" sx={{ color: "#DC2A54" }} paddingBottom={"16px"}>
              Transactions by Type
            </Typography>
            <BarChart
              xAxis={[{ data: ['Type'] }]}
              series={[
                { data: [transactionTypeData[0]], label: 'Transfer', color: '#f14f75' },
                { data: [transactionTypeData[1]], label: 'Bill', color: '#3f51b5' },
                { data: [transactionTypeData[2]], label: 'Loan', color: '#4caf50' },
              ]}
              height={250}
            />
          </div>

        </div>
    </div>
  );
}
