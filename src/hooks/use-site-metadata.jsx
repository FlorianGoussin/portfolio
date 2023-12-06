import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
    // useStaticQuery pulls siteMetadata from gatsby-config.js by default
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    )
    return data.site.siteMetadata
}
