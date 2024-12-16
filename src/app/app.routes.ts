import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CreateNewJobComponent } from './pages/create-new-job/create-new-job.component';

import { JobListingComponent } from './pages/job-listing/job-listing.component';

import { AppliedJobsComponent } from './pages/applied-jobs/applied-jobs.component';

export const routes: Routes = [
      
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegistrationComponent
      },
      {
        path:'appliedjobs',
        component:AppliedJobsComponent
      },
      {
        path:'new-job',
        component:CreateNewJobComponent
      },
      {
        path:'jobs',
        component:JobsComponent
      },

      {
        path:'job-detail/:jobid',
        component:JobDetailsComponent
      },
   
      {
        path:'job-listing',
        component:JobListingComponent
      },
  
    
       {
        path:'**',
        component:HomeComponent
       }
];
