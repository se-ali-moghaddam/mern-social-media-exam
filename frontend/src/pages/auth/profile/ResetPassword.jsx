import React, { useContext } from 'react'
import Navbar from '../../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../../../context/AuthContext';

const formSchema = Yup.object({
    password: Yup.string().required().min(8).max(24)
});

const ResetPassword = () => {
    const { resetToken } = useParams();
    const { resetPassword } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: (valuse) => {
            const data = {
                token: resetToken,
                password: valuse.password
            }

            resetPassword(data);
        },
        validationSchema: formSchema
    });

    return (
        <div className='container'>
            <Navbar />
            <div className="columns is-flex is-justify-content-center">
                <div className="column is-half mt-6 pt-6">
                    <h1 className='has-text-white has-text-centered is-size-3'>Reset Password</h1>
                    <form onSubmit={formik.handleSubmit} className="form has-background-dark mt-6">
                        <div className="field">
                            <label className="label">Enter your new password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder='12345678'
                                    value={formik.values.password}
                                    onChange={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                />
                            </div>
                            <p className='help is-danger'>{formik.touched.password && formik.errors.password}</p>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;