// const cheerio = require('cheerio');
// const $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /></body></html>');


function checkattr($,tagname,attrname="",attrvalue=""){
    let domArray= $(tagname), count=0;
    if(attrname=="" && attrvalue=="") return domArray.length;    

    domArray.toArray().forEach(element => {
        let attStr="";
        for (let obj  in element.attribs ){
            if (obj.toLowerCase() == attrname.toLowerCase()){
                attStr= element.attribs[obj].toLowerCase();
            }
        }
        if (attStr===null || attStr===undefined || attStr===""){
            count++;
        }else if(attrvalue!=="" && attStr===attrvalue.toLowerCase()){
            count++;
        }
    });
    return count;
}
function checkimg($){
    return  checkattr($,"img","alt");
}

function checka($){
    return  checkattr($,"a","rel");
}

function checkh1($){
    return  checkattr($,"h1") >= 1? true : false;
}
function checkstrong($){
    return  checkattr($,"strong");
}

function checkhead($){

    let meta_descript=checkattr($,"meta","name","descriptions") >= 1? true : false;
    let meta_keyword=checkattr($,"meta","name","keywords") >= 1? true : false;
    let title= checkattr($,"title") >= 1? true : false;

    return {
        title: title,
        meta_keyword:meta_keyword,
        meta_descript:meta_descript
    };
}


function checkExtend($,tagname,attrname,value){
    return custom_check = checkattr($,tagname,attrname,value) >=1 ? true: false;
}

let checkObj={
    checkimg:checkimg,
    checka:checka,
    checkh1:checkh1,
    checkstrong:checkstrong,
    checkhead:checkhead,
    checkExtend:checkExtend
}

module.exports = checkObj;