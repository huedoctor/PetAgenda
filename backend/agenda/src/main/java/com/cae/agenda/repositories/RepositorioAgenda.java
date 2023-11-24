package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Agenda;

public interface RepositorioAgenda extends JpaRepository<Agenda,Integer>{
    
}