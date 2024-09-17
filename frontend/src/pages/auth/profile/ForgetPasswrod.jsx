import React, { useContext } from 'react'
import Navbar from '../../../components/navbar/Navbar';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../../../context/AuthContext';

const formSchema = Yup.object({
    email: Yup.string().email().required('This field is required !')
});

const ForgetPasswrod = () => {
    const { sendResetPasswordEmail } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values) => {
            sendResetPasswordEmail(values);
        },
        validationSchema: formSchema
    });

    return (
        <div className='container'>
            <Navbar />
            <div className="columns is-flex is-justify-content-center">
                <div className="column is-half">
                    <h1 className='is-size-2 has-text-white has-text-centered mt-6 pt-6'>Forget Password</h1>
                    <form onSubmit={formik.handleSubmit} className="form mt-6">
                        <div className="field">
                            <label className="label">Enter your email</label>
                            <div className="control">
                                <input
                                    type="email"
                                    className="input"
                                    placeholder='example@domain.com'
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                />
                                <p className='help is-danger'>{formik.touched.email && formik.errors.email}</p>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-fullwidth is-success" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswrod;