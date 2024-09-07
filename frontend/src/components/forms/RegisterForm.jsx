import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

const formSchema = Yup.object({
    firstName: Yup.string().required('This filed is required').max(25, 'Too large, input vlaue is greater than 25'),
    lastName: Yup.string().required('This filed is required').max(25, 'Too large, input vlaue is greater than 25'),
    email: Yup.string().email().required('This filed is required').max(110, 'Too large, input vlaue is greater than 110'),
    password: Yup.string().required('This filed is required').min(8, 'Too small, input vlaue is less than 8')
        .max(24, 'Too large, input vlaue is greater than 24'),
});

const RegisterForm = () => {
    const {register, registerError} = useContext(AuthContext);
    
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: (vlaues) => {
            register(vlaues);
        },
        validationSchema: formSchema
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                    <input
                        className="input"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={formik.values.firstName}
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                    />
                </div>
                <p className="help is-danger">{formik.touched.firstName && formik.errors.firstName}</p>
            </div>

            <div className="field">
                <label className="label">Last Name</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className="input is-success"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formik.values.lastName}
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
                <p className="help is-danger">{formik.touched.lastName && formik.errors.lastName}</p>
            </div>

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
                <p className="help is-danger">{registerError}</p>
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
                        <input type="checkbox" />
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>

            <input type="submit" className="is-12 button is-link" value="Sign-Up" />
        </form>
    )
}

export default RegisterForm