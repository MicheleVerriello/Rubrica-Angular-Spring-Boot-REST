package it.linksacademy.rest.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity //Utente è un' entità da mappare		
public class Utente {
	
	@Id //Implica che id sia la chiave primaria
	@GeneratedValue(strategy = GenerationType.AUTO) //Vuol dire che la chiava primaria è AUTO-INCREMENT
	private Long id;
	private String nome;
	private String cognome;
	private String numero;//numero di telefono
	private String email;
	
	
	/*Setters and Getters*/
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getCognome() {
		return cognome;
	}
	
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	
	public String getNumero() {
		return numero;
	}
	
	public void setNumero(String numero) {
		this.numero = numero;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return email;
	}
}
