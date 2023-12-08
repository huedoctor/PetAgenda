package com.cae.agenda.controller;

import java.util.List;

import com.cae.agenda.entities.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.services.AgendaService;

@RestController
@RequestMapping("/agenda")
public class AgendaController {

    @Autowired
    private AgendaService agendaService;


    @ResponseBody
    @GetMapping("")
    public List<Agenda> listarAgendasPet(@RequestParam("pet") int idPet) {
        return agendaService.listarAgendasPet(idPet);
    }

    @ResponseBody
    @GetMapping("/{idAgenda}")
    public ResponseEntity<Agenda> chamaAgenda(@PathVariable int idAgenda) {
        return agendaService.chamaAgenda(idAgenda);
    }

    @PostMapping("/")
    public void criarAgenda(@RequestBody Agenda agenda) {
        agendaService.criarAgenda(agenda);
    }

    @PutMapping("/{idAgenda}")
    public void alterarAgenda(@PathVariable int idAgenda, @RequestBody Agenda agenda) throws NotFoundException {
        agendaService.alterarAgenda(idAgenda, agenda);
    }

    @DeleteMapping("/{idAgenda}")
    public void excluirAgenda(@PathVariable int idAgenda) {
        agendaService.excluirAgenda(idAgenda);
    }
}
