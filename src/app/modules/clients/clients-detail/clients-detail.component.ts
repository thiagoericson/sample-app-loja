import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientService } from '../shared/client.service';
import { Cliente } from '../shared/cliente';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.scss']
})
export class ClientsDetailComponent implements OnInit {

  cliente: Cliente;
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id']);
  }

  getCliente(id) {
    this.clientService.getCliente(id)
      .subscribe(data => {
        this.cliente = data;
        console.log(this.cliente);
        this.isLoadingResults = false;
    });
  }

  deleteCliente(id, nome: string) {
    if(confirm("Tem certeza que deseja remover o Cliente: " + nome)) {
      this.isLoadingResults = true;
      this.clientService.deleteCliente(id)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/clients']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
  }

}
