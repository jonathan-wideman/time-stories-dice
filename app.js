cfg = {
    images: {
        blank: 'images/blank.png',
        skull: 'images/skull.png',
        singleHit: 'images/singleHit.png',
        doubleHit: 'images/doubleHit.png',
    }
}

die = {
    faces: [
        'blank',
        'doubleHit',
        'singleHit',
        'singleHit',
        'skull',
        'skull',
    ]
}

function OnRollButtonClicked() {
    var result = ''
    RollDice(Array(parseInt(numDice.value)).fill({ ...die })).forEach(die => {
        result += outputImage(die)
    })
    pushResult(result)
}

function RollDice(dice) {
    var results = []
    dice.forEach(die => {
        results.push(chooseRandomFrom(die.faces))
    });
    return results
}

function chooseRandomFrom(items) {
    var max = items.length;
    var min = 0;
    return items[Math.floor(Math.random() * (max - min)) + min];
}

function outputImage(name) {
    return '<img class="die" src="' + cfg.images[name] + '">'
}

function pushResult(result) {
    var li = document.createElement("li");
    li.innerHTML = result
    // li.className = 'rollResult'

    if (rolls.firstChild.children != null) {
        ([...rolls.firstChild.children]).forEach(element => {
            element.className = 'die-old'
        })
    }

    rolls.prepend(li);
}