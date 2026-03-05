import { Routes, Route, Navigate } from "react-router-dom";
import MarketPage from "./pages/MarketPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#020B2A] via-[#061A4A] to-[#020B2A]">
      <Routes>
        <Route path="/" element={<MarketPage />} />
        <Route path="/dashboard/:coinId" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}