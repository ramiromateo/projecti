import { Request, Response } from 'express';
import pool from '../database';

class AllController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM users');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { carne } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE carne = ?', [carne]);
        console.log(users.length);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: "The student doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({ message: 'Game Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The game was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const allController = new AllController;
export default allController;