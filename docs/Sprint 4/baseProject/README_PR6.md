# TechSubs - Sistema de Gerenciamento de Assinaturas Digitais

## Visão Geral

O TechSubs é uma aplicação web desenvolvida em Laravel para gerenciamento de assinaturas de serviços digitais. O sistema permite que usuários controlem suas assinaturas ativas, monitorem gastos mensais e organizem seus serviços digitais de forma centralizada.

### PR 6 - Views Básicas com Blade e Formulários

- Criação do layout principal com Blade templates
- Implementação de views CRUD para Services e Subscriptions
- Desenvolvimento de formulários HTML com validação
- Configuração de mensagens de feedback para usuário
- Tradução completa da interface para inglês
- Integração entre controllers e views via Blade

#### Layout Principal Implementado

##### Layout: app.blade.php

Localização: `resources/views/layouts/app.blade.php`

Características:
- Estrutura HTML5 responsiva com Tailwind CSS
- Navegação principal com links para Services e Subscriptions
- Sistema de mensagens flash para success e error

#### Views de Services Implementadas

##### View: services/index.blade.php

Localização: `resources/views/services/index.blade.php`

Características:
- Tabela responsiva com colunas: ID, Name, Category, Website, Actions
- Botão "Add New Service" para criação
- Links de ação: View, Edit, Delete para cada serviço

##### View: services/create.blade.php

Localização: `resources/views/services/create.blade.php`

Características:
- Formulário com campos: Service Name, Category, Description, Website URL
- Validação HTML5 com campos obrigatórios

##### View: services/edit.blade.php

Localização: `resources/views/services/edit.blade.php`

Características:
- Formulário pré-preenchido com dados do serviço
- Campos editáveis: Service Name, Category, Description, Website URL
- Botões Cancel e Update Service

##### View: services/show.blade.php

Localização: `resources/views/services/show.blade.php`

Características:
- Exibição de todos os campos do serviço
- Botões Edit e Back para navegação

#### Views de Subscriptions Implementadas

##### View: subscriptions/index.blade.php

Localização: `resources/views/subscriptions/index.blade.php`

Características:
- Tabela com colunas: ID, Service, Plan, Price, Status, Actions
- Botão "Add New Subscription" para criação
- Links de ação: View, Edit, Delete para cada assinatura

##### View: subscriptions/create.blade.php

Localização: `resources/views/subscriptions/create.blade.php`

Características:
- Select dropdown para escolha do Service
- Campos: Plan, Price, Currency, Next Billing Date, Status
- Validação HTML5 e formatação de data
- Botões Cancel e Create Subscription

##### View: subscriptions/edit.blade.php

Localização: `resources/views/subscriptions/edit.blade.php`

Características:
- Formulário pré-preenchido com dados da assinatura
- Botões Cancel e Update Subscription

##### View: subscriptions/show.blade.php

Localização: `resources/views/subscriptions/show.blade.php`

Características:
- Exibição de todos os campos da assinatura
- Botões Edit e Back para navegação

## Funcionalidades Implementadas

### Sistema de Formulários
- Formulários HTML5 com validação client-side
- Integração com controllers via métodos POST/PATCH
- Proteção CSRF com @csrf em todos os formulários
- Campos obrigatórios marcados com required

### Sistema de Mensagens
- Mensagens de sucesso após operações CRUD
- Mensagens de erro em caso de falhas
- Exibição via session flash messages

### Navegação e UX
- Layout responsivo com Tailwind CSS
- Botões de ação padronizados

### Arquivos Criados/Modificados

#### Layouts
- `resources/views/layouts/app.blade.php` - Layout principal da aplicação

#### Views de Services
- `resources/views/services/index.blade.php` - Listagem de serviços
- `resources/views/services/create.blade.php` - Formulário de criação
- `resources/views/services/edit.blade.php` - Formulário de edição
- `resources/views/services/show.blade.php` - Detalhes do serviço

#### Views de Subscriptions
- `resources/views/subscriptions/index.blade.php` - Listagem de assinaturas
- `resources/views/subscriptions/create.blade.php` - Formulário de criação
- `resources/views/subscriptions/edit.blade.php` - Formulário de edição
- `resources/views/subscriptions/show.blade.php` - Detalhes da assinatura

#### Controllers Atualizados
- `app/Http/Controllers/ServiceController.php`
- `app/Http/Controllers/SubscriptionController.php`