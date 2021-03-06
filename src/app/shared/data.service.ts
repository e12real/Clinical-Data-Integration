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

  readonly RPKI_API_J = 'http://sdp2.cse.uconn.edu:8080';

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

  public sendTokenization() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const graphEndpoint = this.RPKI_API_J + '/process';
    return this.httpClient.post(graphEndpoint, {
      "PID": "P88", 
      "Comments":"I prescribed 3 doses of Advil to John because of severe pain. He should take 1 capsule every 3 days"
    }).pipe(retry(3), catchError(this.handleError));
  }

  public getQuery() {
    const graphEndpoint = this.RPKI_API_J + '/processQuery';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

}