import React, { forwardRef, useState } from 'react'
import {
    Input,
    FormItem,
    FormContainer,
    Notification,
    toast,
    Button
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { RichTextEditor } from 'components/shared'
import { useDispatch } from 'react-redux'
import { toggleNewMessageDialog } from '../store/BLSlice'
import * as Yup from 'yup'


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email Required'),
})

const BlacklistEditor = forwardRef((props, ref) => {
    const { mode, bl } = props

    const { formikRef, editorRef } = ref

    const dispatch = useDispatch()


    
    const onSend = (values) => {

        const blcontent = JSON.stringify({
            emailAddress: Object.values(values)[1],
            message: Date.now()
        })
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.gmass.co/api/unsubscribes?apikey=a554b00c-5cfe-4be8-9840-f08613ab9daf");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
        xhr.send(blcontent);

        toast.push(<Notification type="success" title="Email Blacklisted" />, {
            placement: 'top-center',
        })

    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                title: mode === 'reply' ? `Re: ${bl?.title}` : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSend(values)
            }}
        >
            {({ touched, errors }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            className={mode === 'reply' ? '!hidden' : ''}
                            label="Email"
                            labelClass="!justify-start"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                autoComplete="off"
                                name="email"
                                component={Input}
                            />

                            <div className="text-right mt-4">
                                <Button variant="solid" onClick={onSend}>
                                    Proceed
                                </Button>
                            </div>
                        </FormItem>
                        
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

BlacklistEditor.defaultProps = {
    bl: {},
    mode: 'new',
}

export default BlacklistEditor
