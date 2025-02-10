import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './signIn.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import zewdlogo from '../../resource/images/logo2.jpg';
import api from "../../resource/api"

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [role, setRole] = useState('')
    const [currentPage, setCurrentPage] = useState('forgotPassword');
    const inputRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (emailError) {
            const timer = setTimeout(() => {
                setEmailError('');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [emailError]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError('Please fill in your email');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        else {
            api.post("auth/forgotPassword", {role, email}).then((res) => {
                if(res.data.success === false) {
                    alert(res.data.msg)
                }
                else{
                    handleEmailSent()
                }
            })
            
        }
    };
    const handleEmailSent = () => {
        navigate("/EmailSent")
    }
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleInputClick = () => {
        setEmailError('');
        inputRef.current.focus();
    };

    return (
        <div className="full_content">
            <section>
                <div className="imgBx">
                    <img src={zewdlogo} alt="" />
                </div>
                <div className="contentBx">
                    <div className="formBx">
                        <h2>Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBx">
                                <span>Email</span>
                                <input
                                    ref={inputRef}
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onClick={handleInputClick}
                                />
                                {emailError && (
                                    <div className="alert">
                                        <span>
                                            {/* <FontAwesomeIcon icon={faExclamation} className="alert-icon" /> */}
                                        </span>
                                        <div className="errorMsg">{emailError}</div>
                                    </div>
                                )}
                            </div>
                            <div className="inputBx">
                                <label htmlFor="email">Role</label>
                                <select name="" id="" onChange={(e) => {setRole(e.target.value)}}>
                                    <option value="">Admin</option>
                                    <option value="">Instructor</option>
                                    <option value="">Manager</option>
                                    <option value="">Accountant</option>
                                </select>
                            </div>
                            <div className="inputBx">
                                <input type="submit" value="Send Email" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotPasswordForm;
