import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { OperativeAgmarComponent } from './components/operative-agmar/operative-agmar.component';

const routes: Routes = [
  {
    path: 'plan',
    component: MainViewComponent,
    children: [
      {
        path: 'operative-agmar',
        component: OperativeAgmarComponent,
      },
      {
        path: '',
        redirectTo: 'operative-agmar',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'plan',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
