package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.PetVacina;

public interface RepositorioPetVacina extends JpaRepository<PetVacina,Long>{
    
}
