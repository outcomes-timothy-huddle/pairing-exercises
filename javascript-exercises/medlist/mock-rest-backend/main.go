package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"github.com/satori/go.uuid"
	"github.com/gorilla/handlers"
	"strings"
)

type Medication struct {
	ID               string      `json:"id"`
	Name             string      `json:"name"`
	DirectionsForUse string      `json:"directionsForUse"`
	Condition        string      `json:"condition"`
	Prescriber       *Prescriber `json:"prescriber"`
}

func (medication *Medication) Validate() map[string]string {
	Errors := make(map[string]string)

	if strings.TrimSpace(medication.Name) == "" {
		Errors["name"] = "Name is required"
	}
	if strings.TrimSpace(medication.DirectionsForUse) == "" {
		Errors["directionsForUse"] = "Directions for use is required"
	}
	if strings.TrimSpace(medication.Condition) == "" {
		Errors["condition"] = "Condition is required"
	}

	if medication.Prescriber != nil {
		if strings.TrimSpace(medication.Prescriber.Name) == "" {
			Errors["prescriber.name"] = "Prescriber name is required"
		}
	}else{
		Errors["prescriber"] = "Prescriber is required"
	}

	return Errors
}

type Prescriber struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var medications []Medication

func GetMedicationsEndpoint(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(medications)
}
func CreateMedication(w http.ResponseWriter, r *http.Request) {
	var medication Medication
	_ = json.NewDecoder(r.Body).Decode(&medication)
	medication.ID = uuid.NewV4().String()
	if medication.Prescriber != nil && medication.Prescriber.ID == "" {
		medication.Prescriber.ID = uuid.NewV4().String()
	}
	errors := medication.Validate()
	w.Header().Set("Content-Type", "application/json")
	if len(errors) > 0 {
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode(errors)
	}else{
		medications = append(medications, medication)
		json.NewEncoder(w).Encode(medications)
	}
}

func DeleteMedication(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var foundMed Medication
	for _, item := range medications {
		if item.ID == params["id"] {
			foundMed = item
		}
	}

	var foundIdx = indexOf(foundMed, medications)
	if foundIdx != -1 {
		medications = append(medications[:foundIdx], medications[foundIdx+1:]...)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(medications)
	}else{
		http.NotFound(w, r)
	}
}

func SearchForMedicationsEndpoint(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := r.URL.Query().Get("name")
	foundMeds := []Medication{}
	if param != "" {
		for i := range medications {
			if strings.HasPrefix(strings.ToLower(medications[i].Name), strings.ToLower(param)) {
				// Found!
				foundMeds = append(foundMeds, medications[i])
			}
		}
	}
	json.NewEncoder(w).Encode(foundMeds)
}

func indexOf(element Medication, data []Medication) (int) {
	for k, v := range data {
		if element == v {
			return k
		}
	}
	return -1    //not found.
}

func main() {
	router := mux.NewRouter()
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "ASPIRIN TAB 81MG", Condition: "Headache", DirectionsForUse: "Take one tablet when needed", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "John Smith"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "PETOPROL SUC TAB 50MG ER", Condition: "Heart Health", DirectionsForUse: "Take one tablet twice each day", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "John Smith"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "NAPROXEN TAB 500MG", Condition: "Back Pain", DirectionsForUse: "Take two tablets when needed", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Self"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "PANTOPRAZOLE TAB 40MG", Condition: "Heartburn", DirectionsForUse: "Take one spoonful by mouth daily", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Suzan Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "TAMSULOSIN CAP 0.4MG", Condition: "Blood ", DirectionsForUse: "Take one capsule at bedtime", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Self"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "PROAIR HFA AER", Condition: "Asthma", DirectionsForUse: "Inhale 2 puffs daily", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Mike Sims"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "CLOPIDOGREL TAB 75MG", Condition: "Cancer", DirectionsForUse: "Take one tablet 4 times a day", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "John Smith"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "ADEMPAS TAB 0.5MG", DirectionsForUse: "TAKE 1/2 TABLET BY MOUTH DAILY IN THE MORNING", Condition: "REALLY BAD SLEEPINESS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Jack Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "AMARYL TAB 4MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "SHAKING LEG", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Jack Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "AMLODIPINE TAB 2.5MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "SLEEPINESS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Jack Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "CLOZAPINE TAB 25MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Jack Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "DIGITEK TAB 0.125MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "GLIP/METFORM TAB 5-500MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "HYZAAR TAB 100-25", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Jack Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "INTELENCE TAB 200MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "LISINOPRIL TAB 20MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "PROAIR HFA AER", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "RISPERDAL TAB 1MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "TOPIRAMATE TAB 200MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Jack Jones"}})
	medications = append(medications, Medication{ID: uuid.NewV4().String(), Name: "TRADJENTA TAB 5MG", DirectionsForUse: "SWALLOW PILL ONCE IT IS IN YOUR MOUTH.", Condition: "ARTHRITIS", Prescriber: &Prescriber{ID: uuid.NewV4().String(), Name: "Dr. Phil"}})

	corsObj := handlers.AllowedOrigins([]string{"*"})

	router.HandleFunc("/medications", GetMedicationsEndpoint).Methods("GET")
	router.HandleFunc("/medications", CreateMedication).Methods("POST")
	router.HandleFunc("/medications/search", SearchForMedicationsEndpoint).Methods("GET")
	router.HandleFunc("/medications/{id}", DeleteMedication).Methods("DELETE")

	port := getPort()
	log.Println("Starting server on port " + port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(corsObj)(router)))
}

func getPort() string {
	if configuredPort := os.Getenv("PORT"); configuredPort == "" {
		return "8000"
	} else {
		return configuredPort
	}
}
