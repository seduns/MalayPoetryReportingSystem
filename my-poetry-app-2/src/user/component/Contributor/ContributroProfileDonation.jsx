import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorProfile, updateAuthorProfile } from "../../../store/thunk/UserThunk";
import { getAuthorDonation } from "../../../store/thunk/DonationThunk";
import Swal from "sweetalert2";

export default function ContributroProfileDonation() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const { authorDonationData } = useSelector((state) => state.donation);
  const { accountId } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  useEffect(() => {
    dispatch(getAuthorProfile({ accountId: accountId }));
    dispatch(getAuthorDonation(accountId))
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        name: userProfile.user?.fullName || "",
        email: userProfile.user?.email || "",
        password: "",
        bio: userProfile.bio || "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleUpdateProfile = () => {
  const payload = {
    bio: profileData.bio,
    email: profileData.email,
    name: profileData.name,
    password: null,
  };

  if (profileData.password && profileData.password.trim() !== "") {
    payload.password = profileData.password;
  }

  dispatch(updateAuthorProfile({ accountId, userData: payload }))
    .unwrap()
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        confirmButtonColor: "#FF5C5C",
      });

      // optional: clear password field
      setProfileData((prev) => ({
        ...prev,
        password: "",
      }));
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.message || "Something went wrong",
        confirmButtonColor: "#FF5C5C",
      });
    });
};



const donationStats = authorDonationData
  ? [
      {
        label: "Total Donations",
        value: `RM ${authorDonationData.totalDonation?.toFixed(2) || 0}`,
        color: "text-gray-800",
      },
      {
        label: "Withdraw",
        value: `RM ${(authorDonationData.totalDonation - authorDonationData.currentDonationBalance).toFixed(2) || 0}`,
        color: "text-gray-800",
      },
      {
        label: "Current Balance",
        value: `RM ${authorDonationData.currentDonationBalance?.toFixed(2) || 0}`,
        color: "text-green-500",
      },
    ]
  : [];

  if (!userProfile) {
    return(
      <p>Load user profile</p>
    )
  }

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Profile & <span className="text-[#DC2A54]">Donations</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Manage your profile and track your earnings
        </p>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">
              Author name:
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">
              Author email:
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">
              Author password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">
              Author bio:
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full bg-white border border-black/20 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[100px] resize-none"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-8 py-3 rounded-2xl w-fit transition-all shadow-md"
          >
            Update Profile
          </button>
        </div>
        {
          !authorDonationData ?
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Loading donation data...
            </div>
            :
            <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-24 h-24 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  N
                </div>
                <div>
                  <h2 className="text-md font-bold text-gray-800">
                    {userProfile.user.fullName}
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Poetry Contributor
                  </p>
                  <p className="text-gray-300 text-[10px] mt-1 uppercase tracking-tighter">
                    Author ID: {userProfile.publicId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {donationStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col justify-center"
                  >
                    <p className="text-[10px] text-gray-400 font-bold mb-1">
                      {stat.label}
                    </p>
                    <p className={`text-sm font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FF5C5C] rounded-[25px] p-8 flex items-center justify-between shadow-xl shadow-red-50/50">
                <div className="text-white">
                  <p className="text-sm font-bold opacity-90">
                    Available for withdrawal
                  </p>
                  <p className="text-2xl font-bold">RM {authorDonationData.currentDonationBalance.toFixed(2)}</p>
                </div>
                <button className="bg-white text-[#FF5C5C] font-bold px-10 py-3 rounded-full hover:bg-gray-50 transition-all shadow-lg active:scale-95">
                  Withdraw
                </button>
              </div>
            </div>
        }

      </div>
    </div>
  );
}
