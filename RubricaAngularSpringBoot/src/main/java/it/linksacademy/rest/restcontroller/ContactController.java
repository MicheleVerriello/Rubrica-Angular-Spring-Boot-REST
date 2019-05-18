package it.linksacademy.rest.restcontroller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.linksacademy.rest.models.Utente;
import it.linksacademy.rest.repositories.UtenteRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
//RestController per i contatti
public class ContactController {
	
	@Autowired //dependency injection per permettere di accedere al component UtenteRepository
	UtenteRepository utenteRepository;
	
	/*
	 * Il metodo getAll() restituisce la lista di tutti gli utenti presenti nel database con i relativi campi
	 */
	@Transactional
	@GetMapping("/utente")
	public List<Utente> getAll(){
		
		return utenteRepository.findAll();
	}
	
	/*
	 * Il metodo salva riceve in input un oggetto di tipo utente e lo salva nel database
	 */
	@Transactional
	@PostMapping("/utente")
	public void salva(@RequestBody Utente utente) {
		
		utenteRepository.save(utente);
	}
	
	/*
	 * Il metodo cancella riceve l' Id (che recupera dal path) ed elimina l' utente con quell' Id
	 */
	@Transactional
	@GetMapping("/utente/{id}")
	public void cancella(@PathVariable Long id) {
		
		utenteRepository.deleteById(id);
	}
	
	/*
	 * Il metodo modifica riceve l' utente da modificare e aggiorna i dati nel database (si può usare anche il metodo salva)
	 */
	@Transactional
	@PostMapping("/utente/modifica")
	public void modifica(@RequestBody Utente utente) {
		
		utenteRepository.saveAndFlush(utente);
	}
	
	/*
	 * Il metodo recupera utente riceve l' Id  (che recupera nel path) e restituisce l' utente che ha quell' Id
	 */
	@Transactional
	@GetMapping("/utente/recupera/{id}")
	public Optional<Utente> recuperaUtente(@PathVariable Long id) {
		
		return utenteRepository.findById(id);
	}
	
	/*
	 * Il metodo ordinaNomeAsc restituisce la lista degli utenti ordinata in modo crescente per nome
	 */
	@Transactional
	@GetMapping("/utente/ordina/nome")
	public List<Utente> ordinaNomeAsc() {
		
		return utenteRepository.findByOrderByNomeAsc();
	}
	
	/*
	 * Il metodo ordinaCognomeAsc restituisce la lista degli utenti ordinata in modo crescente per cognome
	 */
	@Transactional
	@GetMapping("/utente/ordina/cognome")
	public List<Utente> ordinaCognomeAsc() {
		
		return utenteRepository.findByOrderByCognomeAsc();
	}
	
	/*
	 * Il metodo cerca riceve un valore stringa (che recupera nel path) e effettua la ricerca tra tutti i campi dell' entità nel database
	 * e restituisce tutti gli utenti in cui compaiono quei valori in almeno un campo
	 */
	@Transactional
	@GetMapping("/utente/cerca/{nome}")
	public List<Utente> cerca(@PathVariable String nome) {
		
		return utenteRepository.findByLikeNomeOrCognomeOrMailOrNumber(nome, nome, nome, nome);
	}
}
