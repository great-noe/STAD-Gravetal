import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  // Verificamos si el usuario tiene una sesión activa
  const isLoggedIn = keycloak.isLoggedIn();

  if (!isLoggedIn) {
    // Si no está logueado, lo "bota" a la pantalla de Keycloak
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });
    return false;
  }

  // Si está logueado, lo deja pasar a la ruta
  return true;
};
