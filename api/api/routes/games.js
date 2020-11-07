module.exports = app => {
    const controller = app.controllers.games;
    
    //Minhas Rotas - Navegador - Postman - Teste
    app.route('/api/games')
    .get(controller.listGames)
    .post(controller.saveGames);

    app.route('/api/games/:gameId')
    .delete(controller.removeGames)
    .put(controller.alterGames);
}