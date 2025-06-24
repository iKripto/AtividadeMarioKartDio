const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function RollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function GetRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;

    case random < 0.66:
      result = "CURVA";
      break;

    default:
      result = "CONFRONTO";
      break;
  }
  return result;
}

async function LogRollResult(CharacterName, block, DiceResult, Attribute) {
  console.log(
    `${CharacterName} sorteou um dado de ${block}: ${DiceResult} + ${Attribute} = ${
      DiceResult + Attribute
    }`
  );
}

async function playRaceEngine() {
  for (let round = 1; round <= 5; round++) {
    console.log(`Rodada: ${round}`);

    // Sortear blocos:
    let block = await GetRandomBlock();
    console.log(`O bloco sorteado foi: ${block}`);

    // Rolar os dados:
    let DiceResult1 = await RollDice();
    let DiceResult2 = await RollDice();

    // Teste de habilidade:
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;
    if (block === "RETA") {
      TotalTestSkill1 = DiceResult1 + player1.VELOCIDADE;
      TotalTestSkill2 = DiceResult2 + player2.VELOCIDADE;
      await LogRollResult(
        player1.NOME,
        "VELOCIDADE",
        DiceResult1,
        player1.VELOCIDADE
      );
      await LogRollResult(
        player2.NOME,
        "VELOCIDADE",
        DiceResult2,
        player2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      TotalTestSkill1 = DiceResult1 + player1.MANOBRABILIDADE;
      TotalTestSkill2 = DiceResult2 + player2.MANOBRABILIDADE;
      await LogRollResult(
        player1.NOME,
        "MANOBRABIBLIDADE",
        DiceResult1,
        player1.MANOBRABILIDADE
      );
      await LogRollResult(
        player2.NOME,
        "MANOBRABIBLIDADE",
        DiceResult2,
        player2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let PowerResult1 = DiceResult1 + player1.PODER;
      let PowerResult2 = DiceResult2 + player2.PODER;

      console.log(`${player1.NOME} confrontou ${player2.NOME}! 🥊`);

      await LogRollResult(player1.NOME, "PODER", DiceResult1, player1.PODER);

      await LogRollResult(player2.NOME, "PODER", DiceResult2, player2.PODER);

      // If Ternario:
      // É possível fazer assim:
      // player2.PONTOS -=
      // PowerResult1 > PowerResult2 &&(and) player2.PONTOS > 0 ? 1 : 0;

      // If Combinado:
      // (PowerResult1 > PowerResult2 &&(and) player2.PONTOS > 0){
      //  player2.PONTOS--
      // }

      if (PowerResult1 > PowerResult2) {
        if (player2.PONTOS > 0) {
          player2.PONTOS--;
          console.log(
            `${player1.NOME} Venceu o confronto! ${player2.NOME} perdeu 1 ponto!`
          );
        }
      }
      if (PowerResult2 > PowerResult1) {
        if (player1.PONTOS > 0) {
          player1.PONTOS--;
          console.log(
            `${player2.NOME} Venceu o confronto! ${player1.NOME} perdeu 1 ponto!`
          );
        }
      } else {
        console.log("Confronto empatado. Ninguém perdeu ponto!");
      }
    }

    // Verifica o vencedor.
    if (TotalTestSkill1 > TotalTestSkill2) {
      console.log(`${player1.NOME} marcou um ponto!`);
      player1.PONTOS++;
    } else if (TotalTestSkill1 < TotalTestSkill2) {
      console.log(`${player2.NOME} marcou um ponto!`);
      player2.PONTOS++;
    }
    console.log("----------------------------------");
  }
}

async function DeclareWinner(char1, char2) {
  console.log("🏁 Resultado Final:");
  console.log(`${player1.NOME}: ${player1.PONTOS} ponto(s)!`);
  console.log(`${player2.NOME}: ${player2.PONTOS} ponto(s)!`);

  if (player1.PONTOS > player2.PONTOS) {
    console.log(`\n ${player1.NOME} Venceu a corrida! Parabéns!`);
  } else if (player2.PONTOS > player1.PONTOS) {
    console.log(`\n ${player2.NOME} Venceu a corrida! Parabéns!`);
  } else {
    console.log(`\n Houve um empate!`);
  }
}

(async function main() {
  console.log(
    `🏁 A corrida entre ${player1.NOME} e ${player2.NOME} está começando!🏁 \n`
  );
  await playRaceEngine();
  await DeclareWinner();
})();
// Fazemos uma função autoinvocada. É como se declarassemos e logo em seguida chamassemos ela.
