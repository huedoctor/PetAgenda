package com.cae.agenda.entities;

import java.sql.Date;
import java.sql.Time;

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
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAgenda")
    private int idAgenda;
    @Column(nullable = false)
    private Time horarioEvento;
    @Column(nullable = false)
    private int frequenciaEvento;
    @Column(nullable = false)
    private Date dataInicioEvento;
    @Column(nullable = false)
    private Date dataFinalEvento;
    @JoinColumn(name = "idPet")
    @ManyToOne
    private Pet pet;
    @Column(nullable = false)
    private boolean notificacao;
    @Column(nullable = false)
    private boolean concluidoRegistro;

}
