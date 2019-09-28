cfg = {
    images: {
        blank: 'images/blank.png',
        skull: 'images/skull.png',
        singleHit: 'images/singleHit.png',
        doubleHit: 'images/doubleHit.png',
        tu1: 'images/tu1.png',
        tu2: 'images/tu2.png',
        tu3: 'images/tu3.png',
        testDie: 'images/singleHit.png',
        timeDie: 'images/tu1.png',
    }
}

testDie = {
    name: 'testDie',
    faces: [
        'blank',
        'doubleHit',
        'singleHit',
        'singleHit',
        'skull',
        'skull',
    ]
}

timeDie = {
    name: 'timeDie',
    faces: [
        'tu1',
        'tu2',
        'tu2',
        'tu2',
        'tu2',
        'tu3',
    ]
}

rollHistoryMax = 20

dieToRoll = testDie
numToRollMax = 6
numToRoll = numToRollMax

shields = {
    white: 7,
    red: 4
}

modes = {
    TEST_DICE: 'test',
    TIME_DIE: 'time',
    WHITE_SHIELDS: 'white_shields',
    RED_SHIELDS: 'red_shields'
}
mode = modes.TEST_DICE

updateControls()
updateShields()

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max))
}



function adjustShields(type, amount) {
    shields[type] = clamp(shields[type] + amount, 0, 15)
    updateShields()
    return shields[type]
}

function updateShields() {
    // --- White Shields ---
    // remove existing shields
    while (shieldListWhite.firstElementChild.className == 'shield-container') {
        shieldListWhite.removeChild(shieldListWhite.firstChild)
    }
    // add current number of shields
    for (let index = 0; index < shields.white; index++) {
        var shield = document.createElement('span')
        shield.className = 'shield-container'
        shield.innerHTML = '<img class="shield" src="images/shield-white.png">'
        shieldListWhite.prepend(shield)
    }
    // update shield count display
    if (shields.white > 0) {
        shieldCountWhite.innerHTML = shields.white
    } else {
        shieldCountWhite.innerHTML = ""
    }

    // --- Red Shields ---
    // remove existing shields
    while (shieldListRed.firstElementChild.className == 'shield-container') {
        shieldListRed.removeChild(shieldListRed.firstChild)
    }
    // add current number of shields
    for (let index = 0; index < shields.red; index++) {
        var shield = document.createElement('span')
        shield.className = 'shield-container'
        shield.innerHTML = '<img class="shield" src="images/shield-red.png">'
        shieldListRed.prepend(shield)
    }
    // update shield count display
    if (shields.red > 0) {
        shieldCountRed.innerHTML = shields.red
    } else {
        shieldCountRed.innerHTML = ""
    }
}

function OnPlusButtonClicked() {
    if (mode == modes.WHITE_SHIELDS) {
        adjustShields('white', 1)
    } else if (mode == modes.RED_SHIELDS) {
        adjustShields('red', 1)
    } else {
        numToRoll = Math.min(numToRoll + 1, numToRollMax)
        updateControls()
    }
}

function OnMinusButtonClicked() {
    if (mode == modes.WHITE_SHIELDS) {
        adjustShields('white', -1)
    } else if (mode == modes.RED_SHIELDS) {
        adjustShields('red', -1)
    } else {
        numToRoll = Math.max(1, numToRoll - 1)
        updateControls()
    }
}

function OnRollButtonClicked() {
    var result = ''
    if (dieToRoll == testDie) {
        RollDice(Array(numToRoll).fill({...dieToRoll })).forEach(dieToRoll => {
            result += outputDie(dieToRoll)
        })
    } else {
        RollDice(Array(1).fill({...dieToRoll })).forEach(dieToRoll => {
            result += outputDie(dieToRoll)
        })
    }
    pushResult(result)
}

function OnTestDieButtonClicked() {
    mode = modes.TEST_DICE
    updateControls()
}

function OnTimeDieButtonClicked() {
    mode = modes.TIME_DIE
    updateControls()
}

function OnWhiteShieldsButtonClicked() {
    mode = modes.WHITE_SHIELDS
    updateControls()
}

function OnRedShieldsButtonClicked() {
    mode = modes.RED_SHIELDS
    updateControls()
}

function RollDice(dice) {
    var results = []
    dice.forEach(die => {
        results.push(chooseRandomFrom(die.faces))
    })
    return results
}

function chooseRandomFrom(items) {
    var max = items.length
    var min = 0
    return items[Math.floor(Math.random() * (max - min)) + min]
}

function outputDie(name, className = 'die') {
    return '<img class="' + className + '" src="' + cfg.images[name] + '">'
}

function pushResult(result) {
    var li = document.createElement("li")
    li.innerHTML = result

    if (rolls.firstChild.children != null) {
        ([...rolls.firstChild.children]).forEach(element => {
            element.className = 'die-old'
        })
    }

    rolls.prepend(li)

    if (rolls.childElementCount > rollHistoryMax) {
        rolls.removeChild(rolls.lastChild)
    }
}

function updateControls() {
    // if (dieToRoll == testDie) {
    //     testDieButtonImage.className = "die-button"
    //     timeDieButtonImage.className = "die-button-inactive"

    //     rollButton.innerHTML = "Roll " + numToRoll

    //     minusButton.removeAttribute("disabled")
    //     plusButton.removeAttribute("disabled")
    // } else {
    //     testDieButtonImage.className = "die-button-inactive"
    //     timeDieButtonImage.className = "die-button"

    //     rollButton.innerHTML = "Roll"

    //     minusButton.setAttribute("disabled", "disabled")
    //     plusButton.setAttribute("disabled", "disabled")
    // }

    switch (mode) {
        case modes.TEST_DICE:

            dieToRoll = testDie

            testDieButtonImage.className = "die-button"
            timeDieButtonImage.className = "die-button-inactive"
            whiteShieldsButtonImage.className = "shield-button-inactive"
            redShieldsButtonImage.className = "shield-button-inactive"

            rollButton.innerHTML = "Roll " + numToRoll

            rollButton.removeAttribute("disabled")
            minusButton.removeAttribute("disabled")
            plusButton.removeAttribute("disabled")

            break

        case modes.TIME_DIE:

            dieToRoll = timeDie

            testDieButtonImage.className = "die-button-inactive"
            timeDieButtonImage.className = "die-button"
            whiteShieldsButtonImage.className = "shield-button-inactive"
            redShieldsButtonImage.className = "shield-button-inactive"

            rollButton.innerHTML = "Roll"

            rollButton.removeAttribute("disabled")
            minusButton.setAttribute("disabled", "disabled")
            plusButton.setAttribute("disabled", "disabled")

            break

        case modes.WHITE_SHIELDS:

            testDieButtonImage.className = "die-button-inactive"
            timeDieButtonImage.className = "die-button-inactive"
            whiteShieldsButtonImage.className = "shield-button"
            redShieldsButtonImage.className = "shield-button-inactive"

            rollButton.innerHTML = "Roll"

            rollButton.setAttribute("disabled", "disabled")
            minusButton.removeAttribute("disabled")
            plusButton.removeAttribute("disabled")

            break

        case modes.RED_SHIELDS:

            testDieButtonImage.className = "die-button-inactive"
            timeDieButtonImage.className = "die-button-inactive"
            whiteShieldsButtonImage.className = "shield-button-inactive"
            redShieldsButtonImage.className = "shield-button"

            rollButton.innerHTML = "Roll"

            rollButton.setAttribute("disabled", "disabled")
            minusButton.removeAttribute("disabled")
            plusButton.removeAttribute("disabled")

            break
    }
}