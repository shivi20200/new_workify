import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiEndPoint: string = 'https://localhost:7216/api/';
  jwtHelper = new JwtHelperService(); // Instantiating JwtHelperService directly


  constructor(private http: HttpClient) { }

// Register a new user
registerUser(obj: any): Observable<any> {
  return this.http.post(this.apiEndPoint + 'User/register', obj); 
}

  // Login user
  login(obj: any) {
    return this.http.post(this.apiEndPoint + 'Auth/login', obj);
  }

 // Fetch active job listings
 GetActiveJobs() {
  return this.http.get(this.apiEndPoint + 'JobListing');
}


  // Add company
  addCompany(company: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint }Employer`, company);
  }

  // Post a job
  postJob(job: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint }Joblisting`, job);
  }

  // Fetch all employers
  getEmployers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiEndPoint }Employer`);
  }

  GetJobsByEmployerId(employerid : number) {
    return this.http.get(this.apiEndPoint + 'JobListing/employer/'+ employerid)
  }
  GetApplcationsByJobId(jobId: number) {
    return this.http.get(this.apiEndPoint + 'JobListing/employer/' + jobId)
  }  

  GetJobListingById(jobid: number) {
    return this.http.get(this.apiEndPoint + 'JobListing/' + jobid)
  } 


  SendJobApplication(data: FormData) {
    return this.http.post(this.apiEndPoint +'JobSeeker', data);
  }

  filterJobs(filterData: any): Observable<any> {
    // Create a filtered object to include only non-empty fields
    const params: any = {};
    
    // Only add the keys that have non-empty values
    if (filterData.title) params.title = filterData.title;
    if (filterData.location) params.location = filterData.location;
    if (filterData.minSalary) params.minSalary = filterData.minSalary;
    if (filterData.jobType) params.jobType = filterData.jobType;
    if (filterData.skills) params.skills = filterData.skills;
  
    // Send the request with only the filled parameters
    return this.http.get<any>(this.apiEndPoint + 'JobListing/filter', { params });
  }
  


}