package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Especie;

public interface RepositorioEspecie extends JpaRepository<Especie,Integer>{
    Especie findByIdEspecie(Integer idEspecie);
}
