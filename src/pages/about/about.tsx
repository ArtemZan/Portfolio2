import { useEffect, useRef, useState } from "react"
import { Dropdown, Link, Position, Tooltip } from "../../components/Components";
import { Card, CardContent, ImageProps } from "./card"

function Menu()
{
    const [closed, SetClosed] = useState(true)

    return <div className="menu" >
        <Dropdown
            buttonContent={
                <svg viewBox="0 0 50 32" >
                    <line x1="0" y1="4" x2="50" y2="4" />
                    <line x1="0" y1="16" x2="50" y2="16" />
                    <line x1="0" y1="28" x2="50" y2="28" />
                </svg>
            }
            items={[1, 2, 3]}
            closeOnSecondClick
            closed = {closed}
            onOpen = {() => SetClosed(false)}
        />

        <div className="background" onClick = {e => {e.stopPropagation(); SetClosed(true)}}/>
    </div>
}

const cards: { text: string, image: ImageProps | (ImageProps[]) }[] = (() => {
    const myBirthday = new Date();
    myBirthday.setFullYear(2005, 3, 2);

    return [
        {
            text: `My name is Artem, I’m ${new Date(Date.now() - new Date(2005, 3, 2).getTime()).getFullYear() - 1970} years old and I’ve created this website so people can learn about me`,
            image: [
                { src: "hand.svg", alt: "hand" },
                { src: "face.svg", alt: "face" }
            ]
        },
        {
            text: "I am fullstack developer with experience in game development",
            image: { src: "programming.svg", alt: "programming" }
        },
        {
            text: "I'm studying in Sofia High School of Mathematics",
            image: { src: "graduation.svg", alt: "graduation" }
        },
        {
            text: "For me programming is a way to challenge myself and get better at solving problems",
            image: { src: "thinking.svg", alt: "thinking" }
        },
        {
            text: "I am ukrainian but I live in Sofia, Bulgaria. I speak russian, ukrainian, bulgarian, english and a little german",
            image: { src: "world.svg", alt: "world" }
        }
    ];
})()

export default function About() {
    const showedCards = useRef<JSX.Element[]>([])
    const [cardsShowed, SetCardsShowed] = useState(0)
    const images = useRef<HTMLImageElement[]>([])

    function OnClick() {
        if (document.scrollingElement.scrollTop >= document.scrollingElement.scrollHeight - window.innerHeight) {
            ShowNextCard()
        }
    }

    function OnScroll(e: WheelEvent) {
        if (e.deltaY > 0 && document.scrollingElement.scrollTop >= document.scrollingElement.scrollHeight - window.innerHeight) {
            ShowNextCard()
        }
    }

    function ShowNextCard() {
        if (showedCards.current.length === cards.length) {
            return
        }

        const content = cards[showedCards.current.length]

        showedCards.current.push(<Card key={showedCards.current.length} onHide={() => { }}>
            <CardContent {...content}></CardContent>
        </Card>)

        SetCardsShowed(showedCards.current.length)
    }

    useEffect(() => {
        for (const cardData of cards) {
            if ("src" in cardData.image) {
                const image = new Image()
                image.src = "images/" + cardData.image.src
                images.current.push(image)
                continue
            }

            for (const imgData of cardData.image) {
                const image = new Image()
                image.src = "images/" + imgData.src
                images.current.push(image)
            }
        }

        images.current[0].onload = () => {
            showedCards.current.push(<Card key={0} onHide={() => { }}>
                <CardContent {...cards[0]} />
            </Card>)
            SetCardsShowed(cardsShowed + 1)
        }


        window.addEventListener("click", OnClick)
        window.addEventListener("wheel", OnScroll)

        return () => {
            window.removeEventListener("click", OnClick)
            window.removeEventListener("wheel", OnScroll)
        }
    }, [])

    return <div className="page about-page">
        <Menu/>

        <div className="sidebar">
            <div className="navigation">
                <Tooltip position={Position.right} tooltip="Home">
                    <Link hoverable link="/">
                        <img src="images/home.svg" alt="home" />
                    </Link>
                </Tooltip>

                <Tooltip position={Position.right} tooltip="Contact me">
                    <Link hoverable link="/contact">
                        <img src="images/contact.svg" alt="contact" />
                    </Link>
                </Tooltip>

                <Tooltip position={Position.right} tooltip="My projects">
                    <Link hoverable link="/projects">
                        <img src="images/project.svg" alt="project" />
                    </Link>
                </Tooltip>
            </div>
        </div>

        <div className="header">
            <img className="connector" src="images/connector.svg" alt="line" />
            <div className="text">About me</div>
        </div>

        <div className="info">
            {...showedCards.current}
        </div>


        <div className="instructions">
            <div className="mouse">
                <img style={{ height: "50px" }} src="images/mouse.svg" alt="mouse" />
                <i className='fas fa-long-arrow-alt-down' />
            </div>

            <div className="click">
                or click anywhere
            </div>
        </div>
    </div>
}