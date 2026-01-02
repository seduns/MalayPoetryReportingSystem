import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthorProfile, getAuthorProfile } from "../../../store/thunk/UserThunk";
import Swal from "sweetalert2";

export default function ContributorProfileDonation() {
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: ""
  });

  // Prefill form when userProfile is available
  useEffect(() => {
    dispatch(getAuthorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      setForm({
        name: userProfile.fullName || "",
        email: userProfile.email || "",
        password: "********",
        bio: userProfile.bio || ""
      });
    }
  }, [userProfile]);

  const handleUpdate = async () => {
    try {
      await dispatch(updateAuthorProfile(form)).unwrap(); // unwrap to catch errors

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        confirmButtonColor: "#FF5C5C"
      });
    } catch (err) {
      console.error("Update failed", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#FF5C5C"
      });
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Profile & <span className="text-[#DC2A54]">Donations</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Manage your profile and track your earnings
        </p>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        {/* Left Column: Profile Form */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author name:</label>
            <input 
              type="text" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author email:</label>
            <input 
              type="email" 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author password:</label>
            <input 
              type="password" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author bio:</label>
            <textarea 
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full bg-white border border-black/20 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[120px] resize-none"
            />
          </div>

          <button 
            onClick={handleUpdate}
            className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-8 py-3 rounded-2xl w-fit transition-all shadow-md"
          >
            Update Profile
          </button>
        </div>

        {/* Right Column: Donation Dashboard */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col">
          {/* ... Donation Dashboard code remains the same ... */}
        </div>
      </div>
    </div>
  );
}
