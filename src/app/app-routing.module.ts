import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// layouts
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';

// modules
import { ClientsModule } from './modules/clients/clients.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { LoginModule } from './modules/login/login.module';

import { GuardService } from './core/service/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
        {
          path: '',
          loadChildren: () => LoginModule
        }
    ]
  },
  {
    path: 'clients',
    component: MainLayoutComponent,
    canActivate: [GuardService],
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
    canActivate: [GuardService],
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
