import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export function RegisterComponent(){
    let navigate = useNavigate();
    const [userMsg, setUserMsg] = useState('');
    const [errorClass, setErrorClass] = useState('');

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            Email: '',
            Mobile:''
        },
        onSubmit: (values)=> {
            axios({
                method: "POST",
                url: "http://127.0.0.1:4000/registeruser",
                data: values
            }).catch((err)=>{
                console.log(err);
            })
            alert("Registered Successfully..");
            navigate("/login");
        }
    })
    function VerifyUser(e){
        axios({
            method: "GET",
            url: "http://127.0.0.1:4000/getusers",
        }).then((response)=>{
            for(var user of response.data){
                if(user.UserName==e.target.value) {
                    setUserMsg('User Name Taken - Try Another');
                    setErrorClass('text-danger');
                    break;
                } else {
                    setUserMsg('User Name Available');
                    setErrorClass('text-success');
                }
            }
        })
    }
    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
              <h2>Register User</h2>
              <dl>
                <dt>User Name</dt>
                <dd><input name="UserName" onKeyUp={VerifyUser} onChange={formik.handleChange} type="text" /></dd>
                <dd className={errorClass}>{userMsg}</dd>
                <dt>Password</dt>
                <dd><input name="Password" onChange={formik.handleChange} type="password"/></dd>
                <dt>Email</dt>
                <dd><input type="email" name="Email" onChange={formik.handleChange} /></dd>
                <dt>Mobile</dt>
                <dd><input type="text" name="Mobile" onChange={formik.handleChange} /></dd>
              </dl>
              <button className="btn btn-primary">Register</button>
              <p><Link to="/login">Existing User</Link></p>
            </form>
        </div>
    )
}