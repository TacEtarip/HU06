import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { OperativeAgmarComponent } from './components/operative-agmar/operative-agmar.component';

const routes: Routes = [
  {
    path: 'ordenesServicio',
    component: MainViewComponent,
    children: [
      {
        path: 'planoperagmar',
        component: OperativeAgmarComponent,
      },
      {
        path: 'planoperagmar/:token/:refreshToken/:userId',
        component: OperativeAgmarComponent,
      },
      {
        path: '',
        redirectTo: 'planoperagmar',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'ordenesServicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
