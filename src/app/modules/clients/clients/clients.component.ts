import { Component, OnInit } from '@angular/core';

import { ClientService } from '../shared/client.service';
import { Cliente } from '../shared/cliente';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = [ 'cpf', 'primeiroNome', 'ultimoNome', 'dataNascimento', 'sexo', 'profissao', 'acao' ];
  dataSource: Cliente[];

  isLoadingResults = true;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClientes()
    .subscribe(res => {
      this.dataSource = res['content'];
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
