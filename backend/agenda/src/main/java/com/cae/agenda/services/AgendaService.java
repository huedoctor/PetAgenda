package com.cae.agenda.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.repositories.RepositorioPet;
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
    @Autowired
    private RepositorioPet repositorioPet;

    public List<Agenda> listarAgendasPet(int idPet) {
        return repositorioAgenda.findByPetIdPet(idPet);
    }

    public ResponseEntity<Agenda> chamaAgenda(int idAgenda){
        Optional<Agenda> agendaOptional = repositorioAgenda.findById(idAgenda);

        if (agendaOptional.isPresent()) {
            Agenda agenda = agendaOptional.get();
            return new ResponseEntity<>(agenda, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity<Agenda> criarAgenda(Agenda agenda) {
        agenda.setPet(repositorioPet.findByIdPet(agenda.getPet().getIdPet()));
        Agenda novaAgenda = repositorioAgenda.save(agenda);
        repositorioAgenda.save(agenda);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public ResponseEntity<Agenda> alterarAgenda(int idAgenda, Agenda agenda)  throws NotFoundException{
        try {
            if (!repositorioAgenda.existsById(idAgenda)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            agenda.setIdAgenda(idAgenda);
            Agenda agendaEditada = repositorioAgenda.save(agenda);

            return new ResponseEntity<>(agendaEditada, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
