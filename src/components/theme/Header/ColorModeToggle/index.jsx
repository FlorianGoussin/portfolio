import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Wrapper } from './styles';

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useContext(ThemeContext);

    return (
        <Wrapper type="button" onClick={toggleColorMode}>
            <img src={colorMode === 'light' ? 'icons/moon.svg' : 'icons/sun.svg'} alt={colorMode} />
        </Wrapper>
    );
};

export default ColorModeToggle;
