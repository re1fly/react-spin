import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {BASE_URL, TOKEN} from "../../api/api";
import Swal from "sweetalert2";
import {Space, Table, Tag} from 'antd';

export default function Prize() {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [prize, setPrize] = useState([])
    const [selectedPrize, setSelectedPrize] = useState({
        id: "",
        name: ""
    });
    const [inputEdit, setInputEdit] = useState()


    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    const handleClose = () => setShow(false);

    const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <a>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <>
                        <button type="button" id={data.id} onClick={(e) => _editPrize(record)}
                                className="btn font-weight-bold" style={{padding: '0'}}>
                            <i className="mdi mdi-lead-pencil"></i>
                        </button>
                        <button type="button" id={data.id} onClick={(e) => _deletePrize(record)}
                                className="btn font-weight-bold ml-3" style={{padding: '0'}}>
                            <i className="mdi mdi-delete"></i>
                        </button>
                    </>
                ),
            },
        ]
    ;
    const data = prize.map((data) => {
        return {
            id: data.id,
            name: data.nama
        }
    })

    const _createPrize = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        axios.post(BASE_URL + 'hadiah', {
            nama: formDataObj.prize
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

    const _deletePrize = (record) => {
        axios.delete(BASE_URL + 'hadiah/' + record.id, {
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

    const _editPrize = (record) => {
        setSelectedPrize(record)
        setShowEdit(true)
    }

    const _submitEditPrize = (e) => {
        axios.put(BASE_URL + 'hadiah/' + selectedPrize.id,  {
            nama: inputEdit
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
                setShowEdit(false);
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

    const handleShow = () => setShow(true);

    useEffect(() => {
        _getPrize()
    }, []);


    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                    Prize
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Admin</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Prize</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <Modal key={2} show={showEdit} onHide={handleCloseEdit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Prize</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form name="editPrize">
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1Edit">
                                            <Form.Label>Prize Name</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type="input"
                                                name='prizeEdit'
                                                onChange={(e) => setInputEdit(e.target.value)}
                                                defaultValue={selectedPrize.name}
                                            />
                                        </Form.Group>
                                        <Button name="buttonEdit"
                                                className='float-right mt-3 mb-2'
                                                type="button"
                                                variant="primary"
                                                onClick={_submitEditPrize}>
                                            Edit
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                            <h2 className="card-title">Setting Prize</h2>
                            <button type="button" onClick={handleShow}
                                    className="btn btn-gradient-primary font-weight-bold px-lg-3 float-right mb-5">
                                <i className="mdi mdi-plus"></i>Add Prize
                            </button>
                            <Modal key={1} show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Prize</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form name="createPrize" onSubmit={_createPrize}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Prize Name</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type="input"
                                                name='prize'
                                                placeholder="Ex : Iphone 14 Pro"
                                            />
                                        </Form.Group>
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
                            {/*            <th>ID Prize</th>*/}
                            {/*            <th>Prize Name</th>*/}
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
