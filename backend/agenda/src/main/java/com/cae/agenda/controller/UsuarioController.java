package com.cae.agenda.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cae.agenda.entities.Usuario;
import com.cae.agenda.services.UsuarioService;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/usuario/login")
    public ResponseEntity<Map<String, Object>> verificarCredenciais(@RequestBody Map<String, String> credenciais) {
        return usuarioService.verificarCredenciais(credenciais);
    }

    @PostMapping("/usuario/cadastro")
    public ResponseEntity<Map<String, Object>> salvarUsuario(@RequestBody Map<String, String> credenciais) {
        return usuarioService.salvarUsuario(credenciais);
    }

    @GetMapping("/usuario")
    public List<Usuario> listarUsuario() {
        return usuarioService.listarUsuario();
    }
}
