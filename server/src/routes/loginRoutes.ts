import { Router } from 'express';

import loginController from '../controllers/loginController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:carne', loginController.getOne);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;