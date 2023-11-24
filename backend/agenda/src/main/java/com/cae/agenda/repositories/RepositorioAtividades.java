package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Atividades;

public interface RepositorioAtividades extends JpaRepository<Atividades,Integer>{
    
}
