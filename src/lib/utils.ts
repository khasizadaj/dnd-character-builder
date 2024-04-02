export const calculateAbilityScoreModifier = (score: number) => {
    let result = Math.floor((score - 10) / 2);
    return result;
}