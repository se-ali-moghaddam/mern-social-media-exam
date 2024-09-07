import React, { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import CategoryList from '../../components/category-list/CategoryList';
import { AiFillRead } from "react-icons/ai";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CategoryContext } from '../../context/CategoryContext';

const formSchema = Yup.object({
  title: Yup.string().required('This filed is required').max(66, 'Too large, input vlaue is greater than 66')
});

const AddCategory = () => {
  const {createCategory} = useContext(CategoryContext);

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    onSubmit: (values) => {
      createCategory(values);
    },
    validationSchema: formSchema
  });

  return (
    <div className='container'>
      <Navbar />

      <div className="category-title has-text-centered mt-6">
        <AiFillRead className='is-size-1 has-text-white' />
      </div>

      <div className="columns is-justify-content-center">
        <div className="column is-two-thirds">
          <form className='mt-6' onSubmit={formik.handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder='Category name'
                  name='title'
                  value={formik.values.title}
                  onChange={formik.handleChange('title')}
                  onBlur={formik.handleChange('title')}
                />
              </div>
              <p className="help is-danger">{formik.touched.title && formik.errors.title}</p>
            </div>

            <div className="field">
              <div className="control mt-2">
                <input type="submit" className="button is-link is-fullwidth" placeholder='Category name' value='Add category' />
              </div>
            </div>
          </form>
        </div>
      </div>

      <CategoryList />
    </div>
  )
}

export default AddCategory