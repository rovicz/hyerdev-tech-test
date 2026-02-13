# 📦 Rastreamento - SSW PF (Hyerdev Tech Test)

Uma aplicação web moderna para rastreamento de encomendas da transportadora SSW, desenvolvida como desafio técnico. O projeto realiza o scraping dos dados diretamente do sistema da SSW e os apresenta em uma interface limpa e responsiva.

## ✨ Funcionalidades

- 🔍 **Busca por CPF:** Localize todas as encomendas associadas a um CPF.
- 📦 **Listagem de Encomendas:** Visualize rapidamente o status, número da nota fiscal e pedido.
- 📄 **Detalhes Completos:** Acesse o histórico detalhado de rastreamento de cada encomenda sem sair da aplicação.
- 📊 **Ordenação e Paginação:** Organize suas encomendas e históricos por data (mais recente ou mais antiga).
- 📱 **Interface Responsiva:** Design otimizado para desktop e mobile.

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/)
- **Gerenciamento de Estado/Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Scraping:** [Cheerio](https://cheerio.js.org/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado.
- Gerenciador de pacotes (npm, pnpm ou yarn).

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/rovicz/hyerdev-tech-test.git
    cd <sua-pasta>
    ```

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    # ou
    pnpm dev
    ```

4.  Acesse `http://localhost:3000` no seu navegador.

## 📂 Estrutura do Projeto

```
├── app/
│   ├── api/            # Rotas de API (Next.js Server Actions/Routes)
│   │   ├── tracking/   # Rota principal (Busca por CPF)
│   │   └── details/    # Rota de detalhes (Scraping detalhado)
│   ├── page.tsx        # Página principal (Orquestrador de passos)
│   └── types/          # Definições de tipos TypeScript
├── components/         # Componentes React
│   ├── ui/             # Componentes base (Shadcn UI)
│   ├── search-step.tsx # Passo 1: Busca
│   ├── list-step.tsx   # Passo 2: Listagem
│   ├── details-step.tsx# Passo 3: Detalhes
│   └── ...
├── hooks/              # Custom Hooks (React Query)
└── lib/                # Utilitários e configurações (Axios, Utils)
```

## 🔌 API Endpoints

A aplicação expõe duas rotas principais que realizam o scraping:

### 1. Buscar Encomendas

- **URL:** `/api/tracking`
- **Método:** `POST`
- **Body:** `{ "cpf": "00000000000" }`
- **Retorno:** Lista simplificada de encomendas.

### 2. Detalhes da Encomenda

- **URL:** `/api/tracking/details`
- **Método:** `POST`
- **Body:** `{ "detailsLink": "https://ssw.inf.br/..." }`
- **Retorno:** Histórico completo de movimentações.

---
