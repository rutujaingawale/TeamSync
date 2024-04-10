import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { Appcontext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const Leave = () => {
    const [leaveList, setleaveList] = useState([]);
    const [leaveObj, setleaveObj] = useState({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    });
    const { employeelistData, getAllEmployee } = useContext(Appcontext);

    const [show, setShow] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validationerror, setvalidationerror] = useState(false);

    const getLeaveList = async () => {
        const result = await axios.get(`${url}GetAllLeaves`);
        setleaveList(result.data.data);
    }
    useEffect(() => {
        getAllEmployee();
        getLeaveList();
    }, []);
    const saveLeave = async () => {
        setvalidationerror(true);
        if (leaveObj.employeeId != '' && leaveObj.leaveDate != '' && leaveObj.leaveReason != '' && leaveObj.noOfFullDayLeaves != '' && leaveObj.noOfHalfDayLeaves != '') {
            const result = await axios.post(`${url}AddLeave`, leaveObj);
            if (result.data.data) {
                alert(result.data.message);
            }
            else {
                alert(result.data.message);
            }
            setleaveObj({
                "leaveId": 0,
                "employeeId": 0,
                "leaveDate": "",
                "leaveReason": "",
                "noOfFullDayLeaves": 0,
                "noOfHalfDayLeaves": 0
            });
            getLeaveList();
            setShow(false);
        }
        else {
            alert('Something went wrong');
        }

    }
    const handleChange = (event, key) => {
        setleaveObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    }
    const editLeave = (leave) => {
        const formattedDate = leave.leaveDate.split('T');
        const mydate = formattedDate[0];
        setleaveObj({
            ...leave,
            leaveDate: mydate
        });
        setShow(true);
    }

    const updateLeave = async () => {
        debugger
        const result = await axios.post(`${url}UpdateLeave`, leaveObj);
        if (result.data.data) {
            alert(result.data.message);
        }
        else {
            alert(result.data.message);
        }
        setleaveObj({
            leaveId: 0,
            employeeId: 0,
            leaveDate: "",
            leaveReason: "",
            noOfFullDayLeaves: 0,
            noOfHalfDayLeaves: 0
        });
        getLeaveList();
        setShow(false);
    }
    const deleteLeave = async (leaveId) => {
        const result = await axios.get(`${url}DeleteLeaveById?leaveId=` + leaveId);
        if (result.data.data) {
            alert(result.data.message);
        }
        else {
            alert(result.data.message);
        }
        getLeaveList();
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
                                <h4 >Leave List</h4>
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
                                    <th>Leave Date</th>
                                    <th>Leave Reason</th>
                                    <th>FullDayLeaves</th>
                                    <th>HalfDayLeaves</th>
                                    <th>Action</th>

                                </tr>
  
                            </thead>
                            <tbody>
                                {
                                    leaveList.map((leave, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{leave.empName}</td>
                                                <td>{leave.leaveDate.split('T')[0]}</td>
                                                <td>{leave.leaveReason}</td>
                                                <td>{leave.noOfFullDayLeaves}</td>
                                                <td>{leave.noOfHalfDayLeaves}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-success m-3' onClick={() => editLeave(leave)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className='btn btn-sm btn-danger' onClick={() => deleteLeave(leave.leaveId)}>
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
                        <Modal.Title>Leave</Modal.Title>
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
                                                value={leaveObj.employeeId}
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
                                                validationerror && leaveObj.employeeId == 0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Advance Date</label>
                                            <input type="Date" className='form-control'
                                                value={leaveObj.leaveDate} onChange={(event) => handleChange(event, 'leaveDate')} />
                                            {
                                                validationerror && leaveObj.leaveDate == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='row my-2'>
                                        <div className='col-md-6'>
                                            <label>Leave Reason</label>
                                            <input type="text" className='form-control' placeholder='Enter Leave Reason'
                                                value={leaveObj.leaveReason} onChange={(event) => handleChange(event, 'leaveReason')} />
                                            {
                                                validationerror && leaveObj.leaveReason == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>NoOfFullDayLeaves</label>
                                            <input type="text" className='form-control' placeholder='Enter NoOfFullDayLeaves'
                                                value={leaveObj.noOfFullDayLeaves} onChange={(event) => handleChange(event, 'noOfFullDayLeaves')} />
                                            {
                                                validationerror && leaveObj.noOfFullDayLeaves == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>NoOfHalfDayLeaves</label>
                                            <input type="text" className='form-control' placeholder='Enter NoOfHalfDayLeaves'
                                                value={leaveObj.noOfHalfDayLeaves} onChange={(event) => handleChange(event, 'noOfHalfDayLeaves')} />
                                            {
                                                validationerror && leaveObj.noOfHalfDayLeaves == '' && <div className='text-danger'>
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
                            leaveObj.leaveId === 0 ? (
                                <Button variant="primary" onClick={saveLeave}>Save</Button>
                            ) : (
                                <Button variant="primary" onClick={updateLeave}>Update</Button>
                            )
                        }
                        <button className='btn btn-sm btn-danger' onClick={() => setShow(false)}>Cancel</button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Leave;