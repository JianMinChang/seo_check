const cheerio = require('cheerio');
const check=require("../lib/src/check.js");


describe("check html content img has alt ",() => {
    
    test("1 img not has alt attr and value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><img id="img2" alt="bg2.png" src="images/bg2.png" /></body></html>');
        expect( check.imgcheck($)).toBe(1);
    });

    test("2 img not has alt attr and value. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><img id="img2" alt="bg2.png" src="images/bg2.png" /><img id="img2" alt="" src="images/bg2.png" /></body></html>');
        expect( check.imgcheck($)).toBe(2);
    });

    test("1 img not has alt attr and value  other 1 img has alt attr but  value not. ",() => {
        let $ = cheerio.load('<html><head></head><body><h1>Hello World!</h1><h2 class="title">Hello world</h2><img id="img1" src="images/bg1.png" /><img id="img2" alt="bg2.png" src="images/bg2.png" /><img id="img2" alt="" src="images/bg2.png" /></body></html>');
        expect( check.imgcheck($)).toBe(2);
    });
});

