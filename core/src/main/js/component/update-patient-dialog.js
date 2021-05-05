import React, { Component } from 'react';

const ReactDOM = require('react-dom');
class UpdatePatientDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedPatient = {};
        this.props.patientAttributes.forEach(attribute => {
            updatedPatient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onUpdatePatient(this.props.patient, updatedPatient);
        window.location = "#";
    }

    render() {
        const inputs = this.props.patientAttributes.map(attribute =>
            <p key={this.props.patient.entity[attribute]}>
                <input type="text" placeholder={attribute}
                       defaultValue={this.props.patient.entity[attribute]}
                       ref={attribute} className="field"/>
            </p>
        );

        const dialogId = "updatePatient-" + this.props.patient.entity._links.self.href;

        return (
            <div>
                <a href={"#" + dialogId}>Edit Patient</a>

                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Edit a patient</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
export default UpdatePatientDialog