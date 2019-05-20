import { Component, OnInit } from '@angular/core';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  numeroContatti: Number;
  valoreDiRicerca: string;

  constructor(private utenteService: UtenteServiceService) {  }

  ngOnInit() {

    this.utenteService.numeroUtenti().subscribe(res => {
      this.numeroContatti = res;
    });
  }
}
