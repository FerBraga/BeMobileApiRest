# API Restful. 

# Contexto
Este projeto trata-se de uma simples API Restful que recebe requisições HTTP e realiza inserções, 
remoções, atualizações e exclusão de registros no banco de dados MySql.


## Desenvolvimento 

> Backend
```bash
Feito em Node.js com o framework Adonis.js, TypeScript e o ORM Lucid. 

As requisições são recebidas pelo servidor, através dos endpoints criados para acesso no lado do cliente, 
então o servidor faz um redirecionamento para um router que passa para a camada de controller da aplicação 

Na camada de controller, recebemos os dados do cliente via body, params ou query, realizamos validações 
como: tipos de dados corretos, se são dados únicos, se o cliente possui token para verificar e conseguir
acessar as rotas disponíveis apenas para usuários. Caso haja algum erro nesse processo uma mensagem de 
erro será lançada. 

Estando tudo certo com os dados da requisição, se faz uma chamada da camada model que tem acesso ao banco 
de dados e recupera os dados requeridos retornando para o controller que passa para o cliente com o status
adequado e o corpo com o conteúdo dos dados. 

``` 

> Banco de dados
```bash
Feito com o banco de dados relacional MySql.O banco conterá com as tabelas de produtos, clientes, endereços, 
usuários, produtos, vendas disponíveis. 
``` 

## Instalando Dependências

> Backend
```bash
Após clonar este repositório em seu diretório local, acesse a pasta onde foi clonado, 
então rode o comando npm install para instalar todos os pacotes. de back-end. Dentro
do diretório existe o arquivo `.env.example` com o modelo para registrar as credencias
do seu usuário do servidor MySql.
``` 

> Banco de dados
```bash
Após instalar back-end você poderá utilizar o arquivo `docker-compose.yml`(caso você tenha Dokcer e Docker compose em sua máquina)  basta rodar o comando `docker-compose up` na pasta raíz, ou utilizar seu servidor mysql local. Certifique-se de não estar utilizando a `porta 3306`, pois ela será 
utilizada para rodar o servidor MySql.
``` 
## Executando aplicação

* Para rodar o servidor:

  ```
  Acesse a pasta raíz do projeto e rode `node ace serve --watch`. Certifique-se de não estar utilizando a `porta 3333`, 
  pois ela será utilzada para rodar o servidor Node.
  ```
* Para implementar as tabelas do banco de dados:

  ```
  Acesse a pasta raíz do projeto e rode `node ace migration:fresh`.
  ```
