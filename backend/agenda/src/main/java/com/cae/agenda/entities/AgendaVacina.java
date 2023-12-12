package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name ="AgendaVacina")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgendaVacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JoinColumn(name = "idAgenda")
    @ManyToOne
    private Agenda agenda;

    @JoinColumn(name = "idVacina")
    @ManyToOne
    private Vacina vacina;
}
