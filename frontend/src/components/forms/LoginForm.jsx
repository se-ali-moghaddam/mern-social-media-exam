import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const formSchema = Yup.object({
    email: Yup.string().email().required('This filed is required').max(66, 'Too large, input vlaue is greater than 66'),
    password: Yup.string().required('This filed is required').min(8, 'Too small, input vlaue is less than 8')
        .max(24, 'Too large, input vlaue is greater than 24'),
});

const LoginForm = () => {
    const { login, loginError } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            login(values);
        },
        validationSchema: formSchema
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input
                        className={`input ${formik.touched.email && formik.errors.email 
                            ? 'is-danger' : !formik.errors.email ? 'is-success' : ''}`}
                        name="email"
                        type="email"
                        placeholder="Email input"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                    />
                </div>
                <p className="help is-danger">{formik.touched.email && formik.errors.email}</p>
                <p className="help is-danger">{loginError}</p>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input
                        className={`input ${formik.touched.password && formik.errors.password 
                            ? 'is-danger' : !formik.errors.password ? 'is-success' : ''}`}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                    />
                </div>
                <p className="help is-danger">{formik.touched.password && formik.errors.password}</p>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <Link to="/forget-password">Do you forgot your password ?</Link>
                    </label>
                </div>
            </div>

            <div className='field mt-6 pt-6'>
                <input type="submit" className="button is-info is-fullwidth" value="Login" />
            </div>
        </form>
    )
}

export default LoginForm