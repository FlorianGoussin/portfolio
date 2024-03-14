import React from 'react'
// import { Link } from 'gatsby'
// import { StaticImage } from 'gatsby-plugin-image'

import { Layout } from '../components/theme/index.js'
import Seo from '../components/seo.js'
// import * as styles from '../components/index.module.css'
import { Contact, Projects } from '../components/main/index.js'
import { About } from '../components/main/About'
import { GameOfLife } from '../components/main/GameOfLife'

const IndexPage = () => {
    return (
        <Layout>
            <About />
            <GameOfLife />
            <Projects />
            <Contact />
        </Layout>
    )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
