 
 
 const XLSX = require('xlsx');

 
 const sectionManager = require('./section_manager.js')

 const instrumentModule = require('./instrument.js')



 exports.xlsManager_ = () => {

let rs = new Object();

  rs.st = 200;
 

 return rs;
 }


 exports.xlsManager = () => { 

 


console.log("---sectionManager.ROUTE---> :", sectionManager.ROUTE);




const worksheet = XLSX.utils.json_to_sheet(sectionManager.ROUTE);
const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, "ROUTE");


XLSX.utils.sheet_add_aoa(worksheet, [["SECTION", "NKDM","TIME","DISTANCE","KZ","KM",/*"WIND"*/]], { origin: "A1" });

//XLSX.utils.sheet_add_aoa(worksheet, [[new_value]], { origin: address });    //poj. komórka




const max_width = sectionManager.ROUTE.reduce((w, r) => Math.max(w, r.SECTION.length), 14);
worksheet["!cols"] = [ { wch: max_width } ];         // width in characters//
                                                     // width in Excel "Max Digit Width", width*256 is integral
                                                     // width in screen pixels

//worksheet["!rows"] = [ { wpx: min_height }];
//worksheet["!cols"] = [ { wpx: max_width  }]; 
//  worksheet["G2"] = [ {wpx: img_height},{wpx: img_width}]
    
// var col_index = XLSX.utils.decode_col("WIND");

/*
const buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
var blob = new Blob([buf], {type:"application/octet-stream"});
var formdata = new FormData();
formdata.append("file", blob, "test.xlsx");
*/

/* perform POST request */
//fetch("https://thisis.a.test/upload", { method: 'POST', body: formdata });






console.log('');
console.log('');
console.log('');
console.log("worksheet-------->: ",worksheet);
console.log('');
console.log('');
console.log('');
console.log("workbook-------->: ",workbook);
console.log('');
console.log('');
console.log('');


let rs = new Object();

let d = new Date()

rs.timestamp = `${d.toLocaleDateString().replace(/[\.?]/g,"")}${d.toLocaleTimeString().replace(/[:?]/g,"")}`


rs.buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });


return rs;



};















