
function checkattr($,tagname,attrname="",attrvalue=""){
    let domArray= $(tagname), count=0;
    if(attrname=="" && attrvalue=="") return domArray.length;    

    domArray.toArray().forEach(element => {
        let attStr="",attrValue="";
        for (let obj  in element.attribs ){
            if (obj.toLowerCase() == attrname.toLowerCase()){
                attStr=obj.toLowerCase();
                attrValue= element.attribs[obj].toLowerCase();
            }
        }
        if (attStr===null || attStr===undefined || attStr===""){
            count++;
        }else if(attStr!=="" && attrvalue=="" && attrValue===attrvalue.toLowerCase()){
            count++;
        }
    });
    return count;
}


function checkattrValue($,tagname,attrname,attrvalue){
    let domArray= $(tagname), count=0

    domArray.toArray().forEach(element => {
        let attrValue="";
        for (let obj  in element.attribs ){
            if (obj.toLowerCase() == attrname.toLowerCase()){
                attrValue= element.attribs[obj].toLowerCase();

                if(attrValue===attrvalue.toLowerCase()){
                    count++;
                }
            }
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

    let meta_descript=checkattrValue($,"meta","name","descriptions") >= 1? true : false;
    let meta_keyword=checkattrValue($,"meta","name","keywords") >= 1? true : false;
    let title= checkattr($,"title") >= 1? true : false;

    return {
        title: title,
        meta_keyword:meta_keyword,
        meta_descript:meta_descript
    };
}


function checkExtend($,tagname,attrname,value){
    if (tagname!="" && attrname=="" && value=="") return checkattr($,tagname) >= 1? true : false;
    if (tagname!="" && attrname!="" && value=="") return checkattr($,tagname,attrname);
    return custom_check = checkattrValue($,tagname,attrname,value) >=1 ? true: false;
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