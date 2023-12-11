package com.cae.agenda.services;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.entities.Vacina;
import com.cae.agenda.repositories.RepositorioPet;
import com.cae.agenda.repositories.RepositorioVacina;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VacinaService {

    @Autowired
    private RepositorioVacina repositorioVacina;

    @Autowired
    private RepositorioPet repositorioPet;

    public List<Vacina> listarVacinasEspecie(int idPet) {
        Pet pet = repositorioPet.findByIdPet(idPet);
        int idEspecie = pet.getEspecie().getIdEspecie();

        return repositorioVacina.findByEspecieIdEspecie(idEspecie);
    }
}
