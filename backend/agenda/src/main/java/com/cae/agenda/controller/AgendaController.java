package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.services.AgendaService;

@RestController
public class AgendaController {

    @Autowired
    private AgendaService agendaService;

    @GetMapping("/agenda")
    public List<Agenda> listarAgenda() {
        return agendaService.listarAgenda();
    }

    @PostMapping("/agenda/cadastro")
    public void salvarAgenda(@RequestBody Agenda agenda) {
        agendaService.salvarAgenda(agenda);
    }

    @PutMapping("/agenda/update/{idAgenda}")
    public void alterarAgenda(@PathVariable int idAgenda, @RequestBody Agenda agenda) throws NotFoundException {
        agendaService.alterarAgenda(idAgenda, agenda);
    }

    @DeleteMapping("/agenda/delete/{idAgenda}")
    public void excluirAgenda(@PathVariable int idAgenda) {
        agendaService.excluirAgenda(idAgenda);
    }
}
