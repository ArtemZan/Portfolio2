import { MutableRefObject, useEffect, useState } from "react";
import {Button, Link} from "../../components/Components";

export default function Home(): JSX.Element {
    const [mobileView, SetMobile] = useState(window.innerWidth < 600)

    //Keep reference of all images so they are not deleted from memory
    const preloadedImages = []

    function OnResize(e: UIEvent) {
        if (window.innerWidth < 600) {
            SetMobile(true)
        }
        else {
            SetMobile(false)
        }
    }

    function PreloadImage(src: string) {
        const image = new Image()
        image.src = "images/" + src
        image.className = "background"
        image.alt = "background"
        preloadedImages.push(image)
    }

    useEffect(() => {
        PreloadImage("bg_mobile.png")
        PreloadImage("bg_desktop.png")

        window.addEventListener("resize", OnResize)

        return () => window.removeEventListener("resize", OnResize)
    }, [])

    return <div className="page home-page">
        <div className="header">
            <header>Artem<br />Zankovskiy</header>
            <h5>Programmer & designer</h5>
        </div>
        <div className="background">
            <img src={mobileView ? "images/bg_mobile.png" : "images/bg_desktop.png"} alt="background" />
        </div>
        <div className="arrows">
            <img className="arrow-1" src="images/arrow.svg" alt="arrow" />
            <div className="arrow-2" />
            <img className="arrow-3" src="images/arrow_vert.svg" alt="arrow" />
            <div className="arrow-4" />
        </div>

        <Link hoverable primary className = "about" link = "/about" content = "About me"/>
        <div className = "secondary-links">
            <Link hoverable secondary link = "/projects">My projects</Link>
            <Link hoverable secondary link = "/contact">Contact me</Link>
        </div>
    </div>
}