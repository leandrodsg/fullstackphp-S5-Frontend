# Plano de Branches - Sprint 5 Frontend (Client React)

Este documento organiza o desenvolvimento do cliente frontend React para consumir a API REST desenvolvida no Sprint 5 backend, implementando interface completa conforme wireframes e style guide aprovados.

## Estado Atual do Sistema

Backend API REST (Sprint 5) já desenvolvido:
- Laravel com autenticação Passport (JWT tokens)
- Sistema de roles diferenciados (Admin/User)
- Endpoints completos: Auth, Services, Subscriptions, Reports
- Exportação de dados em CSV
- Documentação de API finalizada

Frontend (a desenvolver):
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
3. feat/dashboard-layout
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
- Escrever testes para configuração inicial
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
- Configurar Tailwind CSS
- Configurar variáveis de ambiente
- Criar configuração do Axios
- Validar testes passando

### 2. Branch: feat/auth-landing-pages
Implementar autenticação e páginas públicas conforme wireframes.

Tarefas:
- Escrever testes para autenticação e landing
- Criar AuthContext para gerenciar login/logout
- Implementar Landing Page com gradiente roxo/laranja:
  - Hero section "Organize all your tech subscriptions"
  - Cards de features (Centralized Management, Financial Control, Made for Devs)
  - Mockup da aplicação no lado direito
- Criar páginas de Login e Register:
  - Formulário centralizado conforme wireframe
  - Integração com POST /api/v1/login e /api/v1/register
  - Links de navegação entre login/register
- Configurar rotas públicas e protegidas
- Implementar persistência de token
- Validar testes passando

### 3. Branch: feat/dashboard-layout
Implementar dashboard principal com sidebar e cards de resumo.

Tarefas:
- Escrever testes para dashboard
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
- Validar testes passando

### 4. Branch: feat/services-crud
Implementar gestão completa de serviços conforme wireframe.

Tarefas:
- Escrever testes para CRUD de serviços
- Criar página "My Services" conforme wireframe:
  - Título "My Services" + "Manage available services for subscriptions"
  - Botão "+ New Service" no topo direito
  - Tabela com Name, Category, Website, Actions
  - Avatars com ícones/iniciais dos serviços
  - Badges de categoria coloridos
  - Paginação no rodapé
- Implementar CRUD completo:
  - GET /api/v1/services (listagem)
  - POST /api/v1/services (modal de criação)
  - PUT /api/v1/services/{id} (modal de edição)
  - DELETE /api/v1/services/{id} (confirmação)
- Adicionar ações por linha: visualizar, editar, deletar
- Filtros por nome e categoria
- Validar testes passando

### 5. Branch: feat/subscriptions-crud
Implementar gestão completa de assinaturas conforme wireframe.

Tarefas:
- Escrever testes para CRUD de assinaturas
- Criar página "My Subscriptions" conforme wireframe:
  - Título "My Subscriptions" + "Manage all your active subscriptions"
  - Botão "+ New Subscription" no topo direito
  - Tabela com Service, Plan, Price, Next Billing, Status, Actions
  - Avatars dos serviços (Netflix, Spotify, Adobe, GitHub, Dropbox)
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
- Validar testes passando

### 6. Branch: feat/reports-export
Implementar relatórios com filtros e exportação conforme wireframe.

Tarefas:
- Escrever testes para relatórios
- Criar página "Reports" conforme wireframe:
  - Título "Reports" + "Analyze your subscription data and export reports"
  - Filtros no topo: Date Range, Service, Status, botão "Apply Filters"
  - Cards de resumo: Total Spending, Active Subscriptions, Average Monthly, Cancelled
  - Tabela "Subscription Data" com Service, Plan, Price, Status, Next Billing, Last Billing
  - Botões de exportação: Export CSV, Export Excel, Export PDF
  - Paginação no rodapé
- Integrar com endpoints:
  - GET /api/v1/reports/my-expenses (com filtros)
  - GET /api/v1/reports/my-expenses/export (download CSV)
- Implementar filtros funcionais por período, serviço e status
- Validar testes passando

### 7. Branch: feat/profile-ui-polish
Implementar perfil e finalizar interface conforme wireframes.

Tarefas:
- Escrever testes para perfil e acabamentos finais
- Criar página "My Profile" conforme wireframe:
  - Avatar grande + "John Doe" + email + "Member since"
  - Formulário Account Information: First Name, Last Name, Email, Phone, Bio
  - Seção Change Password: Current, New, Confirm passwords
  - Botões "Save Changes" e "Delete Account"
  - Warning de deleção de conta
- Integrar com endpoints:
  - GET /api/v1/profile
  - PUT /api/v1/profile (atualizar dados)
  - PUT /api/v1/change-password
- Criar página Error 404
- Aplicar style guide completo (cores roxo/laranja, tipografia)
- Implementar responsividade
- Ajustar navegação e loading states
- Validar testes passando

## NIVEL 2 - Integração

### 8. Branch: feat/api-integration
Garantir integração completa com backend e otimizações básicas.

Tarefas:
- Testar integração completa com todos os endpoints
- Implementar error handling padronizado
- Adicionar interceptors para token automático
- Otimizar requisições com loading states
- Implementar logout automático em caso de erro 401
- Validar funcionamento em diferentes cenários
- Validar testes passando

## NIVEL 3 - Deploy

### 9. Branch: deploy/docker-setup
Preparar aplicação para deploy com Docker.

Tarefas:
- Criar Dockerfile para aplicação React
- Configurar docker-compose.yml
- Configurar variáveis de ambiente para produção
- Testar build de produção
- Documentar processo de deploy
- Configurar nginx para servir arquivos estáticos

## Considerações Técnicas

### Abordagem TDD
Cada branch deve seguir Test-Driven Development:
1. Escrever testes para a funcionalidade antes da implementação
2. Implementar código sem comentarios  
3. Refatorar mantendo testes verdes
4. Garantir cobertura adequada de testes

### Stack Tecnológico
- React 18+ com hooks e functional components
- React Router v6 para roteamento SPA
- Tailwind CSS para estilização conforme style guide
- Axios para requisições HTTP
- React Hook Form para formulários
- Context API para gerenciamento de estado
- React Testing Library para testes

### Integração com API Backend
- Autenticação Bearer token em todas as requisições autenticadas
- Error handling padronizado para respostas da API
- Loading states em operações assíncronas
- Tratamento de erros 401/403 com redirecionamento

### Requisitos Atendidos por Nível

NIVEL 1:
- Interface completa para todos os recursos da API
- Sistema de autenticação JWT funcional
- Dashboard com estatísticas
- CRUD completo de Services e Subscriptions
- Páginas conforme wireframes
- Exportação de dados em CSV
- Design responsivo

NIVEL 2:
- Integração robusta com backend
- Error handling padronizado
- Performance otimizada

NIVEL 3:
- Deploy com Docker funcional
- Configurações de produção