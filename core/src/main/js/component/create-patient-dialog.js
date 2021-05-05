import React, { Component } from 'react';
const ReactDOM = require('react-dom');
class CreatePatientDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newPatient = {};
        this.props.patientAttributes.forEach(attribute => {
            newPatient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreatePatient(newPatient);
        this.props.patientAttributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });
        window.location = "#";
    }

    render() {
        const inputs = this.props.patientAttributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );
        return (
            <div>
                <a href="#createPatient">New Patient</a>

                <div id="createPatient" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>New patient</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreatePatientDialog