package com.cae.agenda.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.cae.agenda.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cae.agenda.repositories.RepositorioAgenda;
import com.cae.agenda.repositories.RepositorioAtividades;
import com.cae.agenda.repositories.RepositorioCuidados;
import com.cae.agenda.repositories.RepositorioEspecie;
import com.cae.agenda.repositories.RepositorioPet;
import com.cae.agenda.repositories.RepositorioPetVacina;
import com.cae.agenda.repositories.RepositorioRemedio;
import com.cae.agenda.repositories.RepositorioUsuario;
import com.cae.agenda.repositories.RepositorioVacina;

@RestController
public class Routes {
    @Autowired
    private RepositorioAgenda repositorioAgenda;
    @Autowired
    private RepositorioAtividades repositorioAtividades;
    @Autowired
    private RepositorioCuidados repositorioCuidados;
    @Autowired
    private RepositorioEspecie repositorioEspecie;
    @Autowired
    private RepositorioPet repositorioPet;
    @Autowired
    private RepositorioPetVacina repositorioPetVacina;
    @Autowired
    private RepositorioRemedio repositorioRemedio;
    @Autowired
    private RepositorioUsuario repositorioUsuario;
    @Autowired
    private RepositorioVacina repositorioVacina;

    @RequestMapping("/ola")
    public String olaSpring() {
        return "Olá Sistema.";
    }

    @GetMapping("/agenda")
    public List<Agenda> listarAgenda() {
        return repositorioAgenda.findAll();
    }

    @PostMapping("/agenda/cadastro")
    public void salvarAgenda(@RequestBody Agenda agenda) {
        repositorioAgenda.save(agenda);
    }

    @PutMapping("/agenda/update")
    public void alterarAgenda(@RequestBody Agenda agenda) {
        if (agenda.getIdAgenda() > 0)
            repositorioAgenda.save(agenda);
    }

    @DeleteMapping("/agenda/delete")
    public void excluirAgenda(@RequestBody Agenda agenda) {
        repositorioAgenda.delete(agenda);
    }

    @GetMapping("/atividades")
    public List<Atividades> listarAtividades() {
        return repositorioAtividades.findAll();
    }

    @PostMapping("/atividades/cadastro")
    public void salvarAtividades(@RequestBody Atividades atividades) {
        repositorioAtividades.save(atividades);
    }

    @PutMapping("/atividades/update")
    public void alterarAtividades(@RequestBody Atividades atividades) {
        if (atividades.getIdAtividade() > 0)
            repositorioAtividades.save(atividades);
    }

    @DeleteMapping("/atividades/delete")
    public void excluirAtividades(@RequestBody Atividades atividades) {
        repositorioAtividades.delete(atividades);
    }

    @PostMapping("/usuario/login")
    public ResponseEntity<Map<String,Object>> verificarCredenciais(@RequestBody Map<String, String> credenciais) {
        String emailUsuario = credenciais.get("emailUsuario");
        String senhaUsuario = credenciais.get("senhaUsuario");

        Usuario usuario = repositorioUsuario.findByEmailUsuarioAndSenhaUsuario(emailUsuario, senhaUsuario);

        if (usuario != null) {
            // Se as credenciais são válidas, retorne o objeto Usuario
            // Tirar a senha do usuario
            Map<String,Object> map = new HashMap<>();
            map.put("idUsuario", usuario.getIdUsuario());
            map.put("nomeUsuario", usuario.getNomeUsuario());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            // Se as credenciais não são válidas, retorne um status 401 Unauthorized
            // interservererro
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/usuario/cadastro")
    public ResponseEntity<Map<String,Object>> salvarUsuario(@RequestBody Map<String, String> credenciais) {
        String emailUsuario = credenciais.get("emailUsuario");
        String nomeUsuario = credenciais.get("nomeUsuario");
        String senhaUsuario = credenciais.get("senhaUsuario");

        Usuario usuario2 = new Usuario();
        usuario2.setNomeUsuario(nomeUsuario);
        usuario2.setSenhaUsuario(senhaUsuario);
        usuario2.setEmailUsuario(emailUsuario); 

        Usuario usuario = repositorioUsuario.save(usuario2);

        if (usuario != null) {
            // Se as credenciais são válidas, retorne o objeto Usuario
            // Tirar a senha do usuario
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            // Se as credenciais não são válidas, retorne um status 401 Unauthorized
            // interservererro
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/usuario")
    public List<Usuario> listarUsuario() { return repositorioUsuario.findAll(); }

    @ResponseBody
    @GetMapping("/pet/listarPet")
    public List<Pet> listarPet() { return new PetController(repositorioPet).listarPet(); }

    @PostMapping("/pet/criarPet")
    public ResponseEntity<Map<String,Object>> criarPet(@RequestBody Map<String, String> cadastro) throws ParseException {
        String nomePet = cadastro.get("nomePet");
        String racaPet = cadastro.get("racaPet");
        double pesoPet = Double.parseDouble(cadastro.get("pesoPet"));
        boolean castradoPet = Boolean.parseBoolean(cadastro.get("castradoPet"));
        String sexoPet = cadastro.get("sexoPet");
        int especieid = Integer.parseInt(cadastro.get("especiePet"));
        Especie especie = repositorioEspecie.findByIdEspecie(especieid);

        String dataNascPet = cadastro.get("dataNascPet");
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date data = formatter.parse(dataNascPet);
        java.sql.Date sqlData = new java.sql.Date(data.getTime());

        Pet novoPet = new PetController(repositorioPet).criarPet(nomePet, racaPet, pesoPet, castradoPet, sexoPet, sqlData, especie);

        if (novoPet != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/pet/deletarPet/{idPet}")
    public ResponseEntity<Map<String,Object>> deletarPet(@PathVariable int idPet) {   //recebendo id selecionado pelo cliente
        Boolean novo = new PetController(repositorioPet).deletarPet(idPet);           //passando para o controller

        if (novo != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/pet/alterarPet/{idPet}")
    public ResponseEntity<Pet> editarPet(@PathVariable int id, @RequestBody Pet pet) {
        PetController petController = new PetController();
        Pet petAtualizado = petController.editarPet(id, pet);

    }

//     @PutMapping("/{id}")
//    public ResponseEntity<RemedioDTO> editarRemedio(@PathVariable int id, @RequestBody Remedio remedio) {
//        RemedioDTO remedioEditadoDTO = remedioService.editarRemedio(id, remedio);
//        return new ResponseEntity<>(remedioEditadoDTO, HttpStatus.OK);
//    }


}
