# TechSubs - Sistema de Gerenciamento de Assinaturas Digitais

## Visão Geral

O TechSubs é uma aplicação web desenvolvida em Laravel para gerenciamento de assinaturas de serviços digitais. O sistema permite que usuários controlem suas assinaturas ativas, monitorem gastos mensais e organizem seus serviços digitais de forma centralizada.

### PR 4: Rotas

Rotas definidas para o CRUD:
- Rotas resource para services
- Rotas resource para subscriptions

#### Implementação

Arquivo: `routes/web.php`

```php
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SubscriptionController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('services', ServiceController::class);
Route::resource('subscriptions', SubscriptionController::class);
```

#### Teste

```bash
php artisan route:list
```

#### Arquivos Modificados

- `routes/web.php` - Adicionadas rotas resource