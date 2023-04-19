


export function fZeros(degrees) {

    var l = String(degrees).replace(/[\-°?]/g, "").length;

    var zeros = "";

    for (var i = 3; i > l; i--) { zeros += "0"; }

    return String(degrees).replace(/^(-?)(\d{1,3})$/, `$1${zeros}$2°`);

    

}


