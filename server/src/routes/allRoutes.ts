import { timeStamp } from 'console';
import { Router } from 'express';

import allController from '../controllers/allController';

class AllRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:carne', allController.getOne);
        this.router.post('/register', allController.create);
        this.router.post('/update', allController.update);
        this.router.get('/getallinicio/all', allController.getallinicio);
        this.router.get('/getallinicio/all/:id', allController.getspecificcourse);
        this.router.post('/registerpublication', allController.createpublication);
        this.router.post('/publicacion/filtrar', allController.filtrar);
        this.router.post('/addcomentary', allController.createcomentariy);
        this.router.post('/updateuser', allController.updateuser);
        this.router.get('/publicacion/:id', allController.getonepublication);
        this.router.get('/pensum/all/all', allController.getcourses);
        
        
    }

}

const allRoutes = new AllRoutes();
export default allRoutes.router;