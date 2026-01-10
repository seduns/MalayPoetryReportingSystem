import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicProfile, updatePublicUser } from "../../store/thunk/UserThunk";
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const { publicUser, loading } = useSelector((state) => state.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",      
    email: "",     
    password: "",  
    username: ""   
  });

  // 1. Initial Fetch
  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    if (accountId) {
      dispatch(getPublicProfile(accountId));
    }
  }, [dispatch]);

  // 2. Sync Redux to Form
  useEffect(() => {
    if (publicUser) {
      setFormData({
        // Use fullName here because that's what your GET/Redux state uses
        name: publicUser.fullName || "", 
        email: publicUser.email || "",
        username: publicUser.username || "",
        password: "" 
      });
    }
}, [publicUser]); // This dependency makes it update without a refresh

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. The Update Function (Called ONLY by the Save button)
  const handleSaveClick = async () => {
    const accountId = localStorage.getItem("accountId");
    
    // We construct the payload exactly like your successful Postman test
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password.trim() === "" ? null : formData.password
    };

    try {
      await dispatch(updatePublicUser({ 
        userId: accountId, 
        userData: payload 
      })).unwrap();
      
      alert("Profile updated successfully!");
      setIsEditing(false); 
    } catch (err) {
      console.error("Update Error:", err);
      alert("Server Error 500: Check if email is already used or fields are missing.");
    }
  };

   // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("accessToken");
    // Using window.location.href ensures a full clean state reload
    window.location.href = "/login"; 
  };

  const handleCancel = () => {
    if (publicUser) {
      setFormData({
        name: publicUser.fullName || "",
        email: publicUser.email || "",
        username: publicUser.username || "",
        password: ""
      });
    }
    setIsEditing(false);
  };

  if (loading && !publicUser) return <div className="p-20 text-center">Loading Profile...</div>;

  return (
    <div className="w-screen min-h-screen flex flex-row font-sans overflow-hidden bg-white">
      <div className="flex-1 flex md:flex-row items-center justify-center gap-8 p-6 bg-white overflow-y-auto">
        
       {/* Navigation Sidebar */}
<div className="flex flex-col justify-center">
  <div className="flex flex-col items-center bg-white border border-black/10 rounded-[28px] p-2 shadow-sm space-y-2">
    
    {/* Discovery Link */}
    <Link to="/poetry-discovery" className="group">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] cursor-pointer">
        <GridViewIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54" } }} />
      </div>
    </Link>

    <div className="w-8 border-t border-black/5 mx-auto" />

    {/* Home Link */}
    <Link to="/" className="group">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] cursor-pointer">
        <HomeIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54" } }} />
      </div>
    </Link>

    <div className="w-8 border-t border-black/5 mx-auto" />

    {/* Logout Button */}
    <button 
      onClick={handleLogout} 
      className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] transition-colors"
    >
      <LogoutIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54" } }} />
    </button>

  </div>
</div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left Side: Avatar & Header */}
          <div className="shrink-0">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-1">User Profile</h1>
              <p className="text-gray-400 font-medium">Manage your profile</p>
            </header>
            <div className="w-56 h-56 lg:w-72 lg:h-72 bg-[#FF6F61] rounded-full flex items-center justify-center text-white text-9xl font-bold shadow-2xl uppercase">
              {formData.name?.charAt(0) || "U"}
            </div>
          </div>

          {/* Right Side: Form Content */}
          <div className="flex-1 min-w-[450px] bg-white border border-black/10 rounded-[40px] p-10 lg:p-16 shadow-xl">
            <div className="space-y-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm">Full Name:</label>
                <input 
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all ${
                    isEditing ? "border-[#FF6F61] bg-white" : "border-black/5 bg-gray-50 text-gray-500"
                  }`}
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm">Email Address:</label>
                <input 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all ${
                    isEditing ? "border-[#FF6F61] bg-white" : "border-black/5 bg-gray-50 text-gray-500"
                  }`}
                />
              </div>

              {/* Password Input (Visible only during Edit) */}
              <div className={`space-y-2 transition-all ${isEditing ? "block" : "hidden"}`}>
                <label className="text-gray-500 font-bold text-sm">New Password:</label>
                <input 
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full border border-[#FF6F61] rounded-2xl px-6 py-4 outline-none"
                />
              </div>

              {/* Username (Locked) */}
              {/* <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm">Username:</label>
                <input 
                  value={formData.username}
                  readOnly
                  className="w-full bg-gray-100 border border-black/5 rounded-2xl px-6 py-4 text-gray-400 cursor-not-allowed"
                />
              </div> */}

              {/* Buttons Section */}
              <div className="pt-6 flex gap-4">
                {!isEditing ? (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-coral text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#b82246] transition-all"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button 
                      type="button"
                      onClick={handleSaveClick}
                      disabled={loading}
                      className="bg-[#FF6F61] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#ff5a4a] transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button 
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-100 text-gray-600 font-bold px-10 py-4 rounded-2xl hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}