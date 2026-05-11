# 💪 GymBro
## Proyecto personal de desarrollo web
### Koval Anton — 2026
<img width="1843" height="936" alt="image" src="https://github.com/user-attachments/assets/14647809-ff05-45da-93a9-200dfadb33e7" />

---

## 🎯 Descripción

Aplicación web desarrollada con HTML, CSS y JavaScript que permite generar un plan de entrenamiento personalizado y llevar un seguimiento de los pesos de trabajo.

Incluye las siguientes funcionalidades:

```
✔ Generación de rutina según objetivo y días  
✔ Registro y seguimiento de pesos por ejercicio  
✔ Progresión de días en ciclo  
✔ Detalle de ejercicios con descripción  
✔ Gráfico de evolución del peso (Chart.js)  
✔ Cambio de usuario  
```
---

## 🧠 Objetivo del proyecto

Proyecto personal para aprender desarrollo web construyendo algo real y útil desde cero.

```
Del problema a la solución - idea propia, código propio
```
Conceptos trabajados:

* Manipulación del DOM con JavaScript
* Persistencia de datos con localStorage
* Validación de formularios
* Generación dinámica de contenido
* Organización y estructura del código
* Visualización de datos con Chart.js

---

## 🗂️ Estructura del proyecto

```
/assets          → imágenes y recursos estáticos
/css             → estilos (style.css)
/js              → lógica de la aplicación
index.html       → pantalla de bienvenida
login.html       → introducción de nombre
setup.html       → selección de objetivo y días
workout.html     → rutina y seguimiento de pesos
programs.json    → datos de los programas de entrenamiento
```
---

## ⚙️ Instalación

1. Clonar el repositorio
```
git clone <URL_DEL_REPO>
```

2. Abrir el proyecto con Live Server (VS Code) o cualquier servidor local
```
index.html → punto de entrada
```
---

## 🔄 Flujo de la aplicación
```
Bienvenida → Nombre → Objetivo + Días → Rutina → Guardar pesos → Siguiente día
Cambiar usuario → Bienvenida
```
---

## 🧩 Conceptos trabajados

* Generación dinámica del DOM con JavaScript
* Persistencia de datos con localStorage
* Validación de inputs con expresiones regulares
* Fetch API y consumo de JSON local
* Diseño responsive (mobile, tablet, desktop)
* Visualización de datos con Chart.js
* Gestión del estado de la aplicación

---

## ⚠️ Notas importantes

* Los datos se guardan en localStorage — si se limpia el navegador se pierden
* La aplicación requiere un servidor local (Live Server) para funcionar correctamente
* Para resetear el progreso: Cambiar usuario o limpiar localStorage manualmente

---

## 🗺️ Mapa visual del flujo

```
[ BIENVENIDA ]
      ↓
[ NOMBRE ]   ← solo primera vez
      ↓
[ OBJETIVO + DÍAS ]   ← solo primera vez
      ↓
[ RUTINA — DÍA ACTIVO ]
      ↓
[ INTRODUCIR PESOS ]
      ↓
[ GUARDAR PESOS ]
      ↓
[ SIGUIENTE DÍA ] ←─────────────────┐
      ↓                              │
[ REPETIR HASTA COMPLETAR CICLO ] ──┘
      ↓
[ CICLO REINICIADO AUTOMÁTICAMENTE ]


[ PESOS YA GUARDADOS ]
      ↓
[ AJUSTAR CON +/- ]


[ CLICK EN EJERCICIO ] → [ MODAL ]
                              ↓
                    descripción + gráfico


[ CAMBIAR USUARIO ] → [ BIENVENIDA ]
```

---

## 🧠 Qué ocurre en cada paso

🚀 **Bienvenida**
* Pantalla de inicio con botón "Empezar"
* Redirige a la pantalla de nombre

👤 **Nombre**
* El usuario introduce su nombre
* Se valida con expresión regular
* Se guarda en `localStorage`
* Solo ocurre la primera vez

⚙️ **Setup**
* El usuario elige objetivo y días por semana
* Se guarda en `localStorage`
* Se genera la rutina automáticamente con `if/else`

💪 **Rutina**
* Se hace `fetch` de `programs.json`
* Se renderiza el día activo
* Los demás días aparecen como próximo o completado

📝 **Registro de pesos**
* El usuario introduce el peso manualmente la primera vez
* Se guarda en `localStorage` al pulsar "Guardar pesos"
* El ciclo avanza al siguiente día automáticamente

🔢 **Ajuste de pesos**
* Si ya hay peso guardado aparecen botones `+` / `-`
* Los cambios se guardan automáticamente

📊 **Detalle y progreso**
* Click en el ejercicio abre un modal
* Muestra descripción + gráfico de evolución (Chart.js)

🔄 **Cambiar usuario**
* Se limpia `localStorage`
* La app vuelve a la pantalla de bienvenida

---

## 🗂️ Cómo encaja la estructura

```
/assets
    → imágenes de fondo y logo

/css
    → style.css (estilos y responsive)

/js
    → index.js    (bienvenida)
    → login.js    (nombre y validación)
    → setup.js    (objetivo y días)
    → script.js   (rutina y pesos)

index.html    → bienvenida
login.html    → introducción de nombre
setup.html    → configuración inicial
workout.html  → rutina y seguimiento

programs.json → datos de ejercicios por objetivo y días
```

---

## 🔗 Relación entre archivos

```
HTML          → estructura y punto de entrada
CSS           → estilos y diseño responsive
JS            → lógica y manipulación del DOM
programs.json → datos que consume el JS
localStorage  → persiste los datos del usuario
```

---

## 🧠 Idea clave

```
Una app simple y útil  - hecha para aprender haciendo
```

---
