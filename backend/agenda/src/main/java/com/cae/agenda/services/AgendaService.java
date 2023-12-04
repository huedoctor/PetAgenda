package com.cae.agenda.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.repositories.RepositorioAgenda;

@Service
public class AgendaService {

    @Autowired
    private RepositorioAgenda repositorioAgenda;

    public List<Agenda> listarAgenda() {
        return repositorioAgenda.findAll();
    }

    public void salvarAgenda(Agenda agenda) {
        repositorioAgenda.save(agenda);
    }

    public ResponseEntity<Agenda> alterarAgenda(int idAgenda, Agenda agenda)  throws NotFoundException{
        if (!repositorioAgenda.existsById(idAgenda)){
            throw new NotFoundException();
        }
            agenda.setIdAgenda(idAgenda);
            Agenda agendaEditado = repositorioAgenda.save(agenda);
            return new ResponseEntity<>(agendaEditado,HttpStatus.OK); 
    }

    public ResponseEntity<Map<String, Object>> excluirAgenda(int idAgenda) {
        if (repositorioAgenda.existsById(idAgenda)) {
            repositorioAgenda.deleteById(idAgenda);
            return new ResponseEntity<>(HttpStatus.OK);
            
        } else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
