package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private int idUsuario;
    @Column(nullable = false)
    private String nomeUsuario;
    @Column(nullable = false, unique = true)
    private String emailUsuario;
    @Column(nullable = false)
    private String senhaUsuario;

    @OneToMany(mappedBy = "usuario",cascade = CascadeType.ALL)
    private List<Pet> pet;

    
}
