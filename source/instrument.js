     // rysowanie na serwerze
      


     

     const {createCanvas} = require('canvas');
     const canvas = createCanvas(100,100);
     let context = canvas.getContext("2d");
     var r = canvas.height / 2;

   

    

      exports.getInstrumentimage = (DATA) =>  {


        fDraw(parseInt(DATA.U),parseInt(DATA.KZ.replace(/^(-?\d{3})°?$/, `$1`)),context,r,parseInt(DATA.NKDG.replace(/^(-?\d{3})°?$/, `$1`)),parseInt(DATA.DM.replace(/^(-?\d{3})°?$/, `$1`)));

        const instImg = canvas.toDataURL('image/png', 1.0);


        return instImg;
      }





      fDraw = (U,KZ,context,r,NKDG,DM) =>  {
          


       context.fillStyle = "white";
       context.fillRect(0, 0, context.canvas.width, context.canvas.height);
       context.translate(r,r);
        
       drawROSE(context,r,NKDG);
       drawWind(context,r,DM,NKDG);
       drawAT3(context,r,KZ);

        
       context.translate(-r,-r);

     }




        
       drawRose = (context, r,NKDG) => {

        var rose = ['','E','S','W','N'];
        var ang;
        var num;
        context.font = r * 0.25 + "px Courier";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillStyle = "black";

        for(num = 1; num < 5; num++){
          ang = -NKDG*(Math.PI/180) + num * Math.PI / 2;

          //context.save();
          context.rotate(ang);
          context.translate(0, -r * 0.85);
          context.rotate(-ang);
          context.fillText(rose[num].toString(), 0, 0);
          context.rotate(ang);
          context.translate(0, r * 0.85);
          context.rotate(-ang);
          //context.restore();
        }
        
      }
    
    
     drawWind = (context,r,DM,NKDG) => {
    
      context.strokeStyle='blue';
    
       context.rotate((DM-NKDG)*(Math.PI/180)); 
        
       context.beginPath();
       context.lineWidth=r/96;
       context.moveTo(-r*0.45,-r*0.75);
       context.lineTo(0,-r*0.6);
       context.lineTo(r*0.45,-r*0.75);
       context.lineTo(0,-r*0.5);
       context.lineTo(-r*0.45,-r*0.75)
       
       context.stroke();
    
       context.rotate((-DM+NKDG)*(Math.PI/180));
    
    }
    
    
    
    drawAT3 = (context,r,KZ) => {
    
    
      context.rotate(KZ*(Math.PI/180));
    
      context.beginPath();
      context.lineWidth=r/96;
      context.fillStyle = 'red';
       //context.strokeStyle='red';
       context.moveTo(0,-r*0.15);    
       context.lineTo(-r*0.03,-r*0.15);
       context.lineTo(-r*0.06,0);
       context.lineTo(-r*0.42,0);
       context.lineTo(-r*0.42,r*0.12);
       context.lineTo(-r*0.06,r*0.15);
       context.lineTo(-r*0.03,r*0.33);
       context.lineTo(-r*0.18,r*0.33);
       context.lineTo(-r*0.18,r*0.42);
       context.lineTo(-r*0.03,r*0.42);
       context.lineTo(0,r*0.48); 
       context.lineTo(r*0.03,r*0.42);
       context.lineTo(r*0.18,r*0.42);
       context.lineTo(r*0.18,r*0.33);
       context.lineTo(r*0.03,r*0.33);
       context.lineTo(r*0.06,r*0.15);
       context.lineTo(r*0.42,r*0.12);
       context.lineTo(r*0.42,0);
       context.lineTo(r*0.06,0);
       context.lineTo(r*0.03,-r*0.15);
       context.lineTo(0,-r*0.15);
      
      context.fill();
      context.rotate(-KZ*(Math.PI/180));
     //context.stroke(); 
    }


    






    

 //   module.exports = getInstrumentimage;
    