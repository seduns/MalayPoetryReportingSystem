import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeDonation } from "../../store/thunk/DonationThunk";
import Swal from "sweetalert2"; // 1. Import SweetAlert

export default function DonationPage() {
  const { poetryAnalyticsData } = useSelector((state) => state.analytics);
  const dispatch = useDispatch();
  
  const poetryTitle = poetryAnalyticsData?.poetry?.title || "Loading Title...";
  const authorName = poetryAnalyticsData?.poetry?.author?.user?.fullName || "Loading Author...";

  const [formData, setFormData] = useState({
    amount: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Invalid amount.";
    }
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Name required.";
    }
    const cleanCardNum = formData.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cleanCardNum)) {
      newErrors.cardNumber = "Invalid card (16 digits).";
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = "Invalid MM/YY.";
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV.";
    }

    setErrors(newErrors);

    // If no errors, proceed to donation logic
    if (Object.keys(newErrors).length === 0) {
        handleDonation();
    }
  };

  const handleDonation = () => {
    const donationData = {
      "poetry": poetryAnalyticsData.poetry.id,
      "donationAmount": formData.amount
    };

    // 2. Dispatch with unwrap() to handle the Promise response
    dispatch(makeDonation(donationData))
      .unwrap()
      .then((payload) => {
        // payload is the response: { donationAmount: 145.5, poetryTitle: "..." }
        
        Swal.fire({
          icon: 'success',
          title: 'Donation Successful!',
          html: `
            <div class="text-gray-600">
              You have donated <span class="font-bold text-[#FF6F61]">RM ${payload.donationAmount.toFixed(2)}</span>
              <br/>
              to <span class="font-bold text-gray-800">"${payload.poetryTitle}"</span>
            </div>
          `,
          confirmButtonColor: '#FF6F61',
          confirmButtonText: 'Great!',
          background: '#fff',
          customClass: {
            popup: 'rounded-[20px]',
            title: 'text-2xl font-bold text-gray-800'
          }
        });

        // Optional: Clear form
        setFormData({ amount: "", cardName: "", cardNumber: "", expiry: "", cvv: "" });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Donation Failed',
          text: error.message || 'Something went wrong. Please try again.',
          confirmButtonColor: '#d33'
        });
      });
  };

  return (
    <div className="w-screen min-h-screen flex flex-row font-sans overflow-hidden bg-white">
      
      {/* Decorative Side Gradient */}
      <div className="w-[15%] md:w-[20%] lg:w-[25%] bg-gradient-to-b from-coral-light to-coral shrink-0"></div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 p-6 overflow-y-auto">
        
        {/* ================= LEFT CARD: DONATION INFO ================= */}
        <div className="w-full max-w-sm lg:max-w-md h-[600px] bg-white rounded-[30px] p-6 shadow-xl shadow-gray-100 border border-black/20 flex flex-col justify-center">
          
          <div className="w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                Poetry <br />
                <span className="text-[#FF5C5C] font-serif italic">The</span> Space
              </h1>
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">Author Name</label>
                <input 
                  type="text" 
                  readOnly
                  value={authorName} 
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-500 font-medium outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">Poetry Title</label>
                <input 
                  type="text" 
                  readOnly
                  value={poetryTitle}
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-500 font-medium outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">Donation Amount (RM)</label>
                <div>
                  <input 
                    type="text" 
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g. 10.00"
                    className={`w-full bg-white border ${errors.amount ? 'border-red-500 ring-1 ring-red-200' : 'border-black/20 focus:ring-red-100'} rounded-xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all`}
                  />
                  {errors.amount && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.amount}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CARD: PAYMENT DETAILS ================= */}
        <div className="w-full max-w-sm lg:max-w-md h-[600px] bg-white rounded-[30px] p-6 shadow-xl shadow-gray-100 border border-black/20 flex flex-col justify-center">
          
          {/* Changed onSubmit to trigger validateForm */}
          <form onSubmit={validateForm} className="space-y-5 w-full">
            
            <div className="space-y-3">
               <h2 className="text-sm font-bold text-gray-800 ml-1 border-b pb-1">Payment Details</h2>
               
               {/* Name */}
               <div>
                  <input 
                  type="text" 
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="Full Name on Card"
                  className={`w-full bg-white border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors`}
                  />
                  {errors.cardName && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.cardName}</p>}
               </div>
            </div>

            <div className="space-y-3">
                {/* Card Number */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </span>
                    <input 
                    type="text" 
                    name="cardNumber"
                    maxLength="19"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                    className={`w-full bg-white border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg px-10 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-[10px] mt-1 ml-1 absolute -bottom-4">{errors.cardNumber}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                    {/* Expiry */}
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            name="expiry"
                            maxLength="5"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={`w-full bg-white border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors`}
                        />
                        {errors.expiry && <p className="text-red-500 text-[10px] mt-1 ml-1 absolute -bottom-4">{errors.expiry}</p>}
                    </div>
                    
                    {/* CVV */}
                    <div className="relative flex-1">
                        <input 
                            type="password" 
                            name="cvv"
                            maxLength="4"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="CVV"
                            className={`w-full bg-white border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors`}
                        />
                        {errors.cvv && <p className="text-red-500 text-[10px] mt-1 ml-1 absolute -bottom-4">{errors.cvv}</p>}
                    </div>
                </div>
            </div>

            <button 
                type="submit"
                className="w-full bg-coral hover:bg-[#FF6F61] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.01] active:scale-95 mt-4 text-sm uppercase tracking-wider"
            >
              Pay Now
            </button>
          </form>
        </div>

      </div>
    </div>
  );
} 