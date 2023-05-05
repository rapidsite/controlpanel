import { React, useState } from 'react'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { Formik, Field, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { updateColumns } from './store/dataSlice'
import { closeDialog, setSelectedBoard } from './store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import requiredFieldValidation from 'utils/requiredFieldValidation'
import { createCardObject, createUID } from './utils'
import { useTaskCards } from 'mock/data/customhook/useTaskCards'
import { createClient } from '@supabase/supabase-js'
import { DatePicker, Upload, Radio } from 'components/ui'
import { FcImageFile } from 'react-icons/fc'

const supabase = createClient('https://havlxegijmnxtdwjvxdv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdmx4ZWdpam1ueHRkd2p2eGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODU3NzUsImV4cCI6MTk5ODY2MTc3NX0.YWbnSVFmSt9KSnGRxYommvTb2JZWat0hR3HvXzU-oLc')

const AddNewColumnContent = () => {

    
    const dispatch = useDispatch()

    const columns = useSelector((state) => state.scrumBoard.data.columns)
    const board = useSelector((state) => state.scrumBoard.state.board)
    const taskCards = useTaskCards()

    const onFormSubmit = async (title, desc, date, attachment) => {

        const temp = new Object();
        temp.name = title
        temp.listId = 'Other'
        temp.id = createUID(10)
        temp.comments = []
        temp.description = desc
        temp.attachments = []
        temp.members = [{"id":"1","name":"Rapidsite","email":"admin@rapidsite.us","img":"https://havlxegijmnxtdwjvxdv.supabase.co/storage/v1/object/public/PFP/favicon.png?t=2023-05-04T06%3A48%3A59.570Z"}]
        temp.dueDate = ''
        temp.labels = []

        console.log(date)
        
        taskCards.push(temp)
        console.log(taskCards)

        const { error } = await supabase.from('admin_core').update({tasks: taskCards}).eq('id', 1)
    }

    return (
        <div>
            <h5>Add New Card</h5>
            <div className="mt-8">
                <Formik
                    initialValues={{ title: '', desc: '', attachments: [], date: '' }}
                    onSubmit={({ title, desc, date, attachment }) => onFormSubmit(title, desc, date, attachment)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormContainer layout="inline">
                                <FormItem
                                    label=""
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Title..."
                                        component={Input}
                                        validate={(value) =>
                                            requiredFieldValidation(
                                                value,
                                                'A title is required!'
                                            )
                                        }
                                    />
                                    <Field
                                        type="text"
                                        name="desc"
                                        placeholder="Description..."
                                        component={Input}
                                        validate={(value) =>
                                            requiredFieldValidation(
                                                value,
                                                'A description is required!'
                                            )
                                        }
                                    />
                                    
                                    <DatePicker placeholder="Due Date" name='date'/>
                                    <Upload draggable>
                                    <div className="my-16 text-center">
                                    <div className="text-4xl mb-1 flex justify-center">
                                        <FcImageFile />
                                    </div>
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your file here or browse
                                        </span>
                                       
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        limit: 50 mb
                                    </p>
                                    </div> </Upload> 
                                    <Button variant="solid" type="submit">
                                        Create
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
