const report = require("../lib/src/report.js");
const fs = require('fs');
const testdir= __dirname;

describe("test msg of IsNothasArribute.",() => {

    test("IsNothasArribute - check 1 img  ",() => {
        expect(  report.IsNothasArribute(1,"img","alt")).toBe("There are 1 <img> without alt attribute.");
    });

    test("IsNothasArribute - check 0 img ",() => {
        expect(  report.IsNothasArribute(0,"img","alt")).toBe("The <img> tag alt attribute is pass.");
    });

});



describe("test msg of IsNotExistTag.",() => {

    test("IsNotExistTag - check exist h1 tag  ",() => {
        expect(  report.IsNotExistTag(true,"h1")).toBe("This HTML have <h1> tag.");
    });

    test("IsNotExistTag - check not exist h1 tag ",() => {
        expect(  report.IsNotExistTag(false,"h1")).toBe("This HTML not has <h1> tag.");
    });

});



describe("test msg of IsExistMoreThanOneTag.",() => {

    test("IsExistMoreThanOneTag - check 15 strong",() => {
        expect(  report.IsExistMoreThanOneTag(true,"strong",15)).toBe("This HTML have more than 15 <strong> tag.");
    });

    test("IsExistMoreThanOneTag - check 0 img ",() => {
        expect(  report.IsExistMoreThanOneTag(false,"strong",15)).toBe("This HTML haven't more than 15 <strong> tag.");
    });

});


describe("test msg of IsheadContentCheck.",() => {

    test("IsheadContentCheck - check title, meta-keywords, meta-descriptions - exist",() => {
        expect(  report.IsheadContentCheck({
            title: true,
            meta_keyword: true,
            meta_descriptions:true
        })).toBe(`This head have <title> tag.
    This head have <meta name='descriptions'> tag.
    This head have <meta name='keyword'> tag.`);
    });

    test("IsheadContentCheck - check title, meta-keywords, meta-descriptions -  not exist ",() => {
        expect(  report.IsheadContentCheck({
            title: false,
            meta_keyword: false,
            meta_descriptions:false
        })).toBe(`This head haven't <title> tag.
    This head haven't <meta name='descriptions'> tag.
    This head haven't <meta name='keyword'> tag.`);
    });

});

describe("test custom check msg of IsExistExtendChecklog", ()=>{

    test("Exist , output tagname,attributekey,attrvalue",()=>{
        expect(report.IsExistExtendChecklog(true,"input","id","input1")).toBe("This HTML have input tag attribute key=id value=input1.");
    });

    test("Not Exist output tagname,attributekey,attrvalue",()=>{
        expect(report.IsExistExtendChecklog(false,"input","id","input1")).toBe("This HTML haven't input tag attribute key=id value=input1.");
    });

    test("Not Exist output tagname,attributekey",()=>{
        expect(report.IsExistExtendChecklog(false,"input","id","")).toBe("This HTML haven't input tag attribute key=id.");
    });

    test("Not Exist output tagname",()=>{
        expect(report.IsExistExtendChecklog(false,"input","","")).toBe("This HTML haven't input tag.");
    });

});

describe("test report save",() => {

    test("Save Report Success" ,() =>{

        if(fs.existsSync(testdir+"/testfile/"+"test.log")==true){
            fs.unlinkSync(testdir+"/testfile/"+"test.log");
        }

        let htmlcontent="This HTML haven't more than 15 <strong> tag.";
        report.savelog(testdir+"/testfile/","test.log",htmlcontent,()=>{
            expect(fs.existsSync(testdir+"/testfile/"+"test.log")).toBe(true);
        });
    });

});