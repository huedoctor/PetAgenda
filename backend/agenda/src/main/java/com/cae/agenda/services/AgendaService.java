package com.cae.agenda.services;

import java.util.*;

import com.cae.agenda.entities.*;
import com.cae.agenda.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AgendaService {

    @Autowired
    private RepositorioAgenda repositorioAgenda;
    @Autowired
    private RepositorioPet repositorioPet;
    @Autowired
    private RepositorioRemedio repositorioRemedio;
    @Autowired
    private RepositorioAtividades repositorioAtividades;
    @Autowired
    private RepositorioPetVacina repositorioPetVacina;

//    public List<Agenda> listarAgendasPet(int idPet) {
//        return repositorioAgenda.findByPetIdPet(idPet);
//    }

    public ResponseEntity<List<Map<String, Object>>> listarAgendasPet(int idPet) {
        List<Agenda> agendas = repositorioAgenda.findByPetIdPet(idPet);
        List<Map<String, Object>> agendaList = new ArrayList<>();

        if (agendas != null && !agendas.isEmpty()) {
            for (Agenda agenda : agendas) {
                List<Remedio> remedios = repositorioRemedio.findByAgenda_IdAgenda(agenda.getIdAgenda());
                List<Atividades> atividades = repositorioAtividades.findByAgenda_IdAgenda(agenda.getIdAgenda());
                List<PetVacina> petVacinas = repositorioPetVacina.findByPetIdPet(idPet);
                Map<String, Object> map = new HashMap<>();

                if (!remedios.isEmpty()) {
                    Remedio primeiroRemedio = remedios.get(0);
                    map.put("nomeRegistro", primeiroRemedio.getNomeRemedio());
                    map.put("descricaoRegistro", primeiroRemedio.getDescricaoRemedio());
                    String tipo;
                    if(primeiroRemedio.isTipoCuidado()){
                        tipo = "Tratamento";
                    }else{
                        tipo = "Rotina";
                    }
                    map.put("classificacao",tipo);
                } else if (!atividades.isEmpty()) {
                    Atividades primeiraAtividade = atividades.get(0);
                    map.put("nomeRegistro", primeiraAtividade.getNomeAtividade());
                    map.put("descricaoRegistro", primeiraAtividade.getDescricaoAtividade());
                    map.put("classificacao","Atividade");
                } else if (!petVacinas.isEmpty()) {
                    PetVacina primeiraPetVacina = petVacinas.get(0);
                    map.put("nomeRegistro", primeiraPetVacina.getVacina().getNomeVacina());
                    map.put("descricaoRegistro", primeiraPetVacina.getVacina().getDescricaoVacina());
                    map.put("classificacao","Vacina");
                }
                map.put("dataInicio", agenda.getDataInicioEvento());
                map.put("dataFinal", agenda.getDataFinalEvento());
                map.put("frequencia", agenda.getFrequenciaEvento());
                map.put("horario", agenda.getHorarioEvento());


                agendaList.add(map);
            }
            return new ResponseEntity<>(agendaList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.UNAUTHORIZED);
        }
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
        repositorioAgenda.save(novaAgenda);//estava salvando a agenda, nao nova agenda

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