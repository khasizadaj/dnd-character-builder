export class Die {
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
    dice: Die[];
    description: string[];
    spells: any[];
    modifier: number;

    constructor(name: string, dice: Die[], description: string[], spells: any[], modifier: number) {
        this.name = name;
        this.dice = dice;
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