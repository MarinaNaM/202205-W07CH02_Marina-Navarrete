import { Router } from 'express';

const router = Router();

router.get('/', (req, resp) => {
    req;
    resp.end(
        '<h1>Bienvenida a las cosas que ya sabes</h1><p> Puedes volver aqui siempre que pienses que no sabes nada ;)</p>'
    );
});

export default router;
