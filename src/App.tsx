import { createContext, Dispatch, PropsWithChildren, SetStateAction, StrictMode, useEffect, useState } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { BodyOverflowProvider } from "./BodyContext";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Home from "./pages/home/home";
import Projects from "./pages/projects/projects";


export default function App() {
    return (
        <BodyOverflowProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </BodyOverflowProvider>
    )
}