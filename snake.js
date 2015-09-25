var Snake ={
  initX : 0,
  initY : 0,
  endX: 70,
  endY: 0,
  width: 390,
  height: 390,
  sizeX : 70,
  sizeY : 10,
  numel : undefined,
  resetX: false,
  resetY: false,
  move: 'lr',
  direction:'right',
  canvas : document.getElementById("snake"),
  ctx : undefined,
  btnLeft: 37,
  btnUp: 38,
  btnRight: 39,
  btnDown: 40,
  tracePath: [],
  headElement: undefined,
  endGame : false,
  
    
  init: function(w,h){
    if(w == undefined || h == undefined){
        this.canvas.setAttribute('width','400');  
        this.canvas.setAttribute('height','400'); 
    }
    else{
        this.canvas.setAttribute('width', w);  
        this.canvas.setAttribute('height',h);  
        this.width = w-10;
        this.height = h-10;
    }
    this.ctx = this.canvas.getContext("2d"),
    this.ctx.fillStyle = "rgb(0,0,255)";
    this.numel = this.sizeX / 10;
    this.setTracePath();
    this.handleEvents(); 
    this.animate();
    
  },
    
  animate: function(){
      setInterval(function(){
        if(!Snake.endGame){
            switch(Snake.move){
                case 'lr':
                    Snake.leftToRight();
                    break;

                case 'ru':
                    Snake.moveToUp();
                    break;

                case 'lu':
                    Snake.moveToUp();
                    break;

                case 'rd':
                    Snake.moveToDown();
                    break;

                case 'ld':
                    Snake.moveToDown();
                    break;

                case 'dr':
                    Snake.moveToRight();
                    break;

                case 'dl':
                    Snake.moveToLeft();
                    break;

                case 'ur':
                    Snake.moveToRight();
                    break;

                case 'ul':
                    Snake.moveToLeft();
                    break;
            }
              Snake.checkGameStatus();
        }
          },100);
                  
  },
    
  handleEvents: function(){
    window.addEventListener("keyup", function (ev) {
        if(Snake.direction == 'right'){
            if(ev.keyCode == Snake.btnDown){
                Snake.move = 'rd';   
                Snake.direction = 'down';
            }
            else if(ev.keyCode == Snake.btnUp){
                Snake.move = 'ru';  
                Snake.direction = 'up';
            }    
            
        }
        else if(Snake.direction == 'down'){
            if(ev.keyCode == Snake.btnRight){
                Snake.move = 'dr';   
                Snake.direction = 'right';
            }
            else if(ev.keyCode == Snake.btnLeft){
                Snake.move = 'dl';   
                Snake.direction = 'left';
            }  
            
        }
        else if(Snake.direction == 'up'){
            if(ev.keyCode == Snake.btnRight){
                Snake.move = 'ur';   
                Snake.direction = 'right';
            }
            else if(ev.keyCode == Snake.btnLeft){
                Snake.move = 'ul';   
                Snake.direction = 'left';
            }    
        }
        
        else if(Snake.direction == 'left'){
            if(ev.keyCode == Snake.btnDown){
                Snake.move = 'ld';   
                Snake.direction = 'down';
            }
            else if(ev.keyCode == Snake.btnUp){
                Snake.move = 'lu';  
                Snake.direction = 'up';
            }
        }
        
        
    }, true);
      
  },
    
  removeTail: function(){
      var tail = this.tracePath.shift();
      Snake.ctx.clearRect(tail[0], tail[1], 10, 10); 
  },
    
  leftToRight: function(){
      Snake.removeTail();
      
      
        if(Snake.initX + Snake.sizeX < Snake.width){      
            Snake.initX = Snake.initX + 10;
            Snake.endX = Snake.endX + 10;
        } 
        else{
            if(this.endX == this.width){
                this.endX = 0;   
            }
            else{
                this.endX = this.endX + 10;
            }
            
        }
        this.headElement = [Snake.endX, Snake.initY];
        Snake.tracePath.push([Snake.endX, Snake.initY]);
        Snake.ctx.fillRect(Snake.endX, Snake.initY, 10, 10); 
      
  },
    
  setTracePath: function(){
    var counter = 0;
    while(counter <= this.sizeX){
        this.tracePath.push([counter, this.initY]); 
        Snake.ctx.fillRect(counter, Snake.initY, 10, 10); 
        counter = counter + 10;
    }
    
  },
    
  updateTracePath: function(){
      this.headElement = [this.endX, this.endY];
      this.tracePath.push([this.endX, this.endY]);
      this.ctx.fillRect(this.endX, this.endY, 10, 10); 
      
  },
    
    checkGameStatus: function(){

        var counter = 0;
        var status = this.tracePath.some(function(element, index){
            if(element[0] == Snake.headElement[0] && element[1] == Snake.headElement[1]){
                counter++;
            }
            return counter >= 2;

        });
        
        if(status){
            this.resetGame();
        }
      
  },
    
    resetGame: function(){
      this.endGame = true;
      this.initX = 0;
      this.initY = 0;
      this.endX = 70;
      this.endY = 0;
      this.sizeX = 70;
      this.sizeY = 10;
      this.move = 'lr';
      this.direction ='right';
      this.tracePath = [];
      this.ctx.clearRect(0, 0, this.width, this.height);   
      this.setTracePath();
      setTimeout(function(){Snake.endGame = false},50);
        
    },
    
  moveToDown: function(){
        Snake.removeTail();
        
        if(Snake.sizeX > 10){
            if(this.endY == this.height){
                this.endY = 0;   
            }
            else{
                this.endY = this.endY + 10;
            }
            Snake.initX = Snake.initX + 10;
            Snake.sizeX = Snake.sizeX - 10;
            Snake.sizeY = Snake.sizeY + 10;
        }
        else{
            if(Snake.initY + Snake.sizeY < Snake.width){      
                Snake.initY = Snake.initY + 10;
                Snake.endY = Snake.endY + 10;
            } 
            else{
                if(this.endY == this.height){
                    this.endY = 0;   
                }
                else{
                    this.endY = this.endY + 10;
                }

            }
        }
      this.updateTracePath();
  },
    
    moveToUp: function(){
        Snake.removeTail();

        if(Snake.sizeX > 10){
            if(this.endY == 0){
                this.endY = this.height;   
            }
            else{
                this.endY = this.endY - 10;
            }
            Snake.initX = Snake.initX + 10;
            Snake.sizeX = Snake.sizeX - 10;
            Snake.sizeY = Snake.sizeY + 10;
        }
        else{
            if(Snake.endY > 0){      
                Snake.initY = Snake.initY - 10;
                Snake.endY = Snake.endY - 10;
            } 
            else{
                if(this.endY == 0){
                    this.endY = this.height;   
                }

            }
        }
      this.updateTracePath();
    },
    
  moveToRight: function(){
      Snake.removeTail();
      
      if(Snake.sizeY > 10){
            if(this.endX == this.width){
                this.endX = 0;   
            }
          else{
                this.endX = Snake.endX + 10;   
          }
            
            Snake.initY = Snake.initY + 10;
            Snake.sizeX = Snake.sizeX + 10;
            Snake.sizeY = Snake.sizeY - 10;
          
      }
      else{
        if(Snake.initX + Snake.sizeX < Snake.width){      
            Snake.initX = Snake.initX + 10;
            Snake.endX = Snake.endX + 10;
        } 
        else{
            if(this.endX == this.width){
                this.endX = 0;   
            }
            else{
                if(this.endX < this.width){
                    this.endX = this.endX + 10;
                }
                
            }
            
        }
          
      }
      this.updateTracePath();
      
  },
    
    moveToLeft: function(){
      Snake.removeTail();
      
      if(Snake.sizeY > 10){
            if(this.endX == 0){
                this.endX = this.width;   
            }
          else{
                this.endX = Snake.endX - 10;   
          }
            
            Snake.initY = Snake.initY + 10;
            Snake.sizeX = Snake.sizeX + 10;
            Snake.sizeY = Snake.sizeY - 10;
          
      }
      else{
        if(Snake.endX > 0){      
            Snake.initX = Snake.initX - 10;
            Snake.endX = Snake.endX - 10;
        } 
        else{
            if(this.endX == 0){
                this.endX = this.width;   
            }
            
            
        }
          
      }
      this.updateTracePath();
      
  },
    
  printTrace: function(){
      for(var i in this.tracePath){
        console.log(this.tracePath[i]);   
      }
  }
  
  
      
};
Snake.init(200,200);