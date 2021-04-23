import { Component, OnInit, Input } from '@angular/core';

import { Endereco } from '../../../shared/endereco';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  @Input() id_cliente: number;
  @Input() enderecos: Endereco[];

  displayedColumns: string[] = [ 'logradouro', 'numero', 'bairro', 'cidade', 'uf', 'cep', 'acao' ];

  constructor() { }

  ngOnInit(): void {
  }

  deleteEndereco(id: number, id_cliente: number, logradouro: string) {
    if(confirm("Deseja realmente deletar o endereço: " + logradouro)) {

    }
  }
}
