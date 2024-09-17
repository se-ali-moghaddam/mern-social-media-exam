import React, { useContext, useState } from 'react';
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
    const { register, registerError, checkEmailExists } = useContext(AuthContext);
    const [emailStatus, setEmailStatus] = useState(null);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            register(values);
        },
        validationSchema: formSchema
    });

    const handleEmailBlur = async (e) => {
        formik.handleBlur(e);

        if (e.target.name === 'email') {
            const email = formik.values.email;

            if (email) {
                const exists = await checkEmailExists(email);
                if (exists.data) {
                    formik.setFieldError('email', 'This email address is already taken');
                    setEmailStatus(null);
                } else {
                    formik.setFieldError('email', '');
                    setEmailStatus('This email address is available');
                }
            }

            if(formik.errors.email) setEmailStatus(null);
        }
    };

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="field mt-3">
                <label className="label">First Name</label>
                <div className="control">
                    <input
                        className={`input ${formik.touched.firstName && formik.errors.firstName 
                            ? 'is-danger' : !formik.errors.firstName ? 'is-success' : ''}`}
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={formik.values.firstName}
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <p className="help is-danger">{formik.touched.firstName && formik.errors.firstName}</p>
            </div>

            <div className="field mt-3">
                <label className="label">Last Name</label>
                <div className="control">
                    <input
                        className={`input ${formik.touched.lastName && formik.errors.lastName 
                            ? 'is-danger' : !formik.errors.lastName ? 'is-success' : ''}`}
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formik.values.lastName}
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <p className="help is-danger">{formik.touched.lastName && formik.errors.lastName}</p>
            </div>

            <div className="field mt-3">
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
                        onBlur={handleEmailBlur}
                    />
                </div>
                <p className="help is-danger">{formik.touched.email && formik.errors.email}</p>
                <p className="help is-danger">{registerError}</p>
                <p className="help is-success">{emailStatus}</p>
            </div>

            <div className="field mt-3">
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
                        onBlur={formik.handleBlur}
                    />
                </div>
                <p className="help is-danger">{formik.touched.password && formik.errors.password}</p>
            </div>
            <div className='field mt-5'>
                <input type="submit" className="button is-link is-fullwidth" value="Sign Up" />
            </div>
        </form>
    )
}

export default RegisterForm