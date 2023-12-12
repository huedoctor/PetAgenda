package com.cae.agenda.services;

import com.cae.agenda.entities.Pet;
import com.cae.agenda.entities.Remedio;
import com.cae.agenda.entities.Agenda;
import com.cae.agenda.entities.AgendaVacina;
import com.cae.agenda.entities.Vacina;
import com.cae.agenda.repositories.RepositorioAgenda;
import com.cae.agenda.repositories.RepositorioAgendaVacina;
import com.cae.agenda.repositories.RepositorioPet;
import com.cae.agenda.repositories.RepositorioVacina;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class VacinaService {

    @Autowired
    private RepositorioVacina repositorioVacina;

    @Autowired
    private RepositorioPet repositorioPet;

    @Autowired
    private RepositorioAgenda repositorioAgenda;

    @Autowired
    private RepositorioAgendaVacina repositorioAgendaVacina;

    public List<Vacina> listarVacinasEspecie(int idPet) {
        Pet pet = repositorioPet.findByIdPet(idPet);
        int idEspecie = pet.getEspecie().getIdEspecie();

        return repositorioVacina.findByEspecieIdEspecie(idEspecie);
    }

    public ResponseEntity<AgendaVacina> salvarvacina(Agenda agenda,int idVacina,int idPet){
        Pet pet = repositorioPet.findByIdPet(idPet);
        agenda.setPet(pet);
        Vacina vacina = repositorioVacina.findByIdVacina(idVacina);
        Agenda novaAgenda = repositorioAgenda.save(agenda);
        
        AgendaVacina agendaVacina = new AgendaVacina();
        agendaVacina.setAgenda(novaAgenda);
        agendaVacina.setVacina(vacina);
        AgendaVacina avsalva = repositorioAgendaVacina.save(agendaVacina);

        return new ResponseEntity<>(avsalva, HttpStatus.OK);
    }

    

    public ResponseEntity<AgendaVacina> chamaPetVacina(int idAgendaVacina){
        Optional<AgendaVacina> pvOptional = repositorioAgendaVacina.findById(idAgendaVacina);
        if (pvOptional.isPresent()){
            AgendaVacina agendaVacina = pvOptional.get();
            return new ResponseEntity<>(agendaVacina, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<Void> deletarPetVacina(int idAgendaVacina) {
        try{
            AgendaVacina agendaVacina = repositorioAgendaVacina.findById(idAgendaVacina).get();
            repositorioAgendaVacina.deleteById(agendaVacina.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
