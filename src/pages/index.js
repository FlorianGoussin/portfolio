import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import { Layout } from '../components/theme'
import Seo from '../components/seo'
import * as styles from '../components/index.module.css'
import { Video } from '../components/styles.js'
import { Contact, Projects } from '../components/main'

const GridAnim = '../assets/videos/grid_anim.mp4';

const IndexPage = () => (
    <Layout>
        <Video className='video-tag' autoPlay loop muted>
            <source src={GridAnim} type='video/mp4' />
        </Video>
        {/* <Projects />
        <Contact /> */}
    </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
