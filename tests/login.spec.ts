import { test, expect } from '../utils/test-base';

test.describe('Pruebas de Login @LoginTests', () => {

    // Linea 6: Asegúrate de que los argumentos estén entre llaves { }
    test('Validar mensaje de error con credenciales inválidas @NegativeTest', async ({ pm, makeStep }) => {

        await makeStep('Cargar la página de login', async () => {
            await pm.loginPage.cargarPagina();
        });

        await makeStep('Intentar iniciar sesión con credenciales inválidas', async () => {
            await pm.loginPage.iniciarSesion('34405', 'Da10030123');
        });

        await makeStep('Validar que se muestra el mensaje de error', async () => {
            const errorText = await pm.loginPage.validarMensajeError();
            expect(errorText).toBe('Usuario o contraseña no válidos.');
        });
    });
});