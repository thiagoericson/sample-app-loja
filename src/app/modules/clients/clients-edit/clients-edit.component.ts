import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientService } from '../shared/client.service';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.scss']
})
export class ClientsEditComponent implements OnInit {

  id: number;
  clientForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private clientService: ClientService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id']);
    this.clientForm = this.formBuilder.group({
      'cpf' : [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      'primeiroNome' : [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      'ultimoNome' : [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      'dataNascimento' : [null, [Validators.required]],
      'sexo' : [null, [Validators.maxLength(1)]],
      'salario' : [0],
      'profissao' : [null, [Validators.maxLength(30)]],
    });
  }

  getCliente(id) {
    this.clientService.getCliente(id).subscribe(data => {
      this.id = data.id;
      this.clientForm.setValue({
        cpf: data.cpf,
        primeiroNome: data.primeiroNome,
        ultimoNome: data.ultimoNome,
        dataNascimento: data.dataNascimento,
        sexo: data.sexo,
        salario: data.salario,
        profissao: data.profissao
      });
    });
  }

  updateCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.clientService.updateCliente(this.id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/clients/detail/' + this.id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
