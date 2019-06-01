import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactListApiService {

  contactListUrl = "localhost:8080/utente";

  constructor(public http: HttpClient) {

  }

  //Ritorna la lista dei contatti
  getAllContacts () {
    return this.http.get(this.contactListUrl);
  }
}