# Angular CEP Search

SPA desenvolvida em Angular para busca de CEPs brasileiros e manutenção de um histórico de consultas, utilizando a API pública ViaCEP.

Repositório: [igortomp100/angular-cep-search](https://github.com/igortomp100/angular-cep-search)

## Tecnologias

- Angular 22
- TypeScript
- Sass
- Angular Material
- Reactive Forms
- RxJS
- localStorage
- ViaCEP

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/igortomp100/angular-cep-search.git
cd angular-cep-search
```

Instale as dependências:

```bash
npm install
```

## Execução local

Para iniciar o projeto em ambiente de desenvolvimento:

```bash
npm run start
```

A aplicação estará disponível em `http://localhost:4200`.

## Build de produção

Para gerar os arquivos de produção:

```bash
npm run build
```

Os arquivos são gerados em `dist/sccon-test`.

## Deploy

O conteúdo da pasta `dist/sccon-test` pode ser publicado em serviços de hospedagem estática, como GitHub Pages, Netlify, Vercel, Firebase Hosting ou em um servidor web próprio.

Por ser uma SPA Angular, o servidor deve redirecionar rotas desconhecidas para `index.html`, preservando o funcionamento da navegação por URL.

## Funcionalidades

- Navegação entre Home, Endereços e Buscar Endereços.
- Carregamento lazy dos módulos Home e Endereços.
- Consulta de CEP pela API ViaCEP.
- Máscara no formato `00000-000`.
- Validação de CEP vazio, incompleto, inválido, não encontrado ou já pesquisado.
- Feedback visual de erro e estado de carregamento durante a consulta.
- Listagem de buscas realizadas, com as consultas mais recentes no topo.
- Persistência do histórico no `localStorage`.
- Exclusão de itens do histórico.
- Layout responsivo para desktop e dispositivos móveis.
- Uso do logo vetorial da SCCON no header.

## Estrutura principal

```text
src/app
├── core
│   ├── models
│   └── services
├── pages
│   ├── home
│   └── enderecos
└── shared
    ├── header
    └── page-intro
```

## Decisões técnicas

- Home e Endereços são módulos carregados sob demanda com lazy loading.
- A busca utiliza Reactive Forms para controlar e validar o campo de CEP.
- O serviço `ViaCep` centraliza a comunicação com a API.
- A comunicação entre componentes usa `@Input()` e `@Output()` com `EventEmitter`.
- O componente pai mantém o estado das buscas e delega a persistência ao serviço de histórico.
- Variáveis Sass centralizam cores e estilos reutilizáveis.
- Angular Material é utilizado nos componentes de formulário e interação.
