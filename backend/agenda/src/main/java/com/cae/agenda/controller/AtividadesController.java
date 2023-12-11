package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cae.agenda.entities.Atividades;
import com.cae.agenda.services.AtividadesService;

@RestController
@RequestMapping("/atividades")
public class AtividadesController {

    @Autowired
    private AtividadesService atividadesService;

    @ResponseBody
    @GetMapping("/")
    public List<Atividades> listarAtividadesAgenda(@RequestParam("agenda") int idAgenda) {
        return atividadesService.listarAtividadesAgenda(idAgenda);
    }

    @ResponseBody
    @GetMapping("/{idAtividades}")
    public ResponseEntity<Atividades> chamaAtividade(@PathVariable int idAtividades){
        return atividadesService.chamaAtividade(idAtividades);
    }

    @PostMapping("/")
    public void salvarAtividades(@RequestBody Atividades atividades) {
        atividadesService.salvarAtividades(atividades);
    }

    @PutMapping("/")
    public void alterarAtividades(@RequestBody Atividades atividades) {
        atividadesService.alterarAtividades(atividades);
    }

    @DeleteMapping("/atividades/{idAtividades}")
    public ResponseEntity<Void> excluirAtividades(@PathVariable int idAtividades, @RequestBody Atividades atividades) {
       return atividadesService.excluirAtividades(idAtividades);
    }
}