package com.cardinalhealth.audition.patient;

import com.cardinalhealth.audition.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class PatientControllerTest {

    public PatientController patientController = new PatientController();

    @Test
    public void testGetThrowsResourceNotFoundException() {
        Assertions.assertThrows(ResourceNotFoundException.class, ()->{
            patientController.getPatientById(UUID.randomUUID());
        });
    }

    @Test
    public void testGetById() {
        List<Patient> patients = patientController.getPatients();
        Patient expectedPatient  = patients.get(0);

        Patient patientById = patientController.getPatientById(expectedPatient .getId());

        assertThat(patientById).isEqualTo(expectedPatient );
    }
}