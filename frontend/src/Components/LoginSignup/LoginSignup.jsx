import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
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
            const response = await fetch("http://localhost:8080/login", {
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
                const errorMessage = responseData.error || "An error occurred during login. Please try again.";
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred while logging in. Please try again.");
        }
    };

    const signup = async () => {
        console.log("Signup Function Executed", formData);
        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Parse the response data
            const responseData = await response.json();

            if (response.ok) {
                // If the response is OK, store the token and redirect
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                // If response is not OK, show the specific error message returned by the backend
                const errorMessage = responseData.error || "An error occurred during signup.";
                alert(errorMessage);
            }
        } catch (error) {
            // Handle any network or unexpected errors
            console.error("Error during signup:", error);
            alert("An error occurred while signing up. Please try again.");
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && <input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' />}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ?
                    <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
                    <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
                }

                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
