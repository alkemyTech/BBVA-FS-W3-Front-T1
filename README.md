- Para poder acceder a la app (sin tener el servidor corriendo), se tiene que setear un userName (en redux/userSlice.js.)
Esto va a dejar acceder a la app (sin hacer el logIn), NO va a guardar los datos persistidos en localStorage. Solamente se persisten los datos en caso de que exista el usuario en la bbdd. 
Con el boton logout (o cerrando la pestaña/navegando a otra url) se eliminan los datos del localStorage , y del store de redux.

#Dependencias instaladas para su funcionamiento:
1-"@mui/icons-material": "^5.11.16"
2-"@mui/material": "^5.13.5"
3-"axios": "^1.4.0"
4-"react-router-dom": "^6.14.2"
5-"react-hook-form": "^7.45.2"
6-"@reduxjs/toolkit": "^1.9.5"
7-"react-redux": "^8.1.1"
