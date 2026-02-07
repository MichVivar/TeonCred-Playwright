# 🎭 Framework de Automatización - TeonCred / OrangeHRM

Este repositorio contiene un framework de automatización profesional desarrollado con **Playwright** y **TypeScript**. Está diseñado bajo el patrón de diseño **Page Object Model (POM)** e incluye un sistema de reporte de evidencias personalizado.

## 📊 Reportes de Ejecución

Tras cada ejecución en el Pipeline de CI/CD, se generan los siguientes resultados:

1.  **[REPORTE TÉCNICO INTERACTIVO](https://michvivar.github.io/TeonCred-Playwright/)**: Visualiza el reporte oficial de Playwright con trazas y tiempos en vivo.
2.  **Reporte de Evidencias (PDF)**: Documento ejecutivo con capturas de pantalla de cada paso. Se encuentra disponible para descarga en la sección de **Actions** > **Artifacts** de este repositorio.

---

## 🛠️ Stack Tecnológico

- **Lenguaje:** TypeScript
- **Herramienta de Automatización:** Playwright
- **Patrón de Diseño:** Page Object Manager (POM)
- **Integración Continua:** GitHub Actions
- **Reportería:** Generador PDF Custom y Playwright HTML Report

---

## 🚀 Instrucciones de Ejecución Local

### Pre-requisitos

- Node.js (v18 o superior)
- NPM

### Pasos

1. Clonar el proyecto:

   ```bash
   git clone [https://github.com/michvivar/TeonCred-Playwright.git](https://github.com/michvivar/TeonCred-Playwright.git)

   ```

2. Instala dependencias
   npm install

3. Instala navegadores de Playwright
   npx playwright install

4. Ejecutar las pruebas
   npx playwright test
