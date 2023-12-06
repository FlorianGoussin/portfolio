import React, { createContext } from 'react'
import useDarkMode from 'hooks/useDarkMode'

export const ThemeContext = createContext('light')

const ThemeProvider = ({ children }) => {
    const [colorMode, toggleColorMode] = useDarkMode()

    return (
        <ThemeContext.Provider
            value={{
                colorMode,
                toggleColorMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
