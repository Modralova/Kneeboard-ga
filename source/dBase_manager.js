const fs = require('fs')



exports.writeRecord = (DATA) => {

    if (!fs.existsSync('./dBase/records.json')) {
 
        fs.closeSync(fs.openSync('./dBase/records.json', 'w'));
    }

        const records = fs.readFileSync('./dBase/records.json')

        console.log(records);


        if (records.length == 0) {
           
            fs.writeFileSync("./dBase/records.json", JSON.stringify([DATA]))

         } else {
               
                const json = JSON.parse(records.toString())

                console.log(json)
               
                json.push(DATA);


                fs.writeFileSync("./dBase/records.json", JSON.stringify(json))
            }
        }
    