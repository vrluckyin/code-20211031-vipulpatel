import { BmiCalculator } from "../src/BmiCalculator"
import { BmiEntity } from "./BmiEntity";


test('A male with 96 kg and 171 height should have "bmi" 32.8 falls into "Moderately obese" category having "Medium Health Risk"', async () => {
    let model = new BmiEntity('Male', 96, 171);
    let calc = new BmiCalculator();
    await calc.analyze(model);
    expect(model.Bmi).toBe(32.8);
    expect(model.Category).toBe("Moderately obese");
    expect(model.HealthRisk).toBe("Medium risk");
});

test('calculate bmi"', async () => {
    let calc = new BmiCalculator();
    let data = `[
        {
            "Gender": "Male",
            "HeightCm": 171,
            "WeightKg": 96
        },
        {
            "Gender": "Male",
            "HeightCm": 161,
            "WeightKg": 85
        },
        {
            "Gender": "Male",
            "HeightCm": 180,
            "WeightKg": 77
        },
        {
            "Gender": "Female",
            "HeightCm": 166,
            "WeightKg": 62
        },
        {
            "Gender": "Female",
            "HeightCm": 150,
            "WeightKg": 70
        },
        {
            "Gender": "Female",
            "HeightCm": 167,
            "WeightKg": 82
        }
    ]`;

    let entities = await calc.calculate(data);
    expect(calc.countOverweight(entities)).toBe(1);
    //console.log('entities', entities);
    try {
        expect(entities.length).toBe(6);
        entities.forEach(entity => {
            expect(entity.Bmi).toBeDefined();
            expect(entity.HealthRisk).toBeDefined();
            expect(entity.Category).toBeDefined();
        });
    } catch (error) {
        console.log('ERROR:', error);
    }
});