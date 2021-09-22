import { Room,Cancel } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import { useState, useRef } from 'react'
import './register.css'

export const Login = ({setShowLogin, myStorage, setCurrentUser}) => {

    const [error, setError] = useState(false)
    const nameRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const user = {
            username:nameRef.current.value,
            password:passRef.current.value
        }

        try{
            const res = await axios.post("/users/login", user)
            myStorage.setItem("user", res.data.username)
            setCurrentUser(res.data.username)
            setError(false)
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
                <input type="password" placeholder="password" ref={passRef} />
                <button className="registerBtn" type="submit">Login</button> 
                {error && (<span className="failure">Something went wrong !</span>)}
            </form>
            <Cancel className="registerCancel" onClick={() => setShowLogin(false)} />
        </div>
    )
}
