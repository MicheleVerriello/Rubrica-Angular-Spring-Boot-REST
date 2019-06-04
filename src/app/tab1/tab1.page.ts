import { Component } from '@angular/core';
import { ContactListApiService } from '../services/contact-list-api.service';
import { Utente } from '../models/utente';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  utenti: Utente[]; //Array di Utenti che conterrà tutti gli utenti presenti nel database
  orderedByName: boolean; //Flag che indica se l' array è ordinato per nome
  orderedBySurname: boolean; //Flag che indica se l' array è ordinato per nome

  //Inietto ContactListApiService che mi permette di fare le chiamate HTTP
  constructor(private utenteService: ContactListApiService) {

    this.utenteService.getAllContacts().subscribe(res => this.utenti = res); 

    this.orderedByName = false; //All' inizio i contatti avranno l' ordine in cui sono memorizzati nel database
    this.orderedBySurname = false; //All' inizio i contatti avranno l' ordine in cui sono memorizzati nel database
  }

  //Ordina i contatti per nome
  orderByName () {

    this.utenteService.orderByName().subscribe(res => this.utenti = res);

    this.orderedByName = true;
    this.orderedBySurname = false;
  }

  //Ordina i contatti per cognome
  orderBySurname () {

    this.utenteService.orderBySurname().subscribe(res => this.utenti = res);

    this.orderedByName = false;
    this.orderedBySurname = true;
  }
}
