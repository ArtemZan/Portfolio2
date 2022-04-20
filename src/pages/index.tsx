import { Link } from "../components"

export default function Home(): JSX.Element {
    return <div className="page home-page">
        <div className="header">
            <header>Artem<br />Zankovskiy</header>
            <h5>Programmer & designer</h5>
        </div>
        <div className="background">
            <div />
            <div />
        </div>
        <div className="arrows">
            <div>
                <img src="images/arrow.svg" alt="arrow" />
            </div>
            <div />
            <div>
                <img src="images/arrow_vert.svg" alt="arrow" />
            </div>
            <div />
        </div>

        <Link hoverable primary className="about" link="/about" content="About me" />
        <div className="secondary-links">
            <Link hoverable secondary link="/projects">My projects</Link>
            <Link hoverable secondary link="/contact">Contact me</Link>
        </div>
    </div>
}