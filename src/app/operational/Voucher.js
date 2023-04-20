import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {BASE_URL, TOKEN} from "../../api/api";
import Swal from "sweetalert2";
import {Select, Space, Table, Tag} from 'antd';

export default function VoucherOps() {
    const [show, setShow] = useState(false);
    const [voucher, setVoucher] = useState([])
    const [typeVoucher, setTypeVoucher] = useState("")
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPageUnsubmit, setParamsPageUnsubmit] = useState("1");
    const [paramsPageSubmit, setParamsPageSubmit] = useState("1");
    const [playerInput, setPlayerInput] = useState('');
    const [dataVoucher, setDataVoucher] = useState(false)

    const handleClose = () => setShow(false);

    const _getVoucherSubmit = () => {
        axios.get(BASE_URL + 'vocer?page=' + paramsPageSubmit + '&show_playername=' + true,{
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
            setVoucher(res.data.data.data)
            setBtnPagination(res.data.data.links);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            })
        })
    }

    const _getVoucherUnsubmit = () => {
        axios.get(BASE_URL + 'vocer?page=' + paramsPageUnsubmit + '&show_playername=' + false,{
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
            setVoucher(res.data.data.data)
            setBtnPagination(res.data.data.links);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            })
        })
    }

    const _submitPlayer = (record) => {
        axios.put(BASE_URL + 'vocer/' + record.id, {
            player_name: playerInput
            },
            {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${TOKEN}`,
            },
            xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true
        }).then(res => {
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            })
            _getVoucherSubmit()
            setDataVoucher(true)

        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            })
        })
    }

    const columns = [
            {
                title: 'Voucher Code',
                dataIndex: 'voucherCode',
                key: 'id',
            },
        {
            title: 'Player Name',
            dataIndex: 'playerName',
            key: 'id',
            render: (text, record) => (
                <>
                    {
                        record.playerName != null ?
                            <p>{record.playerName}</p> :
                            <input onChange={(e) => setPlayerInput(e.target.value)}/>
                    }
                </>
            ),
        },

            {
                title: 'Action',
                key: 'id',
                render: (text, record) => (
                    <>
                        <Button type="button"
                                className="btn btn-primary font-weight-medium"
                                onClick={() => _submitPlayer(record)}
                                disabled={!dataVoucher ? false : true}
                        >Submit Voucher</Button>
                    </>
                ),
            },
        ]
    ;
    const data = voucher.map((data) => {
        return {
            id: data.id,
            voucherCode: data.code,
            playerName: data.player_name

        }
    })

    const handleShow = () => setShow(true);

    useEffect(() => {
        _getVoucherSubmit()
    }, [paramsPageSubmit]);

    useEffect(() => {
        _getVoucherUnsubmit()
    }, [paramsPageUnsubmit]);

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                    Voucher
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Admin</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Voucher</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Setting Voucher</h2>
                            <Select
                                className='mb-3 mt-3'
                                defaultValue="Filter Voucher"
                                style={{
                                    width: 220,
                                }}
                                options={[
                                    {
                                        value: false,
                                        label: 'Voucher Unsubmit',
                                    },
                                    {
                                        value: true,
                                        label: 'Voucher Submit',
                                    },
                                ]}
                                onChange={(value) => {
                                    setDataVoucher(value)
                                    if(dataVoucher == true){
                                        _getVoucherUnsubmit()
                                    }else {
                                        _getVoucherSubmit()
                                    }
                                }}
                            />
                            {/*<div className="table-responsive">*/}
                            {/*    <table className="table table-hover">*/}
                            {/*        <thead>*/}
                            {/*        <tr>*/}
                            {/*            <th>ID Voucher</th>*/}
                            {/*            <th>Voucher Name</th>*/}
                            {/*            <th>Features</th>*/}
                            {/*        </tr>*/}
                            {/*        </thead>*/}
                            {/*        <tbody>*/}
                            {/*        {prize.map((data) => {*/}
                            {/*            const id = data.id*/}
                            {/*            return(*/}
                            {/*            <tr>*/}
                            {/*                <td>{data.id}</td>*/}
                            {/*                <td className='text-capitalize'>{data.nama}</td>*/}
                            {/*                <th>*/}
                            {/*                    <button type="button" id={data.id} onClick={(e) => _editPrize(e)}*/}
                            {/*                            className="btn font-weight-bold" style={{padding: '0'}}>*/}
                            {/*                        <i className="mdi mdi-lead-pencil"></i>*/}
                            {/*                    </button>*/}
                            {/*                    <button type="button" id={data.id} onClick={ (e) => _deletePrize(e)}*/}
                            {/*                            className="btn font-weight-bold ml-3" style={{padding: '0'}}>*/}
                            {/*                        <i className="mdi mdi-delete"></i>*/}
                            {/*                    </button>*/}
                            {/*                </th>*/}
                            {/*            </tr>*/}
                            {/*        )})}*/}
                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*</div>*/}
                            <Table columns={columns} dataSource={data} pagination={false}/>
                            {
                                !dataVoucher ?
                                <div className="text-center mt-4">
                                    {btnPagination.map((dataBtn) => {
                                        const labelBtn = dataBtn.label;
                                        const label = labelBtn
                                            .replace(/(&laquo\;)/g, "")
                                            .replace(/(&raquo\;)/g, "");
                                        let linkUrl = dataBtn.url;

                                        if (linkUrl != null) {
                                            linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                                        }

                                        return (
                                            <Button
                                                className="btn btn-primary mr-2 font-xssss fw-600"
                                                style={{padding: '3px 6px'}}
                                                disabled={linkUrl == null ? true : false}
                                                onClick={() => {
                                                    setParamsPageUnsubmit(linkUrl);
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        );
                                    })}
                                </div> :
                                    <div className="text-center mt-4">
                                        {btnPagination.map((dataBtn) => {
                                            const labelBtn = dataBtn.label;
                                            const label = labelBtn
                                                .replace(/(&laquo\;)/g, "")
                                                .replace(/(&raquo\;)/g, "");
                                            let linkUrl = dataBtn.url;

                                            if (linkUrl != null) {
                                                linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                                            }

                                            return (
                                                <Button
                                                    className="btn btn-primary mr-2 font-xssss fw-600"
                                                    style={{padding: '3px 6px'}}
                                                    disabled={linkUrl == null ? true : false}
                                                    onClick={() => {
                                                        setParamsPageSubmit(linkUrl);
                                                    }}
                                                >
                                                    {label}
                                                </Button>
                                            );
                                        })}
                                    </div>
                            }

                            <div className="float-right mt-4">
                                <h4>Page { !dataVoucher ? paramsPageUnsubmit : paramsPageSubmit}</h4>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
