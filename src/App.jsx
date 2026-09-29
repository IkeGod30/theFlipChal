import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import SponsorBar from './components/SponsorBar'
import Footer from './components/Footer'
import Toaster from './components/Toaster'
import RequireAuth from './components/RequireAuth'
import GalleryPage from './pages/GalleryPage'
import HowToWinPage from './pages/HowToWinPage'
import FeatureBookPage from './pages/FeatureBookPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import IntroPage from './pages/IntroPage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'

export default function App() {
  return (
    <div className="shell">
      <Toaster />
      <NavBar />
      <main className="app">
        <Routes>
          <Route path="/" element={<GalleryPage />} />
          <Route path="/how-to-win" element={<HowToWinPage />} />
          <Route path="/feature-a-book" element={<FeatureBookPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/prize/:prizeId" element={<RequireAuth><IntroPage /></RequireAuth>} />
          <Route path="/prize/:prizeId/quiz" element={<RequireAuth><QuizPage /></RequireAuth>} />
          <Route path="/prize/:prizeId/results" element={<RequireAuth><ResultsPage /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SponsorBar />
      <Footer />
    </div>
  )
}
