# Mock go backend for medlist

Simple go application that can be either deployed to cloudfoundry or ran locally. Locally is the current default to how the javascript medlist exercise is pointed to use.

To run locally with Docker
1. docker build . -t mock-rest-backend:latest
2. docker run -p 8000:8000 mock-rest-backend:latest

To run locally and do development on
1. Install Go 1.13 or greater (https://golang.org/dl/)
2. Install dep (https://github.com/golang/dep) (optional but necessary if modifying project dependencies) 
2. Execute `go run main.go`

Server will start on port 8000. 

To deploy to cloud foundry you simply just need to do a `cf push`

# Endpoints

## Get all medications
GET - `/medications`

```
[
    {
        "id": "fe0f853e-18a0-49e8-a021-e8f832dd385a",
        "name": "ASPIRIN TAB 81MG",
        "directionsForUse": "Take one tablet when needed",
        "condition": "Headache",
        "prescriber": {
            "id": "9af2f234-a981-4a5e-89d4-f57f0b031d85",
            "name": "John Smith"
        }
    },
    {
        "id": "875f2f27-12c1-41da-b538-d76868a5a6fc",
        "name": "PETOPROL SUC TAB 50MG ER",
        "directionsForUse": "Take one tablet twice each day",
        "condition": "Heart Health",
        "prescriber": {
            "id": "2b413e28-37cf-4fe0-a398-e016816ea939",
            "name": "John Smith"
        }
    }
]
```

## Search for medication by name - list of medications that match the name
GET - `/medications/search?name=<value>`

## Delete medication - if successful returns new list of all medications
DELETE - `/medications/<id>`

## Create medication
POST - `/medications`

Valid data is as follows but there is validation in place that will return a json object of errors. 
```
{
    "name": "TEST DRUG",
    "directionsForUse": "Take one tablet when needed TEST",
    "condition": "Test",
    "prescriber": {
        "name": "John Smith"
    }
}
```

Possible error json. But it consists of the field name and the current error for it.
```
{
   "condition": "Condition is required",
   "directionsForUse": "Directions for use is required",
   "name": "Name is required",
   "prescriber": "Prescriber is required",
   "prescriber.name": "Prescriber name is required"
}
```
