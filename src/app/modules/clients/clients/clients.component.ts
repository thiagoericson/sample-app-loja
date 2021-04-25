import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ClientService } from '../shared/client.service';
import { Cliente } from '../shared/cliente';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = [ 'cpf', 'primeiroNome', 'ultimoNome', 'dataNascimento', 'sexo', 'profissao', 'acao' ];
//  dataSource: Cliente[];
  dataSource = new MatTableDataSource<any>();
  clients: any[];

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
//    this.clientService.getClientes()
//    .subscribe(res => {
//      this.dataSource = res['content'];
//      console.log(this.dataSource);
//      this.isLoadingResults = false;
//    }, err => {
//      console.log(err);
//      this.isLoadingResults = false;
//    });
    this.getClientes();
  }

//  ngAfterViewInit() {
//    this.dataSource = new MatTableDataSource(this.clients);
//    this.dataSource.paginator = this.paginator;
//  }

  pageChanged(event){
    this.isLoadingResults = true;
    let page = event.pageIndex;
    let size = event.pageSize;

    this.getClientes(page, size);
  }

  private getClientes(page = 0, size = 5, nome = null) {
    this.clientService.getClientesPage(page, size, '')
    .subscribe(res => {
      this.clients = res['content'];
      this.clients.length = res['totalElements'];

      console.log(res['totalElements']);

      this.dataSource = new MatTableDataSource<any>(this.clients);
      this.dataSource._updateChangeSubscription();

      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
