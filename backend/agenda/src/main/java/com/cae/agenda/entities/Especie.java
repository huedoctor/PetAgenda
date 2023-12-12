package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "especie")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Especie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEspecie")
    private int idEspecie;
    @Column(name = "nomeEspecie")
    private String nomeEspecie;
}
