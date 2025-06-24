const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function rolldice () {
    return Math.floor(Math.random() * 6) + 1;   
}

(async function main () {
    console.log("🏁 A corrida está começando! \n🏁")
    console.log("")
})();
// Fazemos uma função autoinvocada. É como se declarassemos e logo em seguida chamassemos ela.