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
@RepositoryEventHandler(MedicalRecord.class)
public class MedicalRecordEventHandler {

    private final SimpMessagingTemplate websocket;

    private final EntityLinks entityLinks;

    @Autowired
    public MedicalRecordEventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newMedicalRecord(MedicalRecord medicalRecord) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newMedicalRecord", getPath(medicalRecord));
    }

    @HandleAfterDelete
    public void deleteMedicalRecord(MedicalRecord medicalRecord) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/deleteMedicalRecord", getPath(medicalRecord));
    }

    @HandleAfterSave
    public void updateMedicalRecord(MedicalRecord medicalRecord) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/updateMedicalRecord", getPath(medicalRecord));
    }

    /**
     * Take an {@link MedicalRecord} and get the URI using Spring Data REST's {@link EntityLinks}.
     *
     * @param medicalRecord
     */
    private String getPath(MedicalRecord medicalRecord) {
        return this.entityLinks.linkForItemResource(medicalRecord.getClass(),
                medicalRecord.getId()).toUri().getPath();
    }

}

