import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';









@Injectable({
  providedIn: 'root'
})
export class ReservaTurnosService {
  apiUrlPersona = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona/';
  apiUrlReserva = 'http://gy7228.myfoscam.org:8080/stock-pwfe/reserva/';

  constructor(private http: HttpClient) { }

   header = { 'Content-Type': 'application/json', 'usuario' : 'gustavo'};



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }


  putAsistencia(data) {
    const url: string = this.apiUrlReserva;
    const httpOptions = {
      headers: new HttpHeaders(this.header)
    };
    return this.http.put(url, JSON.stringify(data), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }




  getHorarioDisponibleFisio(idFisio, fecha) {
    const url: string = this.apiUrlPersona + idFisio.toString() + '/agenda';
    console.log(url);
    let params = new HttpParams();
    params = params.append('fecha', fecha);
    params = params.append('disponible', 'S');


    console.log(params);
    const httpOptions = {
      headers: new HttpHeaders(this.header),
      // tslint:disable-next-line: object-literal-shorthand
      params: params
    };

    return this.http.get(url, httpOptions ).pipe(
      map(this.extractData),
      catchError(this.handleError));

  }


  postAgenda(data) {


  const url: string = this.apiUrlReserva;
  const httpOptions = {
    headers: new HttpHeaders(this.header)
  };
  return this.http.post(url, JSON.stringify(data), httpOptions)
    .pipe(
      catchError(this.handleError)
    );

  }


  deleteAgenda(idReserva: number) {
    const url: string = this.apiUrlReserva + idReserva;
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders(this.header)
    };

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );


  }

  getAgendaLibreOcupado( fecha: string, idfisio: string, disponible?: string ): Observable<any> {
     // tslint:disable-next-line: prefer-const
    const url: string = this.apiUrlPersona + idfisio + '/agenda';

    let params = new HttpParams();
    params = params.append('fecha', fecha);
    if (disponible == null) {
      params = params.append('disponible', 'S');
    }

    console.log(params);
    const httpOptions = {
      headers: new HttpHeaders(this.header),
      // tslint:disable-next-line: object-literal-shorthand
      params: params
    };
    return this.http.get(url, httpOptions ).pipe(
      map(this.extractData),
      catchError(this.handleError));
}



public getFilterReservas(query: object) {
  const url: string = this.apiUrlReserva;
  let params = new HttpParams();
  params = params.append('ejemplo', JSON.stringify(query));
  const httpOptions = {
    headers: new HttpHeaders(this.header),
    params
  };
  return this.http.get(url, httpOptions ).pipe(
    map(this.extractData),
    catchError(this.handleError));


}

public getPersonas(login?) {
    let params = new HttpParams();
    let query = {soloUsuariosDelSistema: null};

    const url: string = this.apiUrlPersona;
    // tslint:disable-next-line: prefer-const
    if (login === true) {
      query.soloUsuariosDelSistema = true;

    }
    console.log(JSON.stringify(query));
    params = params.append('ejemplo', JSON.stringify(query));

    const httpOptions = {
      headers: new HttpHeaders(this.header),
      params
    };



    return this.http.get(url, httpOptions ).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }





 /* 
  getClassroomById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postClassroom(data): Observable<any> {
    const url = `${apiUrl}/add_with_students`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  updateClassroom(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteClassroom(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
*/
  


}
