import { BmiEntity } from "./BmiEntity";

export interface IBmiEntityProcessor {
    result: number;
    start(): Promise<void>
    process(entity: BmiEntity): Promise<void>;
    complete(): Promise<any>;
}
