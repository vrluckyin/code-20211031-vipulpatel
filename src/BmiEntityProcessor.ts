import { BmiEntity } from "./BmiEntity";
import { IBmiEntityProcessor } from "./IBmiEntityProcessor";
import { promises } from "fs";
const { appendFile } = promises;
const fs = require('fs');

export class BmiEntityProcessor implements IBmiEntityProcessor {
    result: number | 0;
    private readonly outFilePath: string;
    constructor() {
        this.result = 0;
        let uniqueFileName = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.outFilePath = `./data/out-${uniqueFileName}.json`;
    }

    async start(): Promise<void> {
        if (fs.existsSync(this.outFilePath)) {
            fs.unlinkSync(this.outFilePath);
        }
        await appendFile(
            this.outFilePath, "["
        );
    }

    async process(entity: BmiEntity): Promise<void> {
        let data = JSON.stringify(entity) + ',\r\n';
        this.result++;
        await appendFile(
            this.outFilePath, data
        );
    }

    async complete(): Promise<void> {
        await appendFile(
            this.outFilePath, "{}]"
        );
        console.log(`======= Processed Objects: ${this.result}`);
    }
}
