import { StrictMode } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";

export default function App() {
    return (
            <Router>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Home />} />
                </Routes>
            </Router>
    )
}