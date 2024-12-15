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

    static from({ statID, statCode, name, description }: StatPrisma) {
        return new Stat({
            statID: statID,
            statCode: statCode,
            name: name,
            description: description,
        });
    }
}
