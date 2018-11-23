// const cheerio = require('cheerio');
// const $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /></body></html>');

function imgcheck($){
    let domArray= $("img");
    
    let count=0;
    
    domArray.toArray().forEach(element => {
        let altStr= element.attribs["alt"];
        if (altStr===null || altStr===undefined || altStr===""){
            count++;
        }
    });
    return  count;
}



let checkObj={
    imgcheck:imgcheck
}

module.exports = checkObj;