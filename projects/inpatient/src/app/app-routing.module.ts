import { NgModule } from '@angular/core';
import { RouterModule, Routes,RouterOutlet } from '@angular/router';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { AddroomComponent } from './addroom/addroom.component';
import { AdminComponent } from './admin/admin.component';
import { BedAllocationComponent } from './bed-allocation/bed-allocation.component';
import { BedComponent } from './bed/bed.component';
import { BillingComponent } from './billing/billing.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DepartmentListComponent } from './departmentlist/departmentlist.component';
import { DetailsComponent } from './details/details.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { EditComponent } from './edit/edit.component';
import { EditroomComponent } from './editroom/editroom.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PatientregistrationComponent } from './patientregistration/patientregistration.component';
import { ReceptionComponent } from './reception/reception.component';
import { RoomKindComponent } from './room-kind/room-kind.component';
import { RoomComponent } from './room/room.component';
import { SignupComponent } from './signup/signup.component';
import { WardComponent } from './ward/ward.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'details',component:DetailsComponent},
  {path:'contactus',component:ContactUsComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'signup',component:SignupComponent},
  {path:'otp',component:PasswordChangeComponent},
  //  {path:'receptionist/:billing',component:BillingComponent},
  {path:'admin',component:AdminComponent,
  children:[
    {
      path:'department',component:DepartmentListComponent
    },
    {
      path:'wards',component:WardComponent
    },
    {path:'rooms',component:RoomComponent},
    {path:'roomkind',component:RoomKindComponent},
    {path:'bed',component:BedComponent},
{path:'addroom',component:AddroomComponent},
  ]

},
{
  path:'department',component:DepartmentListComponent
},
{path:'roomkind',component:RoomKindComponent},
{path:'bed',component:BedComponent},
{
  path:'addPatient',component:AddpatientComponent
},
{
  path:'edit/:id',component:EditComponent
},
{path:'patient',component:PatientregistrationComponent},
{path:'editRoom/:id',component:EditroomComponent},
{path:'wards',component:WardComponent},
{path:'rooms',component:RoomComponent},
{path:'addroom',component:AddroomComponent},
{path:'billing',component:BillingComponent},
{path:'doctor',component:DoctorComponent},
{path:'bedallocation',component:BedAllocationComponent},
{path:'enquiry',component:EnquiryComponent},
{path:'doctorlist',component:DoctorlistComponent},
{path:'receptionist',component:ReceptionComponent,
  children:[
    {
      path:'billing',component:BillingComponent
    },
    {
      path:'addPatient',component:AddpatientComponent
    },
    {
      path:'edit/:id',component:EditComponent
    },
    {path:'patient',component:PatientregistrationComponent},
    {path:'bedallocation',component:BedAllocationComponent},
    {path:'doctorlist',component:DoctorlistComponent},
  ]
  },
{path:'',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
