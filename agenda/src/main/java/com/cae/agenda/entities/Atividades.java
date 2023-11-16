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
@AllArgsConstructor
@NoArgsConstructor
public class Atividades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAtividade;
    @Column(nullable = false)
    private String nomeAtividade;
    @Column(nullable = false)
    private Long descricaoAtividade;
    @JoinColumn(name="idAgenda")
    @ManyToOne(cascade = CascadeType.ALL)
    private Agenda agenda;
    
}
