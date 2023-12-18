import { useState, useEffect } from 'react'
import useMedia from 'hooks/useMedia'

const useDarkMode = () => {
    const [colorMode, setColorMode] = useState('light')

    const toggleColorMode = () => {
        const newColorMode = colorMode === 'light' ? 'dark' : 'light'
        window.localStorage.setItem('colorMode', newColorMode)
        setColorMode(newColorMode)
    }

    const prefersDarkMode = useMedia(
        ['(prefers-color-scheme: dark)'],
        [true],
        false
    )

    useEffect(() => {
        const localMode = window.localStorage.getItem('colorMode')
        if (localMode) {
            setColorMode(localMode)
        } else if (prefersDarkMode) {
            setColorMode('dark')
        } else {
            setColorMode('light')
        }
    }, [prefersDarkMode])

    return [colorMode, toggleColorMode]
}

export default useDarkMode
