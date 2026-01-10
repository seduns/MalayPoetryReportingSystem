import React from "react";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// Icon Imports
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaidIcon from '@mui/icons-material/Paid';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AdminSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("accessToken");
    // Using window.location.href ensures a full clean state reload
    window.location.href = "/login"; 
  };

  const menuItems = [
    { icon: DashboardOutlinedIcon, label: "Dashboard", path: "/admin/dashboard" },
    { icon: InsertDriveFileOutlinedIcon, label: "Generate Report", path: "/admin/generate-report" },
    { icon: PersonOutlineOutlinedIcon, label: "Manage Author", path: "/admin/manage-author" },
    { icon: BookmarksIcon, label: "Poetry Status Manager", path: "/admin/manage-status" },
    { icon: AutoStoriesIcon, label: "Manage Poetry", path: "/admin/manage-poetry" },
    { icon: PaidIcon, label: "Monitor Donation", path: "/admin/monitor-donation" },
    { icon: PersonAddIcon, label: "Register Admin", path: "/admin/register-users" },
    // Notice: We don't need a path for Logout, we add a 'type' property
    { icon: LogoutIcon, label: "Logout", type: "logout" }, 
  ];

  return (
<div className="w-fit mb-10 pt-1 px-2 border border-gray-100 rounded-[30px] shadow-sm bg-white">      <div className="flex flex-col flex-grow">
        {menuItems.map((item, index) => (
          <div key={index} className="py-2">
            <Tooltip title={item.label} placement="right" arrow>
              <IconButton 
                onClick={() => {
                  // Logic Check: If it's logout, run the function; otherwise, navigate
                  if (item.type === "logout") {
                    handleLogout();
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{
                  padding: '12px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    backgroundColor: item.type === "logout" ? '#fff0f0' : '#fff5f7' 
                  }
                }}
              >
                <item.icon 
                  sx={{ 
                    // Logout icon stays grey or turns red on hover, others turn brand color when active
                    color: item.type === "logout" 
                      ? "#BDBDBD" 
                      : (isActive(item.path) ? "#DC2A54" : "#BDBDBD"), 
                    fontSize: "28px",
                    '&:hover': {
                      color: item.type === "logout" ? "#f44336" : (isActive(item.path) ? "#DC2A54" : "#DC2A54")
                    }
                  }} 
                />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}