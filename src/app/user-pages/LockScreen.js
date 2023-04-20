import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./spin.css";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {BASE_URL, TOKEN} from "../../api/api";
import Swal from "sweetalert2";

export class LockScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            redeemed: false,
            voucherCode: "",
            dataVoucher: {
                message: "",
                array_hadiah: "",
            },
            listHadiah: [],
            finalPrize: ''
        };
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem() {
        if (this.state.selectedItem === null) {
            const selectedItem = Math.floor(this.state.dataVoucher.array_hadiah); //mengatur spin
            if (this.props.onSelectItem) {
                this.props.onSelectItem(selectedItem);
            }
            this.setState({selectedItem});
            setTimeout(() => {
                if (this.state.dataVoucher.isWin == false) {
                    Swal.fire({
                        title: 'Hadiah Spin Wheel',
                        text: this.state.dataVoucher.message,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                } else{
                    Swal.fire({
                        title: 'Hadiah Spin Wheel',
                        html: this.state.dataVoucher.message +
                            '<p class="mb-3 mt-3">Silahkan screenshoot bukti hadiah spin wheel ini, lalu anda dapat klaim melalui link dibawah ini</p> ' +
                            '<a class="btn btn-block btn-primary btn-lg font-weight-medium m-auto" href="https://linktr.ee/god138">KLIK DISINI</a>',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                        showConfirmButton: false
                    })
                }

                this.setState({
                    redeemed: false
                })
            }, 6000)
        } else {
            this.setState({selectedItem: null});
            setTimeout(this.selectItem, 100);
        }
    }


    render() {
        const {selectedItem, redeemed, listHadiah} = this.state;
        const items = listHadiah;

        const wheelVars = {
            "--nb-item": items.length,
            "--selected-item": selectedItem
        };
        const spinning = selectedItem !== null ? "spinning" : "";

        const _inputVoucher = () => {
            axios.post(BASE_URL + 'spin', {
                vocer: this.state.voucherCode
            }, {
                headers: {
                    "Accept": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${TOKEN}`
                },
                xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
                withCredentials: true
            }).then(res => {
                console.log(res)
                if (res.status == 200) {
                    if (res.data.message == 'vocer telah digunakan' || res.data.message == 'vocer invalid' || res.data.message == 'vocer telah digunakan dan telah claim hadiah') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.data.message == 'vocer telah digunakan' || res.data.message == 'vocer telah digunakan dan telah claim hadiah' ? 'Voucher telah digunakan' : 'Voucher Invalid'
                        })
                    } else {
                        axios.get(BASE_URL + 'get_hadiah').then(response => {
                            console.log('hadiah', response)
                            this.setState({
                                listHadiah: response.data.data
                            })
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Sukses redeem, semoga beruntung !',
                        })
                        this.setState({
                            dataVoucher: res.data,
                            redeemed: true
                        })
                    }
                }
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
        }

        return (
            <div>
                {/*<div className="content-wrapper d-flex align-items-center auth lock-full-bg h-100">*/}
                {/*<div className="content-wrapper d-flex align-items-center h-100" style={{background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),\n' +*/}
                {/*        '                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)'}}>*/}
                <div className="content-wrapper d-flex align-items-center h-100 bg-god">
                    <div className="row w-100 align-items-center">
                        <div className="col-md-8 mx-auto">
                            <div className="auth-form-transparent text-left p-5 text-center">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3 className="mb-5 text-light" class="responsive-text">Hadiah Lucky Spin
                                            Wheel</h3>
                                        {
                                            redeemed ?
                                                <div className="wheel-container">
                                                    <div
                                                        className={`wheel ${spinning}`}
                                                        style={wheelVars}
                                                        onClick={this.selectItem}
                                                    >
                                                        {items.map((item, index) => (
                                                            <div
                                                                className="wheel-item"
                                                                key={index}
                                                                style={{"--item-nb": index}}
                                                            >
                                                                {item}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div class="center-circle" onClick={this.selectItem}>
                                                    </div>
                                                </div> :
                                                <div className="coupon-card mb-5">
                                                    <img src={require("../../assets/images/samples/GOD138_logo.png")}
                                                         className="logo" style={{width: '10rem'}}/>
                                                    <h3 style={{fontSize: '0.75 rem'}}>Masukkan kode voucher yang valid
                                                        untuk memainkan Spin Wheel
                                                        Berhadiah</h3>
                                                    <div className="coupon-row">
                                                        <span id="cpnCode">
                                                                <input type="text" className="form-control"
                                                                       id="voucherInput"
                                                                       placeholder="Input Disini"
                                                                       onChange={(e) => this.setState({
                                                                           voucherCode: e.target.value
                                                                       })}/>
                                                        </span>
                                                        <span id="cpnBtn" onClick={_inputVoucher}>Submit Voucher</span>
                                                    </div>
                                                    <p>*Voucher hanya bisa digunakan sekali spin.</p>
                                                    <div className="circle1"></div>
                                                    <div className="circle2"></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                {/*<img src={require("../../assets/images/faces/face13.jpg")} className="lock-profile-img" alt="img" />*/}
                                {/*<form className="pt-5">*/}
                                {/*  <div className="form-group">*/}
                                {/*    <label>Password to unlock</label>*/}
                                {/*    <input type="password" className="form-control text-center" id="examplePassword1" placeholder="Password" />*/}
                                {/*  </div>*/}
                                {/*  <div className="mt-5">*/}
                                {/*    <Link className="btn btn-block btn-success btn-lg font-weight-medium" to="/dashboard">Unlock</Link>*/}
                                {/*  </div>*/}
                                {/*  <div className="mt-3 text-center">*/}
                                {/*    <Link to="/login" className="auth-link text-white">Sign in using a different account</Link>*/}
                                {/*  </div>*/}
                                {/*</form>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LockScreen
