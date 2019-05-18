import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/models/utente';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit {

  valoreRicerca: string;
  utenti: Utente[];
  nomi: any;
  cognomi: any;
  flag: boolean;

  constructor(private utenteService: UtenteServiceService) {}

  ngOnInit() {
    this.utenteService.getByOrderName().subscribe(data => {
      this.utenti = data;
    });
    this.flag = true;
  }

  deleteUser(id: string, nome: string, cognome: string){
   
    //richiama la funzione delete del service utente che permette di eliminare un utente nel database
    this.utenteService.delete(id).subscribe();

    //avvisa tramite un alert che l' utente è stato eliminato
    if(nome == null){//se il nome è null stampa solo il cognome in modo di non stampare anche il null nell' alert
      alert(cognome + ' è stato eliminato');
    }
    else if(cognome == null){//se il cognome è null stampa solo il nome in modo di non stampare anche il null nell' alert
      alert(nome + ' è stato eliminato');
    }
    else{// stampa nome e cognome dell' utente eliminato
      alert(nome + ' ' + cognome + ' è stato eliminato');
    }

    //permette il ricaricamento della pagina in modo da avere la lista dei contatti aggiornata
    window.location.reload();
  }

  //funzione che permette di copiare il numero nella clipboard e poterlo incollare dove si vuole
  copia(valoreDaCopiare: string) {

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = valoreDaCopiare;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ordinaNome(){
    if(this.flag == true){
      this.utenteService.getByOrderName().subscribe(data => {
        this.utenti = data;
      });
    }
  }

  ordinaCognome(){

    if(this.flag == true){
      this.utenteService.getByOrderSurname().subscribe(data => {
        this.utenti = data;
      });
    }
  }

  onSubmit(){
    console.log(this.valoreRicerca)
    if(this.valoreRicerca.length == 0){
      
      this.ngOnInit();
    }
    else{
      this.utenteService.ricercaUtente(this.valoreRicerca).subscribe(data => {
        this.utenti = data;
      });
      this.flag = false;
    }
  }
}