import { BmiEntity } from "./BmiEntity";
import { IBmiEntityProcessor } from "./IBmiEntityProcessor";
const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');
const { Writable } = require('stream');

export class BmiCalculator {
    isFinished: boolean;
    constructor() {
        this.isFinished = false;
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

    async processFile(filename: string, processor: IBmiEntityProcessor): Promise<void> {
        let filePath = `./data/${filename}`;
        const fileStream = fs.createReadStream(filePath);
        const jsonStream = StreamArray.withParser();
        let that: BmiCalculator = this;
        await processor.start();

        const processingStream = new Writable({
            write({ key, value }, encoding, callback) {
                setTimeout(() => {
                    that.analyze(value).then(d => { });
                    processor.process(value).then(d => { });
                    // (async () => await that.analyze(value))();
                    // (async () => await processor.process(value))();
                    callback();
                }, 10);
            },
            //Don't skip this, as we need to operate with objects, not buffers
            objectMode: true
        });

        fileStream.pipe(jsonStream.input);
        jsonStream.pipe(processingStream);

        processingStream.on('finish', async () => {
            this.isFinished = true;
        });
    }
}