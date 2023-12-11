package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Vacina;

import java.util.List;

public interface RepositorioVacina extends JpaRepository<Vacina,Integer>{
    List<Vacina> findByEspecieIdEspecie(int idEspecie);
}
