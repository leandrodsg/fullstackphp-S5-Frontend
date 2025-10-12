# 📁 Guia de Arquivos de Ambiente (.env)

Este documento explica a organização dos arquivos de configuração de ambiente do projeto.

## 📋 Estrutura de Arquivos

```
.env.example        → Template (COMMITAR no git)
.env.local          → Desenvolvimento local (NÃO commitar)
.env.docker         → Configuração Docker (COMMITAR no git)
```

---

## 🔍 Detalhamento de Cada Arquivo

### `.env.example` - Template de Configuração

**Propósito:** Documentação e template para novos desenvolvedores  
**Git:** ✅ COMMIT (vai para o repositório)  
**Usado por:** Ninguém (apenas referência)

**Conteúdo:** Template limpo com todas as variáveis documentadas.

**Como usar:**
```bash
# Copiar para criar seu ambiente local
cp .env.example .env.local
```

---

### `.env.local` - Desenvolvimento Local

**Propósito:** Configuração pessoal de cada desenvolvedor  
**Git:** ❌ NÃO COMMIT (está no .gitignore)  
**Usado por:** Create React App durante `npm start` e `npm run build`

**Prioridade:** MAIOR (sobrescreve qualquer outro .env)

**Como criar:**
```bash
# Criar a partir do template
cp .env.example .env.local

# Editar conforme necessário
# - API local: http://localhost:8000/api/v1
# - API produção: https://fullstackphp-sprint5-api.onrender.com/api/v1
```

**⚠️ IMPORTANTE:** 
- Cada desenvolvedor tem seu próprio `.env.local`
- Nunca fazer commit deste arquivo
- Pode conter configurações específicas/sensíveis

---

### `.env.docker` - Configuração Docker

**Propósito:** Configuração para ambiente Docker  
**Git:** ✅ COMMIT (vai para o repositório)  
**Usado por:** Docker Compose quando executa `docker-compose up`

**Conteúdo:** Configuração padronizada para Docker (geralmente API de produção).

**Como funciona:**
```bash
# Docker automaticamente carrega este arquivo
docker-compose up

# Definido no docker-compose.yml:
# env_file:
#   - .env.docker
```

**⚠️ IMPORTANTE:** 
- Compartilhado com toda equipe via git
- Não deve conter dados sensíveis
- Garante que Docker rode igual para todos

---

## 🚀 Vercel (Produção)

**Variáveis de ambiente no Vercel:**
- ❌ NÃO usa nenhum arquivo `.env*` do repositório
- ✅ Configurado MANUALMENTE no Dashboard do Vercel

**Como configurar:**
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em: **Settings** → **Environment Variables**
4. Adicione:
   ```
   Key: REACT_APP_API_BASE_URL
   Value: https://fullstackphp-sprint5-api.onrender.com/api/v1
   Environments: Production, Preview, Development (marcar todos)
   ```
5. Salve e faça redeploy

---

## 📊 Hierarquia de Prioridade (Create React App)

Quando você roda `npm start` ou `npm run build`, o React carrega na seguinte ordem:

1. **`.env.local`** ← MAIOR prioridade (sobrescreve tudo)
2. `.env.development.local` ou `.env.production.local`
3. `.env.development` ou `.env.production`
4. `.env`

**Arquivos ignorados:**
- `.env.example` - nunca é carregado (apenas template)
- `.env.docker` - apenas para Docker, React não lê

---

## ✅ Checklist de Setup

Para novos desenvolvedores:

```bash
# 1. Clonar repositório
git clone [repo-url]
cd TechSubs_FrontEnd

# 2. Criar ambiente local
cp .env.example .env.local

# 3. (Opcional) Editar .env.local se necessário
# Por padrão já vem configurado com API de produção

# 4. Instalar dependências
npm install

# 5. Rodar projeto
npm start
```

---

## 🔒 Segurança

**Arquivos que VÃO para o git:**
- ✅ `.env.example` - template público
- ✅ `.env.docker` - configuração Docker
- ✅ `.gitignore` - garante que .env.local não suba

**Arquivos que NÃO VÃO para o git:**
- ❌ `.env.local` - configuração pessoal
- ❌ `.env` - (foi deletado, não usar mais)
- ❌ Qualquer arquivo com dados sensíveis

---

## ❓ FAQ

**P: Qual arquivo devo editar para desenvolvimento local?**  
R: `.env.local` (crie a partir de `.env.example`)

**P: Posso commitar meu `.env.local`?**  
R: NÃO! Ele está no `.gitignore` por segurança.

**P: Como o Vercel sabe qual API usar?**  
R: Configuração manual no Dashboard do Vercel, não usa arquivos .env.

**P: O que aconteceu com o `.env`?**  
R: Foi deletado para evitar confusão. Use `.env.local` agora.

**P: Quando usar `.env.docker`?**  
R: Apenas quando rodar via Docker (`docker-compose up`). Para npm use `.env.local`.

---

**Última atualização:** Outubro 2025  
**Manutenção:** Manter este documento atualizado quando houver mudanças na estrutura de ambiente.
