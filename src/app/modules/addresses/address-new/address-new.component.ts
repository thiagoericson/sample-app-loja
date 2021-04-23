import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AddressService } from '../shared/address.service';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.scss']
})
export class AddressNewComponent implements OnInit {

  idCliente: number;
  addressForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private addressService: AddressService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['idCliente'];
    this.addressForm = this.formBuilder.group({
      'logradouro' : [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      'numero' : [null, [Validators.required]],
      'bairro' : [null, [Validators.required, Validators.maxLength(100)]],
      'cidade' : [null, [Validators.required, Validators.maxLength(100)]],
      'uf' : [null, [Validators.required]],
      'cep' : [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });
  }

  addEndereco(form: NgForm) {
    this.isLoadingResults = true;
    this.addressService.addEndereco(this.idCliente, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/clients/detail/' + this.idCliente]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
