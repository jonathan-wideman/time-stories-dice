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
updateControls()

function OnPlusButtonClicked() {
    numToRoll = Math.min(numToRoll + 1, numToRollMax)
        // console.log(numToRoll)
    updateControls()
}

function OnMinusButtonClicked() {
    numToRoll = Math.max(1, numToRoll - 1)
        // console.log(numToRoll)
    updateControls()
}

function OnRollButtonClicked() {
    var result = ''
        // RollDice(Array(parseInt(numDice.value)).fill({...dieToRoll })).forEach(dieToRoll => {
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
    dieToRoll = testDie
    updateControls()
}

function OnTimeDieButtonClicked() {
    dieToRoll = timeDie
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
        // li.className = 'rollResult'

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
    if (dieToRoll == testDie) {
        testDieButtonImage.className = "die-button"
        timeDieButtonImage.className = "die-button-inactive"

        rollButton.innerHTML = "Roll " + numToRoll

        minusButton.removeAttribute("disabled")
        plusButton.removeAttribute("disabled")
    } else {
        testDieButtonImage.className = "die-button-inactive"
        timeDieButtonImage.className = "die-button"

        rollButton.innerHTML = "Roll"

        minusButton.setAttribute("disabled", "disabled")
        plusButton.setAttribute("disabled", "disabled")
    }
}