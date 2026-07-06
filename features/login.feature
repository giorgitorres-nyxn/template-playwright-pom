# language: es
@login
Característica: Login de cliente en Sauce Demo Shopify
  Como usuario de la tienda
  Quiero interactuar con la página de login
  Para validar que el formulario responde correctamente

  @smoke
  Escenario: Visualizar formulario de login
    Dado que el usuario abre la página de login
    Entonces debe ver el formulario de login

  @negative
  Escenario: Intentar iniciar sesión con credenciales inválidas
    Dado que el usuario abre la página de login
    Cuando intenta iniciar sesión con credenciales inválidas
      | email                        | password              |
      | usuario.invalido@example.com | password-invalido-123 |
    Entonces el inicio de sesión no debe ser exitoso

  @requiresCredentials
  Escenario: Iniciar sesión con credenciales válidas
    Dado que el usuario abre la página de login
    Cuando inicia sesión con credenciales válidas
    Entonces debe acceder correctamente a su cuenta
