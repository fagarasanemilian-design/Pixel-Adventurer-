import { Hono } from 'hono'

const app = new Hono()

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Pixel Adventurer</title>
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#070b10;color:white;font-family:system-ui,sans-serif}
.game{width:100%;max-width:520px;height:100dvh;margin:auto;position:relative;overflow:hidden;background:#111}
.hud{position:absolute;top:0;left:0;right:0;z-index:20;padding:10px;display:flex;gap:7px}
.stat{flex:1;background:#101923dd;border:1px solid #607084;border-radius:12px;padding:6px;text-align:center;font-size:11px}
.hp{height:5px;background:#401b20;border-radius:5px;margin-top:4px}.hp i{display:block;height:100%;background:#e34b45}
.world{position:absolute;inset:0;overflow:hidden;background:linear-gradient(#102033 0 35%,#405b39 36% 100%)}
.moon{position:absolute;right:12%;top:10%;width:45px;height:45px;border-radius:50%;background:#eee2ae;box-shadow:0 0 35px #fff7}
.fog{position:absolute;inset:25% 0 0;background:linear-gradient(90deg,#17261caa,transparent 30%,transparent 70%,#17261caa);z-index:2}
.road{position:absolute;left:50%;top:29%;width:14%;height:90%;transform:translateX(-50%);background:linear-gradient(90deg,#352a22,#766048 50%,#352a22);clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);z-index:3}
.road:after{content:"";position:absolute;left:47%;top:0;width:6%;height:100%;background:repeating-linear-gradient(#c7a96c 0 28px,transparent 28px 70px);animation:road 1s linear infinite}
.side{position:absolute;bottom:0;width:45%;height:75%;z-index:1;background:repeating-linear-gradient(105deg,transparent 0 45px,#182a1b 46px 75px,transparent 76px 130px)}
.left{left:0}.right{right:0;transform:scaleX(-1)}
.tree{position:absolute;font-size:55px;filter:drop-shadow(0 8px 5px #0008);animation:trees 2.5s linear infinite}
.t1{left:4%;top:35%}.t2{left:12%;top:55%;animation-delay:1s}.t3{right:5%;top:43%;animation-delay:.5s}.t4{right:14%;top:65%;animation-delay:1.4s}
.hero{position:absolute;left:50%;bottom:12%;transform:translateX(-50%);font-size:72px;z-index:10;filter:drop-shadow(0 12px 8px #000b);animation:run .28s infinite alternate}
.enemy{position:absolute;left:50%;top:30%;transform:translateX(-50%) scale(.7);z-index:8;text-align:center;transition:.8s}
.enemy.far{transform:translateX(-50%) scale(.25);top:18%}.enemy.near{transform:translateX(-50%) scale(1.05);top:27%}
.mob{font-size:78px}.ename{background:#080d13dd;border:1px solid #65748a;border-radius:8px;padding:4px 8px;font-size:11px;font-weight:900}
.ehp{width:130px;height:7px;background:#431c20;border-radius:5px;margin:4px auto}.ehp i{display:block;height:100%;background:#df4b45}
.distance{position:absolute;top:17%;left:50%;transform:translateX(-50%);z-index:7;font-size:11px;background:#091019bb;padding:5px 10px;border-radius:20px}
.combat{position:absolute;left:10px;right:10px;bottom:18px;z-index:30;text-align:center;background:#080e16ee;border:1px solid #65748a;border-radius:13px;padding:9px;font-size:12px}
.diceBox{position:absolute;bottom:70px;left:50%;transform:translateX(-50%);z-index:35;text-align:center}
.dice{width:68px;height:68px;background:linear-gradient(145deg,#fff0c5,#a66d2f);color:#20170d;border:3px solid #fff5d8;border-radius:15px;display:grid;place-items:center;font-size:38px;font-weight:1000;box-shadow:0 8px 20px #000b}
.dice.roll{animation:dice .6s}
button{border:0;font-weight:900;border-radius:13px;padding:14px 25px;background:#d49a3e;color:#1b1208;font-size:15px;touch-action:manipulation}
.hidden{display:none!important}
.attack{position:absolute;left:50%;top:40%;z-index:40;font-size:50px;opacity:0}
.attack.on{animation:atk .4s}
.damage{position:absolute;left:50%;top:38%;z-index:41;color:#ffd65c;font-size:28px;font-weight:1000;opacity:0}
.damage.on{animation:dmg .6s}
.controls{position:absolute;bottom:0;left:0;right:0;z-index:50;padding:10px;text-align:center;background:linear-gradient(transparent,#070b10)}
.win{position:absolute;inset:0;z-index:100;background:#03060ddd;display:none;place-items:center}
.win.show{display:grid}.card{width:82%;text-align:center;padding:25px;background:#182331;border:2px solid #d1a34e;border-radius:20px}
.msg{position:absolute;top:48%;left:50%;transform:translate(-50%,-50%);z-index:60;font-size:18px;font-weight:900;text-align:center;opacity:0}
.msg.on{animation:pop .8s}
@keyframes run{to{transform:translateX(-50%) translateY(-5px)}} 
@keyframes road{to{background-position:0 70px}}
@keyframes trees{0%{transform:translateY(0) scale(1)}100%{transform:translateY(80px) scale(1.12)}}
@keyframes dice{0%{transform:rotate(0) scale(1)}50%{transform:rotate(220deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
@keyframes atk{0%{opacity:0;transform:translate(-100px,60px) rotate(-40deg)}40%{opacity:1}100%{opacity:0;transform:translate(90px,-60px) rotate(35deg)}}
@keyframes dmg{0%{opacity:0;transform:translate(-50%,20px)}25%{opacity:1}100%{opacity:0;transform:translate(-50%,-55px)}}
@keyframes pop{0%{opacity:0;transform:translate(-50%,-50%) scale(.5)}30%{opacity:1;transform:translate(-50%,-50%) scale(1.15)}100%{opacity:0}}
</style>
</head>
<body>
<main class="game">
<div class="hud">
<div class="stat">❤️ <b id="hp">100</b>/100<div class="hp"><i id="hpbar"></i></div></div>
<div class="stat">⭐ NIV.<br><b id="lvl">1</b></div>
<div class="stat">💰 OR<br><b id="gold">0</b></div>
</div>

<section class="world">
<div class="moon"></div>
<div class="side left"></div><div class="side right"></div>
<div class="tree t1">🌲</div><div class="tree t2">🌲</div>
<div class="tree t3">🌲</div><div class="tree t4">🌲</div>
<div class="fog"></div>
<div class="road"></div>
<div class="distance" id="distance">🏃 Exploration...</div>

<div class="enemy far" id="enemy">
<div class="ename" id="ename">GOBELIN</div>
<div class="ehp"><i id="ehp"></i></div>
<div class="mob">👹</div>
</div>

<div class="hero">🧙</div>
<div class="attack" id="attack">⚔️</div>
<div class="damage" id="damage">-5</div>
<div class="msg" id="msg">⚔️ COMBAT !</div>

<div class="diceBox hidden" id="diceBox">
<div class="dice" id="dice">?</div>
<div style="font-size:10px;margin-top:5px">Lance le dé pour attaquer</div>
</div>

<div class="combat" id="combat">🏃 Tu avances dans la forêt...</div>

<div class="win" id="win">
<div class="card">
<h2>🏆 VICTOIRE</h2>
<p id="reward">+15 💰</p>
<button id="continue">➡️ CONTINUER</button>
</div>
</div>
</section>

<div class="controls">
<button id="start">▶️ JOUER</button>
</div>
</main>

<script>
const $=id=>document.getElementById(id)
const wait=ms=>new Promise(r=>setTimeout(r,ms))

let hp=100,lvl=1,gold=0,enemyHp=30,maxEnemy=30
let state="menu",busy=false,distance=100

function render(){
 $("hp").textContent=hp
 $("lvl").textContent=lvl
 $("gold").textContent=gold
 $("hpbar").style.width=hp+"%"
 $("ehp").style.width=Math.max(0,enemyHp/maxEnemy*100)+"%"
 $("ename").textContent=enemyHp>0?"GOBELIN • "+enemyHp+" PV":"GOBELIN VAINCU"
}

async function startGame(){
 if(state!=="menu")return
 state="run"
 $("start").classList.add("hidden")
 $("combat").textContent="🏃 Le héros court vers l'avant..."
 distance=100
 runLoop()
}

async function runLoop(){
 while(state==="run"){
  distance-=2
  $("distance").textContent="📍 "+Math.max(0,distance)+" m"
  if(distance<=0){
   state="combat"
   $("enemy").classList.remove("far")
   $("enemy").classList.add("near")
   $("distance").textContent="👹 GOBELIN !"
   $("combat").textContent="⚔️ Ennemi rencontré ! Lance ton dé."
   $("msg").textContent="⚔️ COMBAT !"
   $("msg").classList.remove("on");void $("msg").offsetWidth;$("msg").classList.add("on")
   $("diceBox").classList.remove("hidden")
   $("dice").textContent="?"
   return
  }
  await wait(120)
 }
}

async function roll(){
 if(state!=="combat"||busy)return
 busy=true
 $("dice").classList.remove("roll");void $("dice").offsetWidth;$("dice").classList.add("roll")
 await wait(600)

 const n=1+Math.floor(Math.random()*6)
 $("dice").textContent=n
 $("combat").textContent="🎲 "+n+" → "+n+" attaques !"
 await wait(350)

 let total=0

 for(let i=0;i<n && enemyHp>0;i++){
  const dmg=5+Math.floor(Math.random()*5)
  total+=dmg
  enemyHp=Math.max(0,enemyHp-dmg)

  $("damage").textContent="-"+dmg
  $("damage").classList.remove("on");void $("damage").offsetWidth;$("damage").classList.add("on")
  $("attack").classList.remove("on");void $("attack").offsetWidth;$("attack").classList.add("on")

  render()
  await wait(430)
 }

 if(enemyHp<=0){
  gold+=15
  lvl++
  render()
  $("diceBox").classList.add("hidden")
  $("combat").textContent="💀 Gobelin vaincu !"
  $("reward").textContent="+15 💰 • Niveau "+lvl
  $("win").classList.add("show")
  state="victory"
  busy=false
  return
 }

 await wait(300)

 const counter=1+Math.floor(Math.random()*3)
 let taken=0

 for(let i=0;i<counter;i++){
  const dmg=2+Math.floor(Math.random()*4)
  hp=Math.max(0,hp-dmg)
  taken+=dmg
  render()
  await wait(250)
 }

 $("combat").textContent="👹 Riposte : -"+taken+" PV"

 if(hp<=0){
  state="dead"
  $("diceBox").classList.add("hidden")
  $("combat").textContent="💀 Tu es mort."
  busy=false
  return
 }

 busy=false
}

async function continueGame(){
 $("win").classList.remove("show")
 enemyHp=30+(lvl-1)*8
 maxEnemy=enemyHp
 hp=Math.min(100,hp+15)
 render()

 $("enemy").classList.remove("near")
 $("enemy").classList.add("far")
 $("diceBox").classList.add("hidden")
 $("combat").textContent="🏃 Nouveau chemin..."
 state="run"
 distance=100
 runLoop()
}

$("start").addEventListener("click",startGame)
$("dice").addEventListener("click",roll)
$("continue").addEventListener("click",continueGame)

render()
</script>
</body>
</html>`

app.get('/',c=>c.html(html))
app.get('/play',c=>c.html(html))
app.get('/health',c=>c.text('ok'))

export default {port:8080,fetch:app.fetch}
