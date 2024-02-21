import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { BedAllocationComponent } from './bed-allocation/bed-allocation.component';
import { BillingComponent } from './billing/billing.component';
import { AdminComponent } from './admin/admin.component';
import { ReceptionComponent } from './reception/reception.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentListComponent } from './departmentlist/departmentlist.component';
import { WardComponent } from './ward/ward.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { EditComponent } from './edit/edit.component';
import { RoomComponent } from './room/room.component';
import { AddroomComponent } from './addroom/addroom.component';
import { RoomKindComponent } from './room-kind/room-kind.component';
import { EditroomComponent } from './editroom/editroom.component';
import { InpatientHomeComponent } from './inpatient-home/inpatient-home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PatientregistrationComponent } from './patientregistration/patientregistration.component';
import { BedComponent } from './bed/bed.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
@NgModule({
  declarations:[
    AppComponent,
    RoomTypeComponent,
    HomeComponent,
    DetailsComponent,
    ContactUsComponent,
    LoginComponent,
    ForgotComponent,
    SignupComponent,
    PasswordChangeComponent,
    FacilitiesComponent,
    BedAllocationComponent,
    BillingComponent,
    AdminComponent,
    ReceptionComponent,
    DepartmentListComponent,
    WardComponent,
    AddpatientComponent,
    EditComponent,
    RoomComponent,
    AddroomComponent,
    RoomKindComponent,
    EditroomComponent,
    InpatientHomeComponent,
    PatientregistrationComponent,
    BedComponent,
    DoctorComponent,
    DoctorlistComponent,
    EnquiryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [RoomTypeComponent]
})
 export class AppModule { }

