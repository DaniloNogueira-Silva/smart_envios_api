# smart_envios_api

# Tecnologias usadas:
- Typescript
- Prisma
- Fastify
- Docker
- Jest
- Nodemailer
- PostgreSQL
- Uuid
- Yup

# Documentação para o uso da API 
## ENDPOINTS
### POST "/lead"
Essa rota é responsável por cadastrar um novo lead no banco de dados
#### Request Body
```
  {
    name: string
    email: string
  }
```
#### Respostas
##### Lead Criado! (201)
Caso essa resposta aconteça, um lead será cadastrado no banco de dados, ele retorna o id, name e email salvos.

exemplo de resposta:
```
{
    "id": "69d5c061-e016-4017-bf0f-d2f194b78e45",
    "name": "teste_de_rota",
    "email": "teste_de_rota@gmail.com"
}
```

##### Internal Server Error! 500
Caso essa resposta aconteça ocorreu um erro ao cadastrar o lead

Exemplo de resposta:

```

{
    "error": "Internal Server Error"
}

```

### POST "/intention"
Essa rota é responsável por cadastrar uma nova intention
#### Request Body
```
  {
    zipcode_start: string
    zipcode_end: string
    lead_id: string
  }
```
#### Respostas
##### Intention Created! (201)
Caso essa resposta aconteça, uma intention será cadastrado no banco de dados, ele retorna o id, zipcode-start/end e o lead_id.

exemplo de resposta:
```
{
    "id": "ed69f059-40c5-481d-bdd9-8536be95f955",
    "zipcode_start": "123131",
    "zipcode_end": "54321",
    "lead_id": "1e9558f6-0fdb-42d0-97da-96fd24fc6d58"
}
```

##### Internal Server Error! 500
Caso essa resposta aconteça ocorreu um erro ao cadastrar a intention

Exemplo de resposta:

```

{
    "error": "Internal Server Error"
}

```
### PUT "/intention/:id"
Essa rota é responsável por atualizar uma lead_id de uma intention
#### Parâmetros
```
  {
    id: string
  }
```
#### Request Body
```
  {
    lead_id: string
  }
```
#### Respostas
##### Intention Updated! (200)
Caso essa resposta aconteça, uma intention será cadastrado no banco de dados, ele retorna o id, zipcode-start/end e o lead_id.

exemplo de resposta:
```
{
    "id": "906ba8c9-0edb-4404-824a-4c9d3898e763",
    "zipcode_start": "123131",
    "zipcode_end": "54321",
    "lead_id": "69d5c061-e016-4017-bf0f-d2f194b78e45"
}
```

##### Internal Server Error! 500
Caso essa resposta aconteça ocorreu um erro ao cadastrar a intention

Exemplo de resposta:

```

{
    "error": "Internal Server Error"
}

```
