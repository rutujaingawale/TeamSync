import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { Appcontext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const Advance = () => {
    const [advanceList, setadvanceList] = useState([]);
    const [advanceObj, setadvanceObj] = useState({
        "advanceId": 0,
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "reason": ""
    });
    const { employeelistData, getAllEmployee } = useContext(Appcontext);

    const [show, setShow] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [employeeList, setEmployeeList] = useState([]);
    const [validationerror, setvalidationerror] = useState(false);

    const getAdvanceList = async () => {
        const result = await axios.get(`${url}GetAllAdvance`);
        setadvanceList(result.data.data);
    }
    useEffect(() => {
        getAllEmployee();
        getAdvanceList();
    }, []);
    const saveAdvance = async () => {
        setvalidationerror(true);
        if (advanceObj.employeeId != '' && advanceObj.advanceDate != '' && advanceObj.advanceAmount != '' && advanceObj.reason != '') {
            const result = await axios.post(`${url}AddAdvance`, advanceObj);
            if (result.data.data) {
                alert(result.data.message);
            }
            else {
                alert(result.data.message);
            }
            setadvanceObj({
                "advanceId": 0,
                "employeeId": 0,
                "advanceDate": "",
                "advanceAmount": 0,
                "reason": ""
            });
            getAdvanceList();
            setShow(false);
        }
        else {
            alert('Something went wrong');
        }

    }
    const handleChange = (event, key) => {
        setadvanceObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    }
    const editAdvance = (advance) => {
        const formattedDate = advance.advanceDate.split('T');
        const mydate = formattedDate[0];
        setadvanceObj({
            ...advance,
            advanceDate: mydate
        });
        setShow(true);
    }

    const updateAdvance = async () => {
        debugger
        const result = await axios.post(`${url}UpdateAdvance`, advanceObj);
        if (result.data.data) {
            alert(result.data.message);
        }
        else {
            alert(result.data.message);
        }
        setadvanceObj({
            advanceId: 0,
            employeeId: 0,
            advanceDate: "",
            advanceAmount: 0,
            reason: ""
        });
        getAdvanceList();
        setShow(false);
    }
    const deleteAdvance = async (advanceId) => {
        const result = await axios.get(`${url}DeleteAdvanceById?advanceid=` + advanceId);
        if (result.data.data) {
            alert(result.data.message);
        }
        else {
            alert(result.data.message);
        }
        getAdvanceList();
    }
    return (
        <div>
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-10'>
                <div className='card bg-light'>
                    <div className='card-header bg-light'>
                        <div className="row mt-2">
                            <div className="col-md-9">
                                <h4 >Advance List</h4>
                            </div>
                            <div className="col-md-3">
                                <button className='btn btn-primary' onClick={handleShow}>Add New</button>
                            </div>
                        </div>
                    </div>

                    <div className='card-body'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Employee</th>
                                    <th>Advance Date</th>
                                    <th>Advance Amount</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    advanceList.map((advance, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{advance.empName}</td>
                                                <td>{advance.advanceDate.split('T')[0]}</td>
                                                <td>{advance.advanceAmount}</td>
                                                <td>{advance.reason}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-success m-3' onClick={() => editAdvance(advance)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className='btn btn-sm btn-danger' onClick={() => deleteAdvance(advance.advanceId)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                </div>

            </div>
            <div className='col-md-12'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className='bg-light'>
                        <Modal.Title>Advance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            <div >
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <label>Employee</label>
                                            <select
                                                className="form-select"
                                                value={advanceObj.employeeId}
                                                onChange={(event) => handleChange(event, 'employeeId')}
                                            >
                                                <option>Select Employee</option>
                                                {employeelistData.map((employee) => {
                                                    return (
                                                        <option key={employee.empId} value={employee.empId}>
                                                            {employee.empName}
                                                        </option>
                                                    );
                                                })}

                                            </select>
                                            {
                                                validationerror && advanceObj.employeeId == 0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>

                                        <div className='col-md-6'>
                                            <label>Advance  Date</label>
                                            <input type="Date" className='form-control' value={advanceObj.advanceDate} onChange={(event) => handleChange(event, "advanceDate")} />
                                            {
                                                validationerror && advanceObj.advanceDate == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='row my-2'>
                                        <div className='col-md-6'>
                                            <label>Advance Amount</label>
                                            <input type="text" className='form-control' placeholder='Enter Advance Amount.'
                                                value={advanceObj.advanceAmount} onChange={(event) => handleChange(event, 'advanceAmount')} />
                                            {
                                                validationerror && advanceObj.advanceAmount == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Reason</label>
                                            <input type="text" className='form-control' placeholder='Enter Reason'
                                                value={advanceObj.reason} onChange={(event) => handleChange(event, 'reason')} />
                                            {
                                                validationerror && advanceObj.reason == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* {
                            advanceObj.advanceId == 0 && <button className='btn btn-sm btn-primary m-2' onClick={saveAdvance} >Add</button>
                        }
                        {
                            advanceObj.advanceId != 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateAdvance} >Update</button>
                        } */}
                        {
                            advanceObj.advanceId === 0 ? (
                                <Button variant="primary" onClick={saveAdvance}>Save</Button>
                            ) : (
                                <Button variant="primary" onClick={updateAdvance}>Update</Button>
                            )
                        }
                        <button className='btn btn-sm btn-danger' onClick={() => setShow(false)}>Cancel</button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Advance;