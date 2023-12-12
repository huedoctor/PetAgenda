package com.cae.agenda.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "especie")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Especie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEspecie")
    private int idEspecie;

    @Column(name = "nomeEspecie")
    private String nomeEspecie;

    @OneToMany(mappedBy = "especie",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Pet> pets;
}
