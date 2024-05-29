const player1 = {
    NAME: "Mario",
    SPEED: 4,
    MANEUVERABILITY: 3,
    POWER: 3,
    POINTS: 0
};

const player2 = {
    NAME: "Luigi",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 4,
    POINTS: 0
};

const player3 = {
    NAME: "Peach",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 2,
    POINTS: 0
};

const player4 = {
    NAME: "Yoshi",
    SPEED: 2,
    MANEUVERABILITY: 4,
    POWER: 3,
    POINTS: 0
};

const player5 = {
    NAME: "Donkey Kong",
    SPEED: 2,
    MANEUVERABILITY: 2,
    POWER: 5,
    POINTS: 0
};

const player6 = {
    NAME: "Bowser",
    SPEED: 5,
    MANEUVERABILITY: 2,
    POWER: 5,
    POINTS: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break
        case random < 0.66:
            result = "Curva"
            break
        default:
            result = "Confronto"
            break
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // Sortear um bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // Rolar os dados
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    // Teste de habilidade
    let totalTestSkill1 = 0
    let totalTestSkill2 = 0

    if(block == "Reta") {
        totalTestSkill1 = diceResult1 + character1.SPEED
        totalTestSkill2 = diceResult2 + character2.SPEED
        await logRollResult(character1.NAME, "Velocidade", diceResult1,
            character1.SPEED)
        await logRollResult(character2.NAME, "Velocidade", diceResult2,
            character2.SPEED)

    } else if(block == "Curva") {
        totalTestSkill1 = diceResult1 + character1.MANEUVERABILITY
        totalTestSkill2 = diceResult2 + character2.MANEUVERABILITY
        await logRollResult(character1.NAME, "Manobrabilidade", diceResult1,
            character1.MANEUVERABILITY)
        await logRollResult(character2.NAME, "Manobrabilidade", diceResult2,
            character2.MANEUVERABILITY)

    } else if(block == "Confronto") {
        let powerResult1 = diceResult1 + character1.POWER
        let powerResult2 = diceResult2 + character2.POWER

        console.log(`${character1.NAME} confrontou com ${character2.NAME}! 🥊`)

        await logRollResult(character1.NAME, "Poder", diceResult1,
            character1.POWER)
        await logRollResult(character2.NAME, "Poder", diceResult2,
            character2.POWER)

        if(powerResult1 > powerResult2 && character2.POINTS > 0) {
            character2.POINTS--
            console.log(`${character1.NAME} venceu o confronto! ${character2.NAME} perdeu 1 ponto 🐢`)
        }

        if(powerResult2 > powerResult1 && character1.POINTS > 0) {
            character1.POINTS--
            console.log(`${character2.NAME} venceu o confronto! ${character1.NAME} perdeu 1 ponto 🐢`)
        }
        
        console.log(powerResult1 == powerResult2 ? 
            `Confronto empatado! Nenhum ponto foi perdido.` : "")
    }

    if(totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NAME} marcou um ponto!`)
        character1.POINTS++
    } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NAME} marcou um ponto!`)
        character2.POINTS++
    }
    
    console.log("------------------------------")

    }
}

async function declareWinner(character1, character2) {
    console.log(`Resultado final: `)
    console.log(`${character1.NAME}: ${character1.POINTS} ponto(s)`)
    console.log(`${character2.NAME}: ${character2.POINTS} ponto(s)`)

    if(character1.POINTS > character2.POINTS) {
        console.log(`\n${character1.NAME} venceu a corrida! Parabéns! 🏆🏎️`)
    } else if(character2.POINTS > character1.POINTS) {
        console.log(`\n${character2.NAME} venceu a corrida! Parabéns! 🏆🏎️`)
    } else {
        console.log(`\nA corrida terminou em empate. ⚖️`)
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player2.NAME} e ${player3.NAME} começando...\n`)
    await playRaceEngine(player2, player3)
    await declareWinner(player2, player3)
})()