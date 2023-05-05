import React from 'react'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { Formik, Field, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import requiredFieldValidation from 'utils/requiredFieldValidation'
import { closeDialog } from './store/stateSlice'
import { updateColumns, updateOrdered } from './store/dataSlice'
import cloneDeep from 'lodash/cloneDeep'
import { useHeaders } from 'mock/data/customhook/useHeaders'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://havlxegijmnxtdwjvxdv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdmx4ZWdpam1ueHRkd2p2eGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODU3NzUsImV4cCI6MTk5ODY2MTc3NX0.YWbnSVFmSt9KSnGRxYommvTb2JZWat0hR3HvXzU-oLc')

const AddNewColumnContent = () => {
    const dispatch = useDispatch()

    const headers = useHeaders();
    const columns = headers.map((board) => ({
        title: board.title,
        listId: board.listId
      }));


    const onFormSubmit = async (title) => {
        const data = cloneDeep(columns)
        data[title ? title : 'Untitled Board'] = []
        const newOrdered = [...columns, ...[title ? title : 'Untitled Board']]
        let newColumns = {}
        newOrdered.forEach((elm) => {
            newColumns[elm] = data[elm]
        })

        const temp = new Object();
        temp.title = title
        temp.listId = title
        
        columns.push(temp)
        console.log(columns)

        const { error } = await supabase.from('admin_core').update({headers: columns}).eq('id', 1)

        dispatch(updateColumns(newColumns))
        dispatch(updateOrdered(newOrdered))
        dispatch(closeDialog())
    }

    return (
        <div>
            <h5>Add New Group</h5>
            <div className="mt-8">
                <Formik
                    initialValues={{ title: '' }}
                    onSubmit={({ title }) => onFormSubmit(title)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormContainer layout="inline">
                                <FormItem
                                    label="Name"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Enter a group name..."
                                        component={Input}
                                        validate={(value) =>
                                            requiredFieldValidation(
                                                value,
                                                'Group name is required!'
                                            )
                                        }
                                    />
                                </FormItem>
                                <FormItem>
                                    <Button variant="solid" type="submit">
                                        Add
                                    </Button>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddNewColumnContent
