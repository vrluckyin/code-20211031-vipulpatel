Please follow the steps to run the code


1) npm install
2) npx jest
    2a) To run large file test, please remove "x" from unit test **xtest("process large json file")**

output file is generated in "out" folder.

NOTE: 
* while running jest test with large file, you may see "cannot log after tests are done. did you forget to wait for something async in your test jest"
However, the given file is processed and output file is generated.
This is the message from jest framework because of async/await operations.