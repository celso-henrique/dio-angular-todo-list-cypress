import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { todomodel } from './todomodel';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiURL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch todos list
  getTodoList(): Observable<todomodel[]> {
    return this.http.get<todomodel[]>(this.apiURL + '/ToDoModels')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch todo
  getTodo(id): Observable<todomodel> {
    return this.http.get<todomodel>(this.apiURL + '/ToDoModels/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create todo
  createTodo(mytodo): Observable<todomodel> {
    console.log('trying to save', JSON.stringify(mytodo));
    return this.http.post<todomodel>(this.apiURL + '/ToDoModels', JSON.stringify(mytodo), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update todo
  updateTodo(id, mytodo): Observable<todomodel> {
    console.log('trying to update',id, mytodo);
    return this.http.put<todomodel>(this.apiURL + '/ToDoModels/' + id, JSON.stringify(mytodo), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete todo
  deleteTodo(id){
    return this.http.delete<todomodel>(this.apiURL + '/ToDoModels/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
