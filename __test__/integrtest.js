const seo_check = require("../index");

const testdir= __dirname;




// maxStrongTagCount
seo_check.ExtendRule({tagname:"h2",ruleName:"checkh2"});
seo_check.ExtendRule({tagname:"meta",ruleName:"checkMetaAttrRobots",attrname:"name",attrvalue:"robots"});

let seoObj= new seo_check({maxStrongTagCount:5});
let path =testdir+"/testfile/index.html";



seoObj.loadFile(path);

seoObj.checka().checkh2().checkh1().checkimg().checkstrong().checkhead().checkMetaAttrRobots();

console.log(seoObj.getReoprt());
console.log(seoObj.getSetting());


