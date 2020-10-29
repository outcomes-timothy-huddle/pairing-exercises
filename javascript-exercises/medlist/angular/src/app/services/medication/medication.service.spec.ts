import { TestBed, getTestBed } from '@angular/core/testing';

import { MedicationService } from './medication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IMedication } from 'src/app/interfaces/medication.model';

describe('MedicationService', () => {

  let injector: TestBed;
  let service: MedicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MedicationService]
  });
  
  injector = getTestBed();
  service = injector.get(MedicationService);  
  httpMock = injector.get(HttpTestingController);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#list() should return an Observable<Medication[]>',()=>{
    const dummyMedications: IMedication[] = [
      { id: '4321', 
        name: 'Insulin', 
        directionsForUse: 'Eat it', 
        condition: 'Diabetes', 
        prescriber: {
          id: '1234',
          name: 'Dr. Me'
        } 
      },
      { id: '9876', 
        name: 'Tylenol', 
        directionsForUse: 'Drink it', 
        condition: 'Programmer\'s Hand', 
        prescriber: {
          id: '6789',
          name: 'Dr. You'
        } 
      }
    ];

    service.list().subscribe(medications => {
      expect(medications.length).toBe(2);
      expect(medications).toEqual(dummyMedications);
    })

    const req = httpMock.expectOne('http://localhost:8000/medications');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMedications);
  });
});

