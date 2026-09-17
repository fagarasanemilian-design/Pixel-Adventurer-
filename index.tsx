import { Hono } from 'hono'

const app = new Hono()

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Pixel Adventurer</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#0d1117;color:#fff;font-family:system-ui,sans-serif}
button{font:inherit}.game{min-height:100vh;max-width:520px;margin:auto;padding:14px;background:linear-gradient(#172333,#0b0e13)}
.title{text-align:center;font-weight:900;font-size:23px;margin:3px 0 10px}.top{display:flex;justify-content:space-between;gap:7px}
.stat{background:#202a39;border:1px solid #3b4a60;border-radius:12px;padding:8px 10px;font-size:13px}
.scene{height:55vh;min-height:390px;border-radius:18px;border:2px solid #46556b;position:relative;overflow:hidden;background:linear-gradient(#263c49 0 48%,#16291e 48%)}
.road{position:absolute;left:25%;width:50%;top:0;height:100%;background:#665746;clip-path:polygon(30% 0,70% 0,100% 100%,0 100%)}
.pathline{position:absolute;left:50%;top:0;width:5px;height:100%;background:repeating-linear-gradient(#e0c17d 0 28px,transparent 28px 58px);transform:translateX(-50%);opacity:.7}
.node{position:absolute;left:50%;transform:translateX(-50%);width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#29384b;border:3px solid #c8d4e4;font-size:25px;z-index:2}
.hero{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);font-size:54px;z-index:4}
.enemy{position:absolute;top:27%;left:50%;transform:translateX(-50%);font-size:72px;z-index:4}
.label{position:absolute;top:18%;left:50%;transform:translateX(-50%);background:#111a;padding:5px 10px;border-radius:10px;font-weight:700;white-space:nowrap;z-index:5}
.hp{position:absolute;top:12px;left:12px;right:12px;height:12px;background:#351e24;border-radius:8px;overflow:hidden;z-index:5}
.hp i{display:block;height:100%;background:#e74c3c}.combat{position:absolute;bottom:12px;left:12px;right:12px;text-align:center;background:#101722dd;border:1px solid #56657b;border-radius:14px;padding:9px;z-index:6}
.dice{font-size:36px;font-weight:900}.controls{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.controls button{border:0;border-radius:14px;padding:15px;font-weight:800;background:#d39b3d;color:#17120b}.controls button:disabled{opacity:.45}
.log{margin-top:10px;background:#151d28;border:1px solid #334155;border-radius:12px;padding:10px;font-size:13px;min-height:48px}
</style>
</head>
<body>
<main class="game">
<div class="title">⚔️ PIXEL ADVENTURER</div>
<div class="top">
<div class="stat">❤️ <b id="hp">100</b>/100</div>
<div class="stat">⭐ Niv. <b id="lvl">1</b></div>
<div class="stat">💰 <b id="gold">0</b></div>
</div>
<section class="scene">
<div class="road"></div><div class="pathline"></div>
<div class="node" style="top:8%">🏕️</div><div class="node" style="top:39%">👹</div><div class="node" style="top:70%">❓</div>
<div class="label" id="enemyName">GOBELIN — 30 PV</div><div class="enemy">👹</div><div class="hero">🧙</div>
<div class="hp"><i id="enemyHp" style="width:100%"></i></div>
<div class="combat"><span id="dice" class="dice">🎲</span><div id="combatText">Lance le dé pour attaquer !</div></div>
</section>
<div class="controls"><button id="roll">🎲 LANCER LE DÉ</button><button id="move" disabled>➡️ AVANCER</button></div>
<div class="log" id="log">Le chemin commence. Ton premier adversaire est un Gobelin.</div>
</main>
<script>
let hp=100,ehp=30,lvl=1,gold=0,step=0;
const $=id=>document.getElementById(id);
function render(){ $('hp').textContent=hp;$('lvl').textContent=lvl;$('gold').textContent=gold;
$('enemyHp').style.width=Math.max(0,ehp)/Math.max(30,30+step*10)*100+'%';
$('enemyName').textContent=ehp>0?'GOBELIN — '+ehp+' PV':'GOBELIN VAINCU';$('move').disabled=ehp>0}
function log(t){$('log').textContent=t}
$('roll').onclick=()=>{
if(ehp<=0)return;
const d=Math.floor(Math.random()*6)+1; $('dice').textContent='🎲 '+d;
let dmg=0;for(let i=0;i<d;i++)dmg+=Math.floor(Math.random()*5)+3;
ehp=Math.max(0,ehp-dmg);hp=Math.max(0,hp-(Math.floor(Math.random()*4)+2));
$('combatText').textContent=d+' attaque'+(d>1?'s':'')+' ! −'+dmg+' dégâts';
log('Le dé donne '+d+'. Tu frappes '+d+' fois et infliges '+dmg+' dégâts.');
if(ehp===0){gold+=15;lvl++;log('👹 Gobelin vaincu ! +15 pièces. Niveau '+lvl+'. Tu peux avancer.')}
else if(hp===0)log('💀 Tu es tombé au combat. Relance pour continuer.');
render()
};
$('move').onclick=()=>{step++;ehp=30+step*10;hp=Math.min(100,hp+25);$('combatText').textContent='Nouveau combat';$('dice').textContent='🎲';log('➡️ Tu avances sur le chemin. Un nouveau Gobelin apparaît !');render()};
render();
</script>
</body></html>`

app.get('/', c => c.html(html))
app.get('/health', c => c.text('ok'))
export default { port: 8080, fetch: app.fetch }
