# TechSubs - Sistema de Gerenciamento de Assinaturas Digitais

## Visão Geral

O TechSubs é uma aplicação web desenvolvida em Laravel para gerenciamento de assinaturas de serviços digitais. O sistema permite que usuários controlem suas assinaturas ativas, monitorem gastos mensais e organizem seus serviços digitais de forma centralizada.

### PR 2 - Database Schema

- Criação das migrations customizadas para o domínio da aplicação
- Implementação da estrutura de dados para serviços digitais
- Definição da arquitetura de assinaturas com relacionamentos
- Configuração de constraints e validações de banco de dados
- Execução das migrations no ambiente de desenvolvimento
- Validação da integridade referencial entre tabelas

#### Tabelas Customizadas da Aplicação

##### Tabela: services
Armazena informações sobre os serviços digitais disponíveis no sistema.

Estrutura:
- id (bigint, primary key, auto_increment)
- name (varchar) - Nome do serviço digital
- category (varchar) - Categoria do serviço (streaming, cloud, productivity, etc.)
- website_url (varchar, nullable) - URL oficial do serviço
- description (text, nullable) - Descrição detalhada do serviço
- created_at (timestamp) - Data de criação do registro
- updated_at (timestamp) - Data da última atualização

##### Tabela: subscriptions
Gerencia as assinaturas ativas dos usuários para diferentes serviços.

Estrutura:
- id (bigint, primary key, auto_increment)
- user_id (bigint, foreign key) - Referência ao usuário proprietário
- service_id (bigint, foreign key) - Referência ao serviço assinado
- plan (varchar) - Tipo de plano contratado
- price (decimal 8,2) - Valor da assinatura
- currency (enum: USD, EUR) - Moeda da cobrança
- next_billing_date (date) - Data da próxima cobrança
- status (enum: active, cancelled) - Status da assinatura
- created_at (timestamp) - Data de criação da assinatura
- updated_at (timestamp) - Data da última atualização

Enums:
- Moedas suportadas: USD (padrão), EUR
- Status permitidos: active (padrão), cancelled

## Relacionamentos
- User e Subscriptions: Um usuário pode ter muitas assinaturas (1:N)
- Service e Subscriptions: Um serviço pode ter muitos usuários (1:N)
- Subscription: Cada assinatura pertence a 1 user e 1 service
- Se eu deletar um usuário, todas as assinaturas dele são removidas automaticamente
- Se eu deletar um serviço, todas as assinaturas desse serviço são removidas

Chaves estrangeiras:
- `subscriptions.user_id` chave para `users.id`
- `subscriptions.service_id` cheve para `services.id`

### Migrations Executadas

#### Migration: create_services_table
Tabela services: `2025_08_21_174746_create_services_table.php`

#### Migration: create_subscriptions_table
Tabela subscriptions: `2025_08_21_174758_create_subscriptions_table.php`

### Comandos Executados

#### Geração das Migrations
```bash
php artisan make:migration create_services_table
php artisan make:migration create_subscriptions_table
```

#### Execução das Migrations
```bash
php artisan migrate
```