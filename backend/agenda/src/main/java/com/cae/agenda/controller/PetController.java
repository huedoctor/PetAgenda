package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Pet> listarPetsUsuario(@RequestParam("usuario") int idUsuario) {
        return petService.listarPetsUsuario(idUsuario);
    }

    @ResponseBody
    @GetMapping("/{idPet}")
    public ResponseEntity<Pet> chamaPet(@PathVariable int idPet){
        return petService.chamaPet(idPet);
    }

    @PostMapping("/")
    public ResponseEntity<Pet> criarPet(@RequestBody Pet pet){
        return petService.criarPet(pet);
    }

    @DeleteMapping("/{idPet}")
    public ResponseEntity<Void> deletarPet(@PathVariable int idPet) {
        return petService.deletarPet(idPet);
    }

    @PutMapping("/{idPet}")
    public ResponseEntity<Pet> editarPet(@PathVariable int idPet, @RequestBody Pet pet){
        return petService.editarPet(idPet, pet);
    }
}