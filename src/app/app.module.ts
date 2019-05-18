import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { FormUtenteComponent } from './components/form-utente/form-utente.component';
import { ModificaUtenteComponent } from './components/modifica-utente/modifica-utente.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { UtenteServiceService } from './services/utente-service.service';


@NgModule({
  declarations: [
    AppComponent,
    ListaUtentiComponent,
    FormUtenteComponent,
    ModificaUtenteComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Modulo che permette di effettuare chiamate http
    FormsModule, //Modulo che permette di utilizzare ngForm
  ],
  providers: [UtenteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
