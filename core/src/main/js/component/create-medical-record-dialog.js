import React, { Component } from 'react';
const ReactDOM = require('react-dom');
class CreateMedicalRecordDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newMedicalRecord = {};

        newMedicalRecord["content"] = ReactDOM.findDOMNode(this.refs["recordContent"]).value.trim();
        newMedicalRecord["patient"] = this.props.patient.entity._links.self.href;

        this.props.onCreateMedicalRecord(newMedicalRecord);
        ReactDOM.findDOMNode(this.refs["recordContent"]).value = '';
        window.location = "#";
    }

    render() {
        const dialogId = "newMedicalRecord-" + this.props.patient.entity._links.self.href;
        return (
            <div>
                <a href={"#" + dialogId}>Add Medical Record</a>

                <div id={dialogId} className="modalDialog">

                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Add Medical Record</h2>

                        <form>
                            <p key={"recordContent"}>
                                <input type="text" placeholder="recordContent" ref="recordContent" className="field"/>
                            </p>
                            <button onClick={this.handleSubmit}>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateMedicalRecordDialog