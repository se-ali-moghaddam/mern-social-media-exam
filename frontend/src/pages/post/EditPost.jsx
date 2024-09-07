import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import { CategoryContext } from '../../context/CategoryContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';

const formSchema = Yup.object({
    title: Yup.string().required('This filed is required').max(66, 'Too large, input vlaue is greater than 66'),
    category: Yup.string().required('This filed is required'),
    description: Yup.string().required('This filed is required')
});

const EditPost = () => {
    const { state } = useLocation();
    const { categories, getCategories } = useContext(CategoryContext);
    const { updatePost } = useContext(PostContext);
    const {userId} = useContext(AuthContext);

    useEffect(() => {
        getCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: state.title,
            category: state.description,
            description: state.category,
            id: state._id,
            user: userId
        },
        onSubmit: (values) => {            
            updatePost(values);
        },
        validationSchema: formSchema
    });

    return (
        <div className="container">
            <Navbar />
            <h1 className="has-text-white has-text-centered is-size-2 mt-6 pt-6">Edit Post</h1>

            <div className="columns is-justify-content-center">
                <div className="column is-half">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="filed mt-5">
                            <label className='label'>Title</label>
                            <div className="control">
                                <input
                                    className='input'
                                    type="text"
                                    placeholder='post title'
                                    defaultValue={state.title}
                                    onChange={formik.handleChange('title')}
                                    onBlur={formik.handleChange('title')}
                                />
                            </div>
                            <p className="help is-danger">{formik.touched.title && formik.errors.title}</p>
                        </div>
                        <div className="filed mt-5">
                            <label className='label'>Category</label>
                            <div className="control">
                                <select
                                    className='select is-fullwidth'
                                    defaultValue={state.category}
                                    onChange={formik.handleChange('category')}
                                    onBlur={formik.handleChange('category')}
                                >
                                    {
                                        categories?.map(cat => {
                                            return (
                                                <option key={cat._id} value={cat.title}>{cat.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <p className="help is-danger">{formik.touched.category && formik.errors.category}</p>
                        </div>
                        <div className="filed mt-5">
                            <label className='label'>Description</label>
                            <div className="control">
                                <textarea
                                    className='textarea'
                                    placeholder='Post body'
                                    defaultValue={state.description}
                                    onChange={formik.handleChange('description')}
                                    onBlur={formik.handleChange('description')}
                                ></textarea>
                            </div>
                            <p className="help is-danger">{formik.touched.description && formik.errors.description}</p>
                        </div>
                        <div className="filed mt-5">
                            <div className="control">
                                <button className="button is-info is-link" type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost