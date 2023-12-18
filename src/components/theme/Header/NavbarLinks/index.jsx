import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import ColorModeToggle from 'components/theme/Header/ColorModeToggle';
import { Wrapper } from './styles';

const NavbarLinks = ({ desktop }) => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <Wrapper $desktop={desktop} colorMode={colorMode}>
            <AnchorLink href="#about">About</AnchorLink>
            <AnchorLink href="#projects">Experience</AnchorLink>
            <AnchorLink href="#contact">Contact</AnchorLink>
            <ColorModeToggle />
        </Wrapper>
    )

};

export default NavbarLinks;
