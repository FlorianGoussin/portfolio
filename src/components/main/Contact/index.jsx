import React from 'react'
import contact from 'assets/images/contact.svg'
import { Wrapper, Details, Thumbnail } from './styles'
import { ContactForm } from './ContactForm'

export const Contact = () => (
    <Wrapper id="contact">
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
