import { cloneElement, PropsWithChildren } from "react";
import { Link } from "../../components/Components";
import { Dropdown, Footer, Navbar } from "../components/components";

type ProjectProps = PropsWithChildren<{
    title: string
}>

function Project(props: ProjectProps) {
    return <div className="project">
        <header>
            {props.title}
        </header>

        {/* {"length" in props.images ?
            <div className="images">
                {props.images.map((item, index) => cloneElement(item, { key: index }))}
            </div> :
            props.images
        } */}

        {props.children}
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
            <Project title="1. Julemy">
                <img src="images/projects/julemy.png" alt="julemy" />
                <p>Julemy was supposed to be an educational website for chemistry and biology, but it failed because of bad management and overall bad business idea.
                    Nevertheless I’ve done the website and I learnt a lot while doing it. This was my first website. Most of what I know about CSS and React I learnt by doing julemy.
                    This is how it looks now: {<Link link="https://julemy.netlify.app/">Julemy</Link>}. Not really impressive, right? Obviously there are a lot of things to be fixed and improved,
                    but it is not so bad for the first website. This website has gone through many redesigns before I ended up with this. There even was a 3D idea: </p>
                <video style={{ marginTop: "20px" }} controls src="images/projects/julemy3d.mp4" />

            </Project>

            <Project
                title="2. It’s not about you">
                <img src="images/projects/inay.png" alt="it_is_not_about_you_website" />
                <p>
                    “It’s not about you” is a website for a book for small kids. I just needed some practice with SASS/SCSS and React as well so I found a random design so that I can just implement. This website has only the home page. You can visit it here: {<Link link="https://not-about-you.netlify.app/">Not about you</Link>}
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
                    Another website. I found this project on freelancer.com. The task was to implement design that was already done in React.js
                </p>
            </Project>


            <Project
                title="4. GoGram API">
                <div className="images">
                    <img src="images/projects/gogram.png" alt="gogram" style={{ maxWidth: "100%", width: "600px" }} />
                </div>

                <p>
                    This is my only finished backend project for now. It is a simplified version of instragram API. While doing it I learnt how to use MongoDB, mongoose.js, multer.js, GridFS and swagger (for writing documentation)
                </p>
            </Project>

            <div className="coming-soon">
                Coming soon...
            </div>
        </div>

        <Footer currentPage={2} />
    </div>
}