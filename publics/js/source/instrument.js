     
      
     
     export function fDraw(U,KZ,context,r,NKDG,DM)
     {

       context.fillStyle = "white";
       context.fillRect(0, 0, context.canvas.width, context.canvas.height);
       context.translate(r,r);
        
       drawRose(context,r,NKDG);
       drawWind(context,r,DM,NKDG);
       drawAT3(context,r,KZ);

        
       context.translate(-r,-r);

     }




        
      function drawRose(context, r,NKDG) {

        var rose = ['','E','S','W','N'];
        var ang;
        var num;
        context.font = r * 0.28 + "px Courier";
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
    
    
    function drawWind(context,r,DM,NKDG){
    
      context.strokeStyle='blue';
       var s = r*0.025
       context.rotate((DM-NKDG)*(Math.PI/180)); 
        
       context.beginPath();
       context.lineWidth=r/96;

        context.moveTo(s*-20,s*-33);
        context.lineTo(0,s*-23);
        context.lineTo(s*20,s*-33);
        context.lineTo(0,s*-28);
        context.lineTo(s*-20,s*-33) 
       
       context.stroke();
    
       context.rotate((-DM+NKDG)*(Math.PI/180));
    
    }
    
    
    
   function drawAT3(context,r,KZ){
    
     var s= r*0.03
      
      context.rotate(KZ*(Math.PI/180));
      
      
      context.beginPath();
      context.lineWidth=r/96;
      context.fillStyle = 'red';
       //context.strokeStyle='red';
   
   context.moveTo(0,s*-10);    
   context.lineTo(s*-1,s*-10);
   context.lineTo(s*-2,s*-5);
   context.lineTo(s*-14,s*-5);
   context.lineTo(s*-14,s*-1);
   context.lineTo(s*-2,0);
   context.lineTo(s*-1,s*6);
   context.lineTo(s*-6,s*6);
   context.lineTo(s*-6,s*9);
   context.lineTo(s*-1,s*9);
   context.lineTo(0,s*11); 
   context.lineTo(s*1,s*9);
   context.lineTo(s*6,s*9);
   context.lineTo(s*6,s*6);
   context.lineTo(s*1,s*6);
   context.lineTo(s*2,0);
   context.lineTo(s*14,s*-1);
   context.lineTo(s*14,s*-5);
   context.lineTo(s*2,s*-5);
   context.lineTo(s*1,s*-10);
   context.lineTo(0,s*-10);


      context.fill();
      context.rotate(-KZ*(Math.PI/180));
     //context.stroke(); 
    }
    

    
    