
 (function()
                   {
                           //querySelector
                           //y declaracion de variables.
                       var id = document.querySelector('#contenedor');
                       var elemento = document.querySelector('#elem');
                       var bottom=0;
                       var left=0;
                       var velocidad=30;
                       var velocidad1=-30;                 
                       var arriba=false;
                       var derecha=false;
                       var tamanoPelota=100;
                       var velocidadHorizontal=20;
                       
                       //estas dos variables es para controlar el setInterval y poder resetearlo para que al volver a dar click a la cesta la pelota no se envale
                       //con el intervalo anterior sumado.--->lo pondria a cero cuando pulsemos STOP.
                       var timer=null;
                       var interval= 100;
                      
                      
                   
                       //evento on click. Disparamos el evento al hacer click con el raton
                       id.addEventListener('click', function()

                       {       
                                  //Las volvemos a poner aquí para cuando pulsamos stop y volvemos a iniciar coga valores normales la pelota.
                                   velocidad=30;
                                   velocidad1=-30;                 
                                   velocidadHorizontal=20;
                                   //ponemos el boton velocidad a disable. Lo activamos unicamente si stop es pulsado.
                                   document.getElementById("velocidad").disabled = true;
                                      
                                //boton stop y ponemos valores como estaba la pelota.
                               document.querySelector('#boton1').onclick = function() 
                               { 
                                        bottom=0;
                                        left=0;
                                        velocidad=0;
                                        velocidad1=0;
                                        velocidadHorizontal=0;
                                        elemento.style.visibility='hidden';

                                        //ponemos a activo el botón más velocidad
                                        document.getElementById("velocidad").disabled = false;

                                         //limpiamos el intervalo y ponemos timer a null;
                                         clearInterval(timer);
                                         timer = null
                                         interval=100;

                                     
                               }

                                   //boton velocidad
                                   document.querySelector('#velocidad').onclick = function() 
                               {     

                                     if (interval==10){
                                      alert("No se puede más velocidad");
                                     }else{
                                      interval-=10;
                                     }
                                      

                                     
                               }


                                
                        elemento.addEventListener('mouseover',function(elEvento) 
                        {    
                          //Para poder obtener las coordenadas del raton en  la pantalla.
                             var evento =elEvento || window.event;
                              var coordenadaX = evento.clientX;
                              var coordenadaY = evento.clientY;
                                 
                                //Controlamos las cordenadas del raton y si encaja con nuestra pelota cambiamos la direccion vertical y horizontal.
                                if (coordenadaY <bottom) {
                                    arriba=false;
                                }else{ 
                                     arriba=true;
                                }
                                if (coordenadaX==left){
                                  derecha=true;
                                }else{
                                  derecha=false; 
                                }

                            
                         }, true);
                             
                                   //funcion que ejecutamos abajo para que inicie setInterval.
                                  function start(){ 
                                       if (timer !== null) return;
                                  timer=setInterval(function () 
                                   {
                                           //hacemos la pelota visible fuera del for para poder ocultarla si pulsan el boton parar
                                            elemento.style.visibility='visible';
                                     
                                         for (var i = 0, max = 2; i < max; i++) {
                                          //replace es utilizado para que nos devuelva la posicion sin el px.--->lo vamos a utilizar para comparar con //innerHeight y innerWidth
                                                    var contador=elemento.style.bottom.replace((/[px]/gi),'');

                                                    //windows.innerHeight   /2  para la mitad de la pantalla(vertical).>nosotros utilizamos la pantalla completa para saber la posicion de la pelota.
                                                    var pantalla=window.innerHeight;
                                                    //Puntos a lo ancho
                                                    var lado = window.innerWidth;

                                                    //Controlar la posicion de las pelotas a lo ancho.
                                                    if ((contador<lado) && (derecha ===false)){
                                                        //incrementamos variable left positivamente
                                                        left += (i*velocidadHorizontal);
                                                       
                                                         //si ha llegado al final de pantalla por los lados ponemos derecha a true.
                                                         //pongo left +100 ya que 100 es el ancho de la imagen de la pelota y no se meta por el lado de la pantalla.
                                                         if (left+tamanoPelota>lado){
                                                             derecha=true;
                                                         }
                                                         //si derecha es true 
                                                    }else if (derecha){
                                                      //le damos valor negativo para que vuelva en sentido contrario                              
                                                      left -= (i*velocidadHorizontal);
                                                      
                                                         //si ha llegado a la otra parte de la pantalla(izquierda) ponemos derecha a false
                                                         //lo suyo seria poner otra variable con nombre izquierda.
                                                         if (left<1){
                                                           derecha=false;
                                                         }
                                                    }
                                                    
                                                    //arriba y abajo
                                                    //Si posicion es menor que el tamaño total de la pantalla y no está arriba 
                                                   if ((contador<pantalla) && (arriba===false))
                                                   {
                                                         
                                                        
                                                        //incremenamos bottom hacia arriba --->velocidad positiva.
                                                        bottom+=(i*velocidad);
                                                        
                                                       
                                                          //Si ha llegado arriba ponemos arriba a true.
                                                          //tenemos en cuenta el tamaño de la pelota para que rebote justo por eso el 100
                                                          if (bottom+tamanoPelota>pantalla){
                                                            arriba=true;
                                                          }
                                                       
                                                     //si las pelotas estan arriba
                                                    }else if (arriba){
                                                        //incrementamos con velocidad negativa.-->osease, bajan.
                                                        bottom+=(i*velocidad1);
                                                     

                                                        //Si bottom ha llegado por debajo de cero ponemos arriba a false para que suban.  
                                                        if (bottom<0){
                                                          arriba=false;
                                                        }

                                                      
                                                    }

                                              //pintamos las posiciones que va teniendo las pelotas. 
                                              elemento.style.left= left + 'px';
                                              elemento.style.bottom = bottom+'px';
                                               
                                      }

                                   }, interval);
                                 }
                                    //funcion que iniciamos el setInterval
                                    start();
                   
                        }, true);
                   })();
