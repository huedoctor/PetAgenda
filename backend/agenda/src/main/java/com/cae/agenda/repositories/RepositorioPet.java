package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Pet;

public interface RepositorioPet extends JpaRepository<Pet,Integer>{
    Pet existById(int idPet);
}
