import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// layouts
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

// modules
import { ClientsModule } from './modules/clients/clients.module';
import { AddressesModule } from './modules/addresses/addresses.module';

const routes: Routes = [
  {
    path: 'clients',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            loadChildren: () => ClientsModule
        }
    ]
  },
  {
    path: 'clients/address',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            loadChildren: () => AddressesModule
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
