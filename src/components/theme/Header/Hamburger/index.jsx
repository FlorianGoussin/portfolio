import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Wrapper, Bar } from './styles';

const Hamburger = ({ navbarMobile, setNavbarMobile }) => {

    const { colorMode } = useContext(ThemeContext);

    return (
        <Wrapper $navbarMobile={navbarMobile} onClick={() => setNavbarMobile(!navbarMobile)}>
            <Bar $top="true" $navbarMobile={navbarMobile} $colorMode={colorMode} />
            <Bar $mid="true" $navbarMobile={navbarMobile} $colorMode={colorMode} />
            <Bar $bottom="true" $navbarMobile={navbarMobile} $colorMode={colorMode} />
        </Wrapper>
    )
};

export default Hamburger;