# 🏆 Golden Raspberry Awards API – Versão NestJS

API RESTful desenvolvida com NestJS para leitura da categoria **Pior Filme** do Golden Raspberry Awards, baseada em um arquivo CSV de filmes vencedores.

---

## 📌 Descrição

A API permite consultar os produtores com:

- ✅ Menor intervalo entre duas vitórias consecutivas
- ✅ Maior intervalo entre duas vitórias consecutivas

> ℹ️ Este README foi gerado com auxílio de inteligência artificial (ChatGPT).

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) – Framework Node.js moderno e estruturado
- [TypeORM](https://typeorm.io/) – ORM com suporte a SQLite
- [SQLite](https://www.sqlite.org/) – Banco local leve
- [CSV-Parser](https://www.npmjs.com/package/csv-parser) – Leitura eficiente de arquivos CSV
- [Swagger](https://swagger.io/) – Documentação automática da API
- [Supertest](https://www.npmjs.com/package/supertest) – Testes e2e com Jest

---

## 📂 Estrutura do Projeto

```
src/
├── main.ts
├── app.module.ts
├── awards/
├── awards.controller.ts
├── awards.module.ts
├── awards.service.ts
├── entities
├──   movie.entity.ts
├── loaders
├──   csv-loader.ts
test/
├── awards.e2e-spec.ts
Movielist.csv
```

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Pilonetto/avaliacao-backend-outsera-node.git
cd avaliacao-backend-outsera-node
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute a aplicação

```bash
npm run start:dev
```

A aplicação estará disponível em:

```
http://localhost:8000
```

### 4. Documentação Swagger

Acesse a documentação interativa da API:

```
http://localhost:8000/docs
```

---

## 🧪 Como rodar os testes e2e

```bash
npm run test:e2e
```

---

## 📥 Requisitos atendidos

- [x] Leitura automática do CSV na inicialização
- [x] Armazenamento local em SQLite
- [x] Rota `/producers/interval-awards` implementada
- [x] Resposta no formato exigido
- [x] Testes de integração (e2e) com validação da estrutura
- [x] Documentação Swagger ativa

---

## ✍️ Autor

Desenvolvido como parte de um teste técnico.