import * as emailjs from "@emailjs/browser"
import { Link } from "../../components"
import { Dropdown, Navbar } from "../_components"

export default function Contact() {
    //emailjs.init("lyMTVQZ1swds2baNr")
    //emailjs.send("service_jgrz3mj", "template_dd8908n", { subject: "Hi" }, "lyMTVQZ1swds2baNr").then(console.log).catch(e => console.log(e))
    return <div className="page contact-page">
        <Navbar currentPage={3}></Navbar>
        <Dropdown currentPage={3} />
        <header>Contact me</header>
        <div className="links">
            <Link newTab primary link="https://github.com/ArtemZan"><i className="fab fa-github"></i> GitHub</Link>
            <Link newTab primary link="https://bg.linkedin.com/in/artem-zankovskiy-a2027b230"><i className="fab fa-linkedin"></i> LinkedIn</Link>
            <Link newTab primary link="https://www.facebook.com/profile.php?id=100027807666151"><i className="fab fa-facebook"></i> Facebook</Link>
            <Link newTab primary link="https://www.instagram.com/artemzankovskii/"><i className="fab fa-instagram"></i> Instagram</Link>
        </div>
    </div>
}