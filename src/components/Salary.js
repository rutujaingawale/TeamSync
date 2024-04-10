import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { Appcontext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; //

const Salary = () => {
    const [salaryList, setsalaryList] = useState([]);
    const [salaryObj, setsalaryObj] = useState({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": "",
        "totalAdvance": 0,
        "presentDays": 0,
        "salaryAmount": 0
    });

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [5, 10, 20, 50, 100];

    const { employeelistData, getAllEmployee } = useContext(Appcontext);
    const [employeeList, setEmployeeList] = useState([]);

    const [show, setShow] = useState(false);

    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validationerror, setvalidationerror] = useState(false);

    const getSalaryList = async () => {
        const result = await axios.get(`${url}GetAllSalary`);
        setsalaryList(result.data.data);
    }
    useEffect(() => {
        getAllEmployee();
        getSalaryList();
    }, []);

    const saveSalary = async () => {
        debugger
        setvalidationerror(true);
        if (salaryObj.employeeId != '' && salaryObj.salaryDate != '' && salaryObj.totalAdvance != '' && salaryObj.presentDays != '' && salaryObj.salaryAmount != '') {

            const result = await axios.post(`${url}AddSalary`, salaryObj);
            if (result.data.data) {
                alert(result.data.message);
            }
            else {
                alert(result.data.message);
            }
            setsalaryObj({
                "salaryId": 0,
                "employeeId": 0,
                "salaryDate": "",
                "totalAdvance": 0,
                "presentDays": 0,
                "salaryAmount": 0
            });
            getSalaryList();
            setShow(false);
        }
        else {
            alert('Something went wrong');
        }

    }
    const handleChange = (event, key) => {
        setsalaryObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    }
    const editSalary = (salary) => {
        const formattedDate = salary.salaryDate.split('T');
        const mydate = formattedDate[0];
        setsalaryObj({
            ...salary,
            salaryDate: mydate
        });
        setShow(true);
    }

    const updateSalary = async () => {
        debugger
        const result = await axios.post(`${url}UpdateSalary`, salaryObj);
        if (result.data.data) {
            alert(result.data.message);
        }
        else {
            alert(result.data.message);
        }
        setsalaryObj({
            salaryId: 0,
            employeeId: 0,
            salaryDate: "",
            totalAdvance: 0,
            presentDays: 0,
            salaryAmount: 0
        });
        getSalaryList();
        setShow(false);
    }
    const deleteSalary = async (salaryId) => {
        const result = await axios.get(`${url}DeleteSalaryById?salaryId=` + salaryId);
        if (result.data.data) {
            alert(result.data.message);
        }
        else {
            alert(result.data.message);
        }
        getSalaryList();
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
                                    <h4 >Salary List</h4>
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
                                        <th>Salary Date</th>
                                        <th>Total Advance</th>
                                        <th>Present Days</th>
                                        <th>Salary Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        salaryList.map((salary, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{salary.empName}</td>
                                                    <td>{salary.salaryDate.split('T')[0]}</td>
                                                    <td>{salary.totalAdvance}</td>
                                                    <td>{salary.presentDays}</td>
                                                    <td>{salary.salaryAmount}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-success m-3' onClick={() => editSalary(salary)}>
                                                            <FaEdit />
                                                        </button>
                                                        <button className='btn btn-sm btn-danger' onClick={() => deleteSalary(salary.salaryId)}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <AgGridReact
                                pagination={pagination}
                                paginationPageSize={paginationPageSize}
                                paginationPageSizeSelector={paginationPageSizeSelector}
                            />

                        </div>
                    </div>

                </div>

            </div>
            <div className='col-md-12'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className='bg-light'>
                        <Modal.Title>Salary</Modal.Title>
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
                                                value={salaryObj.employeeId}
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
                                                validationerror && salaryObj.employeeId == 0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Salary  Date</label>
                                            <input type="Date" className='form-control' value={salaryObj.salaryDate} onChange={(event) => handleChange(event, "salaryDate")} />
                                            {
                                                validationerror && salaryObj.salaryDate == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='row my-2'>
                                        <div className='col-md-6'>
                                            <label>Total Advance</label>
                                            <input type="text" className='form-control' placeholder='Enter Total Advance '
                                                value={salaryObj.totalAdvance} onChange={(event) => handleChange(event, 'totalAdvance')} />
                                            {
                                                validationerror && salaryObj.totalAdvance == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Present Days</label>
                                            <input type="text" className='form-control' placeholder='Enter Present Days'
                                                value={salaryObj.presentDays} onChange={(event) => handleChange(event, 'presentDays')} />
                                            {
                                                validationerror && salaryObj.presentDays == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className='col-md-6'>
                                            <label>Salary Amount</label>
                                            <input type="text" className='form-control' placeholder='Enter Salary Amount'
                                                value={salaryObj.salaryAmount} onChange={(event) => handleChange(event, 'salaryAmount')} />
                                            {
                                                validationerror && salaryObj.salaryAmount == '' && <div className='text-danger'>
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
                        {
                            salaryObj.salaryId == 0 && <button className='btn btn-sm btn-primary m-2' onClick={saveSalary} >Add</button>
                        }
                        {
                            salaryObj.salaryId != 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateSalary} >Update</button>
                        }
                        <button className='btn btn-sm btn-danger' onClick={() => setShow(false)}>Cancel</button>

                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    );
};

export default Salary;