const isPlayer = (req, res, next) => {
    // Função para verificar que apenas jogadoras podem fazer algumas ações
    if(!req.user || req.user.role !== 'Player') {
        return res.status(403).send({message: "Only users with role Player can do this action"})
    }
    // se estiver tudo certo passa para a proxima função da rota
    next()

}

export { isPlayer }