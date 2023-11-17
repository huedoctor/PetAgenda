package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.repositories.RepositorioAgenda;
import com.cae.agenda.repositories.RepositorioAtividades;
import com.cae.agenda.repositories.RepositorioCuidados;
import com.cae.agenda.repositories.RepositorioEspecie;
import com.cae.agenda.repositories.RepositorioPet;
import com.cae.agenda.repositories.RepositorioPetVacina;
import com.cae.agenda.repositories.RepositorioRemedio;
import com.cae.agenda.repositories.RepositorioUsuario;
import com.cae.agenda.repositories.RepositorioVacina;


@RestController
public class routes {
    @Autowired
    private RepositorioAgenda repositorioAgenda;
    @Autowired
    private RepositorioAtividades repositorioAtividades;
    @Autowired
    private RepositorioCuidados repositorioCuidados;
    @Autowired
    private RepositorioEspecie repositorioEspecie;
    @Autowired
    private RepositorioPet repositorioPet;
    @Autowired
    private RepositorioPetVacina repositorioPetVacina;
    @Autowired
    private RepositorioRemedio repositorioRemedio;
    @Autowired
    private RepositorioUsuario repositorioUsuario;
    @Autowired
    private RepositorioVacina repositorioVacina;

    @RequestMapping("/ola")
    public String olaSpring() {
        return "Olá Sistema de merda";
    }

    @GetMapping("/agenda")
    public List<Agenda> listarAgenda(){
        return repositorioAgenda.findAll();
    }

    @PostMapping("/agendaCadastro")
    public void salvarAgenda(@RequestBody Agenda agenda){
        repositorioAgenda.save(agenda);
    }

    @PutMapping("/agendaUpdate")
    public void alterarAgenda(@RequestBody Agenda agenda){
        if(agenda.getIdAgenda()>0)
        repositorioAgenda.save(agenda);
    }

    @DeleteMapping("/agendaDelete")
    public void excluirAgenda(@RequestBody Agenda agenda){
        repositorioAgenda.delete(agenda);
    }
    
    
}
