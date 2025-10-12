## Plano de Deploy – TechSubs Laravel + Docker + Cloud

### 1. Ambiente de Desenvolvimento Local

1.1. Configuração Docker Completa
- Docker Compose configurado com PHP 8.2-fpm-alpine
- Laravel API rodando na porta 8001
- Banco SQLite local funcional
- Volumes persistentes para storage e vendor
- Hot reload funcionando

---

### 2. Dockerfile

2.1. Dockerfile Multi-stage

```dockerfile
# Multi-stage build otimizado para produção
FROM composer:2 AS builder
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.2-fpm-alpine
WORKDIR /var/www/html

# Extensões PostgreSQL para produção
RUN apk add --no-cache postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Vendor otimizado do builder
COPY --from=builder /app/vendor ./vendor
COPY . .

# Permissões configuradas
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Cache Laravel aplicado
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 8080
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
```
---

### 3. Passos para Deploy Cloud

3.1. Pré-requisitos para Deploy
- Conta no GitHub (repositório do projeto) 
- Conta no Render (https://render.com) 
- Conta no Neon (https://neon.tech)
- Docker instalado localmente 

3.2. Teste Local do Dockerfile

Para validar o container de produção localmente:

```bash
# Build da imagem
docker build -t techsubs-api .

# Gerar APP_KEY
docker run --rm techsubs-api php artisan key:generate --show

# Testar container
docker run -p 8080:8080 --env APP_KEY=base64:SUA_CHAVE_AQUI techsubs-api
```

3.3. Deploy no Render

Passos para subir a aplicação:
- Conectar repositório GitHub ao Render
- Criar serviço Web (Docker)
- Configurar variáveis de ambiente:
  - APP_KEY (gerada localmente)
  - APP_ENV=production
  - APP_DEBUG=false
  - DB_CONNECTION=pgsql
  - Dados do banco Neon (quando configurado)
- Deploy automático via GitHub

3.4. Banco Postgres no Neon

Configuração do banco em nuvem:
- Criar projeto no Neon
- Obter credenciais de conexão
- Configurar variáveis no Render
- Executar migrations: `php artisan migrate --force`
- Popular dados: `php artisan db:seed`

---

### 4. Detalhes das Variáveis de Ambiente

4.1. Variáveis do Banco Neon

No Render, configure estas variáveis com os dados do Neon:

```
DB_CONNECTION=pgsql
DB_HOST=[host_do_neon]
DB_PORT=5432
DB_DATABASE=[nome_do_banco]
DB_USERNAME=[usuario_neon]
DB_PASSWORD=[senha_neon]
```

4.2. Outras Variáveis Essenciais

```
APP_KEY=[gerada_localmente]
APP_ENV=production
APP_DEBUG=false
APP_URL=https://[seu-app].onrender.com
```

---

### 5. Passos Detalhados do Neon

5.1. Onde Encontrar as Credenciais

Após criar o projeto no Neon:
- Acesse o dashboard do projeto
- Vá em "Connection Details"
- Copie: Host, Database name, Username, Password
- Use a connection string ou os dados separados

5.2. Como Configurar o Banco

```bash
# No painel do Neon, execute estas queries se necessário:
CREATE DATABASE techsubs_production;
```

---

### 6. Passos Detalhados do Render

6.1. Configurações Específicas do Serviço Web

- Service Type: Web Service
- Environment: Docker
- Region: Europe (Frankfurt)
- Branch: main

6.2. Build Command

```
# Render detecta automaticamente o Dockerfile
# Não precisa configurar build command
```

6.3. Start Command

```
php artisan migrate --force && php artisan db:seed && php artisan serve --host=0.0.0.0 --port=8080
```

---

### 7. Troubleshooting

7.1. Como Verificar se o Deploy Funcionou

Acesse a URL do Render e verifique:
- Página inicial carrega
- Login funciona
- Dashboard exibe dados
- API responde em `/api/users`

---