package com.cae.agenda.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.services.PetService;

@RestController
public class PetController {

    @Autowired
    private PetService petService;

    @ResponseBody
    @GetMapping("/pet")
    public List<Pet> listarPet() {
        return petService.listarPet();
    }

    @PostMapping("/pet")
    public ResponseEntity<Pet> criarPet(@RequestBody Pet pet) throws ParseException {
        return petService.criarPet(pet);
    }

    @DeleteMapping("/pet/{idPet}")
    public ResponseEntity<Void> deletarPet(@PathVariable int idPet) {
        return petService.deletarPet(idPet);
    }

    @PutMapping("/pet/{idPet}")
    public ResponseEntity<Pet> editarPet(@PathVariable int idPet, @RequestBody Pet pet) throws NotFoundException {
        return petService.editarPet(idPet, pet);
    }
}