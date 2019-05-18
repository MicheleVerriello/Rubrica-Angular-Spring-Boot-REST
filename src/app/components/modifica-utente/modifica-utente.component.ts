import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { Utente } from 'src/app/models/utente';

@Component({
  selector: 'app-modifica-utente',
  templateUrl: './modifica-utente.component.html',
  styleUrls: ['./modifica-utente.component.css']
})
export class ModificaUtenteComponent implements OnInit {

  utenteDaModificare: Utente;
  utente: Observable<Utente>;
  public idUtente: string;

  //Inietto nel costruttore il Service (per le chiamate http) e il Router (per il routing tra componenti)
  constructor(private utenteService: UtenteServiceService, private route: ActivatedRoute, private router: Router) {
    this.utenteDaModificare = new Utente();
    this.utente = new Observable<Utente>();
  }

  ngOnInit() {

    this.route.params.subscribe((params) =>this.idUtente=params.id);

    this.utente = this.utenteService.getUtenteById(this.idUtente)
    console.log(this.utente.subscribe(data => {
      this.utenteDaModificare = data;
    }))
  }

  //Metodo che permette la modifica di un utente tramite la chiamata al service che è iniettato nel costruttore
  onSubmitModifica() {
    
    this.utenteService.update(this.utenteDaModificare).subscribe(result => this.vaiAllaListaUtenti());
  }

  //Effettua il routing verso il component lista-utenti
  vaiAllaListaUtenti(){
    this.router.navigate(['/utenti']);
  }
}
