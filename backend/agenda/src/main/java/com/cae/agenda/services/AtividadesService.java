package com.cae.agenda.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cae.agenda.entities.Atividades;
import com.cae.agenda.repositories.RepositorioAtividades;

@Service
public class AtividadesService {

    @Autowired
    private RepositorioAtividades repositorioAtividades;

    public List<Atividades> listarAtividades() {
        return repositorioAtividades.findAll();
    }

    public void salvarAtividades(Atividades atividades) {
        repositorioAtividades.save(atividades);
    }

    public void alterarAtividades(Atividades atividades) {
        if (atividades.getIdAtividade() > 0)
            repositorioAtividades.save(atividades);
    }

    public void excluirAtividades(Atividades atividades) {
        repositorioAtividades.delete(atividades);
    }
}
