//método para retornar uma lista de pets

package com.cae.agenda.controller;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.repositories.RepositorioPet;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.sql.Date;

public class PetController {
    private RepositorioPet repositorioPet;

    public PetController(RepositorioPet repositorioPet) {
        this.repositorioPet = repositorioPet;
    }

    public List<Pet> listarPet() { return repositorioPet.findAll(); }

    public Pet salvarPet(String nomePet, String racaPet, double pesoPet, boolean castradoPet, String sexoPet, Date dataNascPet, int especiePet) {
        Pet novoPet = new Pet();
        novoPet.setNomePet(nomePet);
        novoPet.setCastradoPet(castradoPet);
        novoPet.setPesoPet(pesoPet);
        novoPet.setRacaPet(racaPet);
        novoPet.setSexoPet(sexoPet);
        novoPet.setDataNascPet(dataNascPet);
        novoPet.setEspecie(especiePet);
    }

}
