import express from "express";
import cors from "cors";
import { Produto } from "./Produtos.js";

let listaProdutos = [
    new Produto(1,'tenis',100,2),
    new Produto(2,'chinelo',20,10),
    new Produto(3,'detergente',5,30),
    new Produto(4,'coca-cola',3.75,20),
]

let listaUsuarios = [
    { id: 1, email: "usuario1@example.com", senha: "senha123" },
    { id: 2, email: "usuario2@example.com", senha: "senha456" },
];

const app = express();

//Essa função é responsável por analisar o corpo das solicitações HTTP 
//que têm um tipo de conteúdo (Content-Type) definido como application/json. 
//Ela pega os dados JSON enviados na solicitação e os converte em um objeto JS.
app.use(express.json());

//  Habilita o protocolo CORS para a troca front-back
//  npm i cors
app.use(cors());

//Forma comum de codificar dados enviados em solicitações HTTP.
//Usado quando os dados são enviados de um formulário HTML para uma API. 
//Nesse formato, os dados são codificados como pares chave-valor, semelhantes aos parâmetros em uma URL.
app.use(express.urlencoded({ extended : true }));

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Verifica se há um usuário com o e-mail fornecido
    const usuario = listaUsuarios.find(u => u.email === email);

    if (usuario) {
        // Se encontrou o usuário, verifica se a senha está correta
        if (usuario.senha === senha) {
            // Usuário e senha correspondem
            return res.status(200).json({ status: 200, message: "Login bem-sucedido" });
        } else {
            // Senha incorreta
            return res.status(401).json({ status: 401, message: "Senha incorreta" });
        }
    } else {
        // E-mail não encontrado (usuário incorreto)
        return res.status(401).json({ status: 401, message: "E-mail não encontrado" });
    }
});

app.get("/produtos",(req, res)=>{
    return res.status(200).json(listaProdutos)
})

app.post("/produtos/novo", (req, res) => {
    const { desc, preco } = req.body;

    // Verifica se o produto já existe na lista
    const produtoExistente = listaProdutos.find(p => p.desc === desc && p.preco === preco);

    if (produtoExistente) {
        // Se o produto já existe, incrementa a quantidade em +1
        produtoExistente.qtd += 1;
        return res.status(200).json(`Quantidade do produto '${desc}' incrementada para ${produtoExistente.qtd}`);
    } else {
        // Se o produto não existe, adiciona um novo produto à lista
        const novoProduto = new Produto(listaProdutos.length + 1, desc, preco, 1);
        listaProdutos.push(novoProduto);
        return res.status(200).json(`Produto '${desc}' adicionado com sucesso!`);
    }
});


app.put("/produtos/alterar/:id",(req,res)=>{
    const { id } = req.params;
    const { desc, preco, qtd } = req.body;
    let produto = listaProdutos.find(p => p.id == id);
    produto.desc = desc;
    produto.preco = preco;
    produto.qtd = qtd;
    return res.status(200).json("alterado!");
});

app.delete("/produtos/excluir/:id",(req,res)=>{
    let { id } = req.params;
    listaProdutos = listaProdutos.filter(p => p.id != id)
    return res.status(200).json("Deletado!");
});

app.delete("/produtos/excluir-todos", (req, res) => {
    // Limpa a lista de produtos, excluindo todos os produtos
    listaProdutos = [];
    return res.status(200).json("Todos os produtos foram excluídos com sucesso!");
});

app.listen(3000,()=>{
    console.log("api no ar!");
});