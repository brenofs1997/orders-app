# Orders App

Aplicação web para gerenciamento de pedidos. A interface permite entrar ou iniciar um cadastro, consultar pedidos, criar um pedido com dados do cliente e um item, e atualizar o status de cada pedido.

## Funcionalidades

- **Acesso e cadastro:** formulário com alternância entre login e criação de conta.
- **Consulta de pedidos:** carrega os pedidos do backend após o acesso.
- **Criação de pedido:** informa nome do cliente, endereço de entrega, produto, quantidade e preço unitário.
- **Atualização de status:** permite alterar o status do pedido na lista.
- **Integração com API:** usa Axios para enviar e receber dados do backend.

Os status aceitos pela interface são:

- `RECEBIDO`
- `EM_PREPARO`
- `SAIU_PARA_ENTREGA`
- `ENTREGUE`
- `CANCELADO`

## Tecnologias

- React 19
- TypeScript 6
- Vite 8
- Axios
- ESLint

## Pré-requisitos

- Node.js e npm instalados.
- O backend da aplicação disponível em `http://localhost:8080/api` para consultar, criar e atualizar pedidos.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Executa a verificação de tipos do TypeScript e gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão já compilada. |
| `npm run lint` | Executa o ESLint nos arquivos do projeto. |

## Integração com o backend

A URL base da API está definida em `src/services/api.ts` como `http://localhost:8080/api`. A interface utiliza as seguintes rotas:

| Método | Rota | Uso |
| --- | --- | --- |
| `POST` | `/auth/register` | Envia os dados para criar uma conta. |
| `GET` | `/orders` | Busca a lista de pedidos. |
| `POST` | `/orders` | Cria um pedido. |
| `PATCH` | `/orders/{id}/status` | Atualiza o status de um pedido. |

Quando há um token salvo, o cliente Axios o envia no cabeçalho `Authorization` para as rotas que não são públicas. Login e cadastro são tratados como rotas públicas.


Para usar outro endereço de backend, ajuste a propriedade `baseURL` em `src/services/api.ts`. O backend deve permitir requisições de origem cruzada (CORS) vindas do endereço local do frontend.

## Modelo de dados

Um pedido (`Order`) contém:

- `id`: identificador numérico;
- `customerName`: nome do cliente;
- `deliveryAddress`: endereço de entrega;
- `items`: lista de itens, cada um com nome, quantidade e preço unitário;
- `status`: um dos status listados acima;
- `criadoEm`: data de criação opcional.

Os tipos compartilhados de pedidos, itens, usuários e resposta de autenticação estão definidos em `src/types/index.ts`.

## Estrutura do projeto



```text
src/
├── components/
│   ├── Login.tsx       # Formulários de login e cadastro
│   ├── OrderForm.tsx   # Criação de pedidos
│   └── OrderList.tsx   # Listagem e atualização de status
├── context/
│   └── AuthContext.tsx # Estado e operações de autenticação
├── services/
│   └── api.ts         # Cliente HTTP e configuração da API
├── types/
│   └── index.ts       # Tipos compartilhados
├── App.tsx            # Composição da aplicação e carregamento dos pedidos
├── App.css
└── index.css
```

## Observações

- A lista de pedidos é carregada do backend; a interface não mantém uma persistência local própria para os pedidos.
- Não há scripts de teste configurados no `package.json` neste momento.
