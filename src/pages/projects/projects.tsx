import { PropsWithChildren, useContext, useState } from "react";
import { bodyOverflowContext } from "../../BodyContext";
import { Button, Link } from "../../components/components";
import { Dropdown, Footer, Navbar } from "../components/components";

type ProjectProps = PropsWithChildren<{
    title: string,
    link?: string
}>

function Project(props: ProjectProps) {
    const [showEmbeded, ShowEmbeded] = useState(false)
    const context = useContext(bodyOverflowContext)

    function OpenEmbededWebsite() {
        ShowEmbeded(true)
        context.SetOverflow(false)
    }

    function CloseEmbededWebsite() {
        ShowEmbeded(false)
        context.SetOverflow(true)
    }

    return <div className="project">
        <header>
            {props.title}
        </header>

        {props.children}

        <div className="view">
            {props.link && <><Link primary newTab link={props.link}>Open the website</Link> or <Button primary onClick={OpenEmbededWebsite}>Open embeded version</Button></>}

            {showEmbeded &&
                <div className="embeded">
                    <iframe allowFullScreen src={props.link} frameBorder="0" />
                    <Button onClick={CloseEmbededWebsite}><i className="fas fa-window-close" /></Button>
                </div>
            }
        </div>
    </div>

}

export default function Projects() {
    return <div className="page projects-page">
        <Navbar currentPage={2}></Navbar>
        <Dropdown currentPage={2} />

        <img src="images/factory.svg" alt="factory" className="background" />

        <header className="title">
            My projects
        </header>

        <div className="content">
            <Project title="1. Julemy" link="https://julemy.netlify.app/">
                <img src="images/projects/julemy.png" alt="julemy" />
                <p>Julemy was supposed to be an educational website for chemistry and biology, but it failed because of bad management and overall bad business idea.
                    Nevertheless I’ve done the website and I learnt a lot while doing it. This was my first website. Most of what I know about CSS and React I learnt by doing julemy.
                    Obviously there are a lot of things to be fixed and improved, but it is not so bad for the first website. This website has gone through many redesigns before I 
                    ended up with this. There even was a 3D idea: </p>
                <video style={{ marginTop: "20px" }} controls src="images/projects/julemy3d.mp4" />

            </Project>

            <Project
                title="2. It’s not about you" link = "https://not-about-you.netlify.app">
                <img src="images/projects/inay.png" alt="it_is_not_about_you_website" />
                <p>
                    “It’s not about you” is a website for a book for small kids. I just needed some practice with SASS/SCSS and React as well so I found a random design that I can just implement. This website has only the home page
                </p>
            </Project>

            <Project
                title="3. Rentomed">
                <div className="images">
                    <img src="images/projects/rentomed_1.png" alt="rentomed" style={{ flexBasis: "100px", flexGrow: 1, maxWidth: "300px" }} />
                    <img src="images/projects/rentomed_3.png" alt="rentomed" style={{ flexBasis: "100px", flexGrow: 1, maxWidth: "300px" }} />
                    <img src="images/projects/rentomed_2.png" alt="rentomed" style={{ flexBasis: "300px", flexGrow: 1 }} />
                </div>

                <p>
                    Another website. I found this project on freelancer.com. The task was to implement design in React.js
                </p>
            </Project>

            <Project title="4. Artic">
                <video src="images/projects/artic.webm" controls />
                <p>"Artic" (yes, I spelled it correctly) is a weather forecast website that I've created with purpose to challenge myself and to practice my frontends skills. It works really simple, just enter location in the input section and press the button to get forecast for 2 weeks.
                    I used ready API weather.visualcrossing.com. There were some challenging tasks in this project like adjusting the temperature diagram and wind directions to match the timeline, determining the color of diagram at a certain point depending on the temperature and other.
                    As for now the website only shows wind direction and temperature, but some features might be added later like wind speed and precipitation </p>
            </Project>

            <Project title="5. TanksIO">
                <p>"TanksIO" is an online 2D game with tanks. The first set of technoclogies for this project was React, Javascript and SocketIO.js on frontend and Node.js, Javascript, Express.js with SocketIO.js on backend. Although I followed the rules of functional programming,
                    I didn't manage to make backend scalable. This is why I decided to migrate it to ASP.NET and SignalR and I don't regret. For convenience I replaced SocketIO with SignalR on frontend as well. Also I replaced Javascript with Typescript. All the physics is implemented
                    on the backend using Box2D library (.NET standart of it)</p>
                <video src="images/projects/tanks-io.webm" controls />
            </Project>


            <Project
                title="6. GoGram API">
                <div className="images">
                    <img src="images/projects/gogram.png" alt="gogram" style={{ maxWidth: "100%", width: "600px" }} />
                </div>

                <p>
                    This is my only finished backend project for now. It is a simplified version of instragram API. While doing it I learnt how to use MongoDB, mongoose.js, multer.js, GridFS and swagger (for writing documentation)
                </p>
            </Project>

            <Project title="7. Personal website">
                <p>

                </p>
            </Project>

            <div className="coming-soon">
                Coming soon...
            </div>
        </div>

        <Footer currentPage={2} />
    </div>
}