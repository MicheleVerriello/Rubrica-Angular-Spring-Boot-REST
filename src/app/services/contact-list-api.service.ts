import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utente } from '../models/utente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactListApiService {

  contactListUrl = "http://localhost:8080/utente";

  //Inietto l' HttpClient per poter effettuare delle chiamate http (in questo caso ai servizi rest creati da me)
  constructor(public http: HttpClient) {

  }

  //Ritorna la lista dei contatti
  getAllContacts (): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.contactListUrl);
  }

  //Aggiungo un nuovo contatto sul database
  addNewContact (utente: Utente) {
    return this.http.post(this.contactListUrl,utente);
  }

  //Ritorna la lista dei contatti ordinata per nome
  orderByName (): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.contactListUrl + '/ordina/nome');
  } 

  //Ritorna la lista dei contatti ordinata per cognome
  orderBySurname (): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.contactListUrl + '/ordina/cognome');
  }
}