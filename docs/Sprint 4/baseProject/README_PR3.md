# TechSubs - Sistema de Gerenciamento de Assinaturas Digitais

## Visão Geral

O TechSubs é uma aplicação web desenvolvida em Laravel para gerenciamento de assinaturas de serviços digitais. O sistema permite que usuários controlem suas assinaturas ativas, monitorem gastos mensais e organizem seus serviços digitais de forma centralizada.

### PR 3 - Models Básicos

- Criação dos Models Service e Subscription com Eloquent ORM
- Implementação de relacionamentos entre User, Service e Subscription
- Configuração de campos fillable para proteção contra mass assignment
- Definição de casts para formatação automática de dados
- Estabelecimento da arquitetura de relacionamentos 1:N
- Validação da integridade dos relacionamentos via código PHP

#### Models Implementados

##### Model: Service
Representa os serviços digitais disponíveis no sistema.

Localização: `app/Models/Service.php`

Características:
- Campos fillable: name, category, website_url, description
- Relacionamento: hasMany(Subscription) - Um serviço pode ter muitas assinaturas
- Permite criar, editar e gerenciar catálogo de serviços

##### Model: Subscription
Gerencia as assinaturas individuais dos usuários para diferentes serviços.

Localização: `app/Models/Subscription.php`

Características:
- Campos fillable: user_id, service_id, plan, price, currency, next_billing_date, status
- Relacionamentos: belongsTo(User), belongsTo(Service)
- Casts automáticos: next_billing_date com date e price com decimal:2
- Representa a ligação entre um usuário e um serviço específico

##### Model: User (Atualizado)
Model de usuário padrão do Laravel, estendido com relacionamentos de assinatura.

Localização: `app/Models/User.php`

Novas características:
- Relacionamento: hasMany(Subscription) - Um usuário pode ter muitas assinaturas

## Relacionamentos Implementados

### Como os Models se Conectam

User e Subscriptions (1:N)
- Código: `$user->subscriptions` retorna todas as assinaturas
- Método: `hasMany(Subscription::class)`

Service e Subscriptions (1:N)
- Código: `$service->subscriptions` retorna todos os assinantes
- Método: `hasMany(Subscription::class)`

Subscription e User (N:1)
- Código: `$subscription->user` retorna o dono da assinatura
- Método: `belongsTo(User::class)`

Subscription e Service (N:1)
- Código: `$subscription->service` retorna o serviço
- Método: `belongsTo(Service::class)`

### Proteções Implementadas

- Campos `$fillable` contra Mass Assignment Protection 
- `next_billing_date` convertido para objeto Date
- `price` formatado como decimal com 2 casas

### Comandos Utilizados

#### Criação dos Models
```bash
php artisan make:model Service
php artisan make:model Subscription
```

#### Verificação dos Models
```bash
php artisan tinker
```

### Arquivos Modificados

- `app/Models/Service.php` - Criado com relacionamentos e fillable
- `app/Models/Subscription.php` - Criado com relacionamentos, casts e fillable
- `app/Models/User.php` - Adicionado relacionamento hasMany(Subscription)