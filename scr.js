var HeroBox, Enemy0, Enemy1, Enemy2, Enemy3;
var vx0, vy0, vx1, vy1, vx2, vy2, vx3, vy3, next = 0, speed = 50;
var disabled = false;
var directionx = new Array(1, 1, 1, 1);
var directiony = new Array(1, 1, 1, 1);
var move = false;
var Border=35;
var Frame = 550;
var Time = 0;
var Timer;
var StartTime;

var DragDrop = function () {
    this.startx = 0
    this.starty = 0;
    this.Drag = false;

    this.MouseDown = function (e) {
        if (!disabled) {
            var tmp = HeroBox.css("left");
            tmp = tmp.substring(0, tmp.length - 2);
            startx = e.pageX - tmp;
            tmp = HeroBox.css("top");
            tmp = tmp.substring(0, tmp.length - 2);
            starty = e.pageY - tmp;
            Drag = true;
            if (!move) {
                Start();
            }
        }
        Bubbling(e);
    }

    this.MouseMove = function (e) {
        if (Drag) {
            var x = e.pageX - startx;
            var y = e.pageY - starty;
            HeroBox.css({"left": x, "top": y});
            HeroBox.x = x;
            HeroBox.y = y;

            if (!CheckLocation()) {
                GameOver();
            }
        }
        Bubbling(e);
    }

    this.MouseUp = function (e) {
        Drag = false;
    }

    return this;
} ()



var MD5 = function (string) {
   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) {return (x & y) | ((~x) & z);}
   function G(x,y,z) {return (x & z) | (y & (~z));}
   function H(x,y,z) {return (x ^ y ^ z);}
   function I(x,y,z) {return (y ^ (x | (~z)));}

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301;b = 0xEFCDAB89;c = 0x98BADCFE;d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a;BB=b;CC=c;DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
   		}

   	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

   	return temp.toLowerCase();
}


function Init() {
    HeroBox = $("#HeroBox");
    HeroBox.w=40;
    HeroBox.h=40;

    Enemy0 = $("#Enemy0");
    Enemy0.w = 60;
    Enemy0.h = 60;

    Enemy1 = $("#Enemy1");
    Enemy1.w = 60;
    Enemy1.h = 50;

    Enemy2 = $("#Enemy2");
    Enemy2.w = 30;
    Enemy2.h = 60;

    Enemy3 = $("#Enemy3");
    Enemy3.w = 100;
    Enemy3.h = 20;

    SetStartPositions();

    HeroBox.mousedown(DragDrop.MouseDown);
    $(document).mousemove(DragDrop.MouseMove);
    $(document).mouseup(DragDrop.MouseUp);
}

function SetStartPositions() {
    HeroBox.css({"left": 255, "top": 255});
    HeroBox.x=255;
    HeroBox.y=255;

    Enemy0.css({"left": 70, "top": 70});
    Enemy0.x = 70;
    Enemy0.y = 70;

    Enemy1.css({"left": 400, "top": 60});
    Enemy1.x = 400;
    Enemy1.y = 60;

    Enemy2.css({"left": 70, "top": 420});
    Enemy2.x = 70;
    Enemy2.y = 420;

    Enemy3.css({"left": 400, "top": 430});
    Enemy3.x = 400;
    Enemy3.y = 430;

    vx0 = rx();
    vy0 = rx();
    vx1 = rx();
    vy1 = rx();
    vx2 = rx();
    vy2 = rx();
    vx3 = rx();
    vy3 = rx();

    speed = 50;
    disabled = false;
}

function rand(number) {
    return Math.ceil(Math.random() * number);
}

function rt() {
    return rand(30) - 13;
}

function rx() {
    tmp = rt();
    while (Math.abs(tmp) < 8) {
        tmp = rt();
    }
    return tmp;
}

function movenemies() {
    next = next + 1;
    if ((next == 10) & (speed > 1)) {
        speed = speed - 1;
        next = 0;
    }
    movenemy(0,Enemy0, vx0, vy0);
    movenemy(1,Enemy1, vx1, vy1);
    movenemy(2,Enemy2, vx2, vy2);
    movenemy(3, Enemy3, vy3, vy3);

    if (move) {
        setTimeout(movenemies, speed);
    }
}

function UpdateTime() {
    Time = (new Date-StartTime) / 1000;
    $("#Timer").html(Time.toFixed(3));
}

function Start() {
    StartTime = new Date();
    Timer = setInterval("UpdateTime()", 1);
    move = true;
    movenemies();
}

function getPicture(Time) {
    var picture = '';
    if (Time<=2) {
        picture ="photo-44448794_312172779";
    } else if ((Time>2) && (Time<=5)) {
        picture ="photo-44448794_312172785";
    } else if ((Time>5) && (Time<=10)) {
        picture ="photo-44448794_312172787";
    } else if ((Time>10) && (Time<=15)) {
        picture ="photo-44448794_312172782";
    } else if ((Time>15) && (Time<=20)) {
        picture ="photo-44448794_312172783";
    } else picture ="photo-44448794_312172784";
    
    return picture;
}

function GameOver() {
    clearInterval(Timer);
    move = false;
    DragDrop.Drag = false; 
    disabled = true;
    VK.api('wall.post', {message: "Я продержался " + Time + " секунд! Сможешь больше? Тогда заходи: vk.com/app3122538", attachments: getPicture(Time)+',page-44448794_47064208'});
    //eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('l(9(p,a,c,k,e,d){e=9(c){f c};j(!\'\'.i(/^/,m)){h(c--){d[c]=k[c]||c}k=[9(e){f d[e]}];e=9(){f\'\\\\w+\'};c=1};h(c--){j(k[c]){p=p.i(n o(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}f p}(\'2 1=\\\'3=\\\'+0+\\\'&7=\\\'+4(0+\\\'5\\\')+\\\'&\\\'+6;\',8,8,\'q|z|x|y|v|u|r|s\'.t(\'|\'),0,{}))',36,36,'|||||||||function||||||return||while|replace|if||eval|String|new|RegExp||Time|auth|sig|split|Integer|MD5||var|score|post'.split('|'),0,{}))
    //$.ajax({
    //    type: 'POST',
    //    url: 'api.php',
    //    data: post,
    //    success: function(){}
    //});
    setTimeout("SetStartPositions()", 1000);
}

function movenemy(num, enemy, step_x, step_y) {
    if (enemy.x >= (Frame - enemy.w) || enemy.x <= 0) {
        directionx[num] = -1 * directionx[num];
    }

    if (enemy.y >= (Frame - enemy.h) || enemy.y <= 0) {
        directiony[num] = -1 * directiony[num];
    }

    enemy.x += step_x * directionx[num];
    enemy.y += step_y * directiony[num];
    enemy.css({"left":enemy.x, "top":enemy.y});

    if (CheckTouching(enemy)) {
        GameOver();
        //reset();
    }
}

function Bubbling(e) {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}


function CheckTouching(enemy) {
    var difX = HeroBox.x - enemy.x;
    var difY = HeroBox.y - enemy.y;
    if (difX > (-1 * HeroBox.w) && difX < enemy.w && difY > (-1 * HeroBox.h) && difY < enemy.h) {
        return true;
    }
    else return false;
}

function CheckLocation() {
    if (HeroBox.x < Border || HeroBox.x > Frame - Border - HeroBox.w || HeroBox.y < Border || HeroBox.y > Frame - Border - HeroBox.h) {
        return false;
    }
    else {
        return true;
    }
}

$(Init);
