package com.cae.agenda.controller;

import com.cae.agenda.entities.Agenda;
import com.cae.agenda.entities.AgendaVacina;
import com.cae.agenda.entities.Vacina;
import com.cae.agenda.services.VacinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/vacina")
public class VacinaController {
    @Autowired
    private VacinaService vacinaService;

    @ResponseBody
    @GetMapping("/pet/{idPet}")
    public ResponseEntity<List<Vacina>> ListarVacinasEspecie(@PathVariable("idPet") int idPet) {
        List<Vacina> vacinas = vacinaService.listarVacinasEspecie(idPet);
        if (vacinas.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(vacinas, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<AgendaVacina> criarVacina(@RequestBody Agenda agenda,
            @RequestParam("idVacina") String idVacina, @RequestParam("idPet") String idPet) {
        return new VacinaService().salvarvacina(agenda, Integer.parseInt(idVacina), Integer.parseInt(idPet));
    }

    @ResponseBody
    @GetMapping("/{idAgendaVacina}")
    public ResponseEntity<AgendaVacina> chamaPetVacina(@PathVariable int idAgendaVacina) {
        return vacinaService.chamaPetVacina(idAgendaVacina);
    }

    @DeleteMapping("/{idAgendaVacina}")
    public ResponseEntity<Void> deletarRemedio(@PathVariable int idAgendaVacina) {
        return vacinaService.deletarPetVacina(idAgendaVacina);
    }
}