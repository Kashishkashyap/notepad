import React, {useState} from 'react'

import {useHistory} from 'react-router-dom'

const Register = (props) => {

    let history= useHistory();
    const [credentials, setCredentials] = useState({name:"",email:"", password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/v1/api/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
          });
          const json= await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authToken)
            history.push('/');
            props.showAlert("Account created Successfully", "success")
          }else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }
    return (
        <div><form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" onChange={onChange} name="name" minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp"  required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={6} required/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form></div>
    )
}

export default Register