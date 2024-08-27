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
        onSubmit: (vlaues) => {
            login(vlaues);
        },
        validationSchema: formSchema
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h1 className='has-text-danger is-size-5 has-text-centered mb-4'>{loginError}</h1>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className="input is-danger"
                        name="email"
                        type="email"
                        placeholder="Email input"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p className="help is-danger">{formik.touched.email && formik.errors.email}</p>
                <p className="help is-danger">{loginError}</p>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
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

            <input type="submit" className="is-12 button is-link" value="Login" />
        </form>
    )
}

export default LoginForm