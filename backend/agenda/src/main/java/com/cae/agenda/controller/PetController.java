package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.services.PetService;

@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    private PetService petService;

    @ResponseBody
    @GetMapping("")
    public ResponseEntity<List<Pet>> listarPetsUsuario(@RequestHeader(value = "userId") String userId) {
        if(userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final List<Pet> petsList = petService.listarPetsUsuario(Integer.parseInt(userId));
        return new ResponseEntity<>(petsList, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/{idPet}")
    public ResponseEntity<Pet> chamaPet(@PathVariable int idPet) {
        return petService.chamaPet(idPet);
    }

    @PostMapping("")
    public ResponseEntity<Pet> criarPet(
            @RequestHeader(value = "userId") String userId,
            @RequestBody Pet pet) {
        Pet novoPet = petService.criarPet(pet, Integer.parseInt(userId));
        return new ResponseEntity<>(novoPet, HttpStatus.CREATED);
    }

    @DeleteMapping("/{idPet}")
    public ResponseEntity<Void> deletarPet(@PathVariable int idPet) {
        return petService.deletarPet(idPet);
    }

    @PutMapping("/{idPet}")
    public ResponseEntity<Pet> editarPet(@PathVariable int idPet, @RequestBody Pet pet) {
        return petService.editarPet(idPet, pet);
    }
}