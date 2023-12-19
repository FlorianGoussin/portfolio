import React from 'react'
import contact from 'assets/images/contact.svg'
import { Wrapper, Details, Thumbnail } from './styles'
import { ContactForm } from './ContactForm'
import { Container } from 'components/basic';

export const Contact = () => (
    <Wrapper as={Container} id="contact">
        <Details>
            <ContactForm />
        </Details>
        <Thumbnail>
            <img
                src={contact}
                alt="My name is Florian Goussin and I am a Frontend developer! :)"
            />
        </Thumbnail>
    </Wrapper>
)
