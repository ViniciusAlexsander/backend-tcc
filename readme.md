<h1 align="center">
    <img alt="CINEFAN" title="#CINEFAN" src="./assets/banner.png" />
</h1>

## 🎬 Sobre o projeto

CINEFAN é um site que apresenta um repositório de informações de filmes. Você pode registrar seus filmes favoritos, filmes que já assistiu e descobrir inúmeros outros através do filtro presente no site.

Os usuários terão acesso a aplicação mobile, onde poderão:

- Usuário sem cadastro:
  - Ver os filmes mais populares, filmes que estão no cinema e os próximos lançamentos
  - Ver os detalhes dos filmes, como gênero, duração, sinopse, elenco e onde ele está disponível
  - Pesquisar por filmes utilizando a busca avançada
  - Sortear um filme para ser assistido
  - Se cadastrar na plataforma
- Usuário cadastrado, além das funcionalidades para os usuários sem cadastro, também é possível:
  - Salvar filmes como favoritos
  - Salvar filmes para serem assistidos
  - Salvar filmes já assistidos
  - Criar e participar de grupos
    - E ao entrar em um grupo você pode criar ou participar de sessões

Este repositório é o back-end do projeto, acesse, também, o [front-end](https://github.com/ViniciusAlexsander/frontend-tcc/).

## 💻 Tecnologias

As seguintes ferramentas foram usadas na construção do back-end do projeto:

- [Node.js][nodejs]
- [TypeScript][typescript]
- [TypeORM][typeorm]
- [VSCode][vscode]

O banco de dados utilizado foi o [PostgreSQL][postgresql], através do [Docker][docker]. Você pode utilizar o banco que quiser, mas precisará adptar as configurações de conexão do TypeORM com o banco que escolheu.

## 📁 Estrutura de pastas

A pasta “core”, possui pastas com arquivos essenciais em todo o back-end.

- **Domain:** aqui mantivemos os arquivos e pastas referentes ao funcionamento do ORM e interfaces para os dados que devem ser enviados ao banco de dados. 

- **Ports:** nesta pasta temos interfaces que indicam os dados que serão recebidos do front-end e enviados para ele.  

- **Repositories:** todas as interfaces responsáveis por indicar os métodos de consultas no banco necessários para realizar os casos de uso. 

- **Shared:** estão todas as classes compartilhadas e utilizadas em mais de um lugar.  

- **Usecases:** aqui estão todos arquivos onde codificamos as regras do negócio. 

Dentro da pasta “infra” há tudo relacionado ao ORM e a ligação com o banco de dado: 

- **Entities:** aqui estão as entidades, que são classes que representam as tabelas para a API.  

- **Repositories:** os arquivos responsáveis por guardar as classes que fazem a interface com o banco de dados. Nestes arquivos escrevemos as querys com o auxílio do ORM. 

- **Typeorm:** nesta pasta ficam os arquivos referentes à ao ORM, como as migrations, que são classes executadas pelo ORM que geram as tabelas. 

A pasta “presentation” contém todo o conteúdo relacionado ao que é apresentado para o front-end: 

- **Controllers:** arquivos que recebem os dados do front-end e retornam. 

- **Middlewares:** arquivos com códigos que precisam ser executados no meio de outras tarefas. _Exemplo: verificar se o usuário está logado visualizar os filmes._

## 🚀 Como executar o projeto

Para conseguir executar o projeto você precisa ter instalado em sua máquina as seguintes ferramentas:
- [Git][git]: para clonar o projeto e ter o controle de versão
- [Node.js][nodejs]: para rodar o projeto
- Npm: para instalar as depedências (este já vem instalando Node.js)
- Docker ou o banco de dados de sua preferência

#### 🎲 Rodando o back-end (servidor)

```bash
# (1) Clone o repositório
$ git clone https://github.com/ViniciusAlexsander/backend-tcc

# (2) Acesse a pasta do projeto no terminal e instale as dependências
$ npm install

# (3) Configure a API para conectar com o banco de dados preenchendo o arquivo .env

# (4) Se você estiver utilizando o Docker, rode o comando abaixo para iniciar o container, este já criara o banco de dados dentro
$ docker-compose up

# (5) Rode as migrations do projeto para criar as tabelas, através dos comandos do TypeORM
$ npm run typeorm migration:run

# (6) Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333
# Caso queira outra porta, configure uma váriavel de ambiente no .env com o nome PORT
```

Feito com 💜 por [Nayla Gomes 👩‍💻](https://www.linkedin.com/in/naygo/) e [Vinicius Marinho 👨‍💻](https://www.linkedin.com/in/vinicius-alexsander-lima-marinho/).

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[typeorm]: https://typeorm.io/
[express]: https://expressjs.com/pt-br/
[reactjs]: https://reactjs.org
[vscode]: https://code.visualstudio.com/
[license]: https://opensource.org/licenses/MIT
[git]: https://git-scm.com
[postgresql]: https://www.postgresql.org/
[docker]: https://www.docker.com/

[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
