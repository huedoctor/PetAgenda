package com.cae.agenda.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "pet")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPet")
    private int idPet;
    @Column(nullable = false)
    private String nomePet;
    @Column(nullable = false)
    private String racaPet;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date dataNascPet;
    private Double pesoPet;
    @Column(nullable = false)
    private String sexoPet;
    private Boolean castradoPet;
    @JoinColumn(name="idUsuario")
    @ManyToOne
    private Usuario usuario;
    @JoinColumn(name = "idEspecie", nullable = false)
    @ManyToOne
    private Especie especie;

    
}