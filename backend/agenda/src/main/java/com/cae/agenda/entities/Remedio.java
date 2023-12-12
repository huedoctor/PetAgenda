package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.naming.Name;

@Entity(name = "remedio")
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
    private String descricaoRemedio;
    @JoinColumn(name = "idAgenda")
    @ManyToOne()
    private Agenda agenda;
    @Column(nullable = false)
    private boolean tipoCuidado;

}
