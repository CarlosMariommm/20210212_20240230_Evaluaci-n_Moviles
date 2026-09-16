# Evaluación Móviles — React Native + Firebase

Instituto Técnico Ricaldone — Tercer Año de Desarrollo de Software
Módulo 3.5: Desarrollo de componentes para dispositivos móviles

## Integrantes

- Carlos Mario Quintanilla Ramírez — Carnet 20210212
- Andrés Emanuel Gálvez Alvarenga — Carnet 20240230

## Descripción del proyecto

Aplicación móvil desarrollada con **React Native + Expo** que implementa autenticación de
usuarios con **Firebase Authentication** y almacenamiento de datos en **Cloud Firestore**.

La app cuenta con tres pantallas conectadas mediante navegación:

- **Login**: inicio de sesión con correo y contraseña.
- **Registro**: creación de cuenta, guardando en Firestore el nombre completo, fecha de
  nacimiento, carnet institucional y URL de imagen del usuario.
- **Dashboard / Perfil**: muestra la información del usuario autenticado, permite editarla
  y cerrar sesión.

Las credenciales de Firebase se manejan mediante variables de entorno (`.env`), nunca
quemadas en el código fuente.

## Dependencias principales

- `expo`
- `react` / `react-native`
- `@react-navigation/native` y `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`
- `firebase` (Auth + Firestore, SDK modular v9+)
- `@react-native-async-storage/async-storage` (persistencia de sesión de Firebase Auth)
- `react-native-dotenv` (variables de entorno `.env`)
- `expo-constants`, `expo-splash-screen`

## Paleta de colores

Paleta generada en [coolors.co](https://coolors.co/):

| Color            | Hex       | Uso                                                    |
|------------------|-----------|---------------------------------------------------------|
| Navy Electric    | `#390099` | Primario: botones principales, header, splash e ícono    |
| Dark Raspberry   | `#9E0059` | Botón "Cerrar sesión" (borde y texto)                    |
| Hot Fuchsia      | `#FF0054` | Errores y mensajes de validación                         |
| Blaze Orange     | `#FF5400` | Botón "Editar información", splash e ícono               |
| Amber Gold       | `#FFBD00` | Anillo del avatar de perfil, splash e ícono              |

## Estructura del proyecto

```
src/
  components/   CustomInput, CustomButton, ProfileCard (componentes reutilizables)
  config/       firebase.js (inicialización de Firebase, lee variables de entorno)
  hooks/        useAuth, useUserProfile (lógica separada de las pantallas)
  navigation/   Navigation.js (stack de autenticación / stack de la app)
  screens/      LoginScreen, RegisterScreen, DashboardScreen
  theme/        colors.js (paleta centralizada)
```

## Configuración local

1. Clonar el repositorio e instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz (usar `.env.example` como referencia) con las
   credenciales del proyecto de Firebase:

   ```
   FIREBASE_API_KEY=
   FIREBASE_AUTH_DOMAIN=
   FIREBASE_PROJECT_ID=
   FIREBASE_STORAGE_BUCKET=
   FIREBASE_MESSAGING_SENDER_ID=
   FIREBASE_APP_ID=
   ```

3. En la consola de Firebase, habilitar:
   - **Authentication** → método de inicio de sesión "Correo electrónico/contraseña".
   - **Firestore Database** (modo producción, con las reglas correspondientes).

4. Ejecutar el proyecto:

   ```bash
   npx expo start
   ```

## Control de versiones

Repositorio nombrado según el formato solicitado: `20210212_20240230_Evaluaci-n_Moviles`.
El archivo `.env` está excluido del repositorio mediante `.gitignore`; se comparte por
separado según lo indicado en la evaluación.
