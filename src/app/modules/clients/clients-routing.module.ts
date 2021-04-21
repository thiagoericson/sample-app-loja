import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';
import { ClientsNewComponent } from './clients-new/clients-new.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'detail/:id', component: ClientsDetailComponent },
  { path: 'edit/:id', component: ClientsEditComponent },
  { path: 'new', component: ClientsNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
