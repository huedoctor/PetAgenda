package com.cae.agenda.entities;

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
public class Vacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVacina")
    private int idVacina;
    @Column(nullable = false)
    private String nomeVacina;
    @Column(nullable = false)
    private String descricaoVacina;
    @JoinColumn(name = "idEspecie")
    @ManyToOne
    private Especie especie; 
}
