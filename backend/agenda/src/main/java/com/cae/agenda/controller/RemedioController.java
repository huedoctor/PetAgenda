package com.cae.agenda.controller;

import com.cae.agenda.entities.Remedio;
import com.cae.agenda.services.RemedioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/remedio")
public class RemedioController {

    @Autowired
    private RemedioService remedioService;

    @ResponseBody
    @GetMapping("/s/{idAgenda}")
    public List<Remedio> ListarRemediosAgenda(@PathVariable int idAgenda){
        return remedioService.ListarRemediosAgenda(idAgenda);
    }

    @ResponseBody
    @GetMapping("/{idRemedio}")
    public ResponseEntity<Remedio> chamaRemedio(@PathVariable int idRemedio){
        return remedioService.chamaRemedio(idRemedio);
    }

    @PostMapping("/")
    public ResponseEntity<Remedio> criaRemedio(@RequestBody Remedio remedio){
        return remedioService.criaRemedio(remedio);
    }

    @DeleteMapping("/{idRemedio}")
    public ResponseEntity<Void> deletarRemedio(@PathVariable int idRemedio){
        return remedioService.deletarRemedio(idRemedio);
    }

    @PutMapping("/{idRemedio}")
    public ResponseEntity<Remedio> editarRemedio(@PathVariable int idRemedio, @RequestBody Remedio remedio){
        return remedioService.editarRemedio(idRemedio,remedio);
    }
}
