import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../user/component/Auth/Login";
import Register from "../user/component/Auth/Register";
import Homepage from "../user/pages/homepage";
import ContributorPage from "../user/pages/ContributorPage";
import ContributorDashboard from "../user/component/Contributor/ContributorDashboard";
import ContributorCreatePoetry from "../user/component/Contributor/ContributorCreatePoetry";
import ContributorEditPoetry from "../user/component/Contributor/ContributorEditPoetry";
import ContributroProfileDonation from "../user/component/Contributor/ContributroProfileDonation";
import ContributorManagePoetry from "../user/component/Contributor/ContributorManagePoetry";
import ContributorRegisterCoAuthor from "../user/component/Contributor/ContributorRegisterCoAuthor";

export default function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/contributor" element={<ContributorPage />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ContributorDashboard />} />
        <Route path="create-poetry" element={<ContributorCreatePoetry />} />
        <Route path="edit-poetry" element={<ContributorEditPoetry />} />
        <Route path="profile" element={<ContributroProfileDonation />} />
        <Route path="manage-poetry" element={<ContributorManagePoetry />} />
        <Route path="register-author" element={<ContributorRegisterCoAuthor />} />
      </Route>
    </Routes>
  );
}