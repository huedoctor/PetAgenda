package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Vacina;

public interface RepositorioVacina extends JpaRepository<Vacina,Integer>{
    
}
