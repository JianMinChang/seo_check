const cheerio = require('cheerio');
const check = require("../lib/src/check.js");


describe("check html content  img tag has attr alt. ",() => {
    
    test("1 img not has alt attr and value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><img id="img2" alt="bg2.png" src="images/bg2.png" /></body></html>');
        expect( check.imgcheck($)).toBe(1);
    });

    test("1 img  has alt attr but no value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img2" alt="bg2.png" src="images/bg2.png" /><img id="img2" alt="" src="images/bg2.png" /></body></html>');
        expect( check.imgcheck($)).toBe(1);
    });

    test("2 img not has alt attr or value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><img id="img2" alt="bg2.png" src="images/bg2.png" /><img id="img2" alt="" src="images/bg2.png" /></body></html>');
        expect( check.imgcheck($)).toBe(2);
    });
});


describe("check html content a tag  has attr rel. ",() => {
    test("1 a not has rel attr and value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.acheck($)).toBe(1);
    });

    test("1 a has rel attr but no value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" rel="" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a></body></html>');
        expect( check.acheck($)).toBe(1);
    });

    test("2 a not has rel attr or value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><a id="link1" href="https://www.vpon.com">Vpon_link</a><a id="link2" rel="link2" href="https://www.vpon.com" >Vpon_link2</a><a id="link3" rel="" href="https://www.vpon.com">Vpon_link3</a></body></html>');
        expect( check.acheck($)).toBe(2);
    });
});