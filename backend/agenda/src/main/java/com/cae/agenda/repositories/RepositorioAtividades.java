package com.cae.agenda.repositories;

import com.cae.agenda.entities.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Atividades;

import java.util.List;

public interface RepositorioAtividades extends JpaRepository<Atividades,Integer>{

    List<Atividades> findByAgenda(Agenda agenda);

    List<Atividades> deleteByAgenda(Agenda agenda);

}
