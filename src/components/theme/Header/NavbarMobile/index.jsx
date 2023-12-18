import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import NavbarLinks from '../NavbarLinks';
import { Wrapper } from './styles';

const NavbarMobile = ({ navbarMobile, setNavbarMobile }) => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <Wrapper active={navbarMobile} onClick={setNavbarMobile} colorMode={colorMode}>
            <NavbarLinks />
        </Wrapper>
    )
};

export default NavbarMobile;
