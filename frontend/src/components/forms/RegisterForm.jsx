import React from 'react';

const RegisterForm = () => {
    return (
        <div className="form">
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" />
                </div>
            </div>

            <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" placeholder="Text input" value="bulma" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
                <p className="help is-success">This username is available</p>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Email input" value="hello@" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p className="help is-danger">This email is invalid</p>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-warning" type="password" placeholder="Password" value="bulma" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
                <p className="help is-warning">mid-strong</p>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" />
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>

            <button className="is-12 button is-link">Submit</button>
        </div>
    )
}

export default RegisterForm