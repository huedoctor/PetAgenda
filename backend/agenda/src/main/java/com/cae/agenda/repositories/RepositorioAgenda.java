package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Agenda;

import java.util.List;

public interface RepositorioAgenda extends JpaRepository<Agenda,Integer>{

    Agenda findByIdAgenda(int idAgenda);

    List<Agenda> findByPetIdPet(int idPet);
}