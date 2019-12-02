import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'reserva-list',
    loadChildren: () => import('./reserva_turnos/reserva-list/reserva-list.module').then( m => m.ReservaListPageModule)
  },
  {
    path: 'reserva/:id',
    loadChildren: () => import('./reserva_turnos/reserva/reserva.module').then( m => m.ReservaPageModule)
  },  {
    path: 'reserva-create',
    loadChildren: () => import('./reserva_turnos/reserva-create/reserva-create.module').then( m => m.ReservaCreatePageModule)
  },
  {
    path: 'reserva-edit',
    loadChildren: () => import('./reserva_turnos/reserva-edit/reserva-edit.module').then( m => m.ReservaEditPageModule)
  },

 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
