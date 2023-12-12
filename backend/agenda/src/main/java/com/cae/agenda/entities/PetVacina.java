package com.cae.agenda.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name ="PetVacina")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetVacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "idAgenda")
    @ManyToOne()
    private Agenda agenda;

    @ManyToOne
    @JoinColumn(name = "idVacina")
    private Vacina vacina;
}
