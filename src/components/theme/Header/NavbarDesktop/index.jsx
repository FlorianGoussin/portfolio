import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/basic';
import NavbarLinks from '../NavbarLinks';
import { Wrapper, Brand } from './styles';

const NavbarDesktop = () => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <Wrapper as={Container}>
            <Brand as={Link} to="/" colorMode={colorMode}>
                Florian Goussin
            </Brand>
            <NavbarLinks desktop />
        </Wrapper>
    );
};

export default NavbarDesktop;
