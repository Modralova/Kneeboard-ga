
import {NTP} from '../NTP.js';
import { fDraw } from "../source/instrument.js";
import { fZeros } from "../source/zeros.js";


export function fTime(S, W) {

   var NMkm = NTP.ConvText.textContent;
   var w = W;
   var w_min = W;

   switch (NMkm) {
      case "nm":

      if(NTP.convBTN.value != 'false') w_min = parseFloat(w_min) / 12;

         break;

      case "km":

         if(NTP.convBTN.value != 'true')  w_min = milesToKm(parseFloat(w_min)) / 12

         break;
   }

      NTP.outVmin.value = w_min.toFixed(1);

   var T_ms = S / W;

   if (T_ms < 1) T_ms = T_ms * 60;

   var t_m = Math.floor(T_ms);
   var t_s = T_ms - t_m;
   var _ts = t_s * 60;


   var ts = String(parseInt(_ts));

   if (ts.length < 2) {

      ts = "0" + String(ts);
   }

   return String(parseInt(t_m)) + ":" + ts;

}




export function fDN(inDM, inDelM) {

   if (inDM == 0) { inDM = 360 };

   var DN = (inDM - 180) - inDelM;

   if (DN < 0) { return DN + 360; }
   if (DN > 360) { return DN - 360 }
   else { return DN; }

}
//



export function fNKDM(inNKDG, inDelM) {
   var NKDM = inNKDG - inDelM;

   if (NKDM < 0) return NKDM + 360;
   else return NKDM;
}
//



export function fKB(inNKDG, inDelM, inDelB) {
   var KB = inNKDG - inDelM - inDelB;

   if (KB < 0) return KB + 360;
   else return KB;

}
//


export function fKW(DN, KB) {
   var KW = DN - KB;

   if (KW >= 180) return KW - 360;
   if (KW <= -180) return KW + 360;

   else return KW;
}
//



export function fKM(KZ, KB) {
   var KM = KB + KZ;

   if (KM < 0) KM = KM + 360;

   return KM;
}
//




export function fW(KW, V, U) {
   var kw = KW * Math.PI / 180;
   var W = V + Math.cos(kw) * U;
   return parseInt(W);
}
//



export function fsinKW(U, V, KW) {
   var kw = KW * Math.PI / 180;

   if (KW == 180 || KW == -180) KW = 0;
   if (KW < 0) kw = kw * (-1);

   var KZ1 = U * (Math.sin(kw) / V);
   var KZ2 = Math.sin(KZ1);
   var KZ3 = KZ2 * (180 / Math.PI);
   var KZ4 = KZ3 + (0.5);

   var KZ5 = parseInt(KZ4);

   if (KW > 0) KZ5 = KZ5 * (-1);

   return KZ5;

}


 export function count() {

   NTP.inDM.value = fZeros(NTP.inDM.value);
   NTP.inNKDG.value = fZeros(NTP.inNKDG.value);



   var Ktm = NTP.convBTN.textContent;
   var s = parseFloat(NTP.inS.value);

   switch (Ktm) {

      case "km":

         if (!NTP.convert_swch) {
            s = kmetersToNM(parseFloat(NTP.inS.value));
         }

         else s = s;

         break;

      case "NM":

         if (NTP.convert_swch) {
            s = s;
         }
         else {
            s = milesToKm(parseFloat(NTP.inS.value));
         }

         break;
   }




   var DN = fDN(parseInt(NTP.inDM.value.replace(/\W+/, "")), parseInt(NTP.inDelM.value.replace(/\W+/, "")));

   var NKDM = fNKDM(parseInt(NTP.inNKDG.value.replace(/\W+/, "")), parseInt(NTP.inDelM.value.replace(/\W+/, "")));

   var KB = fKB(parseInt(NTP.inNKDG.value.replace(/\W+/, "")), parseInt(NTP.inDelM.value.replace(/\W+/, "")), parseInt(NTP.inDelB.value.replace(/\W+/, "")));

   var KW = fKW(DN, KB);

   var KZ = fsinKW(parseInt(NTP.inU.value), parseInt(NTP.inV.value), KW);

   var W = fW(KW, parseInt(NTP.inV.value), parseInt(NTP.inU.value));

   var KM = fKM(KZ, KB);

   var T = fTime(s, W);

   fDraw(NTP.inU, KZ, NTP.context, NTP.r, parseInt(NTP.inNKDG.value.replace(/\W+/, "")), parseInt(NTP.inDM.value.replace(/\W+/, "")));


   NTP.outDN.value = fZeros(DN);
   NTP.outNKDM.value = fZeros(NKDM);
   NTP.outKB.value = fZeros(KB);
   NTP.outKW.value = fZeros(KW);
   NTP.outW.value = W;
   NTP.outKZ.value = fZeros(KZ);
   NTP.outKM.value = fZeros(KM);
   NTP.outT.value = T;
}


export function milesToKm(miles) { return miles * 1.852; }

export function kmetersToNM(kmeters) { return kmeters / 1.852; }




