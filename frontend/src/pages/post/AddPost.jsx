import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './post.css';
import { CategoryContext } from '../../context/CategoryContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostContext } from '../../context/PostContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formSchema = Yup.object({
    title: Yup.string().required('This filed is required').max(66, 'Too large, input vlaue is greater than 66'),
    category: Yup.string().required('This filed is required'),
    description: Yup.string().required('This filed is required')
});

const AddPost = () => {
    const { getCategories, categories } = useContext(CategoryContext);
    const { CreatePost } = useContext(PostContext);

    const [preveiw, setPreview] = useState(undefined);
    const [file, setFile] = useState(undefined);


    useEffect(() => {
        getCategories();
    }, []);


    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            image: ''
        },
        onSubmit: (values) => {
            const data = {
                title: values.title,
                description: values.description,
                category: values.category,
                image: file
            }
            CreatePost(data);
        },
        validationSchema: formSchema
    });

    const loadImage = (e) => {
        const image = e.target.files[0];

        setPreview(URL.createObjectURL(image));
        setFile(image);
    }

    return (
        <div className="container">
            <Navbar />
            <div className="columns mt-6 pt-6">
                <div className="column">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="post-editor is-flex">
                            <div className="post-editor-right pr-5">
                                <div className="field mt-5">
                                    <div className="control">
                                        <label className='label'>Title</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder='Post Title'
                                            name='title'
                                            value={formik.values.title}
                                            onChange={formik.handleChange('title')}
                                            onBlur={formik.handleChange('title')}
                                        />
                                        <p className="help is-danger">{formik.touched.title && formik.errors.title}</p>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <div className="control">
                                        <label className='label'>Post Text</label>
                                        <ReactQuill
                                            theme='snow'
                                            name="post-text"
                                            placeholder='Post body ...'
                                            value={formik.values.description}
                                            onChange={formik.handleChange('description')}
                                            onBlur={formik.handleChange('description')}
                                        />
                                        <p className="help is-danger">{formik.touched.description && formik.errors.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="post-editor-left">
                                <div className="field mt-5">
                                    <div className="control">
                                        <label className='label'>Category</label>
                                        <select
                                            className='select is-fullwidth'
                                            name="categories"
                                            value={formik.values.category}
                                            onChange={formik.handleChange('category')}
                                            onBlur={formik.handleChange('category')}
                                        >
                                            <option value=''>-- Choose Category --</option>
                                            {
                                                categories?.map((cat) => {
                                                    return (
                                                        <option key={cat._id} value={cat.title}>{cat.title}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <p className="help is-danger">{formik.touched.category && formik.errors.category}</p>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <div className="control">
                                        <label className='label'>Post Image</label>
                                        <input type="file" className='input' onChange={loadImage} />
                                        {
                                            preveiw ? (
                                                <figure className='image-preview mt-3'>
                                                    <img src={preveiw} alt="Image Preview" width='270' />
                                                </figure>
                                            ) : ""
                                        }
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <div className="control">
                                        <button type="submit" className='button is-success is-fullwidth'>Submit Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost