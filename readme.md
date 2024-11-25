# Marta.Store

## Descrisão do Projecto
---



<p align='center'>🚧O Marta.Store 🚀 Em construção... 🚧</p>

## Indices
---

  - [Descrição do Projeto](#descrisão-do-projecto)
  - [Features](#features)
  - [Começando a usar](#começando-a-usar)
  - [Metodos utilizados](#MetHods-in-use)
  - [Tecnologia usada](#tecnologia-usada)
  - [Autores](#autores)
  - [Licença](#licença)   
  - [Expressões de gratidão](#expressões-de-gratidão)

## Funcionalidades 
---

- [ ] Modulo Produto
- [ ] Modulo Funcionario
- [ ] Modulo Venda
- [ ] Modulo de Venda
- [ ] Modulo de stock
- [ ] Modulo de caixa
- [ ] Modulo de estistica
- [ ] Modulo de Tesouraria

## Começando a usar
---

> Para que esse projecto possa funcionar na sua máquina deve-se cumprir os seguintes requisitos
>e depois seguir passo a passo como instalar o projecto.

### Pré-requisitos
> Para se ter esse projecto a funcionar deve se ter o [Nodejs](https://nodejs.org/pt-br/download) na >sua maquina que vai permitir com que projecto rode na sua maquina, [Git](https://git-scm.com/downloads), conseguir clonar o projecto na sua >máquina, [Vscode](https://code.visualstudio.com/download) fazer algumas alterações do projecto, baixar a extensão do [prisma](#) no vscode para facilitar na escrita e na formatação do arquivo schema.

### Extensões para baixar
- Extensão do Prisma official
- Extensão do Biome official
- Extensão do EditorConfig official

### instalação do projecto
```bash
 # Primeiro clonar o projecto
    git clone <https://github.com/marta-devs/project-hgb.git>

 # Acender a pasta
    cd project-hgb

 # instalar as dependencias do projecto
    npm install

 # Para rodar o servidor e depois só confirmar na porta apresentada no console
    npm run dev


```

### Regras
 
```bash
 # Para fazer alteraçao no projecto primeiro deve-se criar uma nova branch
    git branch feat/add-models
 # E depois para ir nessa branch, ai passar fazer as tuas alterações e commitando essa mesmas alterações
    git checkout feat/add-models
 # OU resumir os dois primeiro passo com comando abaixo
    git checkout feat/add-models -b

 # E Para publicar o projecto no repositório basta fazer apenas isso 
    git push origin feat/add-models -b

  # Depois mudar para a branch principal
    git branch main
  # Se quiseres apagar a branch criada com as alterações
    git branch feat/add-models -d

 #obs.: não se esqueçam só se apaga quando a feature feita for aprovada.
```
> **Nota** Criem um arquivo .env e copiem o arquivo .env.example e colem no .env e preencha as variaveis.

## Metodos e tecnicas utilizado

- BDD
- SOLID
- Package by Module
- CI/CD
- code-reviews e gitflows
- arquictetura Monolitica
- POO
- Clean Architecture
- Testes Automatizado
- Arquictetura multitenant
- Observabilidade
- Background Jobs

## Tecnologia usada
---

> Durante a criação desse projecto foram usada bibliotecas e framework que possibitaram e facilitaram
> o desenvolvimento do HELPDesktop, sendo assim temos a lista:

 - [express](https://github.com/expressjs/express) usado para criar servidores e renderizar nossa pagina.

 - [prisma](https://www.prisma.io/docs) é um ORM que permite manipular o banco de dados sem necessitar de ir no proprio banco de dados e fazer as funções de criar banco de dado, criar tabela,
 fazer consulta, deletar registro e etc. E podemos mudar de banco de dados sem a necessidade de alterar os comandos por que ele suporta todos os tipos de banco de dados e seu comando são universal para manipular qualquer banco de dados. 

## Autores
---

> Projecto desenvolvido pelos membros da marta

 
