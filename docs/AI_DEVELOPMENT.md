# Desarrollo asistido con IA

Este proyecto está preparado para trabajar con IA, especialmente Codex en VS Code, sin romper la arquitectura.

## Principio general

La IA debe acelerar el trabajo, no reemplazar la revisión humana. Toda sugerencia generada debe revisarse antes de commitear.

## Cómo usar Codex en VS Code

1. Abre Visual Studio Code.
2. Instala la extensión de Codex si está disponible para tu cuenta y entorno.
3. Abre la carpeta del proyecto.
4. Pide a Codex que lea la documentación antes de modificar archivos.
5. Solicita cambios pequeños y verificables.

## Archivos que Codex debe leer antes de modificar

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/POM_GUIDELINES.md`
- `features/login.feature`
- `src/pages/LoginPage.ts`
- `src/pages/LoginLocators.ts`

## Cómo dar contexto

Un buen prompt debe incluir:

- Objetivo del cambio.
- Archivos relevantes.
- Restricciones de arquitectura.
- Comando de validación esperado.

Ejemplo:

```text
Lee docs/POM_GUIDELINES.md y crea ProductLocators.ts y ProductPage.ts para la página de productos.
No pongas selectores en los step definitions.
Actualiza el CustomWorld si hace falta.
Valida con npm run typecheck.
```

## Crear una nueva página con IA

Prompt recomendado:

```text
Crea una nueva página siguiendo POM para Products.
Primero agrega ProductLocators.ts con locators accesibles.
Luego agrega ProductPage.ts con acciones y asserts.
No modifiques steps todavía.
```

## Crear nuevos escenarios Cucumber

Prompt recomendado:

```text
Agrega un escenario Cucumber para validar error de contraseña vacía.
Respeta la arquitectura existente.
Los steps deben llamar métodos públicos de LoginPage.
No uses selectors en los step definitions.
```

## Refactorizar sin mezclar responsabilidades

Prompt recomendado:

```text
Revisa este framework y dime si hay violaciones de POM.
No modifiques archivos todavía.
Entrega hallazgos con archivo y línea.
```

## Revisión de código generado por IA

Antes de aceptar cambios:

- Verifica que los steps no tengan selectores.
- Verifica que las clases Locators no tengan acciones.
- Verifica que las clases Page no dupliquen selectores.
- Ejecuta `npm run typecheck`.
- Ejecuta `npm run lint`.
- Ejecuta `npm test`.
- Revisa cambios con `git diff`.

## Seguridad

- No compartas `.env`.
- No subas credenciales.
- No pegues tokens, contraseñas ni cookies en prompts.
- No hardcodees secretos en features, steps ni pages.
- Revisa cambios antes de commitear.

## Prompts útiles

```text
Lee docs/POM_GUIDELINES.md y crea ProductLocators.ts y ProductPage.ts para la página de productos.
No pongas selectores en los step definitions.
```

```text
Agrega un escenario Cucumber para validar error de contraseña vacía.
Respeta la arquitectura existente y actualiza la documentación si es necesario.
```

```text
Revisa este framework y dime si hay violaciones de POM.
No modifiques archivos todavía.
```

```text
Agrega soporte para una nueva variable de entorno sin romper los valores por defecto.
Actualiza .env.example y docs/PROJECT_SETUP.md.
```

## Recomendación final

Usa IA como copiloto disciplinado: dale contexto, limita el alcance, pide validaciones y revisa los diffs. La arquitectura es parte del producto; no debe sacrificarse por generar código más rápido.
