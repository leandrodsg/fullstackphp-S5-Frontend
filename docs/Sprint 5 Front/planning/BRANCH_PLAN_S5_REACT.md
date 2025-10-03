# Plano de Branches - Sprint 5 Frontend (Client React)

Este documento organiza o desenvolvimento do cliente frontend React para consumir a API REST desenvolvida no Sprint 5 backend, implementando interface completa conforme wireframes e style guide aprovados.

## Estado Atual do Sistema

Backend API REST (Sprint 5):
- Laravel com autenticação Passport (JWT tokens)
- Sistema de roles diferenciados (Admin/User)
- Endpoints completos: Auth, Services, Subscriptions, Reports
- Exportação de dados em CSV
- Documentação de API finalizada

Frontend:
- Wireframes para todas as páginas
- UI Style Guide com paleta de cores e tipografia
- Arquitetura React com autenticação JWT
- Design system baseado em Tailwind CSS
- Integração completa com todos os endpoints da API

Necessário para Sprint 5 Frontend:
- Configurar projeto React com dependências
- Implementar autenticação com tokens
- Desenvolver páginas conforme wireframes
- Integrar CRUD completo de Services e Subscriptions
- Implementar relatórios com exportação de dados

## Organização por Níveis

### NIVEL 1 (Obrigatório)
1. setup/react-project-base
2. feat/auth-landing-pages
3. feat/auth-dashboard-system
4. feat/services-crud
5. feat/subscriptions-crud
6. feat/reports-export
7. feat/profile-ui-polish

### NIVEL 2 (Integração)
Branch adicional:
8. feat/api-integration

### NIVEL 3 (Deploy)
Branch adicional:
9. deploy/docker-setup

---

## NIVEL 1 - Branches Obrigatórias

### 1. Branch: setup/react-project-base
Configurar projeto React com dependências necessárias.

Tarefas:
- Criar projeto React com Create React App
- Instalar dependências essenciais:
  - react-router-dom (roteamento)
  - axios (requisições HTTP)
  - tailwindcss (estilização)
  - react-hook-form (formulários)
- Configurar estrutura de pastas:
  - src/components/
  - src/pages/
  - src/services/
  - src/utils/
  - src/contexts/
  - src/tests/
- Configurar Tailwind CSS
- Configurar variáveis de ambiente
- Criar configuração do Axios
- Implementar testes unitários para configuração

### 2. Branch: feat/auth-landing-pages
Implementar landing page conforme wireframes e style guide.

Tarefas:
- Criar Landing Page conforme wireframe:
  - Hero section "Organize all your tech subscriptions"
  - Cards de features (Centralized Management, Financial Control, Made for Devs)
  - Mockup da aplicação no lado direito
  - Gradiente roxo/laranja conforme style guide
- Implementar componentes reutilizáveis:
  - HeroSection
  - FeaturesSection
  - Footer
  - Navigation
- Implementar testes para componentes da landing page

### 3. Branch: feat/auth-dashboard-system
Implementar dashboard principal, layout da aplicação e sistema de autenticação.

Tarefas:
- Implementar sistema de autenticação:
  - Criar AuthContext para gerenciar login/logout
  - Criar páginas de Login e Register com formulário centralizado
  - Integração com POST /api/v1/login e /api/v1/register
  - Links de navegação entre login/register
  - Configurar rotas públicas e protegidas
  - Implementar persistência de token
- Criar layout principal:
  - Sidebar fixa com navegação (Dashboard, Services, Subscriptions, Reports, Profile)
  - Header com nome do usuário e logout
  - Logo "SubsManager" conforme wireframe
- Implementar Dashboard conforme wireframe:
  - Cards de resumo: Total Subscriptions, Monthly Cost, Upcoming Renewals
  - Tabela "Recent Subscriptions" com Service, Plan, Price, Status, Next Billing
  - Avatars circulares com iniciais dos serviços
  - Status badges coloridos (Active, Expires Soon)
- Integrar com endpoints:
  - GET /api/v1/subscriptions (para cards e tabela)
  - GET /api/v1/profile (dados do usuário)
- Implementar testes para autenticação e dashboard

### 4. Branch: feat/services-crud
Implementar gestão completa de serviços conforme wireframe.

Tarefas:
- Criar página "My Services" conforme wireframe:
  - Título "My Services" + "Manage available services for subscriptions"
  - Botão "+ New Service" no topo direito
  - Tabela com Name, Category, Website, Actions
  - Avatars com iniciais dos serviços
  - Badges de categoria coloridos
  - Paginação no rodapé
- Implementar CRUD completo:
  - GET /api/v1/services (listagem)
  - POST /api/v1/services (modal de criação)
  - PUT /api/v1/services/{id} (modal de edição)
  - DELETE /api/v1/services/{id} (confirmação)
- Adicionar ações por linha: visualizar, editar, deletar
- Filtros por nome e categoria
- Implementar testes para CRUD de serviços

### 5. Branch: feat/subscriptions-crud
Implementar gestão completa de assinaturas conforme wireframe.

Tarefas:
- Criar página "My Subscriptions" conforme wireframe:
  - Título "My Subscriptions" + "Manage all your active subscriptions"
  - Botão "+ New Subscription" no topo direito
  - Tabela com Service, Plan, Price, Next Billing, Status, Actions
  - Avatars dos serviços com iniciais
  - Status badges (Active, Expiring, Cancelled)
  - Summary no rodapé: Total Subscriptions, Monthly Cost, Active Services
- Implementar CRUD completo:
  - GET /api/v1/subscriptions (listagem)
  - POST /api/v1/subscriptions (modal de criação)
  - PUT /api/v1/subscriptions/{id} (modal de edição)
  - DELETE /api/v1/subscriptions/{id} (confirmação)
- Implementar ações específicas:
  - PATCH /api/v1/subscriptions/{id}/cancel
  - PATCH /api/v1/subscriptions/{id}/reactivate
- Implementar testes para CRUD de assinaturas

### 6. Branch: feat/reports-export
Implementar relatórios com filtros e exportação conforme wireframe.

Tarefas:
- Criar página "Reports" conforme wireframe:
  - Título "Reports" + "Analyze your subscription data and export reports"
  - Filtros no topo: Date Range (manual), Service (dropdown), Status (dropdown)
  - Cards de resumo: Total Spending, Active Subscriptions, Average Monthly, Cancelled
  - Tabela "Subscription Data" com Service, Plan, Price, Status, Next Billing, Last Billing
  - Botões de exportação: Export CSV, Export Excel
  - Paginação no rodapé
- Implementar sistema de filtros:
  - Filtros manuais de data (dateFrom/dateTo)
  - Filtro por serviço único
  - Filtro por status (Active, Cancelled)
  - Aplicação de filtros no frontend
- Integrar com endpoint:
  - GET /api/v1/subscriptions (com filtros aplicados no frontend)
- Implementar testes para relatórios e exportação

### 7. Branch: feat/profile-ui-polish
Implementar perfil e finalizar interface conforme wireframes.

Tarefas:
- Criar página "My Profile" conforme wireframe:
  - Avatar com iniciais do usuário
  - Informações: Nome, email, "Member since"
  - Formulário Account Information: Name, Email editáveis
  - Seção Change Password: Current, New, Confirm passwords
  - Botões "Save Changes"
- Integrar com endpoints:
  - GET /api/v1/profile
  - PUT /api/v1/profile (atualizar dados)
  - PUT /api/v1/change-password
- Implementar sistema de exportação simples:
  - Exportação CSV usando concatenação de strings
  - Exportação Excel usando formato TSV
  - Download via Blob API e URL.createObjectURL
- Criar página Error 404
- Aplicar style guide completo (cores roxo/laranja, tipografia)
- Implementar responsividade
- Ajustar navegação e loading states
- Implementar testes para perfil e funcionalidades finais

## NIVEL 2 - Integração

Garantir integração completa com backend e otimizações durante o desenvolvimento das branches do Nível 1.

## NIVEL 3 - Deploy

### 8. Branch: deploy/docker-setup
Preparar aplicação para deploy com Docker.

Tarefas:
- Criar Dockerfile para aplicação React
- Configurar docker-compose.yml
- Configurar variáveis de ambiente para produção
- Testar build de produção
- Documentar processo de deploy
- Configurar nginx para servir arquivos estáticos