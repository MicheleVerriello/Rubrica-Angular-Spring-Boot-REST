import { Component } from '@angular/core';
import { Utente } from '../models/utente';
import { ContactListApiService } from '../services/contact-list-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mostraCampi: boolean; //Flag utile a mostrare i campi alla pressione dell' icona '+'
  utente: Utente;

  constructor(private utenteService: ContactListApiService, public toastController: ToastController) {

    this.mostraCampi = false;
    this.utente = new Utente();
    this.utente.nome = '';
    this.utente.cognome = '';
  }

  //Salva nel database un nuovo contatto
  login () {
    
    this.utenteService.addNewContact(this.utente).subscribe(res => console.log("inserito"));
    this.presentToastWithOptions();
  }

  mostraCampiAggiuntivi() {

    this.mostraCampi = true;
  }

  nascondiCampiAggiuntivi() {

    this.mostraCampi = false;
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.utente.nome + ' ' + this.utente.cognome + ' aggiunto!',
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }
}
