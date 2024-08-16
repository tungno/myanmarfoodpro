import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LoginSignup.css';

import { API_BASE_URL } from "../../App";

const LoginSignup = () => {
    const { t } = useTranslation();
    const [state, setState] = useState(t("login"));
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("Login Function executed", formData);
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                const errorMessage = responseData.error || t("login_error");
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert(t("login_network_error"));
        }
    };

    const signup = async () => {
        console.log("Signup Function Executed", formData);
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                const errorMessage = responseData.error || t("signup_error");
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert(t("signup_network_error"));
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state === "Login" ? t("login") : t("sign_up")}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && <input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder={t("your_name")} />}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder={t("email_address")} />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder={t("password")} />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>{t("continue")}</button>
                {state === "Sign Up" ?
                    <p className="loginsignup-login">{t("already_have_account")} <span onClick={() => { setState("Login") }}>{t("login_here")}</span></p> :
                    <p className="loginsignup-login">{t("create_account")} <span onClick={() => { setState("Sign Up") }}>{t("click_here")}</span></p>
                }

                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>{t("terms_and_conditions")}</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
