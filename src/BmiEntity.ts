import 'reflect-metadata';

export class BmiEntity {
    Gender: string;
    WeightKg: number;
    HeightCm: number;
    Bmi: number;
    Category: string;
    HealthRisk: string | null;

    constructor(g: string, w: number, h: number) {
        this.Gender = g;
        this.WeightKg = w;
        this.HeightCm = h;
    }
}
