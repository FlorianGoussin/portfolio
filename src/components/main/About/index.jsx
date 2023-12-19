import React, { useContext, useRef, useEffect } from 'react';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container } from 'components/basic';
// import Picture from 'assets/illustrations/Picture.svg';
import { Wrapper, AboutWrapper, Details, Thumbnail } from './styles'
import { Video } from 'components/styles.js'
import simpleParallax from 'simple-parallax-js';

const GridAnim = 'grid_anim.mp4';

export const About = () => {
    const { colorMode } = useContext(ThemeContext);

    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            new simpleParallax(videoRef.current, { scale: 1.5 });
        }
    }, []);

    return (
        <Wrapper>
            <Header />
            <Video
                ref={videoRef}
                className='video-tag'
                autoPlay
                loop
                muted
                playsInline
                poster="grid_anim.png"
                preload="auto"
            >
                <source src={GridAnim} type='video/mp4' />
            </Video>
            <AboutWrapper as={Container} id="about">
                <Details $colorMode={colorMode}>
                    <h1>Hello!</h1>
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
