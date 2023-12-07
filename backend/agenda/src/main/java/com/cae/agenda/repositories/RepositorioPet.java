package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Pet;

import java.util.List;

public interface RepositorioPet extends JpaRepository<Pet,Integer>{
    boolean existsById(int idPet);

    List<Pet> findByUsuarioIdUsuario(int idUsuario);

    Pet findByIdPet(int idPet);
}
