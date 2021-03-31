import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly RPKI_API = 'https://a314e36a-1f9d-4e75-bd5e-0ee22211cb34.mock.pstmn.io';

  readonly RPKI_API_M = 'https://sdpimageapi.azurewebsites.net/';

  readonly RPKI_API_J = 'https://sdp2.cse.uconn.edu:8080';
  

  //readonly RPKI_API_P = '';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown Error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getImages() {
    const graphEndpoint = this.RPKI_API_M + 'findimages';
    return this.httpClient.post(graphEndpoint, {
      "pid":  "",
      "tags":  "x-ray"
      }).pipe(retry(3), catchError(this.handleError));
  }

  public getNLImageQuery(formData: { [x: string]: any }) {
    const endpoint = this.RPKI_API_M + 'processquery';
    return this.httpClient.post(endpoint, {
      query: formData["query"]
      }).pipe(retry(3), catchError(this.handleError));
  }

  public getGraphData() {
    const graphEndpoint = this.RPKI_API + '/hijack_time_summary';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

  public getTableData() {
    const graphEndpoint = this.RPKI_API + '/get_hijacks';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

  public getTokenization() {
    const graphEndpoint = this.RPKI_API_J + '/process';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

  public sendTokenization(pid: string, comment: string) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const graphEndpoint = this.RPKI_API_J + '/process';
    return this.httpClient.post(graphEndpoint, {
      "PID": pid, 
      "Comments": comment
    }).pipe(retry(3), catchError(this.handleError));
  }
  public sendAssisted(query){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const graphEndpoint =  'https:sdp2.cse.uconn.edu:8080/assisted-query';
    
    return this.httpClient.post(graphEndpoint, {
      "NLQuery": query
    }, {responseType: 'json'}).pipe(retry(1), catchError(this.handleError));
  }

  public getQuery() {
    const graphEndpoint = this.RPKI_API_J + '/processQuery';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

  public sendPatientCreation(fname: string, lname: string, pid: string, DOB: string, phone : string, ssn4: string){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const graphEndpoint =  'https:sdp2.cse.uconn.edu:8080/add-patient';
    return this.httpClient.post(graphEndpoint, {
      "Fname": fname, 
      "Lname": lname,
      "PID": pid,
      "DOB": DOB,
      "Phone": phone,
      "ssn4": ssn4,

    }).pipe(retry(3), catchError(this.handleError));
  }

}