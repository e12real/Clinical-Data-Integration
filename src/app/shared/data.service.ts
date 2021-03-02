import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly RPKI_API = 'https://a314e36a-1f9d-4e75-bd5e-0ee22211cb34.mock.pstmn.io';

  readonly RPKI_API_M = 'https://sdpimageapi.azurewebsites.net/';

  readonly RPKI_API_J = '137.99.26.2:8080';

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

  public getFindImages() {
    const graphEndpoint = this.RPKI_API_M + 'findimages';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }
  //http://sdpimageapi.azurewebsites.net/file/ + image name from the webservice.

  public sendFindImages() {
    const graphEndpoint = this.RPKI_API_M + 'findimages';
    return this.httpClient.post(graphEndpoint, {
      "pid":  "",
      "tags":  "x-ray"
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

  public getQuery() {
    const graphEndpoint = this.RPKI_API_J + '/processQuery';
    return this.httpClient.get(graphEndpoint).pipe(retry(3), catchError(this.handleError));
  }

}