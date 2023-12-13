package com.cae.agenda.entities;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "agenda")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAgenda")
    private int idAgenda;
    @Column(nullable = false)
    @JsonSerialize(as=Time.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private Time horarioEvento;
    @Column(nullable = false)
    private int frequenciaEvento;
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private Date dataInicioEvento;
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = true)
    private Date dataFinalEvento;
    @JoinColumn(name = "idPet")
    @ManyToOne
    @JsonBackReference
    private Pet pet;
    @Column(nullable = false)
    private boolean notificacao;
    @Column(nullable = false)
    private boolean concluidoRegistro;
    @OneToMany(mappedBy = "agenda",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Atividades> atividades;
    @OneToMany(mappedBy = "agenda",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Remedio> remedios;
    @OneToMany(mappedBy = "agenda",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<AgendaVacina> agendaVacinas;

}
