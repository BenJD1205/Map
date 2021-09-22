import { Room,Cancel } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import { useState, useRef } from 'react'
import './register.css'

export const Register = ({setShowRegister}) => {

    const [success,setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passRef.current.value
        }

        try{
            await axios.post("/users/register", newUser)
            setError(false)
            setSuccess(true)
        }catch(err){
            setError(true)
        }
    }

    return (
        <div className="registerContainer">
            <div className="logo">
                <Room /> BenPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passRef} />
                <button className="registerBtn" type="submit">Register</button>
                {success && (
                    <span className="success">Successfull. You can login now !</span>
                )} 
                {error && (<span className="failure">Something went wrong !</span>)}
            </form>
            <Cancel className="registerCancel" onClick={() => setShowRegister(false)} />
        </div>
    )
}
