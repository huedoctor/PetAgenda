package com.cae.agenda.repositories;

import com.cae.agenda.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Agenda;

import java.util.List;

public interface RepositorioAgenda extends JpaRepository<Agenda,Integer>{

    Agenda findByIdAgenda(int idAgenda);

    List<Agenda> findByPet(Pet pet);

    List<Agenda> deleteByPet(Pet pet);
}