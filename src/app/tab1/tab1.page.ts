import { Component } from '@angular/core';
import { ContactListApiService } from '../services/contact-list-api.service';
import { Utente } from '../models/utente';
import { ActionSheetController, AlertController, PopoverController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //bottoniOrdinamentoAttivi: boolean; //Flag se indica se i bottoni per l' ordinamento sono mostrati (utile all' ng-if)
  researchValue: string; //Valore di ricerca utilizzato per cercare dei valori nei campi dei contatti
  utenti: Utente[]; //Array di Utenti che conterrà tutti gli utenti presenti nel database
  orderedByName: boolean; //Flag che indica se l' array è ordinato per nome
  orderedBySurname: boolean; //Flag che indica se l' array è ordinato per nome
  utente: Utente; //Variabile di tipo utente che conterrà i dati dell' utente clickato (Utile per mostrare alcuni dati nell' actionSheet e nell' alert)

  /* 
   * Inietto ContactListApiService che mi permette di fare le chiamate HTTP
   * Inietto ActionSheetController che mi permette di visualizzare e fare operazioni con l' actionSheet
   * Inietto AlertController che mi permette di visualizzare e fare operazioni con l' alert
   */
  constructor(private utenteService: ContactListApiService, public actionSheetController: ActionSheetController, public alertController: AlertController, private navCtrl: NavController, private router: Router) {

    this.getAllContacts().subscribe(res => this.utenti = res); 

    this.orderedByName = false; //All' inizio i contatti avranno l' ordine in cui sono memorizzati nel database
    this.orderedBySurname = false; //All' inizio i contatti avranno l' ordine in cui sono memorizzati nel database
    this.researchValue = '';
  }

  //Metodo che ritorna una lista di observable contente tutti gli utente presenti nel database
  getAllContacts (): Observable<Utente[]> {

    return this.utenteService.getAllContacts();
  }

  //Ordina i contatti per nome
  orderByName (): Observable<Utente[]> {

    //Mette a true il flag per dire che è ordinato per nome, a falso quello per dire che è ordinato per cognome
    this.orderedByName = true;
    this.orderedBySurname = false;

    return this.utenteService.orderByName();
  }

  //Ordina i contatti per cognome
  orderBySurname (): Observable<Utente[]> {

    this.orderedByName = false;
    this.orderedBySurname = true;

    return this.utenteService.orderBySurname();
  }

  /*
   * Effettua la ricerca nel database del valore researchValue in tutti i campi dei record del database
   */
  research () {

    //Se l' utente ha inserito uno spazio ritorna la lista dei contatti completa
    if(this.researchValue == ' '){

      this.utenteService.getAllContacts().subscribe(res => this.utenti = res);
    }

    //Se l' utente non ha inserito nulla ma ha cliccato il pulsante di ricerca restituisce la lista dei contatti completa
    else if(this.researchValue.length == 0){

      this.utenteService.getAllContacts().subscribe(res => this.utenti = res);
    }

    //Se l' utente ha inserito qualcosa viene effettuata la ricerca nel database tramite chiamata http ad un servizio rest che effettua la ricerca
    else{

      this.utenteService.research(this.researchValue).subscribe(res => this.utenti = res);
    }
  }

  /*
   * Elimina un contatto
   * Riceve come parametro l' id del contatto da eliminare
   */
  delete (id: string) {

    this.utenteService.delete(id).subscribe();
    window.location.reload();
  }


  /*
   * Metodo che presenta l' actionSheet al click su un contatto
   */
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
          //router.navigate mi permette il routing verso un' altra pagina anche passando dei parametri
          this.router.navigate(['/dettagli-utente', id]); //Mostra i dettagli di un utente
        }
      }, {
        text: 'Modifica',
        handler: () => {
          console.log('Modifica clicked');
        }
      }, {
        text: 'Elimina',
        handler: () => {
          this.utenteService.getContactById(id).subscribe(res => this.utente = res);
          this.presentAlertConfirm(this.utente);
        }
      }, {
        text: 'Chiudi',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  /*
   * Metodo che permette di mostrare l' alert per confermare l' eliminazione di un utene
   * Riceve in input una variabile di tipo utente che contiene i dati dell' utente da eliminate
   */
  async presentAlertConfirm(utente: Utente) {

    //Creo l' alert utile all' eliminazione dell' utente clickato
    const alert = await this.alertController.create({

      header: 'Elimina', //Titolo (scopo dell' alert)
      message: 'Stai per eliminare ' + utente.nome + ' ' + utente.cognome, //Messaggio dell' alert
      buttons: [ //Lista dei bottoni che mostrerà l' alert
        { //Bottone per annullare l' eliminazione
          text: 'Indietro',
          role: 'cancel',
          cssClass: 'secondary',
        }, 
        { //Bottone per confermare ed eliminare l' utente
          text: 'Elimina',
          handler: () => { //Handler indica l' operazione che farà l' alert al click del bottone
            this.delete(utente.id);
          }
        }
      ]
    });

    await alert.present(); //Mostro l' alert
  }

  /*
   * Metodo che mi permette di fare il refresh dei contatti
   */
  doRefresh(event) {
    
    this.getAllContacts(); //Carico tutti i contatti

    //Mostro l' icona di refreshing per un tempo prestabilito (in questo caso 1500 millisecondi)
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
}