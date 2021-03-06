const htmlsource = require("../lib/src/htmlsource.js");

const testdir= __dirname;

describe("test read html content from  file.",() => {
    
    test("check file exist", () => {
        let testfilepath = testdir+"/testfile/a.html";
        
        htmlsource.gethtml(testfilepath).then(function(result){
            expect( result.actionType).toBe(false);
            expect( result.errorMsg).toBe("file not exist.");
        });
    });

    test("read file success", () => {
        let testfilepath = testdir+"/testfile/index.html";
        
        htmlsource.gethtml(testfilepath).then(function(result){
            expect( result.actionType).toBe(true);
            expect( result.dataStr).not.toBe("");
        });
    });

    
});