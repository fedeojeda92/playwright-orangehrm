1. inicializar el asistente playwrigth
npm init playwright@latest

* se elige lenguaje typescript, los tests en la carpeta "tests", se instalan los navegadores.

2. Correr test de ejemplo  (esto corre tests/example.spec.ts en los 3 navegadores)
npx playwright test

3. Mostrar el reporte de los tests de ejemplo realizados
npx playwright show-report

4. cambiar las especificaciones en playwright.config.ts para que nuestros tests apunten a la SPA elegida y volver a correr:
npx playwright test

5. Vamos a usar la herramienta codegen que trae playwright, que graba lo que hacemos en el navegador y lo convierte en codigo. 
npx playwright codegen https://opensource-demo.orangehrmlive.com





