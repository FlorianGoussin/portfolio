/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    pathPrefix: "/portfolio",
    siteMetadata: {
        title: `Florian Goussin - Portfolio`,
        description: `Hello, I'm Florian Goussin and Frontend developer`,
        author: `Florian Goussin`,
        siteUrl: `https://floriangoussin.com/`,
    },
    plugins: [
        `gatsby-plugin-image`,
        // {
        //     resolve: `gatsby-source-filesystem`,
        //     options: {
        //         name: `src`,
        //         path: `${__dirname}/src/images`,
        //     },
        // },
        `gatsby-transformer-sharp`,
        // `gatsby-plugin-sharp`,
        // {
        //     resolve: `gatsby-plugin-manifest`,
        //     options: {
        //         name: `fg-portfolio`,
        //         short_name: `Portfolio`,
        //         start_url: `/`,
        //         background_color: `#663399`,
        //         // This will impact how browsers show your PWA/website
        //         // https://css-tricks.com/meta-theme-color-and-trickery/
        //         // theme_color: `#663399`,
        //         display: `minimal-ui`
        //     },
        // },
        `gatsby-plugin-styled-components`,
    ],
}
