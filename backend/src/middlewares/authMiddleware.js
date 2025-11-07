import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Função para verificar se o token é passado na rota
    const authHeader = req.headers.authorization
    // Se não tem nada no campo de authorization o usuario não consegue fazer as ações que necessitam do token
    if(!authHeader) return res.status(401).send({message: "No token provided"});
    // Se tem o token faz o split para separar em arrays para ficar ['Bearer', 'token'] e pegamos o segundo item do array, que é o token
    const token = authHeader.split(' ')[1];
    // Se não tiver a usuaria não pode fazer ações que necessitam dele
    if(!token) return res.status(401).send({message: "No token provided"});

    try {
        // Verifica se o token é válido (assinatura e expiração)
        // e decodifica o payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Anexa os dados do usuario no req para que controllers possam usar eles
        req.user = decoded;
        // se o token for válido ele continua para a proxima função da rota
        next();
    } catch (error) {
        res.status(401).send({message: "Invalid token"});
    }
}

export default authMiddleware;