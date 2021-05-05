import React, { Component } from 'react';

class ViewMedicalRecordDialog extends React.Component {
    state = {
        records: []
    }

    constructor(props) {
        super(props);
        this.handleView = this.handleView.bind(this);
    }

    handleView() {
        fetch(this.props.patient.entity._links.medicalRecords.href)
            .then(response => response.json())
            .then(result => {
                this.setState({records: result._embedded.medicalRecords})
            });
    }

    render() {
        let listItem
        if (this.state.records === null || this.state.records.length === 0) {
            listItem = <ul></ul>
        } else {
            listItem = <ul>
                {this.state.records.map((record) => (
                    <li key={record.content}>{record.content}</li>
                ))}
            </ul>
        }
        const dialogId = "viewMedicalRecords-" + this.props.patient.entity._links.medicalRecords.href;

        return (
            <div>
                <a onClick={this.handleView} href={"#" + dialogId}>View Medical Records</a>

                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>View Medical Records</h2>
                        {listItem}
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewMedicalRecordDialog