import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../models/utente';
import { Observable } from 'rxjs';

/*
 * Http.get effettua una chiamata get al RestController e richiede in input solo un URL
 * Http.post effettua una chiamata post al RestController e oltre all' url, richiede in input anche un oggetto 
 */

@Injectable()

//UtenteService è un service che ci permette di effettuare chiamate get e post al RestController tramite URL
export class UtenteServiceService {

  private utenteUrl: string; //contiene l' URL per collegarsi al rest controller che gestisce gli utenti
  private urlTemp: string; //conterrà l' URL precedente con le diverse aggiunte in base al metodo da richiamare

  constructor(private http: HttpClient) { 
    
    this.utenteUrl = 'http://localhost:8080/utente';
  }

  //Ritorna la lista di tutti gli utenti dopo la chiamata get al RestController
  public findAll(): Observable<Utente[]> {

    return this.http.get<Utente[]>(this.utenteUrl);
  }

  //Passa al metodo del controller un oggetto di tipo utente che verrà salvato nel database
  public save(utente: Utente) {

    return this.http.post<Utente>(this.utenteUrl, utente);
  }

  //Passa l' id dell' utente nell' URL e il controller tramite un suo metodo 'delete()' lo elimina dal database
  public delete(id: string) {

    this.urlTemp = this.utenteUrl + '/' + id;
    return this.http.get(this.urlTemp);
  }

  //Passa un oggetto utente al controller che tramite un suo metodo aggiornerà i valori di quell' utente nel database
  public update(utente: Utente){
    this.urlTemp = this.utenteUrl + '/modifica';
    return this.http.post<Utente>(this.urlTemp, utente);
  }

  //Ritorna l' utente passando l' id
  public getUtenteById(id: string){

    this.urlTemp = this.utenteUrl + '/recupera/' + id;
   
    return this.http.get<Utente>(this.urlTemp);
  }

  //Ritorna la lista degli utenti ordinata per nome
  public getByOrderName(): Observable<Utente[]>{

    this.urlTemp = this.utenteUrl + '/ordina/nome';
   
    return this.http.get<Utente[]>(this.urlTemp);
  }

  //Ritorna la lista degli utenti ordinata per cognome
  public getByOrderSurname(): Observable<Utente[]>{

    this.urlTemp = this.utenteUrl + '/ordina/cognome';
   
    return this.http.get<Utente[]>(this.urlTemp);
  }

  //Passa il valore di ricerca nell' URL e il controller restituisce la lista degli utenti in cui è presente quel valore in almeno un campo
  public ricercaUtente(valoreDiRicerca: string): Observable<Utente[]>{

    this.urlTemp = this.utenteUrl + '/cerca/' + valoreDiRicerca;
    return this.http.get<Utente[]>(this.urlTemp);
  }

  public numeroUtenti(): Observable<Number>{

    this.urlTemp = this.utenteUrl + '/numeroutenti';
    return this.http.get<Number>(this.urlTemp);
  }
}
