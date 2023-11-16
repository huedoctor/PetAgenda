package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Cuidados;

public interface RepositorioCuidados extends JpaRepository<Cuidados,Integer>{
    
}
