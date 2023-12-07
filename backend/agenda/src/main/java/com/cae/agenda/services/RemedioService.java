package com.cae.agenda.services;

import com.cae.agenda.entities.Remedio;
import com.cae.agenda.repositories.RepositorioAgenda;
import com.cae.agenda.repositories.RepositorioRemedio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RemedioService {

    @Autowired
    private RepositorioRemedio repositorioRemedio;

    @Autowired
    private RepositorioAgenda repositorioAgenda;

    public List<Remedio> ListarRemediosAgenda(int idAgenda){
        return repositorioRemedio.findByAgenda_IdAgenda(idAgenda);
    }

    public ResponseEntity<Remedio> chamaRemedio(int idRemedio){
        Optional<Remedio> remedioOptional = repositorioRemedio.findById(idRemedio);

        if (remedioOptional.isPresent()){
            Remedio remedio = remedioOptional.get();
            return new ResponseEntity<>(remedio, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Remedio> criaRemedio(Remedio remedio){
        remedio.setAgenda(repositorioAgenda.findByIdAgenda(remedio.getAgenda().getIdAgenda()));
        Remedio novoRemedio = repositorioRemedio.save(remedio);

        return new ResponseEntity<>(novoRemedio,HttpStatus.CREATED);
    }

    public ResponseEntity<Remedio> editarRemedio(int idRemedio, Remedio remedio){
        try {
            if (!repositorioRemedio.existsById(idRemedio)){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            remedio.setIdRemedio(idRemedio);
            Remedio remedioEditado = repositorioRemedio.save(remedio);
            return new ResponseEntity<>(remedioEditado, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Void> deletarRemedio(int idRemedio) {
        if (repositorioRemedio.existsById(idRemedio)) {
            repositorioRemedio.deleteById(idRemedio);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
