import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {BASE_URL, TOKEN} from "../../api/api";
import Swal from "sweetalert2";
import {Space, Table, Tag} from 'antd';

export default function Voucher() {
    const [show, setShow] = useState(false);
    const [prize, setPrize] = useState([])
    const [voucher, setVoucher] = useState([])
    const [typeVoucher, setTypeVoucher] = useState("")
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const handleClose = () => setShow(false);

    const columns = [
            {
                title: 'Voucher Code',
                dataIndex: 'voucherCode',
                key: 'id',
            },
            {
                title: 'Type Voucher',
                dataIndex: 'type',
                key: 'id',
                render: (text, record) => (
                    <Tag style={{borderRadius: "15px"}} color={record.type == 0 ? 'red' : 'green'} key={record.id}>
                        {record.type == 1 ? "Voucher Berhadiah" : "Voucher Zonk"}
                    </Tag>

                ),
            },
            {
                title: 'Prize Voucher',
                dataIndex: 'prizeVoucher',
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
                                <p>-</p>
                        }
                    </>
                ),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'id',
                render: (text, record) => (
                    <Tag style={{borderRadius: "15px"}} color={record.status == 1 ? 'red' : 'green'} key={record.id}>
                        {record.status == 1 ? "Tiket Sudah Terpakai" : "Tiket Belum Terpakai"}
                    </Tag>

                ),
            },
            {
                title: 'Action',
                key: 'id',
                render: (text, record) => (
                    <>
                        <button type="button" id={data.id} onClick={(e) => _deleteVoucher(record)}
                                className="btn font-weight-bold ml-3" style={{padding: '0'}}>
                            <i className="mdi mdi-delete"></i>
                        </button>
                    </>
                ),
            },
        ]
    ;
    const data = voucher.map((data) => {
        return {
            id: data.id,
            voucherCode: data.code,
            type: data.type,
            status: data.status,
            prizeVoucher: data.hadiahs !== null ? data.hadiahs.nama : 'Zonk',
            playerName: data.player_name
        }
    })

    const _createVoucher = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        axios.post(BASE_URL + 'vocer', {
            id_hadiah: formDataObj.idPrize,
            type: formDataObj.typeVoucher,
            jumlah: formDataObj.totalVoucher
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
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                })
                setShow(false);
                _getPrize()
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
    }

    const _getVoucher = () => {
        axios.get(BASE_URL + 'vocer?page=' + paramsPage, {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${TOKEN}`
            },
            xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true
        }).then(res => {
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

    const _getPrize = () => {
        axios.get(BASE_URL + 'hadiah', {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${TOKEN}`
            },
            xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true
        }).then(res => {
            setPrize(res.data.data)
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
    }

    const _deleteVoucher = (record) => {
        axios.delete(BASE_URL + 'vocer/' + record.id, {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${TOKEN}`
            },
            xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true
        }).then(res => {
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                })
                _getVoucher();
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        _getVoucher()
        _getPrize()
    }, [paramsPage]);


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
                            <button type="button" onClick={handleShow}
                                    className="btn btn-gradient-primary font-weight-bold px-lg-3 float-right mb-5">
                                <i className="mdi mdi-plus"></i>Add Voucher
                            </button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Voucher</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form name="createVoucher" onSubmit={_createVoucher}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Prize Name</Form.Label>
                                            <select name='typeVoucher' className="form-control" id="idPrize"
                                                    onChange={(e) => setTypeVoucher(e.target.value)}>
                                                <option value="">Pilih Tipe Voucher</option>
                                                <option value="1">Berhadiah</option>
                                                <option value="0">Zonk</option>
                                            </select>
                                        </Form.Group>
                                        {
                                            typeVoucher == "1" ?
                                                <>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Prize Name</Form.Label>
                                                        <select name='idPrize' className="form-control" id="idPrize">
                                                            <option disabled selected>Pilih Hadiah</option>
                                                            {prize.map(data => (
                                                                <option value={data.id}>{data.nama}</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Total Voucher</Form.Label>
                                                        <Form.Control name="totalVoucher" type="number"/>
                                                    </Form.Group>
                                                </>
                                                : typeVoucher == "0" ?
                                                    <>
                                                        <Form.Group className="row">
                                                            <select name='idPrize' className="form-control"
                                                                    style={{display: 'none'}} id="idPrize">
                                                                <option value="0">non hadiah</option>
                                                            </select>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Total Voucher</Form.Label>
                                                            <Form.Control name="totalVoucher" type="number"/>
                                                        </Form.Group>
                                                    </>
                                                    : null
                                        }
                                        <Button className='float-right mt-3 mb-2' type='submit' variant="primary">
                                            Create
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                {/*<Modal.Footer>*/}
                                {/*    <Button variant="secondary" onClick={handleClose}>*/}
                                {/*        Close*/}
                                {/*    </Button>*/}
                                {/*    <Button type='submit' variant="primary">*/}
                                {/*        Save Changes*/}
                                {/*    </Button>*/}
                                {/*</Modal.Footer>*/}
                            </Modal>
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
                                                setParamsPage(linkUrl);
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    );
                                })}
                            </div>
                            <div className="float-right mt-4">
                                <h4>Page {paramsPage}</h4>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
