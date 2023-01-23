const restify = require("restify");
const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234"
});

const server = restify.createServer({
  name: "crud-livros-nodejs",
  version: "1.0.0"
});

server.use(restify.plugins.bodyParser({ mapParams: true }));

// Get All
server.get("/livros", function(req, res, next) {
    var sql = "SELECT * FROM crud_livros_nodejs.livros";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Get By Id
server.get("/livros/:id", function (req, res, next) {
    var id = req.params.id;
    var titulo = 'teste';

    var sql = "SELECT * FROM crud_livros_nodejs.livros WHERE id = ?";
    con.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Post
server.post("/livros", function(req, res, next) {
    var livro = req.body;
    var sql = `INSERT INTO crud_livros_nodejs.livros (titulo, descricao) VALUES ('${livro.titulo}', '${livro.descricao}')`

    console.log(livro);
    console.log(sql);

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send("Linhas inseridas: " + result.affectedRows);
    });
});

// Put
server.put("/livros", function(req, res, next) {
    var livro = req.body;

    console.log("Alterando livro de id: %d ", livro.id);
    console.dir(livro);

    var sql = `UPDATE crud_livros_nodejs.livros 
                  SET titulo    = '${livro.titulo}',
                      descricao = '${livro.descricao}'
               WHERE id = ${livro.id}`;

    console.log(livro);
    console.log(sql);

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send("Linhas alteradas: " + result.affectedRows);
    });
});

// Delete
server.del("/livros/:id", function(req, res, next) {
    var id = req.params.id;
    console.log("Deletando livro de ID: %d", id);

    var sql = "DELETE FROM crud_livros_nodejs.livros WHERE id = ?";
    
    con.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send("Linhas deletadas" + result.affectedRows);
    });
});

server.listen(8080, function() {
    console.log("Listening at %s", server.url);
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});

console.log("Running");