// const cheerio = require('cheerio');
// const $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /></body></html>');


function checkattr($,tagname,attrname){
    let domArray= $(tagname), count=0;
    domArray.toArray().forEach(element => {
        let attStr= element.attribs[attrname];
        if (attStr===null || attStr===undefined || attStr===""){
            count++;
        }
    });
    return count;
}
function imgcheck($){
    return  checkattr($,"img","alt");
}

function acheck($){
    return  checkattr($,"a","rel");
}


let checkObj={
    imgcheck:imgcheck,
    acheck:acheck
}

module.exports = checkObj;