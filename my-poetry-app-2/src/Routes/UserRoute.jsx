import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../user/component/Auth/Login";
import Register from "../user/component/Auth/Register";
import Homepage from "../user/pages/homepage";
import ContributorPage from "../user/pages/ContributorPage";
import ContributorDashboard from "../user/component/Contributor/ContributorDashboard";
import ContributorCreatePoetry from "../user/component/Contributor/ContributorCreatePoetry";
import ContributroProfileDonation from "../user/component/Contributor/ContributroProfileDonation";
import ContributorManagePoetry from "../user/component/Contributor/ContributorManagePoetry";
import ContributorRegisterCoAuthor from "../user/component/Contributor/ContributorRegisterCoAuthor";
import PoetryDiscoverPage from "../user/pages/PoetryDiscoverPage";
import PoetryDetailPage from "../user/pages/PoetryDetailPage";
import DonationPage from "../user/pages/DonationPage";
import UserProfilePage from "../user/pages/UserProfilePage";
import ContributorAnalysisPoetry from "../user/component/Contributor/ContributorAnalysisPoetry";
import ContributorEditPoetry from "../user/component/Contributor/ContributroEditPoetry";

export default function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/poetry-discovery" element={<PoetryDiscoverPage />} />
      <Route path="/poetry-detail/:id" element={<PoetryDetailPage />} />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="/user-profile" element={<UserProfilePage />} />

      <Route path="/contributor" element={<ContributorPage />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ContributorDashboard />} />
        <Route path="create-poetry" element={<ContributorCreatePoetry />} />
        <Route path="analysis-poetry" element={<ContributorAnalysisPoetry />} />
        <Route path="edit-poetry" element={<ContributorEditPoetry />} />
        <Route path="profile" element={<ContributroProfileDonation />} />
        <Route path="manage-poetry" element={<ContributorManagePoetry />} />
        <Route path="register-author" element={<ContributorRegisterCoAuthor />} />
      </Route>
    </Routes>
  );
}