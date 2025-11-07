import Team from '../models/Team.js'
import Player from '../models/Player.js';

class TeamController {
    //GET /teams
    static async getTeams(req, res) {
        try {
            // Encontrando o time para mostrar e usando o populate para não mostrar o id, mas mostrar o nome da proprietaria do time
            // E também populando o array de jogadoras, para mostrar o nome e posição
            const teams = await Team.find()
                .populate('owner', 'username')
                .populate('players', 'username position')
            res.status(200).send(teams);
        } catch (error) {
            res.status(500).send({ message: `Error searching teams: ${error.message}` });
        }
    }

    static async getTeamId(req, res) {
        const {teamId} = req.params

        try {
            const team = await Team.findById(teamId)
                // Popula (carrega os dados) do dono
                .populate('owner', 'username') 
                // Popula os dados das jogadoras no array
                .populate('players', 'username position age');
            if(!team) return res.status(404).send({message: "Team not found"})
            res.status(200).send(team)
        } catch(error) {
            res.status(500).send({message: "Erro ao listar times"})
        }
    }

    //POST /teams
    static async createTeam(req, res) {
        // Definindo as propriedades para serem passadas no body da requisição e pegando o id da usuaria
        const { name, description, city } = req.body
        const ownerId = req.user.id

        // Criando o time, com a proprietaria já sendo adicionada no time, e adicionada na lista de jogadoras
        try {
            const newTeam = new Team({
                name,
                description,
                city,
                owner: ownerId,
                players: [ownerId]
            });

            await newTeam.save()
            res.status(201).send({ message: "Team created successfully", team: newTeam });
        } catch (error) {
            res.status(500).send({ message: `Error creating team: ${error.message}` });
        }
    }

    //PUT /teams/:id (EDITA APENAS NOME)
    static async updateTeamName(req, res) {
        // Definindo que id vem no parametro da url da requisição, e que o novo nome vem no body
        const { id } = req.params
        const { name } = req.body
        // Capturando o id da usuaria para comparar com o da dona do time
        const userId = req.user.id

        try {
            // Encontrando o time e tratativa de erro caso não seja encontrado
            const team = await Team.findById(id)
            if (!team) return res.status(404).send({ message: "Team not found" })
            // Comparação de ids, para verificar se a usuaria que está tentando trocar o nome do time é a dona do time
            if (team.owner.toString() !== userId) return res.status(403).send({ message: "Unauthorized, you're not the owner of the team" });
            // Caso passe por todas as tratativas, definimos que o nome do time é o nome que é passado no body da requisição
            team.name = name
            await team.save()

            res.status(200).send({ message: "Name updated successfully" })
        } catch (error) {
            res.status(500).send({ message: `Error updating team: ${error.message}` });
        }
    }

    //DELETE /teams/:id
    static async deleteTeam(req, res) {
        // Definindo que o id vem de parametro na url da requisição e capturando o id da usuaria para comparar com a da proprietaria do time
        const {id} = req.params
        const userId = req.user.id
        try {
            // Procurando o time pelo id e tratativa para caso não exista o time
            const team = await Team.findById(id)
            if (!team) return res.status(404).send({ message: "Team not found" })
            // Comparação para ver se a usuaria que deseja deletar o time é a proprietaria do time
            if (team.owner.toString() !== userId) return res.status(403).send({ message: "Unauthorized, you are not the owner of the team" });
            // Caso passe por tudo, o time é deletado
            await Team.findByIdAndDelete(id)
            res.status(200).send({ message: "Team deleted successfully" })
        } catch (error) {
            res.status(500).send({ message: "Error deleting team" })
        }
    }
}

export default TeamController;