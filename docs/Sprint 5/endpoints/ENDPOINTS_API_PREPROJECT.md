
// Historical file: this is the original API documentation approved before project development. See README.md in this folder for the current API documentation.

## Introducción

Este documento describe de forma detallada los endpoints RESTful de la API del proyecto TechSubs.
La API sigue el estándar REST y utiliza autenticación basada en tokens (Laravel Passport).

---

## Autenticación

Endpoints para registro, inicio/cierre de sesión y gestión del perfil del usuario autenticado.

- **POST /api/v1/register**: Permite registrar un nuevo usuario en el sistema. Requiere nombre, correo electrónico y contraseña segura.
- **POST /api/v1/login**: Permite iniciar sesión y obtener un token de acceso para autenticación en las siguientes peticiones.
- **POST /api/v1/logout**: Permite cerrar la sesión y revocar el token de acceso del usuario autenticado.
- **GET /api/v1/profile**: Permite consultar los datos del perfil del usuario actualmente autenticado. Crud del user
- **PUT /api/v1/change-password**: Permite al usuario autenticado cambiar su contraseña actual.

**Ejemplo de request (registro):**
```json
POST /api/v1/register
{
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "password": "ClaveSegura@123"
}
```

**Ejemplo de response (login):**
```json
POST /api/v1/login
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGci...",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

---

## Servicios

Endpoints para la gestión de servicios registrados por el usuario.

- **GET /api/v1/services**: Lista todos los servicios registrados por el usuario autenticado. Permite filtros por nombre y categoría.
- **POST /api/v1/services**: Permite crear un nuevo servicio, informando los datos requeridos (nombre, categoría, etc).
- **GET /api/v1/services/{id}**: Consulta los detalles de un servicio específico por su identificador.
- **PUT /api/v1/services/{id}**: Actualiza todos los datos de un servicio existente.
- **PATCH /api/v1/services/{id}**: Actualiza parcialmente los datos de un servicio existente.
- **DELETE /api/v1/services/{id}**: Elimina un servicio del sistema.

## Categorías

Endpoints para la gestión y consulta de categorías de servicios.

- **GET /api/v1/categories**: Lista todas las categorías disponibles para los servicios.

**Ejemplo de response (listar servicios):**
```json
GET /api/v1/services
[
    {
        "id": 1,
        "name": "Netflix",
        "category": "Streaming",
        "user_id": 2
    }
]
```

---

## Suscripciones

Endpoints para la gestión de suscripciones a servicios.

- **GET /api/v1/subscriptions**: Lista todas las suscripciones del usuario autenticado. Permite filtros por servicio, estado y período.
- **POST /api/v1/subscriptions**: Permite crear una nueva suscripción a un servicio.
- **GET /api/v1/subscriptions/{id}**: Consulta los detalles de una suscripción específica.
- **PUT /api/v1/subscriptions/{id}**: Actualiza todos los datos de una suscripción existente.
- **PATCH /api/v1/subscriptions/{id}**: Actualiza parcialmente los datos de una suscripción existente.
- **PATCH /api/v1/subscriptions/{id}/cancel**: Cancela una suscripción activa, informando el motivo si es necesario.
- **PATCH /api/v1/subscriptions/{id}/reactivate**: Reactiva una suscripción previamente cancelada.
- **DELETE /api/v1/subscriptions/{id}**: Elimina una suscripción del sistema.

**Ejemplo de request (cancelar suscripción):**
```json
PATCH /api/v1/subscriptions/5/cancel
{
    "reason": "Ya no utilizo el servicio"
}
```

---

## Reportes

El endpoint de reportes permite al usuario visualizar un resumen consolidado de sus gastos en suscripciones durante un período determinado, facilitando el control financiero personal.

- **GET /api/v1/reports/expenses**
        - Permite filtrar por período (ej: mes/año), servicio específico y estado de la suscripción (activa/cancelada).
        - El backend valida el token y obtiene el user_id del usuario autenticado.
        - Se realiza una consulta a la base de datos de suscripciones, agrupando por servicio y sumando los importes en el período solicitado.
        - La respuesta incluye el total general, el período consultado y un array de detalles por servicio.

**Ejemplo de response:**
```json
{
    "total": 120.50,
    "period": "2025-08",
    "details": [
        { "service": "Netflix", "amount": 39.90 },
        { "service": "Spotify", "amount": 19.90 }
    ]
}
```

### Detalle técnico y ejemplo de implementación (Laravel)

1. El usuario realiza una petición autenticada con filtros (por ejemplo, período y estado).
2. El controlador valida los parámetros y obtiene el usuario autenticado.
3. Se consultan las suscripciones del usuario, aplicando los filtros y agrupando por servicio.
4. Se calcula el total y se arma el array de detalles.
5. Se retorna la respuesta en formato JSON.

```php
public function expenses(Request $request)
{
        $user = $request->user();
        $period = $request->input('period'); // Ej: '2025-08'
        $status = $request->input('status'); // Ej: 'active'

        $query = Subscription::where('user_id', $user->id);

        if ($period) {
                $query->whereMonth('billing_date', substr($period, 5, 2))
                            ->whereYear('billing_date', substr($period, 0, 4));
        }
        if ($status) {
                $query->where('status', $status);
        }

        $details = $query->with('service')
                ->get()
                ->groupBy('service.name')
                ->map(function ($subs, $service) {
                        return [
                                'service' => $service,
                                'amount' => $subs->sum('amount')
                        ];
                })->values();

        $total = $details->sum('amount');

        return response()->json([
                'total' => $total,
                'period' => $period,
                'details' => $details
        ]);
}
```

---

## Exportación de Datos

Estos endpoints permiten exportar la información del reporte en formatos como CSV o Excel, para su uso externo o análisis en otras herramientas.

- **GET /api/v1/reports/expenses/export**
        - Recibe los mismos filtros que el reporte (período, servicio, estado) y un parámetro adicional para el formato (`?format=csv` o `?format=xlsx`).
        - El backend genera el archivo en el formato solicitado utilizando librerías como Laravel Excel o League\Csv.
        - El archivo se envía como descarga directa, con los headers HTTP apropiados.

### Detalle técnico y ejemplo de implementación (Laravel)

1. El usuario realiza una petición autenticada, indicando el formato deseado.
2. El controlador ejecuta la misma lógica de búsqueda y agrupamiento.
3. Utiliza una librería para generar el archivo (CSV/XLSX).
4. Retorna el archivo como descarga.

```php
public function exportExpenses(Request $request)
{
        $user = $request->user();
        $format = $request->input('format', 'csv'); // csv o xlsx

        // (Reutiliza la lógica de búsqueda y agrupamiento del ejemplo anterior)
        $data = ...; // array de datos ya agrupados

        return Excel::download(new ExpensesExport($data), 'expenses.'.$format);
}
```

```php
use Maatwebsite\Excel\Concerns\FromCollection;

class ExpensesExport implements FromCollection
{
        protected $data;
        public function __construct($data) { $this->data = $data; }
        public function collection() { return collect($this->data); }
}
```

> Se pueden agregar policies para garantizar que solo el dueño acceda a sus datos, logs de exportación para auditoría y paginación si es necesario.