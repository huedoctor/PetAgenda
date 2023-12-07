package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Remedio;

import java.util.List;

public interface RepositorioRemedio extends JpaRepository<Remedio,Integer>{

    List<Remedio> findByAgenda_IdAgenda(int idAgenda);

}
