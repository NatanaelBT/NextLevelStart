const express = require("express")
const server = express()

// pega o banco de dados
const db = require("./database/db")


//Configurar pasta public

server.use(express.static("public"))

// habilitar o uso do re.body na app
server.use(express.urlencoded({ extended: true}))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{ 
    express: server,
    noCache: true 
})


// Configurar caminhos da minha aplicação

//Página Inicial
// req> Requisição
// res: Resposta

server.get("/", (req,res) => {
    return res.render("index.html",{title:"Um título"})
})


//Create-Point

server.get("/create-point", (req,res) => {

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    //inserir dados no db
    
     const query = `
     INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         items
     ) VALUES(?,?,?,?,?,?,?);
 `
 const values = [
     req.body.image,
     req.body.name,
     req.body.address,
     req.body.address2,
     req.body.state,
     req.body.city,
     req.body.items,    
 
 ]
     function afterInsertData(err) {
         if(err){
            console.log(err)
            return res.send("Erro no cadastro")
         }
 
         console.log("cadastrado!")
         console.log(this);
         return res.render("create-point.html", {saved: true})
     }
 
     db.run(query, values, afterInsertData)
    
    
    
})

server.get("/search-results", (req,res) => {
    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", { total: 0})  
    }


    // pegar os dados da database 
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
         if(err){
             return console.log(err)
         }

         const total = rows.length
          
         //mostrar a pagina html com os dados do db
         return res.render("search-results.html",{ places: rows, total: total})
     })
})

//Importante corrigir todos os <a href=""> de navegação


// ligar o servidor
server.listen(4444)