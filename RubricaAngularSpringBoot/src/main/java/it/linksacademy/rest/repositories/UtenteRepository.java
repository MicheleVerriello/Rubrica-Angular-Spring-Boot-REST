package it.linksacademy.rest.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.linksacademy.rest.models.Utente;

@Repository //E' una sottocategoria di @Component e indica che si tratta di una repository
public interface UtenteRepository extends JpaRepository<Utente, Long>{
	
	List<Utente> findByNome(String nome); //Ricerca per nome
	
	List<Utente> findByOrderByNomeAsc(); //Ordinamento alfabetico per nome
	
	List<Utente> findByOrderByCognomeAsc(); //Ordinamento alfabetico per cognome
	
	List<Utente> findUtenteByNomeOrCognomeIgnoreCase(String nome, String cognome); //Cerca tutti gli utenti tramite valore inserito ignorando se il testo digitato sia minuscolo o maiuscolo
	
	@Query("select u from Utente u where u.nome like %:nome% or u.cognome like %:cognome% or u.email like %:email% or u.numero like %:numero%")
	List<Utente> findByLikeNomeOrCognomeOrMailOrNumber(@Param("nome")String nome, @Param("cognome")String cognome, @Param("email")String email, @Param("numero")String numero);//Cerca gli utenti che contengono il valore inserito dall'utente al nome o al cognome o all' email o al numero
}
