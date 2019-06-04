import { Component } from '@angular/core';
import { Utente } from '../models/utente';
import { ContactListApiService } from '../services/contact-list-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  utente: Utente;

  constructor(private utenteService: ContactListApiService) {

    this.utente = new Utente();
  }

  //Salva nel database un nuovo contatto
  login () {
    console.log("sono in login")
    this.utenteService.addNewContact(this.utente).subscribe(result => console.log("inserito"));
  }
}
