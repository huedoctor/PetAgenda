# 🐾 PetAgenda

Sistema de agendamento e gerenciamento de atividades para pets, como vacinas, remédios e eventos.

---

## 🛠️ Instalação do Backend

### Pré-requisitos

- Java 17 ou superior
- Maven 3.8+
- IDE (IntelliJ, Eclipse, VSCode, etc.)

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/PetAgenda.git
cd PetAgenda/backend/agenda

# Compilar o projeto
./mvnw clean install

# Executar o projeto
./mvnw spring-boot:run
```

A aplicação estará disponível em: [http://localhost:8080](http://localhost:8080)

---

## 🌐 Endpoints da API (exemplos)

| Recurso       | Método | Endpoint                      | Descrição                         |
|---------------|--------|-------------------------------|-----------------------------------|
| Pets          | GET    | `/pets`                       | Lista todos os pets               |
|               | POST   | `/pets`                       | Cadastra um novo pet              |
| Usuários      | GET    | `/usuarios`                   | Lista os usuários                 |
| Vacinas       | GET    | `/vacinas`                    | Lista vacinas disponíveis         |
| Remédios      | GET    | `/remedios`                   | Lista os remédios                 |
| Atividades    | GET    | `/atividades`                 | Lista atividades agendadas        |
| Agenda        | GET    | `/agenda`                     | Consulta a agenda geral           |
| AgendaVacina  | GET    | `/agenda-vacina`              | Lista de vacinas agendadas        |

> ⚠️ Os endpoints podem exigir payloads JSON no corpo da requisição (`POST`, `PUT`). Consulte os DTOs para mais detalhes.

---

## 📄 Licença

Este projeto é apenas para fins educacionais e acadêmicos. Licenciamento formal pode ser definido posteriormente.
