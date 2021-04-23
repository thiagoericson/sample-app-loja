import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressNewComponent } from './address-new/address-new.component';
import { AddressEditComponent } from './address-edit/address-edit.component';

const routes: Routes = [
  { path: 'new/:idCliente', component: AddressNewComponent },
  { path: 'edit/:id/:idCliente', component: AddressEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
