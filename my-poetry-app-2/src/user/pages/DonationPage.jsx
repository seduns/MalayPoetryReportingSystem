import React from "react";

export default function DonationPage() {
  return (
    /* Changed: Removed p-20 (which was pushing everything in) 
       Changed: Ensured flex-row is the default for side-by-side layout */
    <div className="w-screen min-h-screen flex flex-row font-sans overflow-hidden bg-white">
      
      {/* Decorative Side Gradient Area */}
      {/* Fixed: Changed w-4/4 to w-1/4 so it only takes up 25% of the screen 
          Fixed: Removed 'hidden lg:block' if you want it to show on smaller screens too */}
      <div className="w-[15%] md:w-[20%] lg:w-[25%] bg-gradient-to-b from-coral-light to-coral shrink-0"></div>

      {/* Main Content Area */}
      {/* Added overflow-y-auto so the right side can scroll if the screen is short */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 p-6  bg-white-100 overflow-y-auto">
        


        
        {/* Left Card: Donation Info */}
        <div className="w-full max-w-sm lg:max-w-md bg-white rounded-[40px] p-8 lg:p-12 shadow-xl shadow-gray-100 border border-black/20 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Poetry <br />
              <span className="text-[#FF5C5C] font-serif italic">The</span> Space
            </h1>
          </div>

          <form className="space-y-6 lg:space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Author Name:</label>
              <input 
                type="text" 
                readOnly
                value="Muhamad Naim Danial"
                className="w-full bg-white-100 border border-black/20 rounded-xl px-5 py-3 text-sm text-gray-600 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Poetry Title:</label>
              <input 
                type="text" 
                readOnly
                value="The night morning"
                className="w-full bg-white-100 border border-black/20 rounded-xl px-5 py-3 text-sm text-gray-600 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Donation Amount</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="RM 0.00"
                  className="w-full bg-white border border-black/20 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Card: Payment Details */}
        <div className="w-full max-w-sm lg:max-w-md bg-white rounded-[40px] p-8 lg:p-12 shadow-xl shadow-gray-100 border border-black/20 animate-fadeIn">
          <div className="space-y-8 lg:space-y-10">
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 ml-1">Payment Details</h2>
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 ml-1">Card Details</h2>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Card Number"
                  className="w-full bg-white border border-gray-300 rounded-lg px-12 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors"
                />
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full bg-white border border-gray-300 rounded-lg px-12 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors"
                  />
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">#</span>
                  <input 
                    type="text" 
                    placeholder="CVV"
                    className="w-full bg-white border border-gray-300 rounded-lg px-10 py-3 text-sm outline-none focus:border-[#FF5C5C] transition-colors"
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-coral hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.01] active:scale-95">
              Pay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}