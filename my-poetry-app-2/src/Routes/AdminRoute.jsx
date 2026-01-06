import { Route, Routes, Navigate } from "react-router-dom"; // Add Navigate
import AdminPage from "../user/pages/AdminPage";
import AdminDashboard from "../user/component/Admin/AdminDashboard";
import AdminGenerateReport from "../user/component/Admin/AdminGenerateReport";
import AdminManageAuthor from "../user/component/Admin/AdminManageAuthor";
import AdminManagePoetry from "../user/component/Admin/AdminManagePoetry";
import AdminManageDonation from "../user/component/Admin/AdminManageDonation";
import AdminRegister from "../user/component/Admin/AdminRegister";
import AdminPoetryStatusManager from "../user/component/Admin/AdminPoetryStatusManager";
import AdminViewPoetryReport from "../user/component/Admin/AdminViewPoetryReport";

export default function AdminRoute() {
    return (
        <Routes>
            <Route path="/" element={<AdminPage />}>
                {/* 1. AUTO REDIRECT: When at "/admin", go to "/admin/dashboard" */}
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="generate-report" element={<AdminGenerateReport />} />
                <Route path="manage-author" element={<AdminManageAuthor />} />
                <Route path="manage-status" element={<AdminPoetryStatusManager />} />
                <Route path="manage-poetry" element={<AdminManagePoetry />} />
                <Route path="monitor-donation" element={<AdminManageDonation />} />
                <Route path="register-users" element={<AdminRegister />} />
                // Ensure the ID parameter is included!
                <Route path="view-poetry/:id" element={<AdminViewPoetryReport />} />
            </Route>
        </Routes>
    );
}