import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import {NavListComponent} from "c:/Users/erich/seniorDesign/src/app/nav-list/nav-list.component"

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly RPKI_API = 'https://a314e36a-1f9d-4e75-bd5e-0ee22211cb34.mock.pstmn.io';

  readonly RPKI_API_M = 'https://sdpimageapi.azurewebsites.net/';

  readonly RPKI_API_J = 'http://sdp2.cse.uconn.edu:8080';

  validEmails: string[] = ["eric.hilhorst@uconn.edu"];
  validPasswords: string[] = ["test"];
  permission: boolean = false;
  activate: boolean = false;

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

  public getNLImageQuery(query: string) {
    const endpoint = this.RPKI_API_M + 'processquery';
    return this.httpClient.post(endpoint, {
      //query: formData["query"]
      query
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

  public sendTokenization(comment: string) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const graphEndpoint = this.RPKI_API_J + '/process';
    return this.httpClient.post(graphEndpoint, {
      "PID": "P88", 
      "Comments": comment
    }).pipe(retry(3), catchError(this.handleError));
  }

  public getQuery() {
    const graphEndpoint = this.RPKI_API_J + '/processQuery';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

  validate(email: string, password: string) {
    console.log(this.validEmails.includes(email))
    console.log(this.validPasswords.includes(password))
    if(this.validEmails.includes(email) && this.validPasswords.includes(password)) {
      this.permission = true;
      //this.navList.updatePermission();
      console.log(this.permission);
    }
    else {
      this.activate = true;
    }
  }

  public getPermission() : boolean{
    return this.permission;
  }

}