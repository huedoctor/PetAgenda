package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cae.agenda.entities.Atividades;
import com.cae.agenda.services.AtividadesService;

@RestController
public class AtividadesController {

    @Autowired
    private AtividadesService atividadesService;

    @GetMapping("/atividades")
    public List<Atividades> listarAtividades() {
        return atividadesService.listarAtividades();
    }

    @PostMapping("/atividades/cadastro")
    public void salvarAtividades(@RequestBody Atividades atividades) {
        atividadesService.salvarAtividades(atividades);
    }

    @PutMapping("/atividades/update")
    public void alterarAtividades(@RequestBody Atividades atividades) {
        atividadesService.alterarAtividades(atividades);
    }

    @DeleteMapping("/atividades/delete")
    public void excluirAtividades(@RequestBody Atividades atividades) {
        atividadesService.excluirAtividades(atividades);
    }
}