import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = (props) => {
    let history= useHistory();
    const [credentials, setCredentials] = useState({email:"", password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/v1/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
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
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  )
}

export default Login