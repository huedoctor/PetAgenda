package com.cae.agenda.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cae.agenda.entities.Usuario;
import com.cae.agenda.services.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> verificarCredenciais(@RequestBody Map<String, String> credenciais) {
        return usuarioService.verificarCredenciais(credenciais);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Map<String, Object>> salvarUsuario(@RequestBody Map<String, String> credenciais) {
        return usuarioService.salvarUsuario(credenciais);
    }

    @GetMapping("/")
    public List<Usuario> listarUsuario() {
        return usuarioService.listarUsuario();
    }

    @GetMapping("/me")
    public ResponseEntity<Usuario> listarUsuario(@RequestHeader(value = "userId") String userId) {

        return usuarioService.chamaUsuario(Integer.parseInt(userId));
    }

}
