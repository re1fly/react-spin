import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./spin.css";

export class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(3); //mengatur spin
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
      console.log(selectedItem)
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 100);
    }
  }
  render() {
    const { selectedItem } = this.state;
    const items = ['Iphone 12 Pro', 'Smart TV 50 Inch', 'Zonk', 'Iphone 12 Pro Max', 'Zonk', 'Iphone 13 Pro'];

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    return (
      <div>
        {/*<div className="content-wrapper d-flex align-items-center auth lock-full-bg h-100">*/}
        <div className="content-wrapper d-flex align-items-center h-100">
          <div className="row w-100 align-items-center">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-transparent text-left p-5 text-center">
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="mb-5">Hadiah Lucky Spin Wheel</h3>
                    <div className="coupon-card mb-5">
                      <img src="https://i.postimg.cc/KvTqpZq9/uber.png" className="logo"/>
                      <h3>Masukkan kode voucher yang valid untuk memainkan Spin Wheel Berhadiah</h3>
                      <di className="coupon-row">
                        <span id="cpnCode">Inputan</span>
                        <span id="cpnBtn">Masukkan Kode</span>
                      </di>
                      <p>Voucher hanya bisa digunakan sekali spin</p>
                      <div className="circle1"></div>
                      <div className="circle2"></div>
                    </div>
                    <div className="card">
                      <div className="card-body">
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
                                    style={{ "--item-nb": index }}
                                >
                                  {item}
                                </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
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
