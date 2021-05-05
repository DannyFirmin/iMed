'use strict';
import CreatePatientDialog from './component/create-patient-dialog';
import PatientList from "./component/patient-list";

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('./client');
const follow = require('./follow');
const stompClient = require('./websocket-listener');
const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {patients: [], patientAttributes: [], page: 1, pageSize: 3, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreatePatient = this.onCreatePatient.bind(this);
        this.onUpdatePatient = this.onUpdatePatient.bind(this);
        this.onDeletePatient = this.onDeletePatient.bind(this);
        this.onNavigatePatient = this.onNavigatePatient.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
        this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'patients', params: {size: pageSize}}]
        ).then(patientCollection => {
            return client({
                method: 'GET',
                path: patientCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                this.links = patientCollection.entity._links;
                return patientCollection;
            });
        }).then(patientCollection => {
            this.page = patientCollection.entity.page;
            return patientCollection.entity._embedded.patients.map(patient =>
                client({
                    method: 'GET',
                    path: patient._links.self.href
                })
            );
        }).then(patientPromises => {
            return when.all(patientPromises);
        }).done(patients => {
            this.setState({
                page: this.page,
                patients: patients,
                patientAttributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    onCreatePatient(newPatient) {
        follow(client, root, ['patients']).done(response => {
            client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newPatient,
                headers: {'Content-Type': 'application/json'}
            })
        })
    }

    onCreateMedicalRecord(newMedicalRecord) {
        follow(client, root, ['medicalRecords']).done(response => {
            client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newMedicalRecord,
                headers: {'Content-Type': 'application/json'}
            })
        })
    }

    onUpdatePatient(patient, updatedPatient) {
        client({
            method: 'PUT',
            path: patient.entity._links.self.href,
            entity: updatedPatient,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': patient.headers.Etag
            }
        }).done(response => {
        }, response => {
            if (response.status.code === 412) {
                alert('Sorry: Unable to update ' + patient.entity._links.self.href + '. Someone else modified this while you are editing it.');
            }
        });
    }

    onDeletePatient(patient) {
        client({method: 'DELETE', path: patient.entity._links.self.href});
    }

    onNavigatePatient(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(patientCollection => {
            this.links = patientCollection.entity._links;
            this.page = patientCollection.entity.page;

            return patientCollection.entity._embedded.patients.map(patient =>
                client({
                    method: 'GET',
                    path: patient._links.self.href
                })
            );
        }).then(patientPromises => {
            return when.all(patientPromises);
        }).done(patients => {
            this.setState({
                page: this.page,
                patients: patients,
                patientAttributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    // websocket-handlers
    refreshAndGoToLastPage(message) {
        follow(client, root, [{
            rel: 'patients',
            params: {size: this.state.pageSize}
        }]).done(response => {
            if (response.entity._links.last !== undefined) {
                this.onNavigatePatient(response.entity._links.last.href);
            } else {
                this.onNavigatePatient(response.entity._links.self.href);
            }
        })
    }

    refreshCurrentPage(message) {
        follow(client, root, [{
            rel: 'patients',
            params: {
                size: this.state.pageSize,
                page: this.state.page.number
            }
        }]).then(patientCollection => {
            this.links = patientCollection.entity._links;
            this.page = patientCollection.entity.page;

            return patientCollection.entity._embedded.patients.map(patient => {
                return client({
                    method: 'GET',
                    path: patient._links.self.href
                })
            });
        }).then(patientPromises => {
            return when.all(patientPromises);
        }).then(patients => {
            this.setState({
                page: this.page,
                patients: patients,
                patientAttributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    // websocket-handlers

    // register-handlers
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        stompClient.register([
            {route: '/topic/newPatient', callback: this.refreshAndGoToLastPage},
            {route: '/topic/updatePatient', callback: this.refreshCurrentPage},
            {route: '/topic/deletePatient', callback: this.refreshCurrentPage},
            {route: '/topic/newMedicalRecord', callback: this.refreshCurrentPage},
            {route: '/topic/deleteMedicalRecord', callback: this.refreshCurrentPage},
            {route: '/topic/updateMedicalRecord', callback: this.refreshCurrentPage}

        ]);
    }

    // register handlers

    render() {
        return (
            <div>
                <h1>Welcome to iMed</h1>
                <CreatePatientDialog patientAttributes={this.state.patientAttributes}
                                     onCreatePatient={this.onCreatePatient}/>
                <PatientList page={this.state.page}
                             patients={this.state.patients}
                             links={this.state.links}
                             pageSize={this.state.pageSize}
                             patientAttributes={this.state.patientAttributes}
                             onNavigatePatient={this.onNavigatePatient}
                             onCreateMedicalRecord={this.onCreateMedicalRecord}
                             onUpdatePatient={this.onUpdatePatient}
                             onDeletePatient={this.onDeletePatient}
                             updatePageSize={this.updatePageSize}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)
