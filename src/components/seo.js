import * as React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export default function Seo({ description, title, children }) {
    const {
        title: defaultTitle,
        description: defaultDescription,
        author,
    } = useSiteMetadata()

    const metaDescription = description || defaultDescription

    return (
        <>
            <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={author || ``} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            {children}
        </>
    )
}
