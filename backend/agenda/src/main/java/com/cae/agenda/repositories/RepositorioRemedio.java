package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Remedio;

public interface RepositorioRemedio extends JpaRepository<Remedio,Integer>{
    
}
