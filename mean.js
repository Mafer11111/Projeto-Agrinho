const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameState = "menu";

let pontos = 0;
let tempo = 60;
let fase = 1;

const keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;
});

document.addEventListener("keyup", (e)=>{
    keys[e.key] = false;
});

canvas.addEventListener("click", iniciarJogo);

class Jogador{
    constructor(){
        this.x = 100;
        this.y = 300;
        this.w = 50;
        this.h = 50;
        this.speed = 5;
        this.color = "green";
    }

    update(){

        if(keys["ArrowUp"]) this.y -= this.speed;
        if(keys["ArrowDown"]) this.y += this.speed;
        if(keys["ArrowLeft"]) this.x -= this.speed;
        if(keys["ArrowRight"]) this.x += this.speed;

        if(this.x < 0) this.x = 0;
        if(this.y < 0) this.y = 0;

        if(this.x + this.w > canvas.width){
            this.x = canvas.width - this.w;
        }

        if(this.y + this.h > canvas.height){
            this.y = canvas.height - this.h;
        }
    }

    draw(){

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("🧑", this.x + 10, this.y + 32);
    }
}

class Item{

    constructor(tipo){

        this.tipo = tipo;

        this.x = Math.random() * (canvas.width - 40);
        this.y = Math.random() * (canvas.height - 40);

        this.w = 40;
        this.h = 40;

        if(tipo === "lixo"){
            this.color = "gray";
            this.emoji = "🗑️";
        }

        if(tipo === "fogo"){
            this.color = "red";
            this.emoji = "🔥";
        }

        if(tipo === "agua"){
            this.color = "blue";
            this.emoji = "🚰";
        }

        if(tipo === "arvore"){
            this.color = "green";
            this.emoji = "🌳";
        }
    }

    draw(){

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";

        ctx.fillText(this.emoji, this.x + 5, this.y + 28);
    }
}

const jogador = new Jogador();

let itens = [];

function criarItens(){

    itens = [];

    if(fase === 1){

        for(let i = 0; i < 8; i++){
            itens.push(new Item("lixo"));
        }
    }

    if(fase === 2){

        for(let i = 0; i < 8; i++){
            itens.push(new Item("fogo"));
        }
    }

    if(fase === 3){

        for(let i = 0; i < 8; i++){
            itens.push(new Item("agua"));
        }
    }

    if(fase === 4){

        for(let i = 0; i < 8; i++){
            itens.push(new Item("arvore"));
        }
    }
}

function colisao(a, b){

    return(
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function atualizar(){

    jogador.update();

    for(let i = itens.length - 1; i >= 0; i--){

        if(colisao(jogador, itens[i])){

            if(itens[i].tipo === "lixo"){
                pontos += 10;
            }

            if(itens[i].tipo === "fogo"){
                pontos += 20;
            }

            if(itens[i].tipo === "agua"){
                pontos += 15;
            }

            if(itens[i].tipo === "arvore"){
                pontos += 25;
            }

            itens.splice(i,1);
        }
    }

    if(itens.length === 0){

        fase++;

        if(fase > 4){

            gameState = "fim";

        }else{

            criarItens();
        }
    }
}

function desenharHUD(){

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1000,50);

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";

    ctx.fillText("Pontos: " + pontos, 20, 32);
    ctx.fillText("Tempo: " + tempo, 250, 32);
    ctx.fillText("Fase: " + fase, 450, 32);

    let textoFase = "";

    if(fase === 1){
        textoFase = "Recicle o lixo";
    }

    if(fase === 2){
        textoFase = "Apague as queimadas";
    }

    if(fase === 3){
        textoFase = "Economize água";
    }

    if(fase === 4){
        textoFase = "Plante árvores";
    }

    ctx.fillText(textoFase, 650, 32);
}

function desenhar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(gameState === "menu"){

        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle = "white";

        ctx.font = "60px Arial";
        ctx.fillText("🌎 ECO HERO 🌎", 250, 180);

        ctx.font = "30px Arial";

        ctx.fillText("Recicle lixo", 390, 280);
        ctx.fillText("Apague queimadas", 330, 330);
        ctx.fillText("Economize água", 350, 380);
        ctx.fillText("Plante árvores", 370, 430);

        ctx.font = "28px Arial";
        ctx.fillText("Clique para começar", 350, 520);
    }

    if(gameState === "jogando"){

        if(fase === 1){
            ctx.fillStyle = "#B3E5FC";
        }

        if(fase === 2){
            ctx.fillStyle = "#FFCC80";
        }

        if(fase === 3){
            ctx.fillStyle = "#81D4FA";
        }

        if(fase === 4){
            ctx.fillStyle = "#A5D6A7";
        }

        ctx.fillRect(0,0,canvas.width,canvas.height);

        jogador.draw();

        itens.forEach(item => {
            item.draw();
        });

        desenharHUD();

        atualizar();
    }

    if(gameState === "fim"){

        ctx.fillStyle = "#222";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle = "white";

        ctx.font = "60px Arial";
        ctx.fillText("PARABÉNS!", 320, 180);

        ctx.font = "35px Arial";
        ctx.fillText("Você salvou o planeta 🌱", 280, 280);

        ctx.fillText("Pontuação Final: " + pontos, 300, 360);

        ctx.font = "28px Arial";
        ctx.fillText("Atualize a página para jogar novamente", 210, 470);
    }

    requestAnimationFrame(desenhar);
}

function iniciarJogo(){

    if(gameState === "menu"){

        gameState = "jogando";

        criarItens();
    }
}

setInterval(()=>{

    if(gameState === "jogando"){

        tempo--;

        if(tempo <= 0){

            gameState = "fim";
        }
    }

},1000);

desenhar();