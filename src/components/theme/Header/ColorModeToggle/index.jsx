import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Wrapper } from './styles';

const ColorModeToggle = () => {
    const { colorMode, setColorMode } = useContext(ThemeContext);

    return (
        <Wrapper type="button" onClick={setColorMode}>
            {/* In static at the root of site but we also need to add the portfolio slug on top of that */}
            <img src={colorMode === 'light' ? 'icons/moon.svg' : 'icons/sun.svg'} alt={colorMode} />
        </Wrapper>
    );
};

export default ColorModeToggle;
