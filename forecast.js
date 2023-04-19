

function forecast() {

    let forecast = new Array();

    forecast =  fetch( 'https://awiacja.imgw.pl/getsigmet/metar.json',
        {
            method: "GET"
            //mode: 'cors', // no-cors, *cors, same-origin
        })
        .then(res => {
            if (res.ok) {
                console.log('getting forecast');
                return response.json();
            } else {
                console.log('cannot GET')
            }
        })
        .then(data => { let array = data; return array; })

    console.log("--forecast---->: ", forecast);

    return forecast;
}




module.exports = forecast;