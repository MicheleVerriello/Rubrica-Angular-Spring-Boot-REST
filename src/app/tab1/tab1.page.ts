import { Component } from '@angular/core';
import { ContactListApiService } from '../services/contact-list-api.service';
import { Utente } from '../models/utente';
import { ActionSheetController, AlertController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  numeroContatti: Number; //Numero dei contatti presenti nel database
  bottoniOrdinamentoAttivi: boolean; //Flag se indica se i bottoni per l' ordinamento sono mostrati (utile all' ng-if)
  researchValue: string; //Valore di ricerca utilizzato per cercare dei valori nei campi dei contatti
  utenti: Utente[]; //Array di Utenti che conterrà tutti gli utenti presenti nel database
  orderedByName: boolean; //Flag che indica se l' array è ordinato per nome
  orderedBySurname: boolean; //Flag che indica se l' array è ordinato per nome

  //Inietto ContactListApiService che mi permette di fare le chiamate HTTP
  constructor(private utenteService: ContactListApiService, public actionSheetController: ActionSheetController, public alertController: AlertController) {

    this.getAllContacts(); 

    this.orderedByName = false; //All' inizio i contatti avranno l' ordine in cui sono memorizzati nel database
    this.orderedBySurname = false; //All' inizio i contatti avranno l' ordine in cui sono memorizzati nel database
    this.researchValue = '';
    this.contaContatti();
  }

  getAllContacts () {

    this.utenteService.getAllContacts().subscribe(res => this.utenti = res);
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

  contaContatti (){

    return this.utenteService.countContacts().subscribe(res => this.numeroContatti = res); 
  }

  research () {
    if(this.researchValue == ' '){

      this.utenteService.getAllContacts().subscribe(res => this.utenti = res);
    }
    else if(this.researchValue.length == 0){

      this.utenteService.getAllContacts().subscribe(res => this.utenti = res);
    }
    else{

      this.utenteService.research(this.researchValue).subscribe(res => this.utenti = res);
    }
  }

  delete (id: string) {

    this.utenteService.delete(id).subscribe();
    window.location.reload();
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet-tab-uno',
      header: 'Opzioni',
      buttons: [{
        text: 'Chiama',
        handler: () => {
          console.log('Call clicked');
        }
      }, {
        text: 'Dettagli',
        handler: () => {
          console.log('Mostra dettagli clicked');
        }
      }, {
        text: 'Modifica',
        handler: () => {
          console.log('Modifica clicked');
        }
      }, {
        text: 'Elimina',
        handler: () => {
          this.presentAlertConfirm(id);
        }
      }, {
        text: 'Chiudi',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Elimina',
      message: 'Stai per eliminare',
      buttons: [
        {
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Elimina',
          handler: () => {
            this.delete(id);
          }
        }
      ]
    });

    await alert.present();
  }
}