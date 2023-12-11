package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.PetVacina;

import java.util.List;

public interface RepositorioPetVacina extends JpaRepository<PetVacina,Long>{
    List<PetVacina> findByPetIdPet(int idPet);
}
