import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEntrenadorComponent } from './pages/registro-entrenador/registro-entrenador.component';

const routes: Routes = [
  {path:"**", component:RegistroEntrenadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
