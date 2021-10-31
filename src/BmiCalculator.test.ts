import { BmiCalculator } from "../src/BmiCalculator"
import { BmiEntity } from "./BmiEntity";


test('simple test"', async () => {
    let entity = new BmiEntity('Male', 55, 180);
    let calc = new BmiCalculator();
    await calc.analyze(entity);

    //console.log('entity', entity);
    expect(entity.Bmi).toBeDefined();
    expect(entity.HealthRisk).toBeDefined();
    expect(entity.Category).toBeDefined();
});

test('A male with 96 kg and 171 height should have "bmi" 32.8 falls into "Moderately obese" category having "Medium Health Risk"', async () => {
    let model = new BmiEntity('Male', 96, 171);
    let calc = new BmiCalculator();
    await calc.analyze(model);
    expect(model.Bmi).toBe(32.8);
    expect(model.Category).toBe("Moderately obese");
    expect(model.HealthRisk).toBe("Medium risk");
});

test('process small json file"', async () => {
    let calc = new BmiCalculator();
    let categoryCount = await calc.processFile('sample-small.json', 'Overweight');
    expect(categoryCount >= 0).toBe(true);
});

xtest('process large json file"', async () => {
    let calc = new BmiCalculator();
    let categoryCount = await calc.processFile('sample-large.json', 'Overweight');
    expect(categoryCount > 0).toBe(true);
});