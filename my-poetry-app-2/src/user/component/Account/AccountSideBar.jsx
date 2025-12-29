import IconButton from "@mui/material/IconButton";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Tooltip } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useLocation, useNavigate } from "react-router-dom";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

export default function AccountSideBar() {

    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return(
        <div className="flex flex-col items-center justify-center w-fit p-5 rounded-2xl shadow-2xl">
            <div className="py-1.5">
                <Tooltip title="Dashboard" placement="right">
                    <IconButton onClick={() => navigate("/dashboard")}>
                        <DashboardOutlinedIcon sx={{color: isActive("/dashboard") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Transfer" placement="right">
                    <IconButton onClick={() => navigate("/transfer")}>
                        <CurrencyExchangeIcon sx={{color: isActive("/transfer") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Bill" placement="right">
                    <IconButton onClick={() => navigate("/paybill")}>
                        <RequestQuoteIcon sx={{color: isActive("/paybill") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Loan" placement="right">
                    <IconButton onClick={() => navigate("/payloan")}>
                        <LocalAtmIcon sx={{color: isActive("/payloan") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Sub goal Account" placement="right">
                    <IconButton onClick={() => navigate("/goal")}>
                        <AccountBalanceWalletIcon sx={{color: isActive("/goal") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Apply loan" placement="right">
                    <IconButton onClick={() => navigate("/loan")}>
                        <AssuredWorkloadIcon sx={{color: isActive("/loan") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}