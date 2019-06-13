import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente';
import { ContactListApiService } from 'src/app/services/contact-list-api.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.page.html',
  styleUrls: ['./dettagli-utente.page.scss'],
})
export class DettagliUtentePage implements OnInit {

  utente: Utente; //Contiene l' utente di cui voglio mostrare i dettagli
  idUtente: string; //Contiene l' id dell' utente di cui voglio i dettagli


  constructor(public utenteService: ContactListApiService, private activatedRoute: ActivatedRoute, private navCtrl: NavController) {

    this.utente = new Utente(); //Inizializzo l' oggetto utente
  }

  ngOnInit() {
    //Uso la classe ActivateRoute per recupare il parametro passato nel path
    this.activatedRoute.params.subscribe((params) =>this.idUtente=params.id);
    this.utenteService.getContactById(this.idUtente).subscribe(res => this.utente = res);
  }

  //Torno alla pagina precedente 
  goBack() {

    this.navCtrl.back();
  }
}
