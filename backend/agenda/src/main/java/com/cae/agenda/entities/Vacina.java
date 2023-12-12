package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="vacina")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVacina")
    private int idVacina;
    @Column(nullable = false)
    private String nomeVacina;
    @Column(nullable = false)
    private String descricaoVacina;
    @JoinColumn(name = "idEspecie",nullable = false)
    @OneToOne
    private Especie especie; 
}
