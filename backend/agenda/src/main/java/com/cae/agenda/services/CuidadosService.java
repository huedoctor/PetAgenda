package com.cae.agenda.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Cuidados;
import com.cae.agenda.repositories.RepositorioCuidados;

@Service
public class CuidadosService {

    @Autowired
    private RepositorioCuidados repositorioCuidados;

    public List<Cuidados> listarCuidados() {
        return repositorioCuidados.findAll();
    }

    public ResponseEntity<Cuidados> criarCuidados(Cuidados cuidados) {
        try {
            Cuidados cuidadosSalvo = repositorioCuidados.save(cuidados);
            return new ResponseEntity<>(cuidadosSalvo, HttpStatus.OK);
        } catch (Exception e) {
            // Se ocorrer um erro durante a persistência, trate-o aqui
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Cuidados> editarCuidados(int idcuidados, Cuidados cuidados) {
        try {
            if (!repositorioCuidados.existsById(idcuidados)) {
                // Se o cuidado com o ID fornecido não existir, retorne um ResponseEntity com NOT_FOUND
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    
            cuidados.setIdCuidados(idcuidados);
            Cuidados cuidadosEditado = repositorioCuidados.save(cuidados);
            return ResponseEntity.ok(cuidadosEditado);
        } catch (Exception e) {
            // Em caso de erro durante a edição, retorne um ResponseEntity com INTERNAL_SERVER_ERROR
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void deleteCuidados(int idcuidados) {
        repositorioCuidados.deleteById(idcuidados);
    }

    
}