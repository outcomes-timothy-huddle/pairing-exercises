package com.cardinalhealth.audition.patient;

import com.cardinalhealth.audition.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class PatientController {
    private final Logger logger = LoggerFactory.getLogger(PatientController.class);
    
    private Map<UUID,Patient> patients;

    public PatientController() {
        patients = new HashMap<>();
        
        // Some initial patients...
        addPatientToMap(Patient.named("Anna", "Bendig"));
        addPatientToMap(Patient.named("Bendig","Cummins"));
        addPatientToMap(Patient.named("Gavin","Rave"));
        addPatientToMap(Patient.named("Justin","Gasper"));
        addPatientToMap(Patient.named("Louis","Bendig"));
        addPatientToMap(Patient.named("Indira","Gilicinski"));
        addPatientToMap(Patient.named("Tim","Larger"));
        addPatientToMap(Patient.named("Austin","Bendig"));
        addPatientToMap(Patient.named("Justin","Bendig"));
    }

    private void addPatientToMap(Patient patient) {
        patients.put(patient.getId(), patient);
        logger.info("Added patient: " + patient);
    }

    @RequestMapping(value="/patient/{id}", method= RequestMethod.GET)
    public Patient getPatientById(@PathVariable UUID id) {
        Patient patient = patients.get(id);

        if (patient == null) {
            throw new ResourceNotFoundException("Patient with id=" + id + " does not exist.");
        }
        return patient;
    }

    @RequestMapping(value="/patient", method= RequestMethod.GET)
    public List<Patient> getPatients() {
        return new ArrayList<>(patients.values());
    }
}
