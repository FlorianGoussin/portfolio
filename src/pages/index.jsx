import React, { useRef, useEffect } from 'react'
// import { Link } from 'gatsby'
// import { StaticImage } from 'gatsby-plugin-image'

import { Layout } from '../components/theme/index.js'
import Seo from '../components/seo.js'
// import * as styles from '../components/index.module.css'
import { Video } from '../components/styles.js'
import { Contact, Projects } from '../components/main/index.js'
import { About } from '../components/main/About'
import simpleParallax from 'simple-parallax-js';


// In static at the root of site but we also need to add the portfolio slug on top of that
const GridAnim = 'grid_anim.mp4';

const IndexPage = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            new simpleParallax(videoRef.current, { scale: 1.5 });
        }
    }, []);

    return (
        <Layout>
            <About />
            <Video
                ref={videoRef}
                className='video-tag'
                autoPlay
                loop
                muted
                playsInline
                poster="grid_anim.png"
                preload="auto"
            >
                <source src={GridAnim} type='video/mp4' />
            </Video>
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
