import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const Employee1 = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [employeeData, setemployeeData] = useState({
        empId: 0,
        empName: "",
        empContactNo: "",
        empAltContactNo: "",
        empEmail: "",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        city: "",
        state: "",
        bankName: "",
        ifsc: "",
        accountNo: "",
        bankBranch: "",
        salary: 0
    });
    const [saveEmp, setsaveEmp] = useState(false);
    const updateFormValue = (event, key) => {
        setemployeeData((prevobj) => ({ ...prevobj, [key]: event.target.value }));
    }

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";

    const getEmployee = async () => {
        const result = await axios.get(`${url}GetAllEmployee`);
        setEmployeeList(result.data.data);
    }

    useEffect(() => {
        getEmployee();
    }, []);

    const saveEmployee = async () => {
        debugger
        setsaveEmp(true);
        if (employeeData.empName != '' && employeeData.empContactNo != '' && employeeData.empAltContactNo != '' && employeeData.empEmail != '' && employeeData.addressLine1 != ''
            && employeeData.addressLine2 != '' && employeeData.pincode != '' && employeeData.city != '' && employeeData.state != ''
            && employeeData.bankName != '' && employeeData.ifsc != '' && employeeData.accountNo != '' && employeeData.bankBranch != ''
            && employeeData.salary != '') {
            const result = await axios.post(`${url}CreateEmployee`, employeeData);
            if (result.data.result) {
                alert(result.data.message);
            }
            else {
                alert(result.data.message);
            }
            getEmployee();
            setemployeeData({
                EmpId: 0,
                EmpName: "",
                EmpContactNo: "",
                EmpAltContactNo: "",
                EmpEmail: "",
                AddressLine1: "",
                AddressLine2: "",
                Pincode: "",
                City: "",
                State: "",
                BankName: "",
                IFSC: "",
                AccountNo: "",
                BankBranch: "",
                Salary: 0
            });
            setsaveEmp(false);
            setModalIsOpen(false);
        }
    }
    const editEmployee = (emp) => {
        setModalIsOpen(true);
        setemployeeData(emp);
    }
    const updateEmployee = async () => {
        debugger
        try{
        const result = await axios.post(`${url}UpdateEmployee`, employeeData);
        if (result.data.result) {
            alert('Record Updated..!');
        }
        else {
            alert(result.data.message);
        }}
        catch(error){
            console.error("An error occurred while updating the employee:", error);
        }
        getEmployee();
        setemployeeData({
            EmpId: 0,
            EmpName: "",
            EmpContactNo: "",
            EmpAltContactNo: "",
            EmpEmail: "",
            AddressLine1: "",
            AddressLine2: "",
            Pincode: "",
            City: "",
            State: "",
            BankName: "",
            IFSC: "",
            AccountNo: "",
            BankBranch: "",
            Salary: 0
        });
        setsaveEmp(false);
        setModalIsOpen(false);
    }
    const deleteEmployee = async (empId) => {
        debugger
        const result = await axios.get(`${url}DeleteEmployeeByEmpId?empId=` + empId);
        if (result.data.result) {
            alert("Record deleted");
        }
        else {
            alert(result.data.message);
        }
        getEmployee();
    }

    return (
        <div className="row mt-3">
            <div className="col-md-1"></div>
            <div className='col-md-10'>
            <div className="card bg-light">
                <div className="card-header bg-light">
                    <div className="row  mt-3">
                        <div className="col-md-9">
                        <h4>Employee List</h4>
                        </div>
                        <div className="col-md-3">
                            <button className='btn btn-primary' onClick={openModal}
                            >Add Employee</button>
                        </div>
                    </div>

                </div>
                <div className="card-body">
                    <div className="row">
                                <div className="col-12 table-responsive ">
                                    <table className="table table-bordered ">
                                        <thead >
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Name</th>
                                                <th>Contact No</th>
                                                {/* <th>AltContactNo</th> */}
                                                <th>Email</th>
                                                <th>Address </th>
                                                {/* <th>AddressLine2</th> */}
                                                <th>Pincode</th>
                                                {/* <th>City</th> */}
                                                <th>State</th>
                                                <th>Bank Name</th>
                                                {/* <th>Ifsc</th> */}
                                                <th>Account No</th>
                                                {/* <th>BankBranch</th> */}
                                                {/* <th>Salary</th> */}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeList.map((employee, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{employee.empName}</td>
                                                        <td>{employee.empContactNo}</td>
                                                        {/* <td>{employee.empAltContactNo}</td> */}
                                                        <td>{employee.empEmail}</td>
                                                        <td>{employee.addressLine1}</td>
                                                        {/* <td>{employee.addressLine2}</td> */}
                                                        <td>{employee.pincode}</td>
                                                        {/* <td>{employee.city}</td> */}
                                                        <td>{employee.state}</td>
                                                        <td>{employee.bankName}</td>
                                                        {/* <td>{employee.ifsc}</td> */}
                                                        <td>{employee.accountNo}</td>
                                                        {/* <td>{employee.bankBranch}</td> */}
                                                        {/* <td>{employee.salary}</td> */}
                                                        <td>
                                                            <button className="btn btn-success" onClick={() => { editEmployee(employee) }}> <FaEdit /></button>
                                                            <button className="btn btn-danger mx-1" onClick={() => { deleteEmployee(employee.empId) }}><FaTrash /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        
                    </div>
                </div>
                </div>
                
                {/* React-Bootstrap Modal */}
                
                <Modal show={modalIsOpen} onHide={closeModal}>
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title > Employee </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-12">
                            
                                {/* <div className="card-header">
                                    Create Employee
                                </div> */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label >Name</label>
                                            <input type="text" placeholder='Enter Name' className='form-control' onChange={(event) => { updateFormValue(event, 'empName') }} value={employeeData.empName} />
                                            {
                                                saveEmp && employeeData.empName == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >ContactNo</label>
                                            <input type="text" placeholder='Enter ContactNo' className='form-control' onChange={(event) => { updateFormValue(event, 'empContactNo') }} value={employeeData.empContactNo} />
                                            {
                                                saveEmp && employeeData.empContactNo == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >AltContactNo</label>
                                            <input type="text" placeholder='Enter AltContactNo' className='form-control' onChange={(event) => { updateFormValue(event, 'empAltContactNo') }} value={employeeData.empAltContactNo} />
                                            {
                                                saveEmp && employeeData.empAltContactNo == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Email</label>
                                            <input type="text" placeholder='Enter Email' className='form-control' onChange={(event) => { updateFormValue(event, 'empEmail') }} value={employeeData.empEmail} />
                                            {
                                                saveEmp && employeeData.empEmail == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >AddressLine1</label>
                                            <input type="text" placeholder='Enter AddressLine1' className='form-control' onChange={(event) => { updateFormValue(event, 'addressLine1') }} value={employeeData.addressLine1} />
                                            {
                                                saveEmp && employeeData.addressLine1 == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >AddressLine2</label>
                                            <input type="text" placeholder='Enter AddressLine2' className='form-control' onChange={(event) => { updateFormValue(event, 'addressLine2') }} value={employeeData.addressLine2} />
                                            {
                                                saveEmp && employeeData.addressLine2 == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Pincode</label>
                                            <input type="text" placeholder='Enter Pincode' className='form-control' onChange={(event) => { updateFormValue(event, 'pincode') }} value={employeeData.pincode} />
                                            {
                                                saveEmp && employeeData.pincode == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >City</label>
                                            <input type="text" placeholder='Enter City' className='form-control' onChange={(event) => { updateFormValue(event, 'city') }} value={employeeData.city} />
                                            {
                                                saveEmp && employeeData.city == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >State</label>
                                            <input type="text" placeholder='Enter state' className='form-control' onChange={(event) => { updateFormValue(event, 'state') }} value={employeeData.state} />
                                            {
                                                saveEmp && employeeData.state == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Bank Name</label>
                                            <input type="text" placeholder='Enter Bank Name' className='form-control' onChange={(event) => { updateFormValue(event, 'bankName') }} value={employeeData.bankName} />
                                            {
                                                saveEmp && employeeData.bankName == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Ifsc Code</label>
                                            <input type="text" placeholder='Enter Ifsc' className='form-control' onChange={(event) => { updateFormValue(event, 'ifsc') }} value={employeeData.ifsc} />
                                            {
                                                saveEmp && employeeData.ifsc == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Account No</label>
                                            <input type="text" placeholder='Enter Account No' className='form-control' onChange={(event) => { updateFormValue(event, 'accountNo') }} value={employeeData.accountNo} />
                                            {
                                                saveEmp && employeeData.accountNo == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Bank Branch</label>
                                            <input type="text" placeholder='Enter Bank Branch' className='form-control' onChange={(event) => { updateFormValue(event, 'bankBranch') }} value={employeeData.bankBranch} />
                                            {
                                                saveEmp && employeeData.bankBranch == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label >Salary</label>
                                            <input type="text" placeholder='Enter Salary' className='form-control' onChange={(event) => { updateFormValue(event, 'salary') }} value={employeeData.salary} />
                                            {
                                                saveEmp && employeeData.salary == '' && <div className='text-danger'>
                                                    This field is required
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>
                           
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>
                            Cancle
                        </Button>
                        {/* <Button variant="primary" onClick={saveEmployee}>
                            Save
                        </Button> */}
                        {/* {
                                employeeData.empId == 0 &&
                                <Button variant="primary" onClick={saveEmployee}>
                            Save
                        </Button>

                            }{
                                employeeData.empId != 0 &&
                                <Button variant="primary" onClick={updateEmployee}>
                            Update
                        </Button>

                            } */}
                        {
                            employeeData.empId === 0 ? (
                                <Button variant="primary" onClick={saveEmployee}>Save</Button>
                            ) : (
                                <Button variant="primary" onClick={updateEmployee}>Update</Button>
                            )
                        }
                    </Modal.Footer>
                </Modal>
           
        </div>
       
    );
};

export default Employee1;
