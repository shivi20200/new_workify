


import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent {
  userInfo: any;
  jobList: any[] = [];
  applications: any[] = [];
  isExpanded: boolean = false;

  constructor(private jobSrv: JobService) {
    // Get employerId from localStorage
    const employerId = localStorage.getItem('employerId');
    if (employerId !== null) {
      this.userInfo = { id: employerId }; // Set userInfo with the employerId
      this.getJobsByEmployer();
    }
  }

  // Fetch jobs by employerId
  getJobsByEmployer() {
    this.jobSrv.GetJobsByEmployerId(this.userInfo.id).subscribe((res: any) => {
      this.jobList = res;
    });
  }

  // You can expand job listing functionality if needed
  openJobs(job: any) {
    this.jobList.forEach(element => {
      element.isExpanded = false;
    });
    job.isExpanded = true;
    this.jobSrv.GetApplcationsByJobId(job.jobId).subscribe((res: any) => {
      this.applications = res;
    });
  }
}

