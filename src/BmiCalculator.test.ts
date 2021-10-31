import { BmiCalculator } from "../src/BmiCalculator"
import { BmiCategoryCountProcessor } from "./BmiCategoryCountProcessor";
import { BmiEntity } from "./BmiEntity";
import { BmiEntityProcessor } from "./BmiEntityProcessor";


test('simple test"', async () => {
    let entity = new BmiEntity('Male', 55, 180);
    let calc = new BmiCalculator();
    await calc.analyze(entity);

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

test('process small json file and output will be saved as json in "out" folder', async () => {
    let calc = new BmiCalculator();
    let processor = new BmiEntityProcessor();
    await calc.processFile('sample-small.json', processor);
    expect(processor.result >= 0).toBe(true);
});


test('process small json file to find out "Overweight" peoeple', done => {
    let calc = new BmiCalculator();
    let processor = new BmiCategoryCountProcessor("Overweight");
    calc.processFile('sample-small.json', processor).then(data => {
        try {
            expect(processor.result >= 0).toBe(true);
            done();

        } catch (error) {
            done(error);
        }
    });

});

xtest('process large json file and output will be saved as json in "out" folder', async () => {
    let calc = new BmiCalculator();
    let processor = new BmiEntityProcessor();
    await calc.processFile('sample-large.json', processor);
    expect(processor.result >= 0).toBe(true);
});


xtest('process large json file to find out "Overweight" peoeple', async () => {
    let calc = new BmiCalculator();
    let processor = new BmiCategoryCountProcessor("Overweight");
    await calc.processFile('sample-large.json', processor);
    expect(processor.result >= 0).toBe(true);
});