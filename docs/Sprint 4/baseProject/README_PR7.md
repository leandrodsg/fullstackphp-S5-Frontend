# TechSubs - Sistema de Gerenciamento de Assinaturas Digitais

## Visão Geral

O TechSubs é uma aplicação web desenvolvida em Laravel para gerenciamento de assinaturas de serviços digitais. O sistema permite que usuários controlem suas assinaturas ativas, monitorem gastos mensais e organizem seus serviços digitais de forma centralizada.

### PR 7 - Sistema de Autenticação e Isolamento de Dados por Usuário

- Implementação do Laravel Breeze para autenticação completa
- Criação de sistema de isolamento de dados por usuário logado
- Modificação da estrutura de banco para suportar multi-usuário
- Atualização de todos os controllers para filtrar dados por usuário
- Implementação de middleware de autenticação em rotas protegidas
- Testes completos de isolamento e segurança entre usuários
- Migração de dados existentes para novo modelo de usuários

## Sistema de Autenticação Implementado

### Laravel Breeze Installation

1. Instalação via Composer
   - `composer require laravel/breeze --dev`
   
2. Publicação dos Assets
   - `php artisan breeze:install blade`
   
3. Instalação de Dependências Frontend
   - Comando executado: `npm install && npm run dev`

4. Execução das Migrations
   - Comando executado: `php artisan migrate`

## Isolamento de Dados por Usuário

### Modificação da Estrutura de Banco

#### Nova Migration: add_user_id_to_services_table

Arquivo: `database/migrations/2025_08_24_172700_add_user_id_to_services_table.php`

Modificações realizadas:
- Adição da coluna `user_id` na tabela `services`
- Definição como `bigint unsigned` para compatibilidade
- Criação de foreign key constraint para `users.id`
- Configuração de `onDelete('cascade')` para integridade referencial
- Adição de índice para otimização de consultas

### Atualização do Model Service

Arquivo: `app/Models/Service.php`

#### Modificações Implementadas

1. Adição do user_id ao Fillable
   - Inclusão de `'user_id'` no array `$fillable`

2. Relacionamento belongsTo com User
   - Criação do método `user()`
   - Definição do relacionamento `belongsTo(User::class)`
   - Acesso ao usuário via `$service->user`

3. Configuração de Constraints
   - Validação de integridade referencial

### Atualização do ServiceController

Arquivo: `app/Http/Controllers/ServiceController.php`

#### Importação da Facade Auth

- Adição de `use Illuminate\Support\Facades\Auth;`
- Substituição de `auth()->id()` por `Auth::id()`

#### Modificações por Método

##### Método index()
- old: `Service::all()` - Retornava todos os serviços
- new: `Service::where('user_id', Auth::id())->get()`

##### Método store()
- old: Criação sem associação de usuário
- new: `$validated['user_id'] = Auth::id();`

##### Método show()
- old: `Service::findOrFail($id)`
- new: `Service::where('user_id', Auth::id())->findOrFail($id)`

##### Método edit()
- old: `Service::findOrFail($id)`
- new: `Service::where('user_id', Auth::id())->findOrFail($id)`

##### Método update()
- old: `Service::findOrFail($id)`
- new: `Service::where('user_id', Auth::id())->findOrFail($id)`

##### Método destroy()
- old: `Service::findOrFail($id)`
- new: `Service::where('user_id', Auth::id())->findOrFail($id)`

### Integridade Referencial

#### Foreign Key Constraints
- Relacionamento obrigatório entre `services.user_id` e `users.id`
- Cascade delete: Exclusão de usuário remove todos seus serviços

#### Validação de Dados
- Validação automática de `user_id` em todas as operações
- Prevenção de manipulação manual de IDs via formulários