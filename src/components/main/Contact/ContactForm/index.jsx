import React from 'react'
import axios from 'axios'
import { Formik, Form, FastField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Recaptcha from 'react-google-recaptcha'
import { url } from 'data/config'
import { Button, Input } from 'components/basic'
import { Error, Center, InputField } from './styles'

export const ContactForm = () => {
    const handleSubmit = (
        { name, email, message },
        { setSubmitting, resetForm, setFieldValue }
    ) => {
        axios({
            method: 'POST',
            url:
                process.env.NODE_ENV !== 'development'
                    ? `${url}/api/contact`
                    : 'http://localhost:3000/api/contact',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                name,
                email,
                message,
            }),
        })
            .then(() => {
                setSubmitting(false)
                setFieldValue('success', true)
                setTimeout(() => resetForm(), 6000)
            })
            .catch(() => {
                setSubmitting(false)
                setFieldValue('success', false)
                alert('Something went wrong, please try again!')
            })
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                message: '',
                recaptcha: '',
                success: false,
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Please enter your full name'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Please enter your email address'),
                message: Yup.string().required('Please write me something! ;)'),
                recaptcha:
                    process.env.NODE_ENV !== 'development'
                        ? Yup.string().required('Hello Mr Robot!')
                        : Yup.string(),
            })}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched, // visited
                setFieldValue,
                isSubmitting,
            }) => (
                <Form>
                    <InputField>
                        <Input
                            as={FastField}
                            type="text"
                            name="name"
                            component="input"
                            aria-label="name"
                            placeholder="Full name*"
                            error={touched.name && errors.name}
                        />
                        <ErrorMessage component={Error} name="name" />
                    </InputField>
                    <InputField>
                        <Input
                            id="email"
                            as={FastField}
                            aria-label="email"
                            component="input"
                            type="email"
                            name="email"
                            placeholder="Email*"
                            error={touched.email && errors.email}
                        />
                        <ErrorMessage component={Error} name="email" />
                    </InputField>
                    <InputField>
                        <Input
                            id="message"
                            as={FastField}
                            component="textarea"
                            aria-label="message"
                            rows="8"
                            type="text"
                            name="message"
                            placeholder="Message*"
                            error={touched.message && errors.message}
                        />
                        <ErrorMessage component={Error} name="message" />
                    </InputField>
                    {values.name &&
                        values.email &&
                        values.message &&
                        process.env.NODE_ENV !== 'development' && (
                            <InputField>
                                <FastField
                                    component={Recaptcha}
                                    sitekey={
                                        process.env
                                            .GATSBY_PORTFOLIO_RECAPTCHA_KEY
                                    }
                                    name="recaptcha"
                                    onChange={value =>
                                        setFieldValue('recaptcha', value)
                                    }
                                />
                                <ErrorMessage
                                    component={Error}
                                    name="recaptcha"
                                />
                            </InputField>
                        )}
                    {values.success && (
                        <InputField>
                            <Center>
                                <h4>
                                    Your message has been successfully sent, I
                                    will get back to you ASAP!
                                </h4>
                            </Center>
                        </InputField>
                    )}
                    <Center>
                        <Button $secondary="true" type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Center>
                </Form>
            )}
        </Formik>
    )
}
