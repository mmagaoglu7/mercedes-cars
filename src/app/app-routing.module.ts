import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarEditComponent } from './pages/car-edit/car-edit.component';
import { carEditGuard } from './guards/car-edit.guard';

const routes: Routes = [
  {pathMatch: 'full' ,path: '', redirectTo: 'car-list'},
  {path: 'car-list', component: CarListComponent},
  {path: 'car-edit', canActivate: [carEditGuard], component: CarEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
