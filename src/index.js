const characters = [{
    nome: "Mario",
    velocidade: 4,
    manobrabilialidade: 3,
    poder: 3,
    pontos: 0
},
{
    nome: "Peach",
    velocidade: 3,
    manobrabilialidade: 4,
    poder: 2,
    pontos: 0
},
{
    nome: "Yoshi",
    velocidade: 2,
    manobrabilialidade: 4,
    poder: 3,
    pontos: 0
},
{
    nome: "Bowser",
    velocidade: 5,
    manobrabilialidade: 2,
    poder: 5,
    pontos: 0
},
{
    nome: "Luigi",
    velocidade: 3,
    manobrabilialidade: 4,
    poder: 4,
    pontos: 0
},
{
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilialidade: 2,
    poder: 5,
    pontos: 0
}];

async function rollDices() {
    return Math.floor(Math.random() * 6 + 1);
}

async function getRandomBlock() {
    let random = Math.random()
    let result

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

async function logRollResult(character, block, diceResult, totalTestSkill) {
    let atributo = "";
    switch (block) {
        case "RETA":
            atributo = "velocidade";
            break;
        case "CURVA":
            atributo = "manobrabilidade";
            break;
        case "CONFRONTO":
            atributo = "poder";
            break;
    }
    console.log(`${character.nome} rolou um dado de ${atributo}: ${diceResult} + ${character.velocidade} total de ${totalTestSkill}`);
}

async function checkRoundWinner(totalTestSkill1, totalTestSkill2, character1, character2) {
    if (totalTestSkill1 > totalTestSkill2) {
        character1.pontos++;
        console.log(`\n${character1.nome} ganhou 1 ponto!\n-----------------------------------------------`);
    } else if (totalTestSkill2 > totalTestSkill1) {
        character2.pontos++;
        console.log(`\n${character2.nome} ganhou 1 ponto!\n-----------------------------------------------`);
    }
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`rodada ${round}`);

        let block = await getRandomBlock();
        console.log(`bloco: ${block}\n`);

        let diceResult1 = await rollDices();
        let diceResult2 = await rollDices();

        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "RETA") {
            totalTestSkill1 = character1.velocidade + diceResult1;
            totalTestSkill2 = character2.velocidade + diceResult2;

            await logRollResult(character1, block, diceResult1, totalTestSkill1);
            await logRollResult(character2, block, diceResult2, totalTestSkill2);

            await checkRoundWinner(totalTestSkill1, totalTestSkill2, character1, character2);

        } else if (block === "CURVA") {
            totalTestSkill1 = character1.manobrabilialidade + diceResult1;
            totalTestSkill2 = character2.manobrabilialidade + diceResult2;

            await logRollResult(character1, block, diceResult1, totalTestSkill1);
            await logRollResult(character2, block, diceResult2, totalTestSkill2);

            await checkRoundWinner(totalTestSkill1, totalTestSkill2, character1, character2);

        } else if (block === "CONFRONTO") {
            let powerResult1 = character1.poder + diceResult1;
            let powerResult2 = character2.poder + diceResult2;

            console.log(`${character1.nome} confrontou ${character2.nome}`);

            await logRollResult(character1, block, diceResult1, powerResult1);
            await logRollResult(character2, block, diceResult2, powerResult2);

            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                character2.pontos--;
                console.log(`${character2.nome} perdeu 1\n-----------------------------------------------`);
            } else if (powerResult2 > powerResult1 && character1.pontos > 0) {
                character1.pontos--;
                console.log(`${character1.nome} perdeu 1\n-----------------------------------------------`);
            } else if (powerResult1 === powerResult2) {
                console.log("empate no confronto, ninguem perde ponto\n-----------------------------------------------");
            } else {
                console.log("ninguem tem ponto para perder\n-----------------------------------------------");
            }
        }
    }
}



async function declareWinner(character1, character2) {
    console.log("\nFim da corrida!");
    console.log(`${character1.nome} pontos: ${character1.pontos}`);
    console.log(`${character2.nome} pontos: ${character2.pontos}`);

    if (character1.pontos > character2.pontos) {
        console.log(`\n${character1.nome} é o vencedor!`);
    } else if (character2.pontos > character1.pontos) {
        console.log(`\n${character2.nome} é o vencedor!`);
    } else {
        console.log("\nEmpate!");
    }
}

async function chooseCharacter() {
    let player1 = 0
    let player2 = 0
    do {
        player1 = characters[Math.floor(Math.random() * characters.length)];
        player2 = characters[Math.floor(Math.random() * characters.length)];
    } while (player1 === player2);
    return [player1, player2];
}

(async function main() {
    let [player1, player2] = await chooseCharacter();
    console.log(`corrida entre ${player1.nome} e ${player2.nome} começando...\n ${player1}}`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
