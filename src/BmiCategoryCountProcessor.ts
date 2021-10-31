import { BmiEntity } from "./BmiEntity";
import { IBmiEntityProcessor } from "./IBmiEntityProcessor";

export class BmiCategoryCountProcessor implements IBmiEntityProcessor {
    result: number | 0;
    category: string;
    constructor(category: string) {
        this.category = category;
        this.result = 0;
    }

    async start(): Promise<void> {
    }

    async process(entity: BmiEntity): Promise<void> {

        if (entity.Category.toLowerCase() == this.category.toLowerCase()) {
            this.result++;
        }
    }

    async complete(): Promise<void> {
        console.log(`======= There are ${this.result} '${this.category}'`);
    }
}
