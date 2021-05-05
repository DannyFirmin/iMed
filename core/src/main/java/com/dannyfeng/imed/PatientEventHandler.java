package com.dannyfeng.imed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static com.dannyfeng.imed.WebSocketConfiguration.MESSAGE_PREFIX;

@Component
@RepositoryEventHandler(Patient.class)
public class PatientEventHandler {

    private final SimpMessagingTemplate websocket;

    private final EntityLinks entityLinks;

    @Autowired
    public PatientEventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newPatient(Patient patient) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newPatient", getPath(patient));
    }

    @HandleAfterDelete
    public void deletePatient(Patient patient) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/deletePatient", getPath(patient));
    }

    @HandleAfterSave
    public void updatePatient(Patient patient) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/updatePatient", getPath(patient));
    }

    /**
     * Take an {@link Patient} and get the URI using Spring Data REST's {@link EntityLinks}.
     *
     * @param patient
     */
    private String getPath(Patient patient) {
        return this.entityLinks.linkForItemResource(patient.getClass(),
                patient.getId()).toUri().getPath();
    }

}

