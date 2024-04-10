// import React, { useEffect, useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';
// import { FaEdit } from 'react-icons/fa';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const Attendance = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const [attendanceObj, setAttendanceObj] = useState({
        "attendanceId": 0,
        "employeeId": 0,
        "attendanceDate": "",
        "inTime": "",
        "outTime": "",
        "isFullDay": false,
    });
    const getAttendanceList = async () => {
        const result = await axios.get(`${url}GetAllAttendance`);
        setAttendanceList(result.data.data);
    };
    const getAllEmployee = async () => {
        const result = await axios.get(`${url}GetAllEmployee`);
        setEmployeeList(result.data.data);
    };
    useEffect(() => {
        getAttendanceList();
        getAllEmployee();
    }, []);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validationerror, setvalidationerror] = useState(false);
    const handleChange = (event, key) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setAttendanceObj((prevObj) => ({ ...prevObj, [key]: value }));
    };
    const saveAttendance = async () => {
        setvalidationerror(true);
        try {
            const result = await axios.post(`${url}AddAttendance`, attendanceObj);
            if (result.data.data) {
                alert(result.data.message);
                setAttendanceObj({
                    attendanceId: 0,
                    employeeId: 0,
                    attendanceDate: Date(),
                    inTime: "",
                    outTime: "",
                    isFullDay: false,
                });
                getAttendanceList();
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            console.error('Error occurred while saving attendance:', error);
        }
        setShow(false);
    };
    const editAttendance = (attendance) => {
        const formattedDate = attendance.attendanceDate.split('T');
        const mydate = formattedDate[0];
        const inTime = attendance.inTime.split('T')[1].split(':').slice(0, 2).join(':');
        const outTime = attendance.outTime.split('T')[1].split(':').slice(0, 2).join(':');
        setAttendanceObj({
            ...attendance,
            attendanceDate: mydate,
            inTime,
            outTime,
        });
        setShow(true);
    };
    

    const updateAttendance = async () => {
        debugger
        try {
            const result = await axios.post(`${url}UpdateAttendance`, attendanceObj);
            if (result.data.result) {
                alert('Record Updated..!');
            }
            else {
                alert(result.data.message);
            }
        }
        catch (error) {
            console.error("An error occurred while updating the employee:", error);
        }
        getAttendanceList();
        setAttendanceObj({
            AttendanceId: 0,
            EmployeeId: 0,
            AttendanceDate: "",
            InTime: "",
            OutTime: "",
            IsFullDay: true
        });
        setShow(false);
        // setModalIsOpen(false);
    }
    const deleteAttendance = async (attendanceId) => {
        debugger
        const result = await axios.get(`${url}DeleteAttendanceById?attendanceId=` + attendanceId);
        if (result.data.result) {
            alert("Record deleted");
        }
        else {
            alert(result.data.message);
        }
        getAttendanceList();
    }

    return (
        <div>
            {/* {JSON.stringify({ attendanceObj })} */}
            <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-10 ">
                    <div className="card bg-light">
                        <div className="card-header bg-light">
                            <div className="row  mt-3">
                                <div className="col-md-9">
                                    <h4>Attendance List</h4>
                                </div>
                                <div className="col-md-3">
                                    <button className='btn btn-primary' onClick={handleShow}>Add New</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body bg-light ">
                            <table className="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Employee</th>
                                        <th>Contact No.</th>
                                        <th>Attendance Date</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Is FullDay</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceList.map((attendance, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{attendance.empName}</td>
                                                <td>{attendance.empContactNo}</td>
                                                <td>{attendance.attendanceDate.split('T')[0]}</td>
                                                <td>{attendance.inTime}</td>
                                                <td>{attendance.outTime}</td>
                                                <td>{attendance.isFullDay ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-success m-2" onClick={() => editAttendance(attendance)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => deleteAttendance(attendance.attendanceId)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title>Attendance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Employee</label>
                                            <select
                                                className="form-select"
                                                value={attendanceObj.employeeId}
                                                onChange={(event) => handleChange(event, "employeeId")}
                                            >
                                                <option>Select Employee</option>
                                                {employeeList.map((employee) => {
                                                    return (
                                                        <option key={employee.empId} value={employee.empId}>
                                                            {employee.empName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {
                                                validationerror && attendanceObj.employeeId == 0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Salary  Date</label>
                                            <input type="Date" className='form-control' value={attendanceObj.attendanceDate} onChange={(event) => handleChange(event, "attendanceDate")} />
                                            {
                                                validationerror && attendanceObj.attendanceDate == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <label>In Time</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Enter In Time"
                                                value={attendanceObj.inTime}
                                                onChange={(event) => handleChange(event, "inTime")}
                                            />
                                            {
                                                validationerror && attendanceObj.inTime == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label>Out Time</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Enter Out Time"
                                                value={attendanceObj.outTime}
                                                onChange={(event) => handleChange(event, "outTime")}
                                            />
                                            {
                                                validationerror && attendanceObj.outTime == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col-md-6">
                                            <label className="mx-1">Is FullDay</label>
                                            <input
                                                type="checkbox"
                                                checked={attendanceObj.isFullDay}
                                                onChange={(event) => handleChange(event, "isFullDay")}
                                            />
                                            {
                                                validationerror && attendanceObj.isFullDay == '' && <div className='text-danger'>
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
                        {attendanceObj.attendanceId === 0 && (
                            <button className="btn btn-sm btn-primary m-2" onClick={saveAttendance}>Add</button>
                        )}
                        {attendanceObj.attendanceId !== 0 && (
                            <button className="btn btn-sm btn-primary m-2" onClick={updateAttendance}>Update</button>
                        )}
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Attendance;