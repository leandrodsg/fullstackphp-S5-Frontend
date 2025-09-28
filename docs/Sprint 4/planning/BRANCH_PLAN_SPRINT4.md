# Plano de Branches - Sprint 4 (Preparação para Evolução)

Este documento organiza as melhorias internas do Sprint 4 para facilitar a futura migração para API REST.

## Ordem de Execução
1. `refactor/form-requests`
2. `refactor/domain-model-methods`
3. `chore/api-resources-stubs`
4. `feat/password-policy`
5. `feat/email-verification`
6. `feat/subscription-billing-skeleton`
7. `test/base-scenarios`

---
## 1. Branch: `refactor/form-requests`
Extrair validações dos controllers para Form Requests reutilizáveis.

Tarefas:
- Criar `app/Http/Requests/ServiceStoreRequest.php`
- Criar `app/Http/Requests/ServiceUpdateRequest.php`
- Criar `app/Http/Requests/SubscriptionStoreRequest.php`
- Criar `app/Http/Requests/SubscriptionUpdateRequest.php`
- (Opcional) Criar `app/Http/Requests/RegisterUserRequest.php`
- Atualizar `ServiceController` para usar Requests
- Atualizar `SubscriptionController` para usar Requests
- Substituir `$request->validate()` por `$request->validated()`
- Garantir que regras de validação não mudem semanticamente

---
## 2. Branch: `refactor/domain-model-methods`
Encapsular lógica em models e reduzir repetição de filtros.

Tarefas:
- Adicionar `scopeForUser` em `Service`
- Adicionar `scopeForUser` em `Subscription`
- Adicionar método `isDue()` em `Subscription`
- Adicionar método `advanceBillingDate()` em `Subscription`
- Atualizar controllers para usar scopes
- Método `ownedBy(User $user)` em `Service` ou `Subscription`

---
## 3. Branch: `chore/api-resources-stubs`
Preparar camada de serialização para futura API.

Tarefas:
- Criar `app/Http/Resources/ServiceResource.php`
- Criar `app/Http/Resources/SubscriptionResource.php`
- Criar `app/Http/Resources/UserResource.php`
- Definir campos explicitamente em `toArray()`

---
## 4. Branch: `feat/password-policy`
Reforçar segurança de senha conforme feedback.

Tarefas:
- Criar `app/Rules/StrongPassword.php` (mín. 10 chars, upper, lower, number, special)
- Integrar rule na criação de usuários (via `RegisterUserRequest` ou diretamente)
- Mensagens de erro claras
- Ajustar documentação

---
## 5. Branch: `feat/email-verification`
Ativar infraestrutura de verificação de e-mail sem alterar drasticamente UX.

Tarefas:
- Adicionar `implements MustVerifyEmail` em `User`
- Confirmar existência das rotas padrão de verificação (Breeze)
- Testar envio de link em ambiente local
- Adicionar nota no README sobre ativação futura via middleware `verified`

---
## 6. Branch: `feat/subscription-billing-skeleton`
Criar esqueleto da lógica de cobrança para evolução posterior.

Tarefas:
- Adicionar método `advanceOneCycle()` em `Subscription` (usa `addMonth()`)
- Reaproveitar ou alinhar com `advanceBillingDate()` se já existir
- Criar evento `SubscriptionBillingAdvanced`
- Criar listener stub `LogSubscriptionBillingAdvance`

---
## 7. Branch: `test/base-scenarios`
Estabelecer base de testes para futura expansão (API/TDD).

Tarefas:
- Feature Test: criação de Service (sucesso + falha de validação)
- Feature Test: criação de Subscription (valores válidos)
- Unit Test: método `advanceBillingDate()` ou `advanceOneCycle()`
- Usar factories existentes
---