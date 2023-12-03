package com.cae.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cae.agenda.entities.Cuidados;
import com.cae.agenda.services.CuidadosService;

@RestController
public class CuidadosController {

    @Autowired
    private CuidadosService cuidadosService;

    @ResponseBody
    @GetMapping("/Cuidados")
    public List<Cuidados> listarCuidados() {
        return cuidadosService.listarCuidados();
    }

    @PostMapping("/Cuidados/cadastro")
    public ResponseEntity<Cuidados> criarCuidados(@RequestBody Cuidados cuidados) {
        return cuidadosService.criarCuidados(cuidados);
    }

    @PutMapping("/Cuidados/update/{idcuidados}")
public ResponseEntity<Cuidados> editarCuidados(@PathVariable int idcuidados, @RequestBody Cuidados cuidados) {
    return cuidadosService.editarCuidados(idcuidados, cuidados);
}

    @DeleteMapping("/Cuidados/delete/{idcuidados}")
    public ResponseEntity<Void> deletarCuidados(@PathVariable int idcuidados) {
        cuidadosService.deleteCuidados(idcuidados);
        return ResponseEntity.noContent().build();
    }
}
