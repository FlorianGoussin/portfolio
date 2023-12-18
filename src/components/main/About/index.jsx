import React, { useContext } from 'react';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container } from 'components/basic';
// import Picture from 'assets/illustrations/Picture.svg';
import { Wrapper, AboutWrapper, Details, Thumbnail } from './styles';

export const About = () => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <Wrapper id="about">
            <Header />
            <AboutWrapper as={Container}>
                <Details colorMode={colorMode}>
                    <h4>I’m Florian Goussin and I’m a Frontend developer!</h4>
                    {/* <Button as={AnchorLink} href="#contact">
                        Hire me
                    </Button> */}
                </Details>
                <Thumbnail>
                    {/* <img src={dev} alt="Florian Goussin, Frontend developer" /> */}
                </Thumbnail>
            </AboutWrapper>
        </Wrapper>
    );
};
