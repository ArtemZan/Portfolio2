import { NextApiRequest, NextApiResponse } from "next";
import Project from "../projects/project";

const projects = [
    <Project title="Julemy" link="https://julemy.netlify.app/" github="https://github.com/ucha-se-2-0/frontend">
        <img src="images/projects/julemy.png" alt="julemy" />
        <p>Julemy was supposed to be an educational website for chemistry and biology, but it failed because of bad management and overall bad business idea.
            Nevertheless I’ve done the website and I learnt a lot while doing it. This was my first website. Most of what I know about CSS and React I learnt by doing julemy.
            Obviously there are a lot of things to be fixed and improved, but it is not so bad for the first website. This website has gone through many redesigns before I
            ended up with this. There even was a 3D idea: </p>
        <video style={{ marginTop: "20px" }} controls src="images/projects/julemy3d.mp4" />

    </Project>,

    <Project
        title="It’s not about you" link="https://not-about-you.netlify.app" github="https://github.com/ArtemZan/inay">
        <img src="images/projects/inay.png" alt="it_is_not_about_you_website" />
        <p>
            “It’s not about you” is a website for a book for small kids. I just needed some practice with SASS/SCSS and React as well so I found a random design that I can just implement. This website has only the home page
        </p>
    </Project>,

    <Project
        title="Rentomed"
        github="https://github.com/ArtemZan/rentomed">
        <div className="images">
            <img src="images/projects/rentomed_1.png" alt="rentomed" style={{ flexBasis: "100px", flexGrow: 1, maxWidth: "300px" }} />
            <img src="images/projects/rentomed_3.png" alt="rentomed" style={{ flexBasis: "100px", flexGrow: 1, maxWidth: "300px" }} />
            <img src="images/projects/rentomed_2.png" alt="rentomed" style={{ flexBasis: "300px", flexGrow: 1 }} />
        </div>

        <p>
            Another website. I found this project on freelancer.com. The task was to implement design in React.js
        </p>
    </Project>,

    <Project title="Artic" github="https://github.com/ArtemZan/Weather">
        <video src="images/projects/artic.webm" controls />
        <p>"Artic" (yes, I spelled it correctly) is a weather forecast website that I've created with purpose to challenge myself and to practice my frontends skills. It works really simple, just enter location in the input section and press the button to get forecast for 2 weeks.
            I used ready API weather.visualcrossing.com. There were some challenging tasks in this project like adjusting the temperature diagram and wind directions to match the timeline, determining the color of diagram at a certain point depending on the temperature and other.
            As for now the website only shows wind direction and temperature, but some features might be added later like wind speed and precipitation </p>
    </Project>,

    <Project title="TanksIO" github={[
        {
            name: "Frontend",
            link: "https://github.com/ArtemZan/tanks-io/tree/master/frontend"
        },
        {
            name: "Backend",
            link: "https://github.com/ArtemZan/tanks-io-backend"
        }
    ]}>
        <p>"TanksIO" is an online 2D game with tanks. The first set of technoclogies for this project was React, Javascript and SocketIO.js on frontend and Node.js, Javascript, Express.js with SocketIO.js on backend. Although I followed the rules of functional programming,
            I didn't manage to make backend scalable. This is why I decided to migrate it to ASP.NET and SignalR and I don't regret. For convenience I replaced SocketIO with SignalR on frontend as well. Also I replaced Javascript with Typescript. All the physics is implemented
            on the backend using Box2D library (.NET standart of it)</p>
        <video src="images/projects/tanks-io.webm" controls />
    </Project>,


    <Project
        title="GoGram API"
        github="https://github.com/ArtemZan/GoGram">
        <div className="images">
            <img src="images/projects/gogram.png" alt="gogram" style={{ maxWidth: "100%", width: "600px" }} />
        </div>

        <p>
            This is my only finished backend project for now. It is a simplified version of instragram API. While doing it I learnt how to use MongoDB, mongoose.js, multer.js, GridFS and swagger (for writing documentation)
        </p>
    </Project>,

    <Project title="Personal website" github="https://github.com/ArtemZan/portfolio">
        <video src="images/projects/personal.mp4" controls />
        <p>
            This is my first attempt to create pesonal website. I turned out to be not so simple to create 3D website that doesn't look boring so I gave up and I haven't finished this project
        </p>
    </Project>,

    <Project title="Matrices by vectors multiplication" link="https://upbeat-keller-015d4d.netlify.app/" github="https://github.com/ArtemZan/Matrices-visualization">
        <p>
            This website is a demo for matrices by vertices multiplication.

        </p>
    </Project>,

    <Project title="Other">
        <p>
            Here are some projects that were my acquaintance with HTML canvas and three.js (these were my first frontend projects):
        </p>
        <video src="images/projects/canvas.mp4" controls></video>
        <img src="images/projects/tube.png" alt="3D tube" />
        <video src="images/projects/minecraft.mp4" controls></video>
        <video src="images/projects/waves.mp4" muted controls />
    </Project>
].map((project, index) => ({ ...project, key: index }))

export default function Projects(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== "GET") {
        return
    }

    let args: {start: number, count: number} = {start: null, count: null}
    args.start = parseInt(req.query.start as string)
    args.count = parseInt(req.query.count as string)
    
    if(args.start >= projects.length)
    {
        res.status(400).send(null);
        return
    }

    const end = Math.min(projects.length - 1, args.start + args.count)

    res.status(200).send({
        projects: projects.slice(args.start, end),
        left: projects.length - 1 - end
    })
}