package com.cae.agenda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cae.agenda.entities.Usuario;

public interface RepositorioUsuario extends JpaRepository<Usuario,Integer>{

    Usuario findByEmailUsuarioAndSenhaUsuario(String emailUsuario, String senhaUsuario);
    
    Usuario findByIdUsuario(int idUsuario);
    
}
