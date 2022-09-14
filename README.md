<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
   
   
# API-AUTENTICACAO

## Sobre este projeto

Este projeto tem por principal objetivo o desenvolvimento de uma api de autenticação que será consumida pelo front-emd commerce suite, disponivel em: https://github.com/matheusgit1/commerce-suit


## Autores

- [Matheus Alves Pereira](https://www.linkedin.com/in/matheus-alves-pereira-4b3781222/)

## Stack utilizada


**Back-end:**
Node,
Express,
nestjs,
typescript,
javascrip,
aws,
Sql,
banco de dados postgress

**Ferramentas de teste:**
jest, postman




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

no diretorio raíz copie e cole as chaves do arquivo ".env.example" em seu ".env" com os valores adequados

- exemplo
PORT = 3000



## Rodando localmente

### requisitos

nodejs na versao 15.x ou superior

pode ser baixado aqui: https://nodejs.org/pt-br/download/

verifique se o node foi instalado corretamente com o seguinte comendo no cmd ou powerShell

```bash
  node --version
```
#### em caso de comando não reconheciod, reinicie seu computador

#### baixe o aplicativo "expo" na playstore ou apple store.


####  (opcional) instale o yarn para o usar a cli do yarn
no seu cmd ou powerShell use o comando


```bash
  npm install yarn --global
```
verifique se o yarn foi instalado corretamente com o seguinte comendo no cmd ou powerShell

```bash
  yarn --version
```

Clone o projeto com o  seguinto comando no cmd, powerShell, wsl ou qualquer gerenciador
de sub sistemas de sua preferência


```bash
  git clone https://github.com/matheusgit1/api-autenticacao.git
```

Entre no diretório do projeto

```bash
  cd api-autenticacao
```

Instale as dependências

```bash
  yarn install
```

ou

```bash
  npm install
```

Inicie o servidor

```bash
  yarn start:dev
```
ou

```bash
  npm run yarn start:dev
```

## Condições iniciais

#### para o funcionamento adequado é necessario que suas variaveis de ambientes estejam corretas

# Documentação da api

a collection postman dessa api está idisponivel dentro desse repositório: em: https://github.com/matheusgit1/api-enderecos/blob/main/adress.api.docs

### variaveis

#### URL_API_AUTENTICACAO: variavel onde a api estará rodando localmente

#### TOKEN: token de atuenticação (você só consegue ele na rota de login da api de autenticação)

### Retornos padronizados

status 400 - Bad request

status 404 - Recurso não encontrado

status 500 - erro interno

stauts 200 - ok

## Rotas


#### Criar um novo recurso no contexto de autenticação

```http
  POST /auth/users/create
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email de contato|
| `name` | `string` | **Obrigatório**. nome de usuario|
| `document` | `string` | **Obrigatório**.  documento. cpf ou cnpj|
| `phone` | `string` | **Obrigatório**.  numero de telefone com ddd, ex: 27997822665|
| `password` | `number` | **Obrigatório**.  sua senha |
| `confirmPassword` | `number` | **Obrigatório**.  consfirmação de senha, deve ser igual a senha no campo "password" | 


#### Retorna status 201 caso tudo esteja no formato esperado com o seguinte objeto

```JSON
{
    "transacao": {
        "co_transacao_local": "2LG5LNMJKQ5R716S7-AA7G769R72L47",
        "dt_transacao_local": "2022-08-06T15:34:42.591Z"
    },
    "mensagem": "E-mail cadastrado com sucesso!"
}
```

#### Login na aplicação

```http
  POST /auth/users/login
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email cadastrado|
| `password` | `number` | **Obrigatório**.  sua senha |


#### Retorna status 200 caso tudo esteja no formato esperado com o seguinte objeto

o campo 'access_token' é nossa chave de acesso as rotas autenticadas. Esse token tem validade de 7(sete) dias.

o campo 'verifyCode' é o código de veirificação enviado por email ao criar um usuario

é importante que o usuario seja veirifcado antes de fazer login

```JSON
{
    "id": "7d15a6fb-69df-4af8-ac29-5b75ab634d88",
    "name": "matheus",
    "email": "pereira.matheusalves@gmail.com",
    "phone": "27997822665",
    "document": "document",
    "resetePasswordToken": null,
    "resetePasswordTokenExpireIn": null,
    "createdAt": "2022-08-10T14:47:45.557Z",
    "updatedAt": "2022-08-10T14:48:37.233Z",
    "isVerified": true,
    "verifyCode": "871957",
    "verifyCodeExpireIn": "2022-08-10T18:47:25.986Z",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcmVpcmEyLm1hdGhldXNhbHZlc0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1hdGhldXMiLCJpZCI6IjdkMTVhNmZiLTY5ZGYtNGFmOC1hYzI5LTViNzVhYjYzNGQ4OCIsImlhdCI6MTY2MDE3NzQxMiwiZXhwIjoxNjYwNzgyMjEyfQ.NodxDhXLsyHV0NFO7DEaxDa4wmHdCVtTF3ustHoVUTM"
}
```

#### Retorna status 400 caso o usuario não sido verificado ainda. Nesse caso verifiqueo na seguinte rota

#### Veirificar o usuario

```http
  POST /auth/users/validate
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email cadastrado|
| `verifyCode` | `number` | **Obrigatório**.  código de vericação |


#### Retorna status 200 caso tudo esteja no formato esperado com o seguinte objeto

```JSON
{
    "transacao": {
        "co_transacao_local": "MB-KEFL9HR5ECDJ6HBD256QQ8B4A74S",
        "dt_transacao_local": "2022-08-07T20:51:58.041Z"
    },
    "message": "Conta verificado"
}
```

#### ou retorna status 400 caso a conta já esteja validade


#### Reenviar código de verificação

```http
  POST /auth/users/validate/resent-verify-code
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email cadastrado|


#### Retorna status 201 caso tudo esteja no formato esperado com o seguinte objeto

```JSON
{
    "transacao": {
        "co_transacao_local": "GSAOLSA-RBC3HQ97C-Q4KMSB273B1R",
        "dt_transacao_local": "2022-08-07T21:53:15.714Z"
    },
    "mensagem": "Novo código de verificação foi enviado para seu email"
}
```

#### Resetar uma senha

#### Caso o usuario perca a senha podemos reiniciá-la na seguinte rota

```http
  PUT /auth/users/resete-password
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email cadastrado|


#### Retorna status 200 caso tudo esteja no formato esperado com o seguinte objeto

```JSON
{
    "transacao": {
        "co_transacao_local": "R442IRBHN6K89S9LJPKR96S11D5J-4",
        "dt_transacao_local": "2022-08-07T22:19:21.462Z"
    },
    "mensagem": "Link de recuperação de senha enviada para seu email"
}
```

#### alterar a senha apartir da rota de reset password

```http
  PUT /auth/users/resete-password/:token
```

| Params   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. ultima parte do link de reset de senha enviado por email|

ex: link de ecuperação de senha/token

use esse token como parametro

#### Retorna status 200 caso tudo esteja no formato esperado com o seguinte objeto

```JSON
{
    "transacao": {
        "co_transacao_local": "POS5D17ECEK8RLDECLJKGJK85MB4MN",
        "dt_transacao_local": "2022-08-07T23:03:40.348Z"
    },
    "mensagem": "Senha alterada com sucesso"
}
```


#### alterar a senha quando logado na aplicação

```http
  PATCH /v1/auth/users/change-password
```

| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação|

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `password` | `string` | **Obrigatório**. nova senha|

#### Retorna status 200 caso tudo esteja no formato

```JSON
{
    "transacao": {
        "co_transacao_local": "O49QCCLGC29E1H4J8GQHMP3M72I63S",
        "dt_transacao_local": "2022-08-08T14:35:12.775Z"
    },
    "mensagem": "Senha alterada com sucesso"
}
```
