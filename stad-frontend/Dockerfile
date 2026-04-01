# =============================================================================
# Etapa 1: BUILD
# Usamos Node 22 Alpine para instalar dependencias y compilar Angular.
# =============================================================================
FROM node:22-alpine AS build
WORKDIR /app

# Copiamos primero los manifiestos de paquetes para aprovechar el cache de
# capas de Docker: si el codigo cambia pero los paquetes no, npm install
# no se re-ejecuta.
COPY package.json package-lock.json ./

# Instalamos dependencias con ci para reproducibilidad
RUN npm ci

# Copiamos el resto del codigo fuente
COPY . .

# Compilamos en modo produccion
RUN npm run build -- --configuration production

# =============================================================================
# Etapa 2: SERVE
# Nginx Alpine (~25 MB) sirve los archivos estaticos generados.
# =============================================================================
FROM nginx:alpine AS runtime

# Eliminamos la config por defecto de Nginx y copiamos la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular 21 con @angular/build coloca los archivos en dist/<nombre>/browser
COPY --from=build /app/dist/stad-frontend/browser /usr/share/nginx/html

# Puerto expuesto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
