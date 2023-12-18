import React from 'react'
// import { ThemeContext } from 'providers/ThemeProvider'
import { Footer } from '../'
// import { Global } from '../styles'
// import { WipFlag } from './styles'
import './fonts.css'

export const Layout = ({ children }) => {
    // const { colorMode } = useContext(ThemeContext)

    return (
        <>
            {/* <WipFlag>Work in progress...</WipFlag> */}
            {/*<Global colorMode={colorMode} />*/}
            {children}
            {/* <WipFlag>Sorry for keeping you waiting!</WipFlag> */}
            <Footer />
        </>
    )
}
