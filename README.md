# 💳 Sistema de Gestão de Cartões de Crédito

> Desafio Técnico - Desenvolvedor Frontend (React / Next.js)  
> Grupo MFM - Departamento de Engenharia

Sistema completo para gerenciamento de cartões de crédito com validações robustas, arquitetura MVC e interface moderna.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📸 Demonstração

[Link do Deploy - Frontend](seu-link-vercel-aqui)  
[Link do Deploy - Backend](seu-link-render-aqui)

## ✨ Funcionalidades

- ✅ **Cadastro de cartões em 2 etapas** (frente e verso)
- ✅ **Validações em tempo real**:
    - Número do cartão (Algoritmo de Luhn)
    - CPF (Algoritmo oficial brasileiro)
    - Data de nascimento (maior de 18 anos)
    - Nome do titular (apenas letras)
- ✅ **Carrossel 3D interativo** com efeito coverflow
- ✅ **Animação flip 3D** para visualizar frente/verso
- ✅ **API REST completa** com arquitetura MVC + DAO
- ✅ **Persistência de dados** via backend
- ✅ **Exclusão de cartões**
- ✅ **Interface responsiva** e moderna

## 🏗️ Arquitetura

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/
│   │   ├── CreditCardVisual/
│   │   │   ├── CreditCardFront.tsx    # Frente do cartão
│   │   │   └── CreditCardBack.tsx     # Verso do cartão
│   │   └── CreditCardForm.tsx         # Formulário em 2 etapas
│   ├── services/
│   │   └── api.ts                     # Cliente HTTP
│   ├── types/
│   │   └── Card.ts                    # Interfaces TypeScript
│   ├── utils/
│   │   └── Formatters.ts              # Funções de formatação
│   ├── App.tsx                        # Componente principal
│   └── App.css                        # Estilos globais
└── package.json
```

### Backend (Node.js + Express + TypeScript)
```
backend/
├── src/
│   ├── models/
│   │   └── CreditCard.ts              # Entidades e DTOs
│   ├── dao/
│   │   └── CardDAO.ts                 # Data Access Object
│   ├── controllers/
│   │   └── CardController.ts          # Lógica de negócio
│   ├── routes/
│   │   └── cardRoutes.ts              # Rotas da API
│   ├── validators/
│   │   ├── cpfValidator.ts            # Validação de CPF
│   │   ├── dateValidator.ts           # Validação de data
│   │   └── cardValidator.ts           # Validação de cartão (Luhn)
│   ├── data/
│   │   └── cards.json                 # "Banco de dados" JSON
│   └── server.ts                      # Servidor Express
└── package.json
```

## 🚀 Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 18.x | Framework moderno e amplamente adotado |
| **TypeScript** | 5.x | Type safety e melhor DX |
| **Vite** | 5.x | Build rápido e HMR instantâneo |
| **Tailwind CSS** | 4.x | Estilização rápida e consistente |
| **Framer Motion** | 11.x | Animações fluidas e performáticas |
| **Swiper** | 12.x | Carrossel 3D com efeito coverflow |
| **Lucide React** | 0.x | Ícones modernos e leves |

### Backend
| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Node.js** | 22.x | Runtime JavaScript server-side |
| **Express** | 4.x | Framework web minimalista e flexível |
| **TypeScript** | 5.x | Type safety no backend |
| **CORS** | 2.x | Permitir requisições cross-origin |

### Testes
| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Jest** | 29.x | Framework de testes robusto |
| **Testing Library** | 16.x | Testes focados no usuário |

## 📋 Pré-requisitos

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ ou yarn 1.22+
- Git

## ⚙️ Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/credit-card-manager.git
cd credit-card-manager
```

### 2. Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
✅ Backend rodando em `http://localhost:3001`

### 3. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend rodando em `http://localhost:5173`

### 4. Acesse a aplicação
Abra seu navegador em: `http://localhost:5173`

## 🧪 Executar Testes

### Frontend
```bash
cd frontend
npm test
```

Para rodar em modo watch:
```bash
npm run test:watch
```

Para gerar relatório de cobertura:
```bash
npm run test:coverage
```

## 🎨 Decisões Técnicas

### Por que React + Vite ao invés de Next.js?
- **Vite** oferece desenvolvimento extremamente rápido com HMR instantâneo
- Para este projeto, SSR/SSG não são necessários
- Build otimizado e menor complexidade
- Foco em SPA (Single Page Application)

### Por que Swiper ao invés de implementação custom?
- **Performance nativa** otimizada para carrosséis 3D
- **Efeito coverflow** out-of-the-box
- **Touch/swipe** responsivo em mobile
- **Manutenção** garantida pela comunidade
- Suporte a loop infinito e navegação fluida

### Por que Framer Motion?
- **API declarativa** e intuitiva
- **Performance** superior ao react-spring
- **TypeScript** support nativo
- Animações de **flip 3D** suaves
- Bundle size otimizado

### Arquitetura Backend: MVC + DAO

**Fluxo de requisição:**
```
Cliente → Routes → Controller → DAO → JSON/Database
```

**Vantagens:**
- ✅ **Separação de responsabilidades** clara
- ✅ **Testabilidade** individual de cada camada
- ✅ **Escalabilidade**: fácil trocar JSON por MySQL/MongoDB
- ✅ **Manutenibilidade**: cada arquivo tem uma única responsabilidade
- ✅ **Padrão da indústria**: seguido por NestJS, Spring Boot, Django

**Camadas:**
- **Model**: Define estrutura dos dados (interfaces/tipos)
- **DAO**: Acessa e manipula dados (JSON neste caso)
- **Controller**: Lógica de negócio e validações
- **Routes**: Mapeamento de URLs para controllers

### Validações no Backend

**Por que validar no backend se já valida no frontend?**
- ✅ **Segurança**: Frontend pode ser burlado via DevTools
- ✅ **Integridade**: Garante dados corretos no banco
- ✅ **API RESTful**: Backend independente do frontend
- ✅ **Múltiplos clientes**: Pode ter app mobile, desktop, etc

**Algoritmos utilizados:**
- **CPF**: Validação oficial brasileira com dígitos verificadores
- **Cartão**: Algoritmo de Luhn (padrão Visa/Mastercard/Amex)
- **Data**: Verifica maioridade (18+), idade máxima (120) e validade
- **Nome**: Regex para aceitar apenas letras e espaços

### Gerenciamento de Estado

Utilizamos **useState + useRef** ao invés de Context API ou Redux porque:
- ✅ Estado local é suficiente para a aplicação
- ✅ Não há prop drilling excessivo
- ✅ Simplicidade e performance
- ✅ Fácil manutenção
- ✅ Adequado para escopo do projeto

**Quando usar alternativas:**
- **Context API**: Se tiver muitos componentes aninhados compartilhando estado
- **Redux/Zustand**: Aplicações grandes com lógica complexa
- **React Query**: Para cache e sincronização de dados server

## 📡 Endpoints da API

### Base URL
```
Desenvolvimento: http://localhost:3001/api
Produção: https://seu-backend.onrender.com/api
```

### Rotas Disponíveis

#### `GET /cards`
Lista todos os cartões cadastrados.

**Response (200):**
```json
[
  {
    "id": "1730324567890",
    "holderName": "João Silva",
    "cardNumber": "4532148803436467",
    "birthDate": "15/05/1990",
    "cpf": "12345678909",
    "createdAt": "2025-10-30T23:42:47.890Z"
  }
]
```

#### `GET /cards/:id`
Busca um cartão específico por ID.

**Response (200):**
```json
{
  "id": "1730324567890",
  "holderName": "João Silva",
  "cardNumber": "4532148803436467",
  "birthDate": "15/05/1990",
  "cpf": "12345678909",
  "createdAt": "2025-10-30T23:42:47.890Z"
}
```

**Response (404):**
```json
{
  "error": "Cartão não encontrado"
}
```

#### `POST /cards`
Cria um novo cartão.

**Request Body:**
```json
{
  "holderName": "João Silva",
  "cardNumber": "4532 1488 0343 6467",
  "birthDate": "15/05/1990",
  "cpf": "123.456.789-09"
}
```

**Response (201):**
```json
{
  "id": "1730324567890",
  "holderName": "João Silva",
  "cardNumber": "4532148803436467",
  "birthDate": "15/05/1990",
  "cpf": "12345678909",
  "createdAt": "2025-10-30T23:42:47.890Z"
}
```

**Response (400) - Validação:**
```json
{
  "errors": [
    "CPF inválido",
    "Data de nascimento inválida ou menor de 18 anos"
  ]
}
```

#### `DELETE /cards/:id`
Remove um cartão.

**Response (204):** No content

**Response (404):**
```json
{
  "error": "Cartão não encontrado"
}
```

## 🔒 Validações Implementadas

### Nome do Titular
- ✅ Mínimo 3 caracteres
- ✅ Apenas letras e espaços
- ✅ Validação com regex: `/^[a-zA-ZÀ-ÿ\s]+$/`

### Número do Cartão
- ✅ 13-19 dígitos (padrão internacional)
- ✅ Algoritmo de Luhn (mod-10)
- ✅ Formatação automática: `1234 5678 9012 3456`
- ✅ Remove espaços antes de validar

**Como funciona o Algoritmo de Luhn:**
1. Percorre dígitos da direita para esquerda
2. Dobra os valores em posições pares
3. Se o dobro > 9, subtrai 9
4. Soma todos os dígitos
5. Válido se soma % 10 === 0

### Data de Nascimento
- ✅ Formato: DD/MM/AAAA
- ✅ Idade mínima: 18 anos
- ✅ Idade máxima: 120 anos
- ✅ Valida se a data existe (não aceita 30/02/2000)
- ✅ Não aceita datas futuras
- ✅ Formatação progressiva durante digitação

### CPF
- ✅ 11 dígitos numéricos
- ✅ Validação dos dígitos verificadores
- ✅ Rejeita CPFs com todos dígitos iguais (111.111.111-11)
- ✅ Formatação automática: `123.456.789-09`
- ✅ Algoritmo oficial da Receita Federal

**Como funciona a validação de CPF:**
1. Remove caracteres não numéricos
2. Verifica se tem 11 dígitos
3. Rejeita sequências iguais (111.111.111-11)
4. Calcula primeiro dígito verificador
5. Calcula segundo dígito verificador
6. Compara com os dígitos fornecidos

## 🧪 Testes Implementados

### Cobertura de Testes

**Utils - Formatters (100% coverage)**
- ✅ `formatCardNumber`: 5 casos de teste
- ✅ `formatCPF`: 5 casos de teste
- ✅ `formatDate`: 6 casos de teste

**Components - CreditCardFront**
- ✅ Renderização com dados
- ✅ Renderização com placeholders
- ✅ Exibição de labels
- ✅ Validade padrão

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Modo watch (re-roda ao salvar)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Estrutura de Testes
```
frontend/src/
├── utils/
│   └── __tests__/
│       └── Formatters.test.ts
└── components/
    └── CreditCardVisual/
        └── __tests__/
            └── CreditCardFront.test.tsx
```

## 🚢 Deploy

### Frontend na Vercel

**Passo a passo:**

1. **Prepare o código:**
```bash
git add .
git commit -m "feat: projeto completo"
git push origin main
```

2. **Deploy na Vercel:**
    - Acesse [vercel.com](https://vercel.com)
    - Clique em "New Project"
    - Importe seu repositório do GitHub
    - Configure:
        - **Framework Preset**: Vite
        - **Root Directory**: `frontend`
        - **Build Command**: `npm run build`
        - **Output Directory**: `dist`
        - **Install Command**: `npm install`

3. **Variáveis de Ambiente:**
    - Vá em Settings → Environment Variables
    - Adicione: `VITE_API_URL` = URL do backend

4. **Deploy:**
    - Clique em "Deploy"
    - Aguarde 2-3 minutos
    - Pronto! ✅

### Backend no Render

**Passo a passo:**

1. **Crie conta no Render:**
    - Acesse [render.com](https://render.com)
    - Faça login com GitHub

2. **Criar Web Service:**
    - Clique em "New +" → "Web Service"
    - Conecte seu repositório GitHub
    - Configure:
        - **Name**: `credit-card-api`
        - **Root Directory**: `backend`
        - **Runtime**: Node
        - **Build Command**: `npm install && npm run build`
        - **Start Command**: `npm start`
        - **Instance Type**: Free

3. **Variáveis de Ambiente:**
    - Adicione no Render:
        - `PORT` = `3001`
        - `NODE_ENV` = `production`

4. **Deploy:**
    - Clique em "Create Web Service"
    - Aguarde 5-10 minutos
    - Copie a URL gerada

5. **Conectar Frontend:**
    - Edite `frontend/src/services/api.ts`:
```typescript
const API_URL = import.meta.env.PROD 
  ? 'https://seu-backend.onrender.com/api'
  : 'http://localhost:3001/api';
```

6. **Commit e redeploy:**
```bash
git add .
git commit -m "chore: conectar ao backend em produção"
git push
```

A Vercel fará redeploy automático!

### Verificar Deploy

**Frontend:**
- Acesse a URL da Vercel
- Teste adicionar um cartão
- Verifique o console (F12) para erros

**Backend:**
- Acesse `https://seu-backend.onrender.com/health`
- Deve retornar: `{"status":"ok","message":"Credit Card API is running"}`

**Conexão:**
- No frontend, abra o Network (F12 → Network)
- Adicione um cartão
- Verifique se a requisição vai para o backend correto

## 📊 Estrutura de Dados

### Interface CreditCard
```typescript
interface CreditCard {
  id: string;              // Timestamp único (Date.now().toString())
  holderName: string;      // Nome do titular (3+ caracteres, apenas letras)
  cardNumber: string;      // Número do cartão (13-19 dígitos, sem formatação)
  birthDate: string;       // Data de nascimento (DD/MM/AAAA)
  cpf: string;            // CPF (11 dígitos, sem formatação)
  createdAt: string;      // Data de criação (ISO 8601)
}
```

### DTO (Data Transfer Object)
```typescript
type CreateCardDTO = Omit<CreditCard, 'id' | 'createdAt'>;
```

### Armazenamento (JSON)
```json
[
  {
    "id": "1730324567890",
    "holderName": "João Silva",
    "cardNumber": "4532148803436467",
    "birthDate": "15/05/1990",
    "cpf": "12345678909",
    "createdAt": "2025-10-30T23:42:47.890Z"
  }
]
```

## 🎯 Requisitos Atendidos

### Obrigatórios ✅
- ✅ Card visual de cartão (frente e verso)
- ✅ Botão "+" com tooltip "Adicionar cartão de crédito"
- ✅ Formulário em 2 etapas (frente → verso)
- ✅ Campos: Nome do titular + Número do cartão
- ✅ Campos: Data de nascimento + CPF
- ✅ Efeito flip 3D (Framer Motion)
- ✅ Carrossel de múltiplos cartões (Swiper)
- ✅ React com componentes funcionais
- ✅ Hooks (useState, useEffect, useRef)
- ✅ Tailwind CSS
- ✅ Gerenciamento de estado
- ✅ Estrutura de pastas escalável
- ✅ README.md completo

### Extras Implementados ✅
- ✅ **TypeScript** (frontend e backend)
- ✅ **Backend completo** (Node.js + Express + MVC)
- ✅ **Validações robustas**:
    - Número do cartão (Algoritmo de Luhn)
    - CPF (Algoritmo oficial)
    - Data de nascimento (idade válida)
    - Nome (apenas letras)
- ✅ **Animações elegantes** (Framer Motion + Swiper)
- ✅ **Testes unitários** (Jest + Testing Library)
- ✅ **API REST completa** (CRUD)
- ✅ **Arquitetura profissional** (MVC + DAO)
- ✅ **Formatação automática** de inputs
- ⚠️ **Acessibilidade** (aria-labels básicos)

### Não Implementados ❌
- ❌ Docker (não essencial para o desafio)
- ❌ json-server (implementamos backend real ao invés)

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: CORS blocked
1. Verifique se o backend está rodando em `http://localhost:3001`
2. Verifique se o CORS está habilitado no `server.ts`
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

### Cartões não aparecem
1. Abra o DevTools (F12)
2. Vá em Console e procure erros
3. Vá em Network e verifique se a requisição foi feita
4. Verifique se o backend está respondendo em `/api/cards`

### Erro: "Port already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Testes falhando
```bash
# Limpe o cache do Jest
npm test -- --clearCache

# Reinstale dependências de teste
npm install -D jest @testing-library/react @testing-library/jest-dom
```

### Build falhando
```bash
# Verifique erros de TypeScript
npm run build

# Se houver erros, corrija-os antes de fazer deploy
```

## 📝 Melhorias Futuras

- [ ] Edição de cartões existentes
- [ ] Filtro e busca de cartões por nome/número
- [ ] Ordenação personalizada (por nome, data)
- [ ] Exportar dados (JSON/CSV)
- [ ] Importar dados de arquivo
- [ ] Categorias de cartões (débito, crédito, corporativo)
- [ ] Bandeiras de cartão (Visa, Mastercard, Amex)
- [ ] Dark mode
- [ ] Internacionalização (i18n) - PT, EN, ES
- [ ] PWA (Progressive Web App)
- [ ] Autenticação de usuários (JWT)
- [ ] Banco de dados real (PostgreSQL/MongoDB)
- [ ] Testes E2E com Cypress/Playwright
- [ ] CI/CD com GitHub Actions
- [ ] Docker Compose para desenvolvimento
- [ ] Rate limiting na API
- [ ] Logs estruturados (Winston/Pino)

## 🔐 Segurança

### Implementadas
- ✅ Validações no backend (não confia no frontend)
- ✅ CORS configurado corretamente
- ✅ Inputs sanitizados (remove caracteres especiais)
- ✅ TypeScript (type safety)

### Para produção (fora do escopo)
- [ ] HTTPS obrigatório
- [ ] Rate limiting (express-rate-limit)
- [ ] Helmet.js (security headers)
- [ ] Criptografia de dados sensíveis
- [ ] Autenticação e autorização
- [ ] Logs de auditoria
- [ ] Validação contra SQL Injection
- [ ] Sanitização contra XSS

## 👤 Autor

**[Yuji Chikara Kiyota]**
- GitHub: [KiyotaYuji](https://github.com/KiyotaYuji)
- LinkedIn: [Yuji Kiyota](https://www.linkedin.com/in/yujikiyota/)
- Email: seu.email@exemplo.com

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para o **Grupo MFM - Departamento de Engenharia**.

MIT License - Copyright (c) 2025

---

<div align="center">

⭐ **Desenvolvido com dedicação para o desafio técnico do Grupo MFM**

**Data de conclusão:** 31/10/2025  
**Tempo de desenvolvimento:** ~8 horas

</div>