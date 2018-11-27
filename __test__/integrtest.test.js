const seo_check = require("../index");

const testdir= __dirname;
const fs = require("fs");

seo_check.ExtendRule({tagname:"h2",ruleName:"checkh2"});
seo_check.ExtendRule({tagname:"meta",ruleName:"checkMetaAttrRobots",attrname:"name",attrvalue:"robots"});

let seoObj= new seo_check({maxStrongTagCount:5});
// let path =testdir+"/testfile/index.html";


describe("Integrtest test index.html",() => {

    test("log content test pass" ,() =>{
        
        let path =testdir+"/testfile/index.html";
        let filepath=testdir+"/testfile/";
        let filename="a.log";

        seoObj.loadHtmlContent(path,seo_check.fileType.FILE).then(()=>{

            seoObj.checka().checkh2().checkh1().checkimg().checkstrong().checkhead().checkMetaAttrRobots().GenerateReport(seo_check.fileType.FILE,filepath,filename).then(() =>{
            
                fs.readFile(filepath+filename,'UTF-8' ,function (err, data) {
                    if (err) throw err;
                    
                    let wordArray = [
                        "There are 3 <img> without alt attribute.",
                        "There are 2 <a> without rel attribute.",
                        "This head have <title> tag.",
                        "This head haven't <meta name='descriptions'> tag.",
                        "This head have <meta name='keyword'> tag.",
                        "This HTML haven't more than 5 <strong> tag.",
                        "This HTML haven't more than 1 <h1> tag.",
                        "This HTML not has <h2> tag.",
                        "This HTML have meta tag attribute key=name value=robots."
                    ];
                    for(let i = 0 ;i<wordArray.length; i++){
                        expect(data.toString().indexOf(wordArray[i])>=-1).toEqual(true);
                    }
                });

            });
            
        });

    });

});


describe("Integrtest test neg.html",() => {

    test("log content test pass" ,() =>{
        
        let path =testdir+"/testfile/neg.html";
        let filepath=testdir+"/testfile/";
        let filename="neg.log";

        seoObj.loadHtmlContent(path,seo_check.fileType.STREAM).then(()=>{
            seoObj.checka().checkh2().checkh1().checkimg().checkstrong().checkhead().checkMetaAttrRobots().GenerateReport(seo_check.fileType.STREAM,filepath,filename).then(() =>{
            
                fs.readFile(filepath+filename,'UTF-8' ,function (err, data) {
                    if (err) throw err;
                    
                    let wordArray = [
                        "There are 15 <img> without alt attribute.",
                        "There are 128 <a> without rel attribute.",
                        "This head haven't <title> tag.",
                        "This head haven't <meta name='descriptions'> tag.",
                        "This head haven't <meta name='keyword'> tag.",
                        "This HTML haven't more than 5 <strong> tag.",
                        "This HTML haven't more than 1 <h1> tag.",
                        "This HTML have <h2> tag.",
                        "This HTML haven't meta tag attribute key=name value=robots."
                    ];

                    for(let i = 0 ;i<wordArray.length; i++){
                        expect(data.toString().indexOf(wordArray[i])>=-1).toEqual(true);
                    }
                });

            });
        });
    });

});


describe("Integrtest test pos.html",() => {

    test("log content test pass" ,() =>{
        
        let path =testdir+"/testfile/pos.html";
        let filepath=testdir+"/testfile/";
        let filename="pos.log";

        seoObj.loadHtmlContent(path,seo_check.fileType.FILE).then(()=>{
            seoObj.checka().checkh2().checkh1().checkimg().checkstrong().checkhead().checkMetaAttrRobots().GenerateReport(seo_check.fileType.FILE,filepath,filename).then(() =>{
            
                fs.readFile(filepath+filename,'UTF-8' ,function (err, data) {
                    if (err) throw err;
                    
                    let wordArray = [
                        "The <img> tag alt attribute is pass.",
                        "The <a> tag rel attribute is pass.",
                        "This head have <title> tag.",
                        "This head have <meta name='description'> tag.",
                        "This head have <meta name='keyword'> tag.",
                        "This HTML haven't more than 5 <strong> tag.",
                        "This HTML have more than 1 <h1> tag.",
                        "This HTML have <h2> tag.",
                        "This HTML have meta tag attribute key=name value=robots."
                    ];

                    for(let i = 0 ;i<wordArray.length; i++){
                        expect(data.toString().indexOf(wordArray[i])>=-1).toEqual(true);
                    }
                });

            });
        });
    });

});