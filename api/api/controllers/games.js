const uuidv4 = require('uuid/v4');

module.exports =  app => {
    
    const gamesDB = app.data.games;
    const controller = {};

    const { games: gamesMock, } = gamesDB;

//retorna o que tenho no data/games.json
controller.listGames = (req, res) => res.status(200).json(gamesDB);

//salva no games.json - like a methods C#
controller.saveGames = (req, res) =>{
       gamesMock.data.push({
       id: uuidv4(),
       title: req.body.title,
       year: req.body.year,
       type: req.body.type 
    });

    res.status(201).json(gamesMock);
}
// remover
controller.removeGames = (req, res) => {
    const {gameId, } = req.params;

    const foundGameIndex = gamesMock.data
    .findIndex(game => game.id == gameId);

    if(foundGameIndex == -1){
        res.status(404).json({
            message: 'Game não encontrado',
            sucess: false,
            games: gamesMock,
        });
    }else{
        gamesMock.data.splice(foundGameIndex, 1);
        res.status(200).json({
            message: 'Game removido com sucesso!',
            sucess: true,
            games: gamesMock,
        });
    }
}
//atividade - put - alter
controller.alterGames = (req, res) => {
    const{gameCod, } = req.params;

    const encontraIdGame = gamesMock.data
    .findIndex(game => game.id == gameCod);

    if(encontraIdGame == -1){
        res.status(404).json({
            message: 'Game não encontrado',
            sucess: false,
            games: gamesMock,
        });
    } else{
        const novoGame = {
            id: gameCod,
            title: req.body.title,
            year:  req.body.year,
            type:  req.body.type 
        };
        
    
        gamesMock.data.splice(encontraIdGame, 1, novoGame);

        res.status(200).json({
            message:'Game Atualizado com sucesso!',
            sucess: true,
            games: gamesMock,
        });
    }
}

return controller

}