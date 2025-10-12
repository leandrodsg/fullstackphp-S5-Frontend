# Melhorias Backend - TechSubs API

Este documento organiza as melhorias técnicas identificadas durante a análise do sistema atual, focando na resolução de inconsistências entre documentação e implementação.

## Estado Atual do Sistema

Inconsistências identificadas:
- API documenta campo `billing_cycle` mas não existe no banco de dados
- Campo `plan` usado para armazenar informações de ciclo de cobrança
- Formatos de data inconsistentes nas respostas da API
- Ausência de campos calculados úteis para o frontend
- Validações básicas ausentes em alguns endpoints

## Melhorias Propostas

### 1. Implementar campo billing_cycle calculado
Resolver inconsistência entre documentação e implementação.

Tarefas:
- Criar método calculateBillingCycle() no modelo Subscription
- Implementar lógica baseada na diferença entre created_at e next_billing_date
- Adicionar campo calculado nas respostas da API
- Atualizar testes existentes para incluir billing_cycle

### 2. Padronizar formato de datas
Garantir consistência nas respostas da API.

Tarefas:
- Implementar formatação ISO 8601 (YYYY-MM-DD) para todas as datas
- Atualizar Resources para usar formato padronizado
- Validar consistência em todos os endpoints
- Atualizar documentação da API

### 3. Adicionar campos calculados úteis
Reduzir processamento no frontend e melhorar experiência do usuário.

Tarefas:
- Implementar days_until_next_billing
- Adicionar campo is_expired
- Criar price_with_currency formatado
- Incluir campos nos Resources apropriados

### 4. Implementar validações básicas
Prevenir dados inválidos e melhorar robustez da API.

Tarefas:
- Adicionar validações para campos price, next_billing_date e status
- Implementar validações nos controllers ou FormRequests
- Garantir mensagens de erro consistentes
- Atualizar testes para cobrir validações

## Referências Bibliográficas

- https://laravel.com/docs/12.x/eloquent-resources
- https://laravel.com/docs/12.x/validation
- https://laravel.com/docs/12.x/eloquent-mutators
- https://carbon.nesbot.com/docs/
- https://phpunit.de/documentation.html
- https://restfulapi.net/
- https://jsonapi.org/
- https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/
- https://laravel.com/docs/11.x/security
- https://www.iso.org/iso-8601-date-and-time-format.html
- https://tools.ietf.org/html/rfc3339
- https://martinfowler.com/bliki/TestDrivenDevelopment.html
- https://laravel.com/docs/12.x/testing
- https://github.com/barryvdh/laravel-debugbar
- https://phpstan.org/
- https://laravel.com/docs/12.x/optimization

