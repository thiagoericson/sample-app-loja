import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AddressService } from '../shared/address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {

  id: number;
  idCliente: number;
  addressForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private addressService: AddressService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idCliente = this.route.snapshot.params['idCliente'];
    this.getEndereco(this.idCliente, this.id);
    this.addressForm = this.formBuilder.group({
      'logradouro' : [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      'numero' : [null, [Validators.required]],
      'bairro' : [null, [Validators.required, Validators.maxLength(100)]],
      'cidade' : [null, [Validators.maxLength(100)]],
      'uf' : [null, [Validators.required]],
      'cep' : [null, [Validators.minLength(8), Validators.maxLength(8)]],
    });
  }

  getEndereco(idCliente, id) {
    this.addressService.getEndereco(idCliente, id).subscribe(data => {
      this.id = data.id;
      this.addressForm.setValue({
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        cep: data.cep
      });
    });
  }

  updateEndereco(form: NgForm) {
    this.isLoadingResults = true;
    this.addressService.updateEndereco(this.idCliente, this.id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/clients/detail/' + this.idCliente]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
