import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// Icon Imports
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import layersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

export default function AdminSideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Updated to match your /admin/... route structure
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { icon: DashboardOutlinedIcon, label: "Dashboard", path: "/admin/dashboard" },
        { icon: InsertDriveFileOutlinedIcon, label: "Generate Report", path: "/admin/generate-report" },
        { icon: PersonOutlineOutlinedIcon, label: "Manage Author", path: "/admin/manage-author" },
        { icon: HomeOutlinedIcon, label: "Poetry Status Manager", path: "/admin/manage-status" },
        { icon: ListAltOutlinedIcon, label: "Manage Poetry", path: "/admin/manage-poetry" },
        { icon: layersOutlinedIcon, label: "Monitor Donation", path: "/admin/monitor-donation" },
        { icon: PeopleOutlineOutlinedIcon, label: "Register Admin", path: "/admin/register-users" },
    ];

    return (
        <div className="flex flex-col items-center w-fit py-4 px-2 border border-gray-100 rounded-[30px] shadow-sm bg-white">
            {menuItems.map((item, index) => (
                <div key={index} className="py-2">
                    <Tooltip title={item.label} placement="right" arrow>
                        <IconButton 
                            onClick={() => navigate(item.path)}
                            sx={{
                                padding: '12px',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#fff5f7' }
                            }}
                        >
                            <item.icon 
                                sx={{ 
                                    color: isActive(item.path) ? "#DC2A54" : "#BDBDBD", 
                                    fontSize: "28px" 
                                }} 
                            />
                        </IconButton>
                    </Tooltip>
                </div>
            ))}
        </div>
    );
}