import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

// dominio.com/
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    // When people goes to dominio.com/ then it is going back to heroes page
    // full means it need to be exacttly like this dominio.com/
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    // any toher path is going to 404
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
