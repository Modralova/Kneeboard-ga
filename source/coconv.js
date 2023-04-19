

exports.ConvertDMSToDD = (coords) => {

  console.log("coords: ",coords);

  if (coords ===  undefined || NaN || null){return}

  

let  latitude   =  coords.slice(0,coords.indexOf(" "));
let  longitude  =  coords.slice(coords.indexOf(" ")+1,);




  const Reg_lat = /^(\d{1,2})°{1}(\d{2})'{1}(\d{2})(\.[0-9])?(”|'{2}){1}([NS]){1}/
  const Reg_lon =    /(\d{3})°{1}(\d{2})'{1}(\d{2})(\.[0-9])?(”|'{2})([WE]){1}$/

    Reg_lat.test(latitude);

     let lat_deg = parseInt(RegExp.$1);
     let lat_min = parseInt(RegExp.$2);
     let lat_sec = parseInt(RegExp.$3)
     let lat_dec = 0;
     if(!isNaN(parseInt(RegExp.$4.replace(".",""))))  lat_dec = parseInt(RegExp.$4.replace(".",""))/10;
     let lat_dir = RegExp.$6

   Reg_lon.test(longitude);
   

     let lon_deg = parseInt(RegExp.$1);
     let lon_min = parseInt(RegExp.$2);
     let lon_sec = parseInt(RegExp.$3);
     let lon_dec = 0
     if(!isNaN(parseInt(RegExp.$4.replace(".",""))))  lon_dec = parseInt(RegExp.$4.replace(".",""))/10;
     let lon_dir = RegExp.$6
     
     
     let lat =  lat_deg + lat_min/60 + (lat_sec+lat_dec)/3600
     if (lat_dir == "W") lat *= -1

     let lon =  lon_deg + lon_min/60 + (lon_sec+lon_dec)/3600
     if (lon_dir == "S") lat *= -1
    
       
        return [lat,lon];    

   

}

