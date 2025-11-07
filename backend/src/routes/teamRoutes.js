import express from 'express';
import TeamController from '../controllers/TeamsController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import { isPlayer } from '../middlewares/checkRoleMiddleware.js';

const router = express.Router()

// Rotas para listar times, criar times, atualizar o nome do time e deletar o time
router.get('/teams', authMiddleware, TeamController.getTeams)
router.get('/teams/:teamId', authMiddleware, TeamController.getTeamId)
router.post('/teams', authMiddleware, isPlayer, TeamController.createTeam)
router.put('/teams/:id', authMiddleware, isPlayer, TeamController.updateTeamName)
router.delete('/teams/:id', authMiddleware, isPlayer, TeamController.deleteTeam)

export default router;