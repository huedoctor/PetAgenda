package com.cae.agenda.entities;

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
@NoArgsConstructor
@AllArgsConstructor
public class Remedio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRemedio;
    @Column(nullable = false)
    private String nomeRemedio;
    @Column(nullable = false)
    private Long descricaoRemedio;
    @JoinColumn(name = "idAgenda")
    @ManyToOne(cascade = CascadeType.ALL)
    private Agenda agenda;
    @JoinColumn(name = "idCuidados")
    @ManyToOne
    private Cuidados cuidados;
}
