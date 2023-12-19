import React from 'react'
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
// import AddIcon from '@mui/icons-material/Add'
// import SchoolIcon from '@mui/icons-material/School'
// import WorkIcon from '@mui/icons-material/Work'
import { Container } from 'components/basic'
import projects from 'data/projects'
import { Wrapper } from './styles'

export const Projects = () => {
    const getTimelineProjects = () =>
        projects?.length && projects.map((project) => (
            <VerticalTimelineElement
                key={project.title}
                className="vertical-timeline-element--work"
                contentStyle={{
                    background: '#F6F8F9',
                    color: '',
                    borderRadius: 0,
                    boxShadow: '0 2px 0 #ddd'
                }}
                contentArrowStyle={{
                    borderRight: '7px solid  rgb(33, 150, 243)',
                    borderRightColor: 'whitesmoke',
                }}
                date={project.date}
                iconStyle={{
                    boxShadow: 'none'
                }}
            // icon={<WorkIcon />   
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
        <Wrapper as={Container} id="projects">
            <VerticalTimeline lineColor="whitesmoke">
                {getTimelineProjects()}
            </VerticalTimeline>
        </Wrapper>
    )
}
