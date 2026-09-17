import { Hono } from 'hono'

const app = new Hono()

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Pixel Adventurer</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#080b10;color:#fff;font-family:system-ui,sans-serif}.game{max-width:520px;margin:auto;min-height:100vh;background:#0b1017}.title{text-align:center;font-weight:900;font-size:22px;padding:8px}.top{display:flex;gap:7px;padding:7px}.stat{flex:1;background:#18212d;border:1px solid #3a4859;border-radius:11px;padding:7px;text-align:center;font-size:12px}.bar{height:6px;background:#381d22;border-radius:5px;margin-top:4px;overflow:hidden}.bar i{display:block;height:100%;background:#df4b45}.scene{height:67vh;min-height:470px;position:relative;overflow:hidden;background:linear-gradient(#101c2b 0 42%,#263927 42% 100%);border-block:1px solid #3b4a5d}.moon{position:absolute;right:12%;top:9%;width:45px;height:45px;border-radius:50%;background:#e6dda9;box-shadow:0 0 30px #fff5}.trees{position:absolute;inset:25% 0 0;background:linear-gradient(70deg,transparent 0 7%,#08100c 7% 14%,transparent 14% 20%,#08100c 20% 25%,transparent 25% 75%,#08100c 75% 80%,transparent 80% 86%,#08100c 86% 93%,transparent 93%);opacity:.9}.road{position:absolute;left:5%;right:5%;bottom:-5%;height:72%;background:linear-gradient(90deg,#392e26,#695945 50%,#392e26);clip-path:polygon(43% 0,57% 0,100% 100%,0 100%)}.road:after{content:"";position:absolute;left:48%;top:0;width:4%;height:100%;background:repeating-linear-gradient(#c5a268 0 22px,transparent 22px 50px);opacity:.55}.enemy{position:absolute;top:29%;left:50%;transform:translateX(-50%);text-align:center;z-index:5}.mob{font-size:86px;filter:drop-shadow(0 10px 8px #0009);animation:idle 1.5s infinite}.ename{font-weight:900;background:#090d13dd;border:1px solid #536276;border-radius:8px;padding:5px 9px;font-size:12px}.ehp{width:150px;height:8px;background:#3a1b20;border-radius:6px;margin:5px auto}.ehp i{display:block;height:100%;background:#dc4943}.hero{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);font-size:65px;z-index:6}.dicebox{position:absolute;bottom:105px;left:50%;transform:translateX(-50%);z-index:8;text-align:center}.dice{width:70px;height:70px;border-radius:16px;border:3px solid #fff0c5;background:linear-gradient(145deg,#f5e7c4,#9c6d37);color:#24180b;display:grid;place-items:center;font-size:38px;font-weight:1000;box-shadow:0 10px 20px #0009;transform:rotate(-5deg)}.rolling{animation:roll .65s}.hint{font-size:10px;background:#090d13dd;border-radius:8px;padding:4px;margin-top:5px}.combat{position:absolute;left:10px;right:10px;bottom:10px;background:#080d15e8;border:1px solid #536276;border-radius:12px;padding:9px;text-align:center;z-index:9;font-size:13px}.slash,.dmg{position:absolute;left:50%;top:43%;z-index:10;opacity:0}.slash.on{animation:slash .35s}.dmg.on{animation:dmg .6s;color:#ffd35c;font-size:25px;font-weight:1000}.enemy.hit{animation:hit .2s}.controls{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:9px}.controls button{border:0;border-radius:12px;padding:14px;font-weight:900;background:#d39b40;color:#181006}.controls button.alt{background:#293544;color:#fff}.controls button:disabled{opacity:.35}.log{margin:0 9px 12px;padding:9px;background:#111823;border:1px solid #303d4e;border-radius:11px;font-size:12px;color:#ccd5e1}.win{position:absolute;inset:0;background:#05080ddd;z-index:20;display:none;place-items:center}.win.show{display:grid}.card{width:82%;padding:20px;text-align:center;background:#18212e;border:2px solid #c59b51;border-radius:18px}.card button{border:0;border-radius:11px;padding:12px 18px;background:#d39b40;font-weight:900}
@keyframes idle{50%{transform:translateY(-6px)}}@keyframes roll{0%{transform:rotate(-5deg) scale(1)}35%{transform:rotate(130deg) scale(1.15)}70%{transform:rotate(270deg) scale(.9)}100%{transform:rotate(355deg) scale(1)}}@keyframes slash{0%{opacity:0;transform:translate(-40px,30px) rotate(-25deg)}30%{opacity:1}100%{opacity:0;transform:translate(70px,-60px) rotate(25deg)}}@keyframes dmg{0%{opacity:0;transform:translate(-50%,10px)}25%{opacity:1}100%{opacity:0;transform:translate(-50%,-45px)}}@keyframes hit{50%{transform:translateX(-50%) scale(1.1);filter:brightness(2)}}
</style>
</head>
<body><main class="game">
<div class="title">⚔️ PIXEL ADVENTURER</div>
<div class="top"><div class="stat">❤️ <b id="hp">100</b>/100<div class="bar"><i id="hpbar" style="width:100%"></i></div></div><div class="stat">⭐ NIV.<br><b id="lvl">1</b></div><div class="stat">💰 OR<br><b id="gold">0</b></div></div>
<section class="scene"><div class="moon"></div><div class="trees"></div><div class="road"></div>
<div class="enemy" id="enemy"><div class="ename" id="ename">GOBELIN • 30 PV</div><div class="ehp"><i id="ehp" style="width:100%"></i></div><div class="mob">👹</div></div>
<div class="slash" id="slash">⚔️</div><div class="dmg" id="dmg">-5</div><div class="hero">🧙</div>
<div class="dicebox"><div class="dice" id="dice">🎲</div><div class="hint">Le dé décide le nombre de coups</div></div>
<div class="combat" id="combat">⚔️ Engagement imminent...</div>
<div class="win" id="win"><div class="card"><h2>🏆 VICTOIRE</h2><p id="reward">+15 or</p><button onclick="nextFight()">➡️ CONTINUER</button></div></div>
</section>
<div class="controls"><button id="engage">⚔️ ENGAGER</button><button id="next" class="alt" disabled>➡️ AVANCER</button></div>
<div class="log" id="log">Quand le combat commence, un dé est lancé automatiquement.</div>
</main>
<script>
let hp=100,ehp=30,maxE=30,lvl=1,gold=0,round=0,busy=false,ended=false;
const $=x=>document.getElementById(x);const wait=m=>new Promise(r=>setTimeout(r,m));
function render(){$('hp').textContent=hp;$('lvl').textContent=lvl;$('gold').textContent=gold;$('hpbar').style.width=hp+'%';$('ehp').style.width=Math.max(0,ehp/maxE*100)+'%';$('ename').textContent=ehp>0?'GOBELIN • '+ehp+' PV':'GOBELIN VAINCU';$('engage').disabled=busy||ended;$('next').disabled=!ended}
async function fight(){
 if(busy||ended)return;busy=true;render();$('combat').textContent='⚔️ Combat engagé — lancement du dé...';$('log').textContent='Le dé résout le combat : son résultat indique directement le nombre de tes attaques.';await wait(500);
 const d=1+Math.floor(Math.random()*6);$('dice').textContent=d;$('dice').classList.remove('rolling');void $('dice').offsetWidth;$('dice').classList.add('rolling');$('combat').textContent='🎲 '+d+' → '+d+' attaque'+(d>1?'s':'');await wait(600);
 let total=0;
 for(let i=0;i<d&&ehp>0;i++){const damage=4+Math.floor(Math.random()*5);total+=damage;ehp=Math.max(0,ehp-damage);$('dmg').textContent='-'+damage;$('dmg').classList.remove('on');void $('dmg').offsetWidth;$('dmg').classList.add('on');$('slash').classList.remove('on');void $('slash').offsetWidth;$('slash').classList.add('on');$('enemy').classList.add('hit');setTimeout(()=>$('enemy').classList.remove('hit'),180);render();await wait(380)}
 if(ehp<=0){gold+=15;lvl++;ended=true;busy=false;$('combat').textContent='💀 Gobelin vaincu !';$('reward').textContent='+15 or • Niveau '+lvl;$('win').classList.add('show');$('log').textContent='Dé = '+d+' : '+d+' attaques, '+total+' dégâts. Victoire !';render();return}
 await wait(250);const enemyD=1+Math.floor(Math.random()*3);let taken=0;
 for(let i=0;i<enemyD;i++){const x=2+Math.floor(Math.random()*4);taken+=x;hp=Math.max(0,hp-x);await wait(220)}
 $('combat').textContent='👹 Riposte : '+enemyD+' coup'+(enemyD>1?'s':'')+' • -'+taken+' PV';$('log').textContent='Dé = '+d+' : '+d+' attaques pour '+total+' dégâts. Le Gobelin riposte : -'+taken+' PV.';
 if(hp<=0){ended=true;$('combat').textContent='💀 Tu es vaincu';$('log').textContent='Tu es tombé au combat. Recharge la page pour recommencer.'}
 busy=false;render()
}
function nextFight(){round++;ehp=30+round*12;maxE=ehp;hp=Math.min(100,hp+18);ended=false;$('win').classList.remove('show');$('dice').textContent='🎲';$('combat').textContent='➡️ Tu avances sur le chemin...';$('log').textContent='Nouvel adversaire : Gobelin • '+ehp+' PV';render();setTimeout(fight,800)}
$('engage').onclick=fight;$('next').onclick=nextFight;render();setTimeout(fight,900)
</script></body></html>`

app.get('/', c => c.html(html))
app.get('/health', c => c.text('ok'))
export default { port: 8080, fetch: app.fetch }
