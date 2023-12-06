import React, { useContext } from 'react'
import { ThemeContext } from 'providers/ThemeProvider'
import { Footer } from '../'
import { Global } from '../styles'
import './fonts.css'

export const Layout = ({ children }) => {
    const { colorMode } = useContext(ThemeContext)

    return (
        <>
            {/*<Global colorMode={colorMode} />*/}
            {children}
            <Footer />
        </>
    )
}
