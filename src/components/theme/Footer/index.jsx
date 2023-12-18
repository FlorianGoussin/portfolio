import React from 'react'
import { Container } from 'components/basic'
import { Wrapper, Flex, Links, Details } from './styles'
import social from './social.json'

export const Footer = () => (
    <Wrapper>
        <Flex as={Container}>
            <Details>
                {/* <h2>Florian Goussin</h2> */}
                <span>
                    © All rights are reserved |
                    Florian Goussin - {new Date().getFullYear()}
                </span>
            </Details>
            <Links>
                {social.map(({ id, name, link, icon }) => (
                    <a
                        key={id}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`follow me on ${name}`}
                    >
                        <img width="24" src={icon} alt={name} />
                    </a>
                ))}
            </Links>
        </Flex>
    </Wrapper>
)
