import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../services/medication/medication.service';
import { IMedication } from '../interfaces/medication.model';

@Component({
  selector: 'app-medlist',
  templateUrl: './medlist.component.html',
  styleUrls: ['./medlist.component.scss']
})
export class MedlistComponent implements OnInit {
  medications: IMedication[];
  constructor(private medicationService: MedicationService) { }

  ngOnInit() {
    this.medicationService.list().subscribe(
      medications => {
        this.medications = medications;
      },
      err => {
        console.error(err);
      }
    )
  }

}
