# Nodejs BMI Calculator Coding Challenge
1. Calculate the BMI (Body Mass Index) using Formula 1, BMI Category, and Health risk from Table 1 of the person and add them as 3 new columns

2. Count the total number of overweight people using ranges in the column BMI Category of Table 1, check this is consistent programmatically, 
and add any other observations in the documentation

3. Create build, tests to make sure the code is working as expected and this can be added to an automation build/test/deployment pipeline

Json Data Format:
```json
[{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, { "Gender": "Male", "HeightCm": 161, "WeightKg": 85 }
```

**How to Run Project**
Please follow the steps to run the code

1) npm install
2) npx jest
    2a) To run large file test, please remove "x" from unit test **xtest("process large json file")**

output file is generated in "out" folder.

NOTE: 
* while running jest test with large file, you may see "cannot log after tests are done. did you forget to wait for something async in your test jest"
However, the given file is processed and output file is generated.
This is the message from jest framework because of async/await operations.