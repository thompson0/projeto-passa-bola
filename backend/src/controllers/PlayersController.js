import Player from "../models/Player.js";
import Team from "../models/Team.js";
class PlayersController {
    // Função para buscar jogadoras dentro de um time
    static async getPlayers(req, res) {
        // Definindo que o id vem no parametro da requisição
        const {teamId} = req.params

        try {
            // Procurando o time pelo id
            const team = await Team.findById(teamId)
            // Populando para não vir os ids, e sim nome, posicao, idade e altura
            .populate('players', 'username position age height')
            // Validação de erro se não achar o time
            if(!team) return res.status(404).send({message: "Team not found"})
            res.status(200).send(team.players)
        } catch(error) {
            res.status(500).send({message: "Error finding for players in team"})
        }
    }

    static async addPlayer(req, res) {
        // Definindo que id do time vem no parametro da requisição
        // Definindo que o id da jogadora a ser adicionada vem no body
        // Capturando o id da usuaria para comparar com o da dona do time
        const { teamId } = req.params
        const { playerId } = req.body
        const userId = req.user.id

        try {
            // Encontrando o time e fazendo validações para verificar a existencia do time, e verificar se o id do usuario é o mesmo que o da dona do time
            const team = await Team.findById(teamId)
            if (!team) return res.status(404).send({ message: "Team not found" })
            if (team.owner.toString() !== userId) return res.status(403).send("Unauthorized, you are not the owner of the team")

            // Encontrando a jogadora e fazendo validações para ver se a jogadora existe e se já está no time
            const player = await Player.findById(playerId)
            if (!player) return res.status(404).send({ message: "Player not found" })
            if (team.players.includes(playerId)) return res.status(400).send({ message: "Player already in the team" })

            // Se passar por todas as verificações é adicionada no array de jogadoras
            team.players.push(playerId)
            await team.save()
            res.status(200).send({ message: "Player added successfully" })
        } catch (error) {
            res.status(500).send({ message: "Error adding player" });
        }

    }

    static async removePlayer(req, res) {
        // Definindo que o id do time e o id da jogadora vem no parametro da requisição
        // Capturando o id do usuario para verificar se o id é o mesmo que o da dona do time
        const { teamId, playerId } = req.params;
        const userId = req.user.id

        try {
            // Encontrando o time e fazendo validações para verificar se o time existe
            const team = await Team.findById(teamId);
            if (!team) return res.status(404).send({ message: "Team not found" });
            // Verificação se o id da usuaria é o mesmo da dona do time
            if (team.owner.toString() !== userId) {
                return res.status(403).send({ message: "Unauthorized, you are not the owner of the team" });
            }
            // Tratativa de erro para a dona do time não conseguir remover ela mesma do próprio time
            if (team.owner.toString() === playerId) {
                return res.status(400).send({ message: "You can't remove yourself from your team" });
            }
            // Caso passe por todas as tratativas e validações, a jogadora é removida do time
            team.players.pull(playerId)
            await team.save()
            res.status(200).send({ message: "Player removed successfully" })
        } catch (error) {
            res.status(500).send({ message: "Error removing player" })
        }
    }
}

export default PlayersController;