import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientService } from '../shared/client.service';

@Component({
  selector: 'app-clients-new',
  templateUrl: './clients-new.component.html',
  styleUrls: ['./clients-new.component.scss']
})
export class ClientsNewComponent implements OnInit {

  clientForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private clientService: ClientService, private formBuilder: FormBuilder) { }

  // FIELD_KEY: [INITIAL_VALUE, [LIST_OF_VALIDATORS]]

  ngOnInit() {
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

  addCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.clientService.addCliente(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/clients']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
