import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
import {BASE_URL} from "../../api/api";

export default function Login() {
    const login = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)

        axios.post(BASE_URL, {
            email: formDataObj.email,
            password: formDataObj.password
        }, {
            headers: {
                "Accept" : "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => {
            console.log(res)
        })
    }
    return (
        <div>
            <div className="d-flex align-items-center auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div className="brand-logo">
                                <img src={require("../../assets/images/logo.svg")} alt="logo"/>
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 className="font-weight-light">Sign in to continue.</h6>
                            <Form className="pt-3" onSubmit={login}>
                                <Form.Group className="d-flex search-field">
                                    <Form.Control type="email" name="email" placeholder="Email" size="lg" className="h-auto"/>
                                </Form.Group>
                                <Form.Group className="d-flex search-field">
                                    <Form.Control type="password" name="password" placeholder="Password" size="lg" className="h-auto"/>
                                </Form.Group>
                                <div className="mt-3">
                                    <Button type="submit"
                                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                            to="/dashboard">SIGN IN</Button>
                                </div>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                    <div className="form-check">
                                        <label className="form-check-label text-muted">
                                            <input type="checkbox" className="form-check-input"/>
                                            <i className="input-helper"></i>
                                            Keep me signed in
                                        </label>
                                    </div>
                                    <a href="!#" onClick={event => event.preventDefault()}
                                       className="auth-link text-black">Forgot password?</a>
                                </div>
                                {/*<div className="mb-2">*/}
                                {/*  <button type="button" className="btn btn-block btn-facebook auth-form-btn">*/}
                                {/*    <i className="mdi mdi-facebook mr-2"></i>Connect using facebook*/}
                                {/*  </button>*/}
                                {/*</div>*/}
                                {/*<div className="text-center mt-4 font-weight-light">*/}
                                {/*  Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>*/}
                                {/*</div>*/}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
