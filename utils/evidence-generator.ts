import * as fs from 'fs-extra';
import * as path from 'path';
import dayjs from 'dayjs';
import { chromium } from '@playwright/test';

// Función para manejar las carpetas 001, 002, etc.
async function getSequentialFolder(basePath: string): Promise<string> {
    const date = dayjs().format('DD-MM-YYYY');
    let counter = 1;
    let folderPath = "";
    await fs.ensureDir(basePath);
    do {
        const paddedCounter = counter.toString().padStart(3, '0');
        folderPath = path.join(basePath, `${date}-${paddedCounter}`);
        counter++;
    } while (fs.existsSync(folderPath));
    await fs.ensureDir(folderPath);
    return folderPath;
}

export async function generateCorporatePDF(testInfo: any, steps: {title: string, screenshotPath: string}[]) {
    const date = dayjs().format('DD/MM/YYYY');
    const timestamp = dayjs().format('HH:mm:ss');
    const sessionFolder = await getSequentialFolder('./target/Evidencias_PDF');
    const statusFolder = testInfo.status === 'passed' ? 'PASADOS' : 'FALLIDOS';
    const finalPath = path.join(sessionFolder, statusFolder);
    await fs.ensureDir(finalPath);

    const colorStatus = testInfo.status === 'passed' ? '#28a745' : '#dc3545';
    const azulPrimario = '#0066cc';

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @page { size: A4; margin: 0; }
            html, body { width: 210mm; height: 297mm; font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .cover { padding: 50px; page-break-after: always; height: 297mm; box-sizing: border-box; }
            .header-title { color: ${azulPrimario}; font-size: 24px; font-weight: bold; text-align: center; }
            .res-banner { text-align: center; font-size: 26px; font-weight: bold; color: ${colorStatus}; margin: 30px 0; }
            .info-box { font-size: 12px; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .info-label { font-weight: bold; text-decoration: underline; display: block; margin-bottom: 5px; }
            .step-container { page-break-before: always; padding: 40px; height: 270mm; display: block; box-sizing: border-box; position: relative; }
            .step-header { margin-bottom: 20px; }
            .step-num { font-size: 18px; font-weight: bold; color: ${colorStatus}; }
            .step-desc { font-size: 13px; color: #444; font-style: italic; margin-top: 5px; }
            .img-wrapper { width: 100%; text-align: center; margin-top: 30px; }
            .screenshot { max-width: 55%; height: auto; border: 1px solid #ccc; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
            .footer { position: absolute; bottom: 10px; left: 0; right: 0; text-align: center; font-size: 9px; color: #aaa; border-top: 1px solid #f0f0f0; padding-top: 5px; }               
        </style>
    </head>
    <body>
        <div class="cover">
            <div class="header-title">REPORTE DE EVIDENCIA DE PRUEBA</div>
            <div class="res-banner">RESULTADO: ${testInfo.status === 'passed' ? 'PASADO' : 'FALLIDO'}</div>
            <div class="info-box"><span class="info-label">DATOS DE EJECUCIÓN</span><div><b>Inicio:</b> ${date} ${timestamp}</div></div>
            <div class="info-box"><span class="info-label">ESCENARIO</span><div><b>Nombre:</b> ${testInfo.title}</div></div>
            <div class="info-box"><span class="info-label">FLUJO DEFINIDO:</span>
                <ol style="color: ${colorStatus}; font-size: 11px;">${steps.map(s => `<li>${s.title}</li>`).join('')}</ol>
            </div>
            <div class="footer">Generado por TeonCred Playwright Framework</div>
        </div>
        ${steps.map((s, i) => `
            <div class="step-container">
                <div class="step-header">
                    <div class="step-num">PASO ${i + 1}</div>
                    <div class="step-desc">${s.title}</div>
                </div>
                <div class="img-wrapper">
                    <img class="screenshot" src="data:image/png;base64,${fs.readFileSync(s.screenshotPath).toString('base64')}">
                </div>
                <div class="footer">TeonCred Automation - Página ${i + 2}</div>
            </div>
        `).join('')}
    </body>
    </html>
    `;

    const browser = await chromium.launch({ args: ['--no-sandbox'] });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    await page.setContent(htmlContent);
    
    const pdfName = `Evidencia_${testInfo.title.replace(/\s+/g, '_')}.pdf`;
    await page.pdf({
        path: path.join(finalPath, pdfName),
        format: 'A4',
        printBackground: true,
        scale: 1,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();

    // IMPORTANTE: Limpiar las imágenes temporales después de cerrar el PDF
    steps.forEach(s => {
        if (fs.existsSync(s.screenshotPath)) {
            fs.removeSync(s.screenshotPath);
        }
    });
}