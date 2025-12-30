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
import EditIcon from '@mui/icons-material/Edit';

export default function ContributorSideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Updated to match your /admin/... route structure
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { icon: DashboardOutlinedIcon, label: "Dashboard", path: "/contributor/dashboard" },
        { icon: InsertDriveFileOutlinedIcon, label: "Create Poetry", path: "/contributor/create-poetry" },
        { icon: EditIcon, label: "Edit Poetry", path: "/contributor/edit-poetry" },
        { icon: PersonOutlineOutlinedIcon, label: "Contributor Profile", path: "/contributor/profile" },
        { icon: ListAltOutlinedIcon, label: "Manage Poetry", path: "/contributor/manage-poetry" },
        // { icon: layersOutlinedIcon, label: "Monitor Donation", path: "/contributor/donation" },
        { icon: PeopleOutlineOutlinedIcon, label: "Register Co-Author", path: "/contributor/register-author" },
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