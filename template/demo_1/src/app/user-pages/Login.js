import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { loginCheck } from "../services/authServices";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState();

  const handleData = (e) => {
    e.preventDefault();

    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = { ...loginData };

      const response = await loginCheck(params);

      if (response.data.status === "SUCCESS") {
        localStorage.setItem("cacheCode_UserData", JSON.stringify(response.data.shopEntity));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#F2EDF3" }}>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/CacheCode_Logo.png")} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control type="number" placeholder="Mobile No" name="mobileNo" size="md" className="h-auto" onChange={handleData} />
                </Form.Group>
                <br />
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" placeholder="Password" name="password" size="md" className="h-auto" onChange={handleData} />
                </Form.Group>
                <div className="mt-3">
                  <button className="btn btn-block btn-lg auth-form-btn" onClick={handleSubmit}>
                    SIGN IN
                  </button>
                </div>
                {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
