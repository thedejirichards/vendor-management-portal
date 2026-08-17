import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import VendorOnboardingPage from './pages/VendorOnboardingPage'
import VendorDeactivationPage from './pages/VendorDeactivationPage'
import VendorDueDiligencePage from './pages/VendorDueDiligencePage'
import InitiateDueDiligencePage from './pages/InitiateDueDiligencePage'
import VendorDueDiligenceDetailPage from './pages/VendorDueDiligenceDetailPage'
import VendorDetailPage from './pages/VendorDetailPage'
import VendorOnboardingDetailPage from './pages/VendorOnboardingDetailPage'
import VendorOnboardingReportPage from './pages/VendorOnboardingReportPage'
import VendorDueDiligenceReportPage from './pages/VendorDueDiligenceReportPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vendor-onboarding" element={<VendorOnboardingPage />} />
        <Route path="/vendor-onboarding/:id" element={<VendorOnboardingDetailPage />} />
        <Route path="/vendor-onboarding/:id/report" element={<VendorOnboardingReportPage />} />
        <Route path="/vendor-deactivation" element={<VendorDeactivationPage />} />
        <Route path="/vendor-due-diligence" element={<VendorDueDiligencePage />} />
        <Route path="/vendor-due-diligence/new" element={<InitiateDueDiligencePage />} />
        <Route path="/vendor-due-diligence/:id" element={<VendorDueDiligenceDetailPage />} />
        <Route path="/vendor-due-diligence/:id/report" element={<VendorDueDiligenceReportPage />} />
        <Route path="/vendors/:id" element={<VendorDetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
