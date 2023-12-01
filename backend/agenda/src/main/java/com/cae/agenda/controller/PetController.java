//método para retornar uma lista de pets

package com.cae.agenda.controller;

import com.cae.agenda.entities.Especie;
import com.cae.agenda.entities.Pet;
import com.cae.agenda.repositories.RepositorioPet;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.sql.Date;
@Service
@NoArgsConstructor
public class PetController {
    private RepositorioPet repositorioPet;

    public PetController(RepositorioPet repositorioPet) {
        this.repositorioPet = repositorioPet;
    }

    public PetController() {

    }

    public List<Pet> listarPet() { return repositorioPet.findAll(); }

    public Pet criarPet(String nomePet, String racaPet, double pesoPet, boolean castradoPet, String sexoPet, Date dataNascPet, Especie especiePet) {
        Pet novoPet = new Pet();
        novoPet.setNomePet(nomePet);
        novoPet.setCastradoPet(castradoPet);
        novoPet.setPesoPet(pesoPet);
        novoPet.setRacaPet(racaPet);
        novoPet.setSexoPet(sexoPet);
        novoPet.setDataNascPet(dataNascPet);
        novoPet.setEspecie(especiePet);
        return novoPet;
    }

    public Boolean deletarPet(int idPet) {
        if (repositorioPet.existsById(idPet)) {
            repositorioPet.deleteById(idPet);
            return true;
        }
        return false;
    }

    public Pet editarPet(int idPet, Pet pet) {
        

    }


//    public RemedioDTO editarRemedio(int id, Remedio remedio) {
//        if (!repositorioRemedio.existsById(id)) {
//            throw new NotFoundException("Remedio não encontrado");
//        }
//
//        remedio.setIdRemedio(id);
//        Remedio remedioEditado = repositorioRemedio.save(remedio);
//        return converterParaDTO(remedioEditado);
//    }


}
