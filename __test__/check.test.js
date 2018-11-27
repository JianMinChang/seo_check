const cheerio = require('cheerio');
const check = require("../lib/src/check.js");


describe("check html content  img tag has attr alt. ",() => {
    
    test("1 img not has alt attr and value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><Img id="img2" aLt="bg2.png" sRc="images/bg2.png" /></body></html>');
        expect( check.checkimg($)).toBe(1);
    });

    test("1 img  has alt attr but no value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img2" alt="bg2.png" src="images/bg2.png" /><img id="img2" Alt="" src="images/bg2.png" /></body></html>');
        expect( check.checkimg($)).toBe(1);
    });

    test("2 img not has alt attr or value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><img id="img2" alt="bg2.png" src="images/bg2.png" /><img id="img2" alt="" src="images/bg2.png" /></body></html>');
        expect( check.checkimg($)).toBe(2);
    });
});


describe("check html content a tag  has attr rel. ",() => {
    test("1 a not has rel attr and value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.checka($)).toBe(1);
    });

    test("1 a has rel attr but no value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" rel="" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.checka($)).toBe(1);
    });

    test("2 a not has rel attr or value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a><a id="link3" rel="" href="https://www.vpon.com">Vpon_link3</a></body></html>');
        expect( check.checka($)).toBe(2);
    });
});


describe("check html content h1 tag. ",() => {
    test("2 h1 tag. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a><h1>Hello Vpon!</h1></body></html>');
        expect( check.checkh1($)).toBe(true);
    });

    test("1 h1 tag. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.checkh1($)).toBe(true);
    });

    test("no h1 tag. ",() => {
        let $ = cheerio.load('<html><head></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.checkh1($)).toBe(false);
    });
});



describe("check html content strong tag. ",() => {
    test("2 strong tag. ",() => {
        let $ = cheerio.load('<html>\r\n<head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com"><strong>Vpon_link</strong></a><a id="link2" rel="link2" href="https://www.vpon.com" ><strong>Vpon_link2</strong></a><h1>Hello Vpon!</h1></body></html>');
        expect( check.checkstrong($)).toBe(2);
    });

    test("1 strong tag. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" ><strong>Vpon_link2</strong></a></body></html>');
        expect( check.checkstrong($)).toBe(1);
    });

    test("no strong tag. ",() => {
        let $ = cheerio.load('<html><head></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.checkstrong($)).toBe(0);
    });
});


describe("check html head. ",() => {

    test("no title, meta name='descriptions' , meta name='keywords' ",()=>{
        let $=cheerio.load('<html><head></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');

        expect(check.checkhead($)).toEqual(
            expect.objectContaining({
              title: false,
              meta_keyword: false,
              meta_descript:false
            })
        );
    });

    test("has title, no  meta name='description' , meta name='keywords' ",()=>{
        let $=cheerio.load('<html><head><title>This is test</tItle></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');

        expect(check.checkhead($)).toEqual(
            expect.objectContaining({
              title: true,
              meta_keyword: false,
              meta_descript:false
            })
        );
    });

    test("has title, meta name='descriptions' , no meta name='keywords' ",()=>{
        let $=cheerio.load('<html><head><meta Name=\'description\' /><title>This is test</tItle></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');

        expect(check.checkhead($)).toEqual(
            expect.objectContaining({
              title: true,
              meta_keyword: false,
              meta_descript:true
            })
        );
    });

    test("has title, meta name='descriptions' , meta name='keywords' ",()=>{
        let $=cheerio.load('<html><head><meta name="description" content=""><meta Name="descriptions" /><meta Name="keywords" /><title>This is test</tItle></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');

        expect(check.checkhead($)).toEqual(
            expect.objectContaining({
              title: true,
              meta_keyword: true,
              meta_descript:true
            })
        );
    });
});

describe("check custom html tag - meta name='robots'",()=>{

    test("no  meta name='robots' ",()=>{
        let $=cheerio.load('<html><head><meta Name="description" /><meta Name="keywords" /><title>This is test</tItle></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');

        expect(check.checkExtend($,"meta","name","robots")).toBe(false);
    });

    test("has meta name='robots' ",()=>{
        let $=cheerio.load('<html><head><meta Name="descriptions" /><meta Name="robots" /><meta Name="keywords" /><title>This is test</tItle></head><body><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');

        expect(check.checkExtend($,"meta","name","robots")).toBe(true);
    });
});