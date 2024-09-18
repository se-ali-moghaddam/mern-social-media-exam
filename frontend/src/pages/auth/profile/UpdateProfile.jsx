import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Navbar from '../../../components/navbar/Navbar';

const formSchema = Yup.object({
    firstName: Yup.string().required('This filed is required').max(25, 'Too large, input vlaue is greater than 25'),
    lastName: Yup.string().required('This filed is required').max(25, 'Too large, input vlaue is greater than 25'),
    email: Yup.string().email().required('This filed is required').max(110, 'Too large, input vlaue is greater than 110'),
    bio: Yup.string().required('This filed is required'),
});

const UpdateProfile = () => {
    const { state } = useLocation();
    const { updateUser, checkEmailExists } = useContext(AuthContext);
    const [emailStatus, setEmailStatus] = useState(null);

    const formik = useFormik({
        initialValues: {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            bio: ''
        },
        onSubmit: (values) => {
            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                bio: values.bio
            }

            updateUser(data);
        },
        validationSchema: formSchema
    });

    const handleEmailBlur = async (e) => {
        formik.handleBlur(e);

        if (e.target.name === 'email') {
            const email = formik.values.email;

            if (email) {
                const exists = await checkEmailExists(email);
                if (exists.data && email !== state.email) {
                    formik.setFieldError('email', 'This email address is already taken');
                    setEmailStatus(null);
                } else {
                    formik.setFieldError('email', '');
                    setEmailStatus('This email address is available');
                }
            }

            if (formik.errors.email) setEmailStatus(null);
        }
    };

    return (
        <div className='container'>
            <Navbar />
            <div className="columns">
                <div className="column p-6">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input
                                    className={`input ${formik.touched.firstName && formik.errors.firstName 
                                        ? 'is-danger' : !formik.errors.firstName ? 'is-success' : ''}`}
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    defaultValue={state.firstName}
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                />
                            </div>
                            <p className="help is-danger">{formik.touched.firstName && formik.errors.firstName}</p>
                        </div>

                        <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control">
                                <input
                                    className={`input ${formik.touched.lastName && formik.errors.lastName 
                                        ? 'is-danger' : !formik.errors.lastName ? 'is-success' : ''}`}
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    defaultValue={state.lastName}
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                />
                            </div>
                            <p className="help is-danger">{formik.touched.lastName && formik.errors.lastName}</p>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className={`input ${formik.touched.email && formik.errors.email 
                                        ? 'is-danger' : !formik.errors.email ? 'is-success' : ''}`}
                                    name="email"
                                    type="email"
                                    placeholder="Email input"
                                    defaultValue={state.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={handleEmailBlur}
                                />
                            </div>
                            <p className="help is-danger">{formik.touched.email && formik.errors.email}</p>
                        </div>

                        <div className="field">
                            <label className="label">Bio</label>
                            <div className="control has-icons-left has-icons-right">
                                <textarea
                                    className="textarea"
                                    name="bio"
                                    placeholder="Discuss about yourself"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange("bio")}
                                    onBlur={formik.handleBlur("bio")}
                                ></textarea>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </div>
                            <p className="help is-danger">{formik.touched.password && formik.errors.password}</p>
                        </div>

                        <input type="submit" className="is-12 button is-link" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile