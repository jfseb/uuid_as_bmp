

var bmp = require("bmp-js");
const { assert } = require("console");
var fs = require("fs");
const { addListener, argv } = require("process");

console.log(argv[2]);
// read  bw image as template for the header.

var fnin = argv[2] || "example.txt";
var fnout = argv[3] || "example.bmp";

console.log(" given an input file containing uuids, (one per line, generate an image file 128x N");


var uuids = ("" + fs.readFileSync("data/" +  fnin)).trim();
var uuidsarr = (uuids + "").split("\n").map( a => a.replaceAll("-","").toUpperCase().trim());
console.log("length " + uuidsarr.length);


var bmpBuffer = fs.readFileSync('bw.bmp');
var bmpData = bmp.decode(bmpBuffer);

console.log('width : ' + bmpData.height);
Object.getOwnPropertyNames(bmpData).forEach( a => console.log(a + ":" ));
Object.getOwnPropertyNames(bmpData).forEach( a => {
     if( a == "buffer") {

     }     else if ( a == "data") {

     } else {
          console.log(a + ":" +  bmpData[a]  + "\n");
     }

});

const WID = 128;
var HEI = uuidsarr.length;

var arr = [];

for(var i = 0; i < WID*HEI/8; ++i )
{ arr[i] = i;
}

function hexStringToByteArray(hexString) {
     if (hexString.length % 2 !== 0) {
         throw "Must have an even number of hex digits to convert to bytes";
     }/* w w w.  jav  a2 s .  c o  m*/
     var numBytes = hexString.length / 2;
     var byteArray = new Uint8Array(numBytes);
     for (var i=0; i<numBytes; i++) {
         byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
     }
     return byteArray;
 }

var idx = 0;
for(var i = 0; i < uuidsarr.length; ++i) {
     assert(uuidsarr[i].length == 128/4,"Not 32 >" + uuidsarr[i] + "<   " + uuidsarr[i].length);
     var r = hexStringToByteArray(uuidsarr[i]);
     assert(r.length == 128/8,"Not 32");
     console.log(uuidsarr[i]);
     for(var ri = 0; ri < r.length; ++ri) {
          arr[idx++] = r[ri];
     }
}



var bfr = Buffer.alloc(WID*HEI*4);
var idx = 0;
for(var i = 0; i < WID * HEI; ++i )  {
     var v = arr[i];
     for(var b = 0; b < 8; ++b) {
          if( v & 0x80) {
               bfr[idx++] = 0x00; bfr[idx++] = 0x00; bfr[idx++] = 0x00; bfr[idx++] = 0x00;
          } else {
               bfr[idx++] = 0xFF; bfr[idx++] = 0xFF; bfr[idx++] = 0xFF; bfr[idx++] = 0xFF;
          }
          v = v << 1;
     }
}

var bmpData2 = {
     data : bfr,
     width : WID,
     height : HEI,
     planes : 1,
     bitPP : 1,
     is_with_alpha:false,
     compress : 0,
     hr:0,
     vr:0,
     bitCount : 1,
     colors:0
     //,
    // palette : bmpData["palette"]
};

var noCopy = ["buffer", "data", "fileSize" ];

Object.getOwnPropertyNames(bmpData).forEach( a => {
     if( noCopy.indexOf(a) >= 0) {

     } else {
         // bmpData2[a] = bmpData[a];

     }
});

var rawData = bmp.encode(bmpData2);
fs.writeFileSync('output/' + fnout, rawData.data);

