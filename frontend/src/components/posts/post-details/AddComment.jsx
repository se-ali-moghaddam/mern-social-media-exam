import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../../context/CommentContext';

const formSchema = Yup.object({
    description: Yup.string().required('This filed is required')
});

const AddComment = () => {
    const { submitComment } = useContext(CommentContext);
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            description: ''
        },
        onSubmit: (values) => {
            const data = {
                post: id,
                description: values.description
            }

            submitComment(data);
        },
        validationSchema: formSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className='label'>Comment</label>
                <div className="control">
                    <textarea
                        className='textarea'
                        name="description"
                        placeholder='Write your comment !'
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                        onBlur={formik.handleBlur('description')}></textarea>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-success" type='submit'>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default AddComment