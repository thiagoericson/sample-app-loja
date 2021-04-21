import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// layouts
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

// modules
import { ClientsModule } from './modules/clients/clients.module';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
