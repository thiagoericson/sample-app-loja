import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Endereco } from './endereco';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const cadastrarEnderecoUrl = 'http://localhost:8086/clientes';
const atualizarEnderecoUrl = 'http://localhost:8087/clientes';
const consultarEnderecoUrl = 'http://localhost:8088/clientes';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  addEndereco (id: number, endereco): Observable<Endereco> {
    const url = `${cadastrarEnderecoUrl}/${id}/enderecos`;
    return this.http.post<Endereco>(url, endereco, httpOptions).pipe(
      tap((endereco: Endereco) => console.log(`adicionou o endereco`)),
      catchError(this.handleError<Endereco>('addEndereco'))
    );
  }

  getEndereco(idCliente: number, id: number): Observable<Endereco> {
    const url = `${consultarEnderecoUrl}/${idCliente}/enderecos/${id}`;
    return this.http.get<Endereco>(url).pipe(
      tap(_ => console.log(`leu o cliente id=${id}`)),
      catchError(this.handleError<Endereco>(`getEndereco idCliente=${idCliente} id=${id}`))
    );
  }

  updateEndereco(idCliente: number, id: number, endereco): Observable<any> {
    const url = `${atualizarEnderecoUrl}/${idCliente}/enderecos/${id}`;
    return this.http.put(url, endereco, httpOptions).pipe(
      tap(_ => console.log(`atualiza o cliente com id=${id}`)),
      catchError(this.handleError<Endereco>('updateEndereco'))
    );
  }

  deleteEndereco (idCliente: number, id: number): Observable<Endereco> {
    const url = `${atualizarEnderecoUrl}/${idCliente}/enderecos/${id}`;
    return this.http.delete<Endereco>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o endereco com idCliente=${idCliente} id=${id}`)),
      catchError(this.handleError<Endereco>('deleteCliente'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
