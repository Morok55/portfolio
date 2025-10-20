import ParticlesBackground from "./components/ParticlesBackground";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SocialLinks from "./components/SocialLinks";
import GeneralFooter from "./components/GeneralFooter";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <ParticlesBackground />
      <SocialLinks />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* старые адреса перенаправляем на главную, чтобы не было 404 */}
        <Route path="/about-me" element={<Navigate to="/" replace />} />
        <Route path="/technologies" element={<Navigate to="/" replace />} />
        <Route path="/projects" element={<Navigate to="/" replace />} />
      </Routes>
      <GeneralFooter />

      <Analytics />
    </>
  );
}

export default App;