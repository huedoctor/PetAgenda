package com.cae.agenda.services;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.entities.Remedio;
import com.cae.agenda.repositories.RepositorioAgenda;
import com.cae.agenda.repositories.RepositorioPet;
import com.cae.agenda.repositories.RepositorioRemedio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RemedioService {

    @Autowired
    private RepositorioRemedio repositorioRemedio;

    @Autowired
    private RepositorioAgenda repositorioAgenda;

    @Autowired
    private RepositorioPet repositorioPet;

    public List<Remedio> ListarRemediosAgenda(int idAgenda) {
        return repositorioRemedio.findByAgenda_IdAgenda(idAgenda);
    }

    public ResponseEntity<Remedio> chamaRemedio(int idRemedio) {
        Optional<Remedio> remedioOptional = repositorioRemedio.findById(idRemedio);

        if (remedioOptional.isPresent()) {
            Remedio remedio = remedioOptional.get();
            return new ResponseEntity<>(remedio, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Remedio> criaRemedio(Remedio remedio, int idPet) {
        remedio.getAgenda().setPet(repositorioPet.findByIdPet(idPet));
        Agenda agenda = repositorioAgenda.save(remedio.getAgenda());
        remedio.setAgenda(repositorioAgenda.findByIdAgenda(agenda.getIdAgenda()));
        Remedio novoRemedio = repositorioRemedio.save(remedio);
        return new ResponseEntity<>(novoRemedio, HttpStatus.CREATED);
    }

    public ResponseEntity<Remedio> editarRemedio(int idAgenda, Remedio remedioAlterado) {
        try {
            if (!repositorioAgenda.existsById(idAgenda)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Agenda agenda = repositorioAgenda.findByIdAgenda(idAgenda);

            if (remedioAlterado.getAgenda().getDataFinalEvento() != null) {
                agenda.setDataFinalEvento(remedioAlterado.getAgenda().getDataFinalEvento());
            }
            if (remedioAlterado.getAgenda().getDataInicioEvento() != null) {
                agenda.setDataInicioEvento(remedioAlterado.getAgenda().getDataInicioEvento());
            }
            if (remedioAlterado.getAgenda().getFrequenciaEvento() >= 1
                    && remedioAlterado.getAgenda().getFrequenciaEvento() <= 4) {
                agenda.setFrequenciaEvento(remedioAlterado.getAgenda().getFrequenciaEvento());
            }
            if (remedioAlterado.getAgenda().getHorarioEvento() != null) {
                // Converte java.sql.Time para java.time.LocalTime
                LocalTime horarioEvento = remedioAlterado.getAgenda().getHorarioEvento().toLocalTime();
                agenda.setHorarioEvento(Time.valueOf(horarioEvento));
            }

            repositorioAgenda.save(agenda);

            if (agenda.getRemedios().get(0).getIdRemedio() != 0) {
                remedioAlterado.setIdRemedio(agenda.getRemedios().get(0).getIdRemedio());
            }

            Remedio remedioEditado = repositorioRemedio.save(remedioAlterado);
            return new ResponseEntity<>(remedioEditado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public ResponseEntity<Void> deletarRemedio(int idRemedio) {
        try {
            Remedio remedio = repositorioRemedio.findById(idRemedio).get();
            repositorioRemedio.deleteById(remedio.getIdRemedio());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
