// import logo from "./logo.svg";
import "./App.css";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
import { ThemeProvider } from "./components/ThemeProvider";
import Upload from "./components/userdashboard/UserDashboard";
// import ForgotPassword from "./components/forgotPassword/ForgotPassword";
// import PricingPage from "./components/Pricing/PricingPage";
// import OTPVerificationPage from "./components/OTPVerificationPage/OTPVerificationPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Navigate to="/upload" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
