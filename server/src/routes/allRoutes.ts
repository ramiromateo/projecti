import { timeStamp } from 'console';
import { Router } from 'express';

import allController from '../controllers/allController';

class AllRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.get('/:carne', allController.getOne);
        this.router.post('/register', allController.create);
    }

}

const allRoutes = new AllRoutes();
export default allRoutes.router;