import projects from "./projects";

const tags = new Set<string>()

projects.forEach(project => project.props.tags && project.props.tags.forEach(tag => tags.add(tag)))

export default tags