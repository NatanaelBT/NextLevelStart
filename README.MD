
Server
//DICA:  TEM HORA QUE OS INSTALL FUNCIONAM SOMENTE COM CMD EM ADM E OUTRAS QUE SEM O ADM QUE FUNCIONA, VAI ENTENDER!!
Primeiro ver se node esta atualizado
//1
na raiz do server, dar npm init -y(gera o package.json)
//2
Instalar usando o comando npm install express o Express que é responsavel por criar o servidor com suas dependencias (instala o node_modules e o package.json que rastreia as dependecias)
//3
configuar o server.ts, 
Exemplo:
const express = require('express'); 
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
});

app.use(express.static('public'));// configura a pasta public para que o server seja capaz de visualizar o seu conteudo tipo o css

app.get('/', (req, res) => {
  return res.render('index.html');
});

app.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

app.get('/search', (req, res) => {
  return res.render('search-results.html');
});

app.listen(3333);

//4 INSTALAR O NODEMON (npm install nodemon -D) PARA NÃO PRECISAR LIGAR E DESLIGAR O SERVER TODA HORA QUE FIZER UMA ALTERAÇÃO O DIEGO USO OUTRO NO BOOSTER 
//5 INSTALAR O NUNJUCKS QUE O TEMPLATE ENGINE (npm install nunjucks) 