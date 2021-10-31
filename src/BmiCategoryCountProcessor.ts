import { BmiEntity } from "./BmiEntity";
import { IBmiEntityProcessor } from "./IBmiEntityProcessor";

export class BmiCategoryCountProcessor implements IBmiEntityProcessor {
    result: number;
    category: string;
    constructor(category: string) {
        this.category = category;
    }

    async start(): Promise<void> {
        this.result = 0;
    }

    async process(entity: BmiEntity): Promise<void> {

        if (entity.Category.toLowerCase() == this.category.toLowerCase()) {
            this.result++;
        }
    }

    async complete(): Promise<void> {
    }
}
