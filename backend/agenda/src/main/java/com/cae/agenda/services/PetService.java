package com.cae.agenda.services;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Especie;
import com.cae.agenda.entities.Pet;
import com.cae.agenda.repositories.RepositorioEspecie;
import com.cae.agenda.repositories.RepositorioPet;

@Service
public class PetService {

    @Autowired
    private RepositorioPet repositorioPet;

    @Autowired
    private RepositorioEspecie repositorioEspecie;

    public List<Pet> listarPet() {
        return repositorioPet.findAll();
    }

    public ResponseEntity<Map<String, Object>> criarPet(Map<String, String> cadastro) throws ParseException {
    try {
        // Extrair dados do cadastro
        String nomePet = cadastro.get("nomePet");
        String racaPet = cadastro.get("racaPet");
        double pesoPet = Double.parseDouble(cadastro.get("pesoPet"));
        boolean castradoPet = Boolean.parseBoolean(cadastro.get("castradoPet"));
        String sexoPet = cadastro.get("sexoPet");
        int especieid = Integer.parseInt(cadastro.get("especiePet"));
        Especie especiePet = repositorioEspecie.findByIdEspecie(especieid);

        String dataNascPetStr = cadastro.get("dataNascPet");
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date dataNascPet = new Date(formatter.parse(dataNascPetStr).getTime());

        // Criar uma instância de Pet
        Pet novoPet = new Pet();
        novoPet.setNomePet(nomePet);
        novoPet.setCastradoPet(castradoPet);
        novoPet.setPesoPet(pesoPet);
        novoPet.setRacaPet(racaPet);
        novoPet.setSexoPet(sexoPet);
        novoPet.setDataNascPet(dataNascPet);
        novoPet.setEspecie(especiePet);

        // Salvar o Pet no repositório
        Pet petSalvo = repositorioPet.save(novoPet);

        // Verificar se o salvamento foi bem-sucedido e retornar a resposta adequada
        if (petSalvo != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    public ResponseEntity<Map<String, Object>> deletarPet(int idPet) {
        if (repositorioPet.existsById(idPet)) {
            repositorioPet.deleteById(idPet);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Pet> editarPet(int idPet, Pet pet) throws NotFoundException {
        if (!repositorioPet.existsById(idPet)) {
            throw new NotFoundException();
        }

        pet.setIdPet(idPet);
        Pet petEditado = repositorioPet.save(pet);
        return new ResponseEntity<>(petEditado, HttpStatus.OK);
    }
}
