


import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from 'src/app/service/job.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  activeJobId: number = 0;
  jobObj: any;
  userInfo: any;
  isLoggedIn: boolean = false;
  showApplicationForm: boolean = false;

  // Form to hold the application details
  applicationForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private jobSrc: JobService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    const userData = localStorage.getItem('jobLoginUser');
    if (userData == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.userInfo = JSON.parse(userData); // Contains { id, username, email, role }
    }

    // Initialize form group with UserId from userInfo.id
    this.applicationForm = this.fb.group({
      UserId: [this.userInfo?.id || 0], // Use 'id' from jobLoginUser as UserId
      FullName: [this.userInfo?.username || ''], // Set FullName from username
      ContactNumber: [''],
      Education: [''],
      Skills: [''],
      resumeFile: [null]
    });

    // Subscribe to route params to get activeJobId
    this.activateRoute.params.subscribe((res: any) => {
      this.activeJobId = res.jobid;
      this.getJobDetail();
    });
  }

  getJobDetail() {
    this.jobSrc.GetJobListingById(this.activeJobId).subscribe((res: any) => {
      this.jobObj = res;
    });
  }

  toggleApplicationForm() {
    this.showApplicationForm = !this.showApplicationForm;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.applicationForm.patchValue({ resumeFile: file });
  }

  submitApplication() {
    const formData = new FormData();
    formData.append('UserId', this.applicationForm.value.UserId);
    formData.append('FullName', this.applicationForm.value.FullName);
    formData.append('ContactNumber', this.applicationForm.value.ContactNumber);
    formData.append('Education', this.applicationForm.value.Education);
    formData.append('Skills', this.applicationForm.value.Skills);
    formData.append('resumeFile', this.applicationForm.value.resumeFile);

    // Send the application data to the backend
    this.jobSrc.SendJobApplication(formData).subscribe({
      next: (res) => {
        alert('Application Submitted Successfully!');
        this.showApplicationForm = false;
      },
      error: (err) => {
        alert('Error submitting application');
      }
    });
  }
}
