import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../../context/CommentContext';

const formSchema = Yup.object({
    description: Yup.string().required('This filed is required')
});

const EditComment = ({ commentId, toggleEdit }) => {
    const { updateComment } = useContext(CommentContext);
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            description: ''
        },
        onSubmit: async (values) => {
            const data = {
                commentId,
                post: id,
                description: values.description
            }

            await updateComment(data);
            toggleEdit(commentId);
        },
        validationSchema: formSchema
    });

    return (
        <form className='mt-5' onSubmit={formik.handleSubmit}>
            <div className="field">
                <div className="control">
                    <textarea
                        className='textarea'
                        name="textarea"
                        placeholder='New Comment !'
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                        onBlur={formik.handleBlur('description')}
                    ></textarea>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className='button is-info' type='submit'>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default EditComment