import React, { useContext } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const formSchema = Yup.object({
    subject: Yup.string().required('This filed is required').max(66, 'Too large, input vlaue is greater than 66'),
    message: Yup.string().required('This filed is required')
});

const SendEmail = () => {
    const { state } = useLocation();
    const { sendEmail, userEmail } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            to: state,
            subject: '',
            message: ''
        },
        onSubmit: (values) => {
            const data = {
                from: userEmail,
                to: values.to,
                subject: values.subject,
                message: values.message
            }

            sendEmail(data);
        },
        validationSchema: formSchema
    });

    return (
        <div className='container'>
            <Navbar />
            <div className="columns mt-6">
                <div className="column">
                    <form onSubmit={formik.handleSubmit} className='p-6'>
                        <div className="field mt-5">
                            <div className="control">
                                <label className='label'>Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    name='to'
                                    defaultValue={state}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <div className="control">
                                <label className='label'>Subject</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder='Message subject'
                                    name='subject'
                                    value={formik.values.subject}
                                    onChange={formik.handleChange('subject')}
                                    onBlur={formik.handleChange('subject')}
                                />
                                <p className="help is-danger">{formik.touched.subject && formik.errors.subject}</p>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <div className="control">
                                <label className='label'>Message Text</label>
                                <textarea
                                    className='textarea'
                                    name="message"
                                    placeholder='Message body ...'
                                    value={formik.values.message}
                                    onChange={formik.handleChange('message')}
                                    onBlur={formik.handleChange('message')}
                                ></textarea>
                                <p className="help is-danger">{formik.touched.message && formik.errors.message}</p>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <div className="control">
                                <button type="submit" className='button is-success is-fullwidth'>Submit Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SendEmail