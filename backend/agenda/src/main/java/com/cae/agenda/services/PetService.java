package com.cae.agenda.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.cae.agenda.repositories.RepositorioAgenda;
import com.cae.agenda.repositories.RepositorioEspecie;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.repositories.RepositorioPet;
import com.cae.agenda.repositories.RepositorioUsuario;

@Service
public class PetService {

    @Autowired
    private RepositorioPet repositorioPet;

    @Autowired
    private RepositorioUsuario repositorioUsuario;

    @Autowired
    private RepositorioEspecie repositorioEspecie;

    @Autowired
    private RepositorioAgenda repositorioAgenda;

    public List<Pet> listarPetsUsuario(int idUsuario) {
        return repositorioPet.findByUsuarioIdUsuario(idUsuario);
    }

    public ResponseEntity<Pet> chamaPet(int idPet){
        Optional<Pet> petOptional = repositorioPet.findById(idPet);

        if (petOptional.isPresent()) {
            Pet pet = petOptional.get();
            return new ResponseEntity<>(pet, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public Pet criarPet(Pet pet, int userId) {
        pet.setUsuario(repositorioUsuario.findByIdUsuario(userId));
        pet.setEspecie(repositorioEspecie.findByIdEspecie(pet.getEspecie().getIdEspecie()));
        return repositorioPet.save(pet);
    }
    @Transactional
    public ResponseEntity<Void> deletarPet(int idPet) {
        try {
            Pet pet = repositorioPet.findById(idPet).get();
            repositorioAgenda.deleteByPet(pet);
            repositorioPet.deleteById(idPet);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity<Pet> editarPet(int idPet, Pet pet) {
        try {
            if (!repositorioPet.existsById(idPet)) {
                // Retorna NOT FOUND se o pet não existe
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Atualiza o ID e salva as alterações
            pet.setIdPet(idPet);
            Pet petEditado = repositorioPet.save(pet);

            // Retorna o pet editado com HttpStatus.OK
            return new ResponseEntity<>(petEditado, HttpStatus.OK);
        } catch (Exception e) {
            // Trata outras exceções
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
