# Plano de Branches - Sprint 5 (Conversão para API REST)

Este documento organiza a transformação do sistema MVC para uma API REST, implementando autenticação Passport, sistema de roles e endpoints conforme especificação aprovada.

## Estado Atual do Sistema

Herança do Sprint 4:
- Models: User, Service, Subscription com relacionamentos e scopes
- Form Requests: ServiceStoreRequest, ServiceUpdateRequest, SubscriptionStoreRequest, SubscriptionUpdateRequest, RegisterUserRequest
- API Resources: ServiceResource, UserResource, SubscriptionResource (estrutura básica)
- Validações: StrongPassword rule implementada
- Events/Listeners: SubscriptionBillingAdvanced + LogSubscriptionBillingAdvance
- Testes: Feature tests para criação de services/subscriptions, unit tests de billing cycle
- Autenticação: Laravel Breeze com email verification
- Isolamento de Dados: Scopes forUser() em todos os models

Necessário para Sprint 5:
- Converter controllers MVC para API controllers
- Implementar autenticação via tokens (Passport)
- Adicionar sistema de roles diferenciados
- Criar rotas de API com endpoints aprovados
- Expandir recursos com lógica de negócio complexa (relatórios)

## Organização por Níveis

### NIVEL 1 (Obrigatório)
1. setup/passport-authentication
2. feat/roles-system  
3. refactor/api-controllers-base
4. feat/auth-api-endpoints
5. feat/services-api-endpoints
6. feat/subscriptions-api-endpoints
7. feat/reports-expenses-logic
8. feat/data-export-functionality

### NIVEL 2 (Documentação da API)
Branch adicional:
9. docs/api-documentation

### NIVEL 3 (Deploy)
Branch adicional:
10. deploy/production-setup

---

## NIVEL 1 - Branches Obrigatórias

### 1. Branch: setup/passport-authentication
Configurar Laravel Passport para autenticação via tokens API.

Tarefas:
- Escrever testes para autenticação com tokens
- Instalar Laravel Passport via Composer
- Executar migrations do Passport (passport:install)
- Configurar User model com HasApiTokens
- Atualizar AuthServiceProvider com Passport routes
- Configurar guards de API no config/auth.php
- Criar middleware para validação de tokens
- Validar testes passando

### 2. Branch: feat/roles-system
Implementar sistema de roles diferenciados (User comum e Admin).

Tarefas:
- Escrever testes para verificação de roles
- Criar migration para adicionar campo role na tabela users
- Definir enum de roles (user, admin) no modelo User
- Criar middleware CheckRole para validação de permissões
- Implementar método hasRole() no modelo User
- Atualizar factory e seeder para incluir roles
- Criar usuário admin padrão via seeder
- Validar testes passando

### 3. Branch: refactor/api-controllers-base
Criar base para controllers API e converter estrutura MVC.

Tarefas:
- Escrever testes para estrutura base da API
- Criar arquivo routes/api.php com prefixo /api/v1
- Criar app/Http/Controllers/Api/BaseController.php
- Converter ServiceController para Api/ServiceController
- Converter SubscriptionController para Api/SubscriptionController
- Atualizar controllers para usar API Resources
- Remover lógica de views e redirects
- Padronizar respostas JSON com status codes
- Validar testes passando

### 4. Branch: feat/auth-api-endpoints
Implementar endpoints de autenticação conforme documentação aprovada.

Tarefas:
- Escrever testes para todos os endpoints de autenticação
- Criar Api/AuthController com métodos:
  - POST /api/v1/register (registro de usuários)
  - POST /api/v1/login (login com token)
- Criar Api/ProfileController com métodos:
  - GET /api/v1/profile (dados do usuário autenticado)
  - PUT /api/v1/change-password (alteração de senha)
- Aplicar middleware auth:api em rotas protegidas
- Configurar rate limiting para endpoints sensíveis
- Validar testes passando

### 5. Branch: feat/services-api-endpoints
Implementar CRUD completo de Services via API.

Tarefas:
- Escrever testes para todos os endpoints de Services
- Implementar endpoints conforme documentação:
  - GET /api/v1/services (listagem com filtros)
  - POST /api/v1/services (criação)
  - GET /api/v1/services/{id} (detalhes)
  - PUT /api/v1/services/{id} (atualização completa)
  - PATCH /api/v1/services/{id} (atualização parcial)
  - DELETE /api/v1/services/{id} (exclusão)
- Implementar endpoint de categorias:
  - GET /api/v1/categories (listagem de categorias)
- Atualizar ServiceResource com todos os campos necessários
- Implementar filtros por nome e categoria
- Aplicar policy para autorização de acesso
- Validar testes passando

### 6. Branch: feat/subscriptions-api-endpoints
Implementar gestão completa de Subscriptions via API.

Tarefas:
- Escrever testes para todos os endpoints de Subscriptions
- Implementar endpoints CRUD básicos:
  - GET /api/v1/subscriptions (listagem com filtros)
  - POST /api/v1/subscriptions (criação)
  - GET /api/v1/subscriptions/{id} (detalhes)
  - PUT /api/v1/subscriptions/{id} (atualização completa)
  - PATCH /api/v1/subscriptions/{id} (atualização parcial)
  - DELETE /api/v1/subscriptions/{id} (exclusão)
- Implementar endpoints específicos de negócio:
  - PATCH /api/v1/subscriptions/{id}/cancel (cancelamento)
  - PATCH /api/v1/subscriptions/{id}/reactivate (reativação)
- Atualizar SubscriptionResource com dados do serviço relacionado
- Implementar filtros por serviço, status e período
- Validar regras de negócio (datas, valores, etc.)
- Validar testes passando

### 7. Branch: feat/reports-expenses-logic
Implementar relatório de gastos do usuário com suas subscriptions.

Tarefas:
- Escrever testes para endpoint de relatório
- Criar Api/ReportController com método simples:
  - GET /api/v1/reports/my-expenses (relatório pessoal)
- Implementar listagem das subscriptions do usuário logado
- Mostrar dados:
  - Nome do serviço
  - Valor mensal da subscription
  - Status (ativa/cancelada)
  - Data de início
- Calcular total simples dos gastos mensais
- Implementar filtro por status (?status=active|cancelled)
- Retornar dados em formato JSON estruturado
- Validar autenticação do usuário
- Validar testes passando

### 8. Branch: feat/data-export-functionality
Implementar exportação de dados em formato CSV.

Tarefas:
- Escrever testes para funcionalidade de exportação
- Criar endpoint:
  - GET /api/v1/reports/my-expenses/export (exportação CSV)
- Implementar geração de CSV simples usando Response do Laravel
- Aplicar mesmo filtro do relatório (por status)
- Configurar headers HTTP para download de arquivo
- Nomear arquivo com data atual (expenses_2025_01_20.csv)
- Incluir cabeçalhos das colunas no CSV
- Validar autenticação do usuário
- Validar testes passando

## NIVEL 2 - Documentação

### 9. Branch: docs/api-documentation
Finalizar documentação completa da API para desenvolvedores.

Tarefas:
- Expandir documentação existente (ENDPOINTS_API.md)
- Adicionar exemplos de request/response para todos endpoints
- Documentar códigos de status HTTP e mensagens de erro
- Criar guide de autenticação com Passport
- Documentar sistema de roles e permissões
- Adicionar exemplos de filtros e paginação
- Incluir instruções de instalação e configuração
- Criar collection do Postman/Insomnia para testes

## NIVEL 3 - Deploy

### 10. Branch: deploy/production-setup
Preparar aplicação para deploy em produção.

Tarefas:
- Configurar variáveis de ambiente para produção
- Otimizar configurações de cache e performance
- Configurar logs de produção
- Preparar scripts de deployment
- Documentar processo de deploy
- Configurar monitoramento básico

## Considerações Técnicas

### Abordagem TDD
Cada branch deve seguir Test-Driven Development:
1. Escrever testes para a funcionalidade antes da implementação
2. Implementar código mínimo para fazer testes passarem
3. Refatorar mantendo testes verdes
4. Garantir cobertura de testes adequada

### Requisitos Atendidos por Nível

NIVEL 1:
- 2 recursos mantenibles (Services + Subscriptions)
- Gestão de usuários com autenticação Passport
- 2 roles diferenciados (User + Admin)
- Lógica complexa (relatórios, exportações, filtros avançados)
- Testes funcionais completos

NIVEL 2:
- Documentação completa da API
- Guias de uso e exemplos práticos
- Collections para teste da API

NIVEL 3:
- Deploy funcional em produção
- Configurações otimizadas
- Monitoramento básico

### Endpoints Implementados
- Autenticação: register, login, logout, profile, change-password
- Services: CRUD completo + categories + filtros
- Subscriptions: CRUD + cancel/reactivate + filtros avançados
- Reportes: expenses com filtros por período/serviço/status
- Exportación de Datos: CSV/XLSX dos relatórios