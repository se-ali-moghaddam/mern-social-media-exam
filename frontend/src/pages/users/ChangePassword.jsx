import React, { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

const formSchema = Yup.object({
    password: Yup.string().required('This filed is required').min(8, 'Too small, input vlaue is less than 8')
        .max(24, 'Too large, input vlaue is greater than 24'),
});

const ChangePassword = () => {
    const { updatePassword } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: (values) => {
            updatePassword(values);
        },
        validationSchema: formSchema
    });

    return (
        <div className="container">
            <Navbar />

            <div className="columns mt-6 pt-6 is-flex has-text-centered is-justify-content-center">
                <div className="column is-half">
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <div className="field">
                            <label className='label'>New Password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder='12345678 ...'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                            </div>
                            <p className="help is-danger">{formik.touched.password && formik.errors.password}</p>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-success is-fullwidth" type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword