import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'fichaclinica',
    loadChildren: () => import('./fichaclinica/fichaclinica.module').then( m => m.FichaclinicaPageModule)
  },
  {
    path: 'fichaclinica-create',
    loadChildren: () => import('./fichaclinica-create/fichaclinica-create.module').then( m => m.FichaclinicaCreatePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'fichaclinica-update',
    loadChildren: () => import('./fichaclinica-update/fichaclinica-update.module').then( m => m.FichaclinicaUpdatePageModule)
  },  {
    path: 'paciente-create',
    loadChildren: () => import('./paciente-create/paciente-create.module').then( m => m.PacienteCreatePageModule)
  },
  {
    path: 'paciente-update-delete',
    loadChildren: () => import('./paciente-update-delete/paciente-update-delete.module').then( m => m.PacienteUpdateDeletePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
