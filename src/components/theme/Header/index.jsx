import React, { useState } from 'react';
import NavbarDesktop from './NavbarDesktop';
import Hamburger from './Hamburger';
import NavbarMobile from './NavbarMobile';
import { Wrapper, Overlay } from './styles';

export const Header = () => {
	const [navbarMobile, setNavbarMobile] = useState(false);

	return (
		<Wrapper>
			<Overlay $navbarMobile={navbarMobile} onClick={() => setNavbarMobile(!navbarMobile)} />
			<NavbarDesktop />
			<Hamburger navbarMobile={navbarMobile} setNavbarMobile={setNavbarMobile} />
			<NavbarMobile navbarMobile={navbarMobile} setNavbarMobile={setNavbarMobile} />
		</Wrapper>
	);
};
