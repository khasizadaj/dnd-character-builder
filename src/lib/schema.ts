import Ajv from 'ajv';

export const schemaValidator = new Ajv();

export const characterSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        class: { type: 'string' },
        level: { type: 'integer' },
        race: { type: 'string' },
        gender: { type: 'string' },
        abilityScores: {
            type: 'array',
            maxItems: 6,
            minItems: 6,
            items: {
                type: 'object',
                properties: {
                    type: { type: 'string' },
                    score: { type: 'integer' },
                    proficient: { type: 'boolean' }
                },
                required: ['type', 'score', 'proficient']
            }
        },
        weapons: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    dice: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                count: { type: 'integer' },
                                type: { type: 'integer' },
                                damage: { type: 'string' }
                            },
                            required: ['count', 'type', 'damage']
                        }
                    },
                    attackAbility: { type: 'string' }
                },
                required: ['name', 'dice', 'attackAbility', 'modifier']
            }
        },
        feature_sources: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    type: { type: 'string' },
                    title: { type: 'string' },
                    features: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                acccessedLevel: { type: 'number', minimum: 1 },
                                description: {
                                    type: 'array',
                                    items: {
                                        type: 'string'
                                    }
                                }
                            },
                            required: ['title', 'accessedLevel', 'description']
                        }
                    }
                }
            }
        }
    },
    required: ['name', 'class', 'level', 'abilityScores', 'weapons'],
    additionalProperties: true
};