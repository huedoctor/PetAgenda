package com.cae.agenda.controller;

import com.cae.agenda.entities.Remedio;
import com.cae.agenda.entities.Vacina;
import com.cae.agenda.services.VacinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("")
public class VacinaController {
    @Autowired
    private VacinaService vacinaService;

    @ResponseBody
    @GetMapping("/s/{idPet}")
    public ResponseEntity<List<Vacina>> ListarVacinasEspecie(@RequestParam("idPet") int idPet){
        List<Vacina> vacina = vacinaService.listarVacinasEspecie(idPet);
        if(vacina.isEmpty()){
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(vacina,HttpStatus.OK);
        }
    }
}
