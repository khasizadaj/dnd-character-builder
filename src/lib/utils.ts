export const calculateAbilityScoreModifier = (score: number) => {
    let result = Math.floor((score - 10) / 2);
    return result;
}

export const getAbilityScore = (ability: string, abilityScores: any[]) => {
    for (const element of abilityScores) {
        if (element.type == ability) {
            return element;
        }
    }
    return null;
};

export const rollDie = (max: number) => {
    let result;
    var randomBytes = new Uint8Array(4);
    crypto.getRandomValues(randomBytes);
    var randomInt =
        (randomBytes[0] << 24) | (randomBytes[1] << 16) | (randomBytes[2] << 8) | randomBytes[3];
    result = Math.floor((Math.abs(randomInt) / 0x7fffffff) * max) + 1;
    return result;
};
