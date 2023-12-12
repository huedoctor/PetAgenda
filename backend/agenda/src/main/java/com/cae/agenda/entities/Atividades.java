package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity(name = "atividades")
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
    private String descricaoAtividade;
    @JoinColumn(name = "idAgenda")
    @ManyToOne
    private Agenda agenda;
    
}
