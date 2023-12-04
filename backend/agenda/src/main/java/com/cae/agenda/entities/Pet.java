package com.cae.agenda.entities;

import java.sql.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
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
    private Date dataNascPet;
    private Double pesoPet;
    @Column(nullable = false)
    private String sexoPet;
    private Boolean castradoPet;
    @JoinColumn(name="idUsuario")
    @ManyToOne(cascade = CascadeType.ALL)
    @Column(nullable = false)
    private Usuario usuario;
    @JoinColumn(name = "idEspecie", nullable = false)
    @ManyToOne
    @Column(nullable = false)
    private Especie especie;
    
}