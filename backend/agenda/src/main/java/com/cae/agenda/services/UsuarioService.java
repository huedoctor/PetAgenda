package com.cae.agenda.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Usuario;
import com.cae.agenda.repositories.RepositorioUsuario;

@Service
public class UsuarioService {

    @Autowired
    private RepositorioUsuario repositorioUsuario;

    public ResponseEntity<Map<String, Object>> verificarCredenciais(Map<String, String> credenciais) {
        String emailUsuario = credenciais.get("emailUsuario");
        String senhaUsuario = credenciais.get("senhaUsuario");

        Usuario usuario = repositorioUsuario.findByEmailUsuarioAndSenhaUsuario(emailUsuario, senhaUsuario);

        if (usuario != null) {
            Map<String, Object> map = new HashMap<>();
            map.put("idUsuario", usuario.getIdUsuario());
            map.put("nomeUsuario", usuario.getNomeUsuario());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<Map<String, Object>> salvarUsuario(Map<String, String> credenciais) {
        String emailUsuario = credenciais.get("emailUsuario");
        String nomeUsuario = credenciais.get("nomeUsuario");
        String senhaUsuario = credenciais.get("senhaUsuario");

        Usuario usuario2 = new Usuario();
        usuario2.setNomeUsuario(nomeUsuario);
        usuario2.setSenhaUsuario(senhaUsuario);
        usuario2.setEmailUsuario(emailUsuario);

        Usuario usuario = repositorioUsuario.findByEmailUsuario(emailUsuario);

        //Se ao tentar cadastrar, o email já estiver presente no banco, o objeto usuario não será null, o que significa que
        //o email já está cadastrado e, consequentemente, não poderá haver um cadastro com o mesmo email.
        if (usuario != null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        usuario = repositorioUsuario.save(usuario2);

        if (usuario != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public List<Usuario> listarUsuario() {
        return repositorioUsuario.findAll();
    }
}
