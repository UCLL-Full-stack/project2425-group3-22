import { Stat as StatPrisma } from '@prisma/client';

export class Stat {
    private statID: number;
    private statCode: string;
    private name: string;
    private description: string;

    constructor({
        statID,
        statCode,
        name,
        description,
    }: {
        statID: number;
        statCode: string;
        name: string;
        description: string;
    }) {
        this.validate({ statCode, name, description });
        this.statID = statID;
        this.statCode = statCode;
        this.name = name;
        this.description = description;
    }

    getStatID(): number {
        return this.statID;
    }

    getStatCode(): string {
        return this.statCode;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    private validate({
        statCode,
        name,
        description,
    }: {
        statCode: string;
        name: string;
        description: string;
    }) {
        if (!statCode) throw new Error('Stat code is required.');
        if (!name || name.length > 100)
            throw new Error('Name is required and cannot be longer than 100 characters.');
        if (!description || description.length > 100)
            throw new Error('Description is required and cannot be longer than 100 characters.');
    }

    static from({ statID, statCode, name, description }: StatPrisma) {
        return new Stat({
            statID: statID,
            statCode: statCode,
            name: name,
            description: description,
        });
    }
}
