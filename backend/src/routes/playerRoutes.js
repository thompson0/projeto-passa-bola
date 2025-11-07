import express from 'express';
import PlayersController from '../controllers/PlayersController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { isPlayer } from '../middlewares/checkRoleMiddleware.js';

const router = express.Router()

// Rotas para adicionar jogadoras a um time, e para deletar jogadoras de um time
router.get('/teams/:teamId/players', authMiddleware, PlayersController.getPlayers)
router.post('/teams/:teamId/players', authMiddleware, isPlayer, PlayersController.addPlayer)
router.delete('/teams/:teamId/players/:playerId', authMiddleware, isPlayer, PlayersController.removePlayer)

export default router;