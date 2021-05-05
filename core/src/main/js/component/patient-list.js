import React, { Component } from 'react';
import Patient from "./patient";
const ReactDOM = require('react-dom');
class PatientList extends React.Component {

    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
        }
    }

    handleNavFirst(e) {
        e.preventDefault();
        this.props.onNavigatePatient(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigatePatient(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigatePatient(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigatePatient(this.props.links.last.href);
    }

    render() {
        const pageInfo = this.props.page.hasOwnProperty("number") ?
            <h3>Patients - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;

        const patients = this.props.patients.map(patient =>
            <Patient key={patient.entity._links.self.href}
                     patient={patient}
                     patientAttributes={this.props.patientAttributes}
                     onCreateMedicalRecord={this.props.onCreateMedicalRecord}
                     onUpdatePatient={this.props.onUpdatePatient}
                     onDeletePatient={this.props.onDeletePatient}/>
        );

        const navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (
            <div>
                {pageInfo}
                Patient per page: <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table>
                    <tbody>
                    <tr>
                        <th>Medicare ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Medical Record Action</th>
                        <th>Medical Record Action</th>
                        <th>Patient Action</th>
                        <th>Patient Action</th>
                    </tr>
                    {patients}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}
export default PatientList