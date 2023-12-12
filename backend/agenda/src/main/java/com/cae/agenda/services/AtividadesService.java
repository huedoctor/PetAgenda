package com.cae.agenda.services;

import java.util.List;
import java.util.Optional;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.repositories.RepositorioAgenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Atividades;
import com.cae.agenda.repositories.RepositorioAtividades;

@Service
public class AtividadesService {

    @Autowired
    private RepositorioAtividades repositorioAtividades;

    @Autowired
    private RepositorioAgenda repositorioAgenda;

    public List<Atividades> listarAtividadesAgenda(int idAgenda) {
        Agenda agenda = repositorioAgenda.findByIdAgenda(idAgenda);
        return repositorioAtividades.findByAgenda(agenda);
    }

    public ResponseEntity<Atividades> salvarAtividades(Atividades atividades) {
        Agenda agenda = repositorioAgenda.save(atividades.getAgenda());
        atividades.setAgenda(repositorioAgenda.findByIdAgenda(agenda.getIdAgenda()));
        Atividades novaAtividade = repositorioAtividades.save(atividades);
        return new ResponseEntity<>(novaAtividade,HttpStatus.CREATED);
    }

    public void alterarAtividades(Atividades atividades) {
        if (atividades.getIdAtividade() > 0)
            repositorioAtividades.save(atividades);
    }

    public ResponseEntity<Void> excluirAtividades(int idAtividades) {
        if (repositorioAtividades.existsById(idAtividades)){
            repositorioAtividades.deleteById(idAtividades);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Atividades> chamaAtividade(int idAtividades) {
        Optional<Atividades> atividadesOptional = repositorioAtividades.findById(idAtividades);

        if (atividadesOptional.isPresent()){
            Atividades atividades = atividadesOptional.get();
            return new ResponseEntity<>(atividades, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
