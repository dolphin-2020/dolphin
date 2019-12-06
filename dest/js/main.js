function _defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}!function(){var t={},r=[];function n(e){if(t[e])return t[e];var n=new Image;n.onload=function(){t[e]=n,a()&&r.forEach(function(e){e()})},t[e]=!1,n.src=e}function a(){var e=!0;for(var n in t)t.hasOwnProperty(n)&&!t[n]&&(e=!1);return e}window.Resources={load:function(e){e instanceof Array?e.forEach(function(e){n(e)}):n(e)},get:function(e){return t[e]},onReady:function(e){r.push(e)},isReady:a}}();var warn=document.querySelector(".title"),level=document.getElementById("score").querySelector("span"),lives=document.getElementById("lives").querySelector("span");function gameOver(){document.querySelector(".right").style.display="none";var e="";e=2<player.highestLevelStore?"REALLY GOOD JOB":"YOU ARE NOVICE",warn.innerHTML="GAME OVER ! HIGHTEST LEVEL:".concat(player.highestLevelStore," ").concat(e)}function recover(){document.querySelector(".right").style.display="",warn.innerHTML="AHHH, Spaceships!",player.highestLevelStore=0}var Sun=function e(){_classCallCheck(this,e),this.x=380,this.y=0},Enemy=function(){function a(e,n,t,r){_classCallCheck(this,a),this.x=e,this.y=n,this.direction=r,this.style=t,this.speed=parseInt(level.innerText)+100*Math.random()}return _createClass(a,[{key:"update",value:function(e){var n=0<arguments.length&&void 0!==e?e:1;this.x<=0?this.direction="ltr":800<=this.x&&(this.direction="rtl"),"ltr"===this.direction&&(this.x+=this.speed*n),"rtl"===this.direction&&(this.x-=this.speed*n)}}]),a}(),Player=function(){function t(e,n){_classCallCheck(this,t),this.x=e,this.y=n,this.highestLevelStore=parseInt(level.innerText)}return _createClass(t,[{key:"handleInput",value:function(e){switch(e){case"left":0<this.x&&(this.x<20?this.x=0:this.x-=30);break;case"up":0<this.y&&(this.y<20?this.y=0:this.y-=30);break;case"right":this.x<800&&(780<this.x?this.x=800:this.x+=30);break;case"down":this.y<430&&(410<this.y?this.y=430:this.y+=30)}}},{key:"update",value:function(){for(var e=!1,n=0;n<allEnemies.length;n++)Math.abs(this.x-allEnemies[n].x)<=80&&Math.abs(this.y-allEnemies[n].y)<=80&&(e=!0);if(!0===e&&(this.x=390,this.y=430,1<parseInt(lives.innerText)?lives.innerText=parseInt(lives.innerText)-1:lives.innerText=3,3===parseInt(lives.innerText)?level.innerText=0:level.innerText=level.innerText,3===parseInt(lives.innerText))){allEnemies[0].x=0,allEnemies[0].y=30,allEnemies[1].x=0,allEnemies[1].y=150,allEnemies[2].x=0,allEnemies[2].y=240,sun.x=380;for(var t=sun.y=0;t<allEnemies.length;t++)allEnemies[t].speed=parseInt(level.innerText)+100*Math.random();gameOver(),setTimeout(function(){recover()},3e3)}if(Math.abs(sun.x-this.x)<=100&&Math.abs(sun.y-this.y)<=100){this.x=390,this.y=430,level.innerText=parseInt(level.innerText)+1;for(var r=0;r<allEnemies.length;r++)allEnemies[r].speed+=100;this.highestLevelStore<parseInt(level.innerText)?this.highestLevelStore=parseInt(level.innerText):this.highestLevelStore=this.highestLevelStore}}}]),t}(),player=new Player(390,430),sun=new Sun(380,0),allEnemies=[new Enemy(0,30,"enemy4","ltr"),new Enemy(0,100,"enemy3","ltr"),new Enemy(0,220,"enemy1","ltr")];document.addEventListener("keyup",function(e){player.handleInput({37:"left",38:"up",39:"right",40:"down"}[e.keyCode])});var circleSun=0,fluctuateEnemy=0;setInterval(function(){1<parseInt(level.innerHTML)&&(circleSun>=2*Math.PI&&(moveSun=0),sun.x+=4*Math.sin(circleSun),sun.y-=4*Math.cos(circleSun),circleSun+=.1),0<parseInt(level.innerHTML)&&(fluctuateEnemy>=2*Math.PI&&(fluctuateEnemy=0),allEnemies[2].y+=3*Math.cos(fluctuateEnemy),allEnemies[1].y+=5*Math.cos(fluctuateEnemy+1),fluctuateEnemy+=.1)},50);var Engine=function(e){e.document;var n,t=e.window,r=document.getElementById("canvas"),a=r.getContext("2d");function i(){var e=Date.now();(function(n){allEnemies.forEach(function(e){e.update(n)}),player.update()})((e-n)/1e3),a.clearRect(0,0,r.width,r.height),a.drawImage(Resources.get("images/background.png"),0,0),function(){a.drawImage(Resources.get("images/sun.png"),sun.x,sun.y),player.tickCount++,player.tickCount>player.ticksPerFrame&&(player.tickCount=0,player.frameIndex++);player.frameIndex>=player.numberOfFrames&&(player.frameIndex=0);var e=Resources.get("images/player.png");a.drawImage(e,0,player.frameIndex*e.naturalHeight/player.numberOfFrames,e.naturalWidth,e.naturalHeight/player.numberOfFrames,player.x,player.y,e.naturalWidth,e.naturalHeight/player.numberOfFrames),allEnemies.forEach(function(e){e.tickCount++,e.tickCount>e.ticksPerFrame&&(e.tickCount=0,e.frameIndex++),e.frameIndex>=e.numberOfFrames&&(e.frameIndex=0);var n=Resources.get("images/".concat(e.style,"-").concat(e.direction,".png"));a.drawImage(n,0,e.frameIndex*n.naturalHeight/e.numberOfFrames,n.naturalWidth,n.naturalHeight/e.numberOfFrames,e.x,e.y,n.naturalWidth,n.naturalHeight/e.numberOfFrames)})}(),n=e,t.requestAnimationFrame(i)}r.width=900,r.height=534,Resources.load(["images/background.png","images/enemy1-ltr.png","images/enemy2-ltr.png","images/enemy3-ltr.png","images/enemy1-rtl.png","images/enemy2-rtl.png","images/enemy3-rtl.png","images/enemy4-rtl.png","images/enemy4-ltr.png","images/sun.png","images/player.png"]),Resources.onReady(function(){allEnemies.forEach(function(e){e.tickCount=0,e.ticksPerFrame=5,e.frameIndex=0,e.numberOfFrames=3}),player.tickCount=0,player.ticksPerFrame=5,player.frameIndex=0,player.numberOfFrames=2,n=Date.now(),i()}),e.ctx=a}(this);