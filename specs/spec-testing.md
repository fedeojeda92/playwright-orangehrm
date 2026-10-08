# Spec de testing – OrangeHRM (Playwright)

## 1. Contexto de la aplicación

## SPA que usaremos:
- OrangeHRM, es un sistema de RRHH, demo publica, con credenciales publicas de prueba
- URL base: https://opensource-demo.orangehrmlive.com/
- SPA: single page application, es una pagina que cambia de pantalla sin recargar la pagina.
- Los usuarios y contraseñas son publicos establecidos en la pagina login de OrangeHRM.
- Es una demo compartida, por lo que los datos pueden cambiar o reiniciarse.

## 2. Flujos críticos a cubrir

| # | Flujo                                      | Qué verifica                                                                                            | Por qué es crítico                                                                                   |
|---|--------------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| 1 | Login (válido e inválido)                  | Acceso al Dashboard con credenciales correctas y mensaje de error con credenciales incorrectas          | Sin acceso no se puede usar ninguna otra función, y la validación de credenciales protege el sistema |
| 2 | Búsqueda de empleado (PIM → Employee List) | Que el filtro por nombre muestre los resultados correctos, o "No Records Found" si no hay coincidencias | Encontrar empleados es la operación más frecuente en un sistema de RRHH                              |
| 3 | Alta de empleado (PIM → Add Employee)      | Que el empleado creado se guarde y luego aparezca en la lista                                           | Es la operación principal de escritura, y verifica que los datos persistan                           |


## 3. Criterios de aceptación
### T1 – Login con credenciales válidas
- **Dado** que estoy en la pantalla de login (`/web/index.php/auth/login`)
- **Cuando** ingreso el usuario `Admin` y la contraseña `admin123` y hago clic en "Login"
- **Entonces** soy redirigido al Dashboard y la URL contiene `/dashboard`

### T2 – Login con credenciales inválidas
- **Dado** que estoy en la pantalla de login
- **Cuando** ingreso el usuario `Admin` y una contraseña incorrecta y hago clic en "Login"
- **Entonces** veo el mensaje "Invalid credentials" y la URL sigue conteniendo `/auth/login`

### T3 – Búsqueda de un empleado inexistente
- **Dado** que estoy logueado y en la lista de empleados (PIM → Employee List)
- **Cuando** escribo en "Employee Name" un nombre que no existe (por ejemplo, un texto con sufijo único) y hago clic en "Search"
- **Entonces** la tabla no muestra resultados y aparece el mensaje "No Records Found"

### T4 – Alta de un empleado
- **Dado** que estoy logueado y en la pantalla "Add Employee" (`/pim/addEmployee`)
- **Cuando** completo el nombre (`Fede` más un sufijo único) y un apellido, y hago clic en "Save"
- **Entonces** el sistema guarda al empleado y me lleva a su pantalla de detalles personales, donde el nombre y el apellido ingresados aparecen cargados

### T5 – El empleado creado aparece en la búsqueda
- **Dado** que creé un empleado con nombre único (T4) y estoy logueado
- **Cuando** voy a Employee List, escribo ese nombre único en "Employee Name" y hago clic en "Search"
- **Entonces** la tabla muestra al menos un registro con ese nombre y apellido

## 4. Restricciones tecnicas:
- Navegador: Chromium.
- Viewport: 1280×720.
- Ejecución: en serie, con 1 worker, porque la demo es compartida y lenta, y los tests no deben pisarse entre sí.
- Timeouts: 60 s por test y 10 s por expectativa.
- Datos de prueba: usuario Admin y contraseña admin123; los empleados se crean con nombre "Fede" más un sufijo único generado con el timestamp (por ejemplo Fede1728400000), para no chocar con datos de otros usuarios de la demo.
- Trace: activado siempre, y reporte HTML.
- firefox y webkit no se usan (para reducir tiempo de ejecución en una demo lenta).