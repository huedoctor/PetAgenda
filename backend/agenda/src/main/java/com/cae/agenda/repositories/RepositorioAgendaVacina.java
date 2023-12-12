package com.cae.agenda.repositories;

import com.cae.agenda.entities.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.AgendaVacina;

import java.util.List;

public interface RepositorioAgendaVacina extends JpaRepository<AgendaVacina, Integer>{
    List<AgendaVacina> findByAgenda(Agenda agenda);

}
