import type { Request, Response } from 'express';

export function getUsers(_req: Request, res: Response) {
    res.json([
        { id: 1, name: 'Erick J. Carrera' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' }
    ])
}