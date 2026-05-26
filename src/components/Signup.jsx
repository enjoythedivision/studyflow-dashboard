import { useNavigate, Link } from "react-router-dom";

import { useState } from "react"

function Signup() {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '', // required
        username: '' // optional
    })

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <div className="auth">
            <h1>Welcome to StudyFlow!</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} ></input>
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                <button className='login-btn' type='submit'>Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Sign in here.</Link></p>
        </div>
    )
}

export default Signup
