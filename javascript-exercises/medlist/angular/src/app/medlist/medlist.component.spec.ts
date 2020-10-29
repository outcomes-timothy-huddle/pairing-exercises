import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedlistComponent } from './medlist.component';
import { Observable, of } from 'rxjs';
import { IMedication } from '../interfaces/medication.model';
import { MedicationService } from '../services/medication/medication.service';
import { By } from '@angular/platform-browser';

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

class MockMedicationService {
  list() {
    return of(dummyMedications)
  }
}

describe('MedlistComponent', () => {
  let component: MedlistComponent;
  let fixture: ComponentFixture<MedlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedlistComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        MedlistComponent,
        {
          provide: MedicationService,
          useClass: MockMedicationService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all of the medications in the table', () => {
    const html = fixture.nativeElement;
    var medicationList = html.querySelectorAll('.medication-row');
    expect(medicationList.length).toBe(2)
  })
});
