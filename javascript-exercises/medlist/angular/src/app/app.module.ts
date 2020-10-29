import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MedlistComponent } from './medlist/medlist.component';
import { MedicationService } from './services/medication/medication.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MedlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MedicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
