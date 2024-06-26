export class Dice {
    count: number;
    type: number;
    damage: string;

    constructor(count: number, type: number, damage: string) {
        this.count = count;
        this.type = type;
        this.damage = damage;
    }
}

export class WeaponInfo {
    name: string;
    dice: Dice[];
    attackAbility: string;
    description: string[];
    spells: any[];
    modifier: number;

    constructor(name: string, dice: Dice[], attackAbility: string, description: string[], spells: any[], modifier: number) {
        this.name = name;
        this.dice = dice;
        this.attackAbility = attackAbility;
        this.description = description;
        this.spells = spells;
        this.modifier = modifier;
    }
}

export class AttackModifiers {
    proficiency: number;
    ability: number;

    constructor(proficiency: number, ability: number) {
        this.proficiency = proficiency;
        this.ability = ability;
    }
}

export class AbilityScore {
    type: string;
    score: number;
    proficient: boolean;

    constructor(type: string, score: number, proficient: boolean) {
        this.type = type;
        this.score = score;
        this.proficient = proficient;
    }
}

export class AttackResult {
    roll: number;
    weaponModifier: number;
    proficiencyBonus: number;
    abilityModifier: number;

    constructor(
        roll: number,
        weaponModifier: number,
        proficiencyBonus: number,
        abilityModifier: number
    ) {
        this.roll = roll;
        this.weaponModifier = weaponModifier;
        this.proficiencyBonus = proficiencyBonus;
        this.abilityModifier = abilityModifier;
    }

    total = () => {
        return this.roll + this.weaponModifier + this.abilityModifier + this.proficiencyBonus;
    };
}

export interface Config {
    auth: boolean;
}