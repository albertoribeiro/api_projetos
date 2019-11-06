const express = require('express');
const server = express();
server.use(express.json());

var qtdReq = 0;

const projects =  [
                {id:1,
                    nome:'Selo Digital',
                    tarefas:['Init','dev','deploy','test']},
                {id:2,
                    nome:'Gestor',
                    tarefas:['Init2','dev2','deploy2','test2']},
                {id:3,
                    nome:'Mensalista',
                    tarefas:['Init3','dev3','deploy3','test3']},                        
                ] ;
function CountRequisicoes(req,res,next){
    console.log(qtdReq);
    qtdReq++;
    return next();
}
function checkProjectExsts(req,res,next){
    const project = projects[req.params.id];
    if(!project){
        return res.status(400).json({erro:'Projeto não existe '});
    }
    return next();
}
server.post('/projects',CountRequisicoes,(req,res) => {
    const {id,nome,tarefas} = req.body;
    projects.push({id,nome,tarefas});
    return res.json(projects)
})

server.get('/projects',CountRequisicoes,(req,res) => {
    return res.json(projects)
});

server.put('/projects/:id',checkProjectExsts,CountRequisicoes,(req,res) => {
    const id = req.params.id;
    const {nome} = req.body;
    projects[id-1].nome = nome;
    return res.json(projects)
});

server.delete('/projects/:id',checkProjectExsts,CountRequisicoes,(req,res) => {
    const id = req.params.id;
    projects.splice(id-1,1)
    return res.send();
});

server.post('/projects/:id/tasks',checkProjectExsts,CountRequisicoes,(req,res) => {
    const id = req.params.id;
    const {nome} = req.body;
    projects[id-1].tarefas.push(nome);
    return res.json(projects)
});

server.listen(3001);