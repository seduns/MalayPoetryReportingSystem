import { Route, Routes } from "react-router-dom";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/admin/*" element={<AdminRoute />} />

            {/* Customer Route */}
            <Route path="/*" element={<UserRoute />} />
        </Routes>
    )
}   