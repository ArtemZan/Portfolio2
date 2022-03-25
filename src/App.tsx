import { StrictMode } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./pages/about/about";
import Home from "./pages/home/home";
import Projects from "./pages/projects/projects";

export default function App() {
    return (
        <Router>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />}></Route>
            </Routes>
        </Router>
    )
}