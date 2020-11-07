import { Request, Response } from 'express';
import pool from '../database';

class AllController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query('INSERT INTO users set ?', [req.body]);
            res.json({ message: 'Usuario guardado Exitosamente' });    
        } catch (error) {
            res.json({ message: 'Hubo un errror al guardar el usuario' });    
        }
        
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { carne } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE carne = ?', [carne]);
        console.log(users.length);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.json({ carne: -1 });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id ,newpass} = req.body;
        const oldGame = req.body;
        await pool.query('update users set password=? where carne=?;', [newpass, id]);
        res.json({ message: "Contraseña guardada correctamente" });
    }


    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM users');
        res.json(games);
    }

   

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const allController = new AllController;
export default allController;