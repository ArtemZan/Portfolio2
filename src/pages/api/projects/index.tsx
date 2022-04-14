import { NextApiRequest, NextApiResponse } from "next";
import { sendEtagResponse } from "next/dist/server/send-payload";
import { ReactElement } from "react";
import Project, { ProjectProps } from "../../projects/project";
import projects from "./projects";


export default function Projects(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "GET") {
        return
    }

    if (!("start" in req.query)) {
        //Error
        return
    }

    const start = parseInt(req.query.start as string)
    const count = parseInt(req.query.count as string)

    
    if (!("tags" in req.query)) {
        if (start >= projects.length) {
            res.status(400).send(null);
            return
        }
    
        const end = Math.min(projects.length - 1, start + count)

        res.status(200).send({
            projects: projects.slice(start, end),
            left: projects.length - 1 - end
        })

        return
    }

    const tags = Array.isArray(req.query.tags) ? req.query.tags as string[] : [req.query.tags as string]

    let matchPoints: { index: number, points: number }[] = []

    projects.forEach((project, project_i) => {
        matchPoints.push({ index: project_i, points: 0 })

        if (project.props.tags) {
            project.props.tags.forEach(tag => {
                tags.forEach(req_tag => {
                    if (req_tag === tag)
                        matchPoints[project_i].points++
                })
            })
        }
    })

    console.log(matchPoints)
    matchPoints = matchPoints.filter(match => match.points).sort((a, b) => a.points - b.points)

    
    if (start >= matchPoints.length) {
        res.status(400).send({error: "'Start' parameter overflows projects count"});
        return
    }

    const end = Math.min(matchPoints.length - 1, start + count)

    let resProjects: ReactElement<ProjectProps>[] = matchPoints.slice(start, end + 1).map(({ index }) => projects[index])

    res.status(200).send({
        projects: resProjects,
        left: matchPoints.length - 1 - end
    })


}