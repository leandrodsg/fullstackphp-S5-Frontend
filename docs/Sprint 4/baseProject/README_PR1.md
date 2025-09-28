# TechSubs - Sistema de Gerenciamento de Assinaturas Digitais

## Visão Geral

O TechSubs é uma aplicação web desenvolvida em Laravel para gerenciamento de assinaturas de serviços digitais. O sistema permite que usuários controlem suas assinaturas ativas, monitorem gastos mensais e organizem seus serviços digitais de forma centralizada.

### PR 1

- Configuração inicial do projeto Laravel 12
- Configuração do banco de dados MySQL
- Execução das migrations básicas do sistema
- Teste de conectividade com banco de dados
- Verificação do ambiente de desenvolvimento
- Preparação da estrutura base para desenvolvimento

## Arquitetura do Sistema

### Tecnologias Utilizadas

Backend
- Laravel 12 - Framework PHP principal
- MySQL - Sistema de gerenciamento de banco de dados
- Eloquent ORM - Mapeamento objeto-relacional integrado

Frontend
- Blade Templates - Engine de renderização do Laravel
- TailwindCSS - Framework CSS para interface responsiva (planejado)
- Vite - Bundler para assets e hot-reload em desenvolvimento

### Estrutura do Banco de Dados Laravel

- users
- password_reset_tokens
- sessions
- cache e cache_locks
- jobs , job_batches , failed_jobs
- migrations

### Banco de Dados
O sistema está configurado para utilizar MySQL com as seguintes especificações:
- Host: 127.0.0.1 (localhost)
- Porta: 3306
- Database: techsubs
- Charset: utf8mb4
- Collation: utf8mb4_unicode_ci

### Variáveis de Ambiente
As configurações principais estão definidas no arquivo .env:
- APP_NAME=TechSubs
- APP_ENV=local
- APP_DEBUG=true
- APP_TIMEZONE=UTC
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=techsubs
- DB_USERNAME=root
- DB_PASSWORD=

### Configurações de Sessão
- SESSION_DRIVER=database
- SESSION_LIFETIME=120
- SESSION_ENCRYPT=false
- SESSION_PATH=/
- SESSION_DOMAIN=null

## Estrutura de Arquivos Laravel

### Diretórios Principais
- `/app` - Lógica da aplicação (Models, Controllers, Middleware)
- `/resources/views` - Templates Blade para interface
- `/routes` - Definição de rotas da aplicação
- `/database` - Migrations, seeders e factories
- `/public` - Assets públicos e ponto de entrada
- `/config` - Arquivos de configuração do Laravel
- `/storage` - Arquivos de cache, logs e uploads
- `/vendor` - Dependências do Composer

### Arquivos de Configuração
- `composer.json` - Dependências PHP e autoload
- `package.json` - Dependências JavaScript
- `vite.config.js` - Configuração do bundler
- `.env` - Variáveis de ambiente
- `artisan` - Interface de linha de comando do Laravel