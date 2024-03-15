/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    pathPrefix: '/portfolio',
    siteMetadata: {
        title: `Florian Goussin - Portfolio`,
        description: `Hello, I'm Florian Goussin and Frontend developer`,
        author: `Florian Goussin`,
        siteUrl: `https://floriangoussin.com/`,
    },
    plugins: [
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
    ],
}
