import React, { Component } from 'react';

import CreateMedicalRecordDialog from "./create-medical-record-dialog";
import ViewMedicalRecordDialog from "./view-medical-record-dialog";
import UpdatePatientDialog from "./update-patient-dialog";

class Patient extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDeletePatient(this.props.patient);
    }

    render() {
        return (
            <tr>
                <td>{this.props.patient.entity.medicareId}</td>
                <td>{this.props.patient.entity.firstName}</td>
                <td>{this.props.patient.entity.lastName}</td>
                <td>
                    <CreateMedicalRecordDialog patient={this.props.patient}
                                               onCreateMedicalRecord={this.props.onCreateMedicalRecord}/>
                </td>
                <td>
                    <ViewMedicalRecordDialog patient={this.props.patient}/>
                </td>
                <td>
                    <UpdatePatientDialog patient={this.props.patient}
                                         patientAttributes={this.props.patientAttributes}
                                         onUpdatePatient={this.props.onUpdatePatient}/>
                </td>
                <td>
                    <a onClick={this.handleDelete} href="#">Delete Patient</a>
                </td>
            </tr>
        )
    }
}
export default Patient