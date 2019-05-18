package it.linksacademy.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaRepositories //Abilita le repository JPA per effettuare le operazioni CRUD
@EnableSwagger2 //Abilita Swagger 2
public class RestEsempioApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestEsempioApplication.class, args);
	}

}
