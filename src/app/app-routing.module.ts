import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUtenteComponent } from './components/form-utente/form-utente.component';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { ModificaUtenteComponent } from './components/modifica-utente/modifica-utente.component';
import { HomeComponent } from './components/home/home.component';

//la variabile routes di tipo Routes contiene tutti i path dei componenti, utili per effettuare il routing tra pagine
const routes: Routes = [
  { path: 'utenti', component: ListaUtentiComponent },
  { path: 'adduser', component: FormUtenteComponent },
  { path: 'modificautente/:id', component: ModificaUtenteComponent},
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
