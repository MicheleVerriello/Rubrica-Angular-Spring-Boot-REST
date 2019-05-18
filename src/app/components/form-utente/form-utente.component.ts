import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { Utente } from 'src/app/models/utente';


@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {

  ngOnInit(){
  }

  utente: Utente;
 
  constructor(private route: ActivatedRoute, private router: Router, private userService: UtenteServiceService) {
    this.utente = new Utente();
  }
 
  onSubmit() {
    this.userService.save(this.utente).subscribe(result => this.vaiAllaListaUtenti());
  }
 
  vaiAllaListaUtenti() {
    this.router.navigate(['/utenti']);
  }
}
