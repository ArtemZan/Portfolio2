import { MutableRefObject, useEffect, useRef, useState } from "react";
import {Button, Link} from "../../components/Components";

type ArrowPropsType = {
    length: number
}

function Arrow(props: ArrowPropsType) {
    return <svg width={props.length} height="30" viewBox={`0 0 730 30`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.452994 15L12 26.547L23.547 15L12 3.45299L0.452994 15ZM729.414 16.4142C730.195 15.6332 730.195 14.3668 729.414 13.5858L716.686 0.857864C715.905 0.0768156 714.639 0.0768156 713.858 0.857864C713.077 1.63891 713.077 2.90524 713.858 3.68629L725.172 15L713.858 26.3137C713.077 27.0948 713.077 28.3611 713.858 29.1421C714.639 29.9232 715.905 29.9232 716.686 29.1421L729.414 16.4142ZM12 17H728V13H12V17Z" fill="#2BD900" />
    </svg>
}

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

        <Link className = "about" link = "/about" content = "About me"/>
        <div className = "secondary-links">
            <Link secondary link = "/projects">My projects</Link>
            <Link secondary link = "/contact">Contact me</Link>
        </div>
    </div>
}