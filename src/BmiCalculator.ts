import { BmiEntity } from "./BmiEntity";
import { promises } from "fs";
const { appendFile } = promises;
const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');

export class BmiCalculator {
    constructor() {
    }

    async analyze(model: BmiEntity): Promise<void> {
        model.Bmi = parseFloat((model.WeightKg / Math.pow(model.HeightCm / 100, 2)).toFixed(1));

        if (model.Bmi <= 18.4) {
            model.Category = "Underweight";
            model.HealthRisk = "Malnutrition risk";
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

    async processFile(filename: string, category: string): Promise<number> {
        let filePath = `./data/${filename}`;
        let outfilePath = `./data/out-${filename}`;

        if (fs.existsSync(outfilePath)) {
            fs.unlinkSync(outfilePath);
        }

        await appendFile(
            outfilePath, "["
        );
        const jsonStream = StreamArray.withParser();
        const fileStream = fs.createReadStream(filePath).pipe(jsonStream.input);
        let categoryCounter: number = 0;

        jsonStream.on('data', async ({ key, value }) => {
            await this.analyze(value);
            if (value.Category.toLowerCase() == category.toLowerCase()) {
                categoryCounter++;
            }
            let data = JSON.stringify(value) + ',\r\n';
            await appendFile(
                outfilePath, data
            );
            console.log(key, data);
        });

        jsonStream.on('end', async () => {
            await appendFile(
                outfilePath, "{}]"
            );
        });

        return Promise.resolve(categoryCounter);

    }
}