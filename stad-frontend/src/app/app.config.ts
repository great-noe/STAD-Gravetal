import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

// Esta función se ejecuta ANTES de que Angular muestre la pantalla
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080', // La dirección de tu Keycloak en Docker
        realm: 'StadRealm',           // El reino de Gravetal
        clientId: 'stad-frontend'     // El cliente 
      },
      initOptions: {
        onLoad: 'login-required',     // Fuerza la pantalla de login inmediatamente
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,  // ¡Activa el "gafete" automático para la API en .NET!
      bearerPrefix: 'Bearer'
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Permite a Keycloak inyectar el token en las peticiones HTTP
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};
