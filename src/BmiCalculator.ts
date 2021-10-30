import { deserializeArray } from 'class-transformer';
import { BmiEntity } from "./BmiEntity";

export class BmiCalculator {
    constructor() {
    }

    async analyze(model: BmiEntity): Promise<void> {
        model.Bmi = parseFloat((model.WeightKg / Math.pow(model.HeightCm / 100, 2)).toFixed(1));

        if (model.Bmi <= 18.4) {
            model.Category = "Underweight";
            model.Category = "Malnutrition risk";
        } else if (model.Bmi >= 18.5 && model.Bmi <= 24.9) {
            model.Category = "Normal weight";
            model.HealthRisk = "Low risk";
        } else if (model.Bmi >= 25 && model.Bmi <= 29.9) {
            model.Category = "Overweight";
            model.HealthRisk = "Enhanced risk";
        } else if (model.Bmi >= 30 && model.Bmi <= 34.9) {
            model.Category = "Moderately obese";
            model.HealthRisk = "Medium risk";
        }
        else if (model.Bmi >= 35 && model.Bmi <= 39.9) {
            model.Category = "Severely obese";
            model.HealthRisk = "High risk";
        }
        else {
            model.Category = "Very severely obese";
            model.HealthRisk = "Very high risk";
        }
        return;
    }

    async calculate(data: string): Promise<BmiEntity[]>;
    async calculate(data: BmiEntity[] | string): Promise<BmiEntity[]> {
        let entities: BmiEntity[];
        if (typeof data === 'string') {
            entities = deserializeArray(BmiEntity, data);
        }
        else {
            entities = data;
        }
        entities.forEach((item) => {
            this.analyze(item);
        });

        return entities;
    }

    countOverweight(data: BmiEntity[]): number {
        return this.countByCategory(data, 'Overweight');
    }

    private countByCategory(data: BmiEntity[], category: string): number {
        return data.filter(x => x.Category.toLowerCase() === category.toLowerCase()).length;
    }
}