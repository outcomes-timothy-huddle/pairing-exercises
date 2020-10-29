import { Injectable } from '@angular/core';
import { IMedication } from 'src/app/interfaces/medication.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private http: HttpClient) { }

  list(): Observable<IMedication[]> {
      return this.http.get<IMedication[]>('http://localhost:8000/medications')
  }
}
