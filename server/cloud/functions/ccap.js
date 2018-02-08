const NodeCache = require( "node-cache" );
const uuid = require('node-uuid'); 
const BMP24 = require('gd-bmp').BMP24;

const capCache = new NodeCache();
function rand(min, max) {
    return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

//制造验证码图片
function makeCapcha() {
    var img = new BMP24(100, 40);
    //img.drawCircle(rand(0, 100), rand(0, 40), rand(10 , 40), rand(0, 0xffffff));
    //边框
    img.fillRect(0, 0, img.w-1, img.h-1, 0x62799D);
    img.drawRect(0, 0, img.w-1, img.h-1, rand(0, 0xffffff));
    img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
    //return img;

    //画曲线
    var w=img.w/2;
    var h=img.h;
    var color = rand(0, 0xffffff);
    var y1=rand(-5,5); //Y轴位置调整
    var w2=rand(10,15); //数值越小频率越高
    var h3=rand(4,6); //数值越小幅度越大
    var bl = rand(1,5);
    // for(var i=-w; i<w; i+=0.1) {
    //     var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
    //     var x = Math.floor(i+w);
    //     for(var j=0; j<bl; j++){
    //         img.drawPoint(x, y+j, color);
    //     }
    // }

    var p = "0123456789";
    var str = '';
    for(var i=0; i<4; i++){
        str += p.charAt(Math.random() * p.length |0);
    }

    var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    var x = 15, y=8;
    for(var i=0; i<str.length; i++){
        var f = fonts[Math.random() * fonts.length |0];
        y = 8 + rand(-10, 10);
        img.drawChar(str[i], x, y, f, 0xFFE9E9);
        x += f.w + rand(2, 8);
    }
    return {str, img};
}


//得到验证码
Mmbs.Cloud.define("getCaptcha", function(req, res) {
    
    var ary = makeCapcha();
    var text = ary.str;
    var buffer = ary.img.getFileData();
    var id = uuid.v1().substring(0, 8);
    capCache.set(id, text, 60 * 60 * 30);
    res.success({
        "capid": id,
        "pic" : buffer.toString('base64')
    });
})

//判断验证码是否正确
Mmbs.Cloud.define("verifyCaptcha", function(req, res) {
    var capid = req.params.capid;
    var capcode = req.params.code;
    if (capid && capcode && capCache.get(capid) == capcode) {
        capCache.del(capid)
        res.success({'status': 0});
    }
    else{
        res.success({'status': 1});
    }
})