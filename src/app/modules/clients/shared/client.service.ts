import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from './cliente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const cadastrarClienteUrl = 'http://localhost:8083/clientes';
const consultarClienteUrl = 'http://localhost:8084/clientes';
const atualizarClienteUrl = 'http://localhost:8085/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClientes (): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(consultarClienteUrl)
      .pipe(
        tap(clientes => console.log('leu os clientes')),
        catchError(this.handleError('getClientes', []))
      );
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${consultarClienteUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`leu o cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  addCliente (cliente): Observable<Cliente> {
    return this.http.post<Cliente>(cadastrarClienteUrl, cliente, httpOptions).pipe(
      tap((cliente: Cliente) => console.log(`adicionou o cliente`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  updateCliente(id, cliente): Observable<any> {
    const url = `${atualizarClienteUrl}/${id}`;
    return this.http.put(url, cliente, httpOptions).pipe(
      tap(_ => console.log(`atualiza o cliente com id=${id}`)),
      catchError(this.handleError<any>('atualizaCliente'))
    );
  }

  updateSalarioCliente(id, salario): Observable<any> {
    const url = `${atualizarClienteUrl}/${id}/salario`;
    return this.http.patch(url, salario, httpOptions).pipe(
      tap(_ => console.log(`atualiza o salario do cliente com id=${id}`)),
      catchError(this.handleError<any>('updateSalarioCliente'))
    );
  }

  deleteCliente (id): Observable<Cliente> {
    const url = `${atualizarClienteUrl}/${id}`;
    return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o cliente com id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
