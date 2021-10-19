import React, { useState, useEffect } from "react";
import {sendNewPass} from "../../services/firebase";
//Components
import { Row, Col } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ChangePassword() {
  
function extraerParametros(url) {
    return(url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a,p) => ((a[p.slice(0, p.indexOf('='))] = p.slice(p.indexOf('=') + 1)), a), {});
}
 

const [state, setState] = useState({
  password: "",
  confirmPassword: "",
  urlCode: ""
});
const handleChange = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  });
  console.log(state.confirmPassword)
};

useEffect(()=>{
  try {
    const url = extraerParametros(window.location.href);
    console.log(url.oobCode);
    setState({...state, urlCode: url.oobCode});
  }catch(e){
    console.log(e)
  }
},[])

  async function handleSubmit (e, urlCode, pass){
    e.preventDefault();
    const password = state.password;
    const confirmPassword = state.confirmPassword;
    if (password === confirmPassword) {
      console.log("Password Changed Succesfuly");
      setState({...state, confirmPassword: confirmPassword})
   await sendNewPass(state.urlCode, state.confirmPassword)
    } else {
      console.log("Something went wrong when you changed your password");
    }
    console.log(state)
  };



  return (
    <main className="login-main gradient-background">
      <Row>
        <Col xs={12} md={6} className="login-register">
          <h1 className="h3 mb-3 mt-2 fw-normal">
            Please change your password{" "}
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              name="password"
              id="password"
              label="New Password"
              value={state.password}
              placeholder="New Password"
              handleChange={handleChange}
            />

            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              value={state.confirmPassword}
              placeholder="Confirm password"
              handleChange={handleChange}
            />
            <div className="login-register-button-centered">
              <Button title="Change Password" onSubmit={handleSubmit} />
            </div>
          </form>
        </Col>
      </Row>
    </main>
  );
}
