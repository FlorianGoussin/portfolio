import React from 'react'
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import AddIcon from '@mui/icons-material/Add'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import projects from 'data/projects'

export const Projects = () => {
    const getTimelineProjects = () =>
        projects?.length &&
        projects.map(project => (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                    background: 'whitesmoke',
                    color: '',
                }}
                contentArrowStyle={{
                    borderRight: '7px solid  rgb(33, 150, 243)',
                }}
                date={project.date}
                iconStyle={{
                    background: 'whitesmoke',
                    color: '',
                }}
                icon={<WorkIcon />}
                contentArrowStyle={{
                    borderRightColor: 'whitesmoke',
                }}
            >
                <h3 className="vertical-timeline-element-title">
                    {project.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                    {project.location}
                </h4>
                <h4 className="vertical-timeline-element-subtitle">
                    {project.tech}
                </h4>
                <p>{project.description}</p>
            </VerticalTimelineElement>
        ))

    return (
        <section classname="projects">
            <VerticalTimeline lineColor="whitesmoke">
                {getTimelineProjects()}
            </VerticalTimeline>
        </section>
    )
}
