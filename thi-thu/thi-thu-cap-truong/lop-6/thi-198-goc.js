/* TAT - Bài thi 198 câu gốc. Nguồn đề: ảnh do người dùng cung cấp.
   Không suy đoán đáp án từ ảnh. Chỉ tự chấm các đáp án có trong tệp xác minh. */
'use strict';
const TOTAL=198;
const STORAGE='tat-grade6-original198-exam-v2';
const $=id=>document.getElementById(id);
const pad=n=>String(n).padStart(3,'0');
const imagePath=n=>`./mau-198/cau-${pad(n)}.webp`;
const normalize=s=>String(s??'').normalize('NFKC').trim().toLowerCase().replace(/[‘’‛`´＇ʼ]/g,"'").replace(/\s+([,;:.!?])/g,'$1').replace(/\s+/g,' ').replace(/[.!?]+$/,'').trim();
// Phân loại 198 ảnh gốc (A–D, Đúng/Sai, điền từ, xếp thẻ) theo ảnh thật.
// Không suy luận đáp án chính thức từ loại câu hay thứ tự các thẻ.
const questionMeta=new Map();
const fresh=()=>Array.from({length:TOTAL},(_,i)=>{const m=questionMeta.get(i+1)||{};const tiles=Array.isArray(m.tiles)?m.tiles.slice():[];return {mode:m.mode||'text',choice:'',text:'',order:'',tileSource:tiles.join(' | '),tiles,picked:[],locked:false,mark:null};});
async function loadQuestionMeta(){
 try{
  const r=await fetch('./mau-198-interactive.json',{cache:'no-store'});
  if(!r.ok)throw new Error('HTTP '+r.status);
  const data=await r.json();
  if(!Array.isArray(data.questions)||data.questions.length!==TOTAL)throw new Error('Không đủ 198 câu');
  for(const m of data.questions){
   if(!Number.isInteger(m.number)||m.number<1||m.number>TOTAL||!['choice','tf','text','order'].includes(m.mode))throw new Error('Dữ liệu loại câu không hợp lệ');
   questionMeta.set(m.number,m);
  }
  if(!started&&!finished)answers=fresh();
 }catch(e){console.error('Không tải được phân loại câu gốc:',e);$('metaNotice').textContent='⚠️ Không tải được loại câu tương tác. Hãy kiểm tra mau-198-interactive.json trên máy chủ.';$('metaNotice').classList.remove('hidden');}
}
let answers=fresh(),cur=0,started=false,finished=false,timer=null,reviewTimer=null,deadline=0,reviewDeadline=0,unlimited=false,reviewUnlimited=false,reviewIndex=0,answerKeys=new Map(),starting=false;
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({version:2,answers,finished,updatedAt:new Date().toISOString()}))}catch(_e){}}
function response(q){return (q.mode==='choice'||q.mode==='tf')?q.choice:q.mode==='order'?q.order:q.text}
function counts(){return answers.reduce((a,q)=>{if(q.locked)a.answered++;return a},{answered:0})}
function showStatus(msg,type=''){const el=$('answerStatus');el.textContent=msg;el.className='answer-status '+type}
function renderClock(){if(unlimited){$('clock').textContent='∞';return}const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('clock').textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;if(started&&!finished&&left===0)finishExam(true)}
function startTimer(){clearInterval(timer);unlimited=typeof window.ioeHasUltimate==='function'&&window.ioeHasUltimate();deadline=unlimited?0:Date.now()+30*60*1000;renderClock();if(!unlimited)timer=setInterval(renderClock,1000)}
function nav(){const start=Math.floor(cur/10)*10;const nav=$('nav');nav.replaceChildren();for(let i=start;i<Math.min(TOTAL,start+10);i++){const b=document.createElement('button');b.type='button';b.className='nav-item'+(i===cur?' active':'')+(answers[i].locked?' answered':'');b.textContent=String(i+1);b.title=`Câu ${i+1}${answers[i].locked?' (đã xác nhận)':''}`;b.addEventListener('click',()=>go(i));nav.appendChild(b)}$('pagePrev').disabled=start===0;$('pageNext').disabled=start+10>=TOTAL}
function render(){const q=answers[cur];nav();$('progress').textContent=`Câu ${cur+1}/${TOTAL}`;$('savedCount').textContent=`Đã xác nhận ${counts().answered}/${TOTAL}`;$('progressFill').style.width=`${counts().answered/TOTAL*100}%`;$('questionTitle').textContent=`Câu ${cur+1} / ${TOTAL}`;$('answerType').textContent=({choice:'Chọn đáp án A–D trong ảnh',tf:'Chọn ĐÚNG hoặc SAI',order:'Sắp xếp thẻ từ theo đúng thứ tự',text:'Điền từ hoặc câu theo ảnh'})[q.mode]||'Trả lời câu hỏi';$('questionImage').src=imagePath(cur+1);$('questionImage').alt=`Ảnh câu hỏi gốc số ${cur+1}`;$('imageError').classList.add('hidden');
 document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.mode===q.mode);b.disabled=q.locked;b.setAttribute('aria-pressed',String(b.dataset.mode===q.mode))});
 $('choiceBox').classList.toggle('hidden',q.mode!=='choice');$('tfBox').classList.toggle('hidden',q.mode!=='tf');$('textBox').classList.toggle('hidden',q.mode!=='text');$('orderBox').classList.toggle('hidden',q.mode!=='order');
 document.querySelectorAll('[data-choice]').forEach(b=>{b.classList.toggle('selected',b.dataset.choice===q.choice);b.disabled=q.locked;b.setAttribute('aria-pressed',String(b.dataset.choice===q.choice))});
 $('textAnswer').value=q.text;$('textAnswer').disabled=q.locked;$('orderAnswer').value=q.order;$('orderAnswer').disabled=q.locked;$('tileSource').value=q.tileSource;$('tileSource').disabled=q.locked;$('makeTiles').disabled=q.locked;
 renderTiles();$('answerBtn').disabled=q.locked;$('answerBtn').textContent=q.locked?'✓ ĐÃ XÁC NHẬN':'ANSWER';
 showStatus(q.locked?'🔒 Đáp án đã khóa. Có thể xem lại nhưng không thể sửa.':'',q.locked?'ok':'');
}
function go(i){if(!started||finished||i<0||i>=TOTAL)return;cur=i;render();}
function renderTiles(){const q=answers[cur];const bank=$('tileBank'),selected=$('tileSelected');bank.replaceChildren();selected.replaceChildren();const used=new Set(q.picked);
 q.tiles.forEach((word,i)=>{if(used.has(i))return;const b=document.createElement('button');b.type='button';b.textContent=word;b.disabled=q.locked;b.addEventListener('click',()=>{if(q.locked)return;q.picked.push(i);q.order=q.picked.map(j=>q.tiles[j]).join(' ');$('orderAnswer').value=q.order;renderTiles();save()});bank.appendChild(b)});
 q.picked.forEach((index,pos)=>{const b=document.createElement('button');b.type='button';b.textContent=q.tiles[index];b.disabled=q.locked;b.title='Chạm để bỏ thẻ';b.addEventListener('click',()=>{if(q.locked)return;q.picked.splice(pos,1);q.order=q.picked.map(j=>q.tiles[j]).join(' ');$('orderAnswer').value=q.order;renderTiles();save()});selected.appendChild(b)});
 if(!q.tiles.length)bank.textContent='Chưa có thẻ. Nhập các từ từ ảnh và nhấn “Tạo thẻ”.';if(!q.picked.length)selected.textContent='Chạm các thẻ phía trên theo thứ tự đúng.';
}
function submitAnswer(){
 if(!started||finished)return;
 const q=answers[cur];if(q.locked)return;
 if(!response(q).trim()){
  showStatus('⚠️ Hãy chọn đáp án hoặc nhập đầy đủ câu trả lời trước khi nhấn ANSWER.','warn');return;
 }
 if(q.mode==='order'&&q.picked.length>0&&q.picked.length!==q.tiles.length){
  showStatus('⚠️ Hãy xếp đủ tất cả thẻ từ trước khi nhấn ANSWER.','warn');return;
 }
 // Khóa vĩnh viễn câu hiện tại, sau đó tự chuyển sang câu chưa trả lời kế tiếp.
 const answeredAt=cur;q.locked=true;save();
 let nextUnanswered=-1;
 for(let offset=1;offset<TOTAL;offset++){
  const i=(answeredAt+offset)%TOTAL;
  if(!answers[i].locked){nextUnanswered=i;break;}
 }
 if(nextUnanswered>=0){go(nextUnanswered);return;}
 finishExam(true);
}
async function loadKeys(){try{const r=await fetch('./mau-198-answers.json',{cache:'no-store'});if(!r.ok)return;const data=await r.json();if(!Array.isArray(data.answers))return;answerKeys=new Map(data.answers.filter(x=>(data.verified===true||x.verified===true)&&Number.isInteger(x.number)&&x.number>=1&&x.number<=TOTAL&&typeof x.answer==='string'&&x.answer.trim()).map(x=>[x.number,x]));}catch(e){console.warn('Không đọc được tệp đáp án xác minh:',e)}}
function grade(i){const q=answers[i];if(!q.locked)return 'unanswered';const key=answerKeys.get(i+1);if(key){return normalize(response(q))===normalize(key.answer)?'correct':'wrong'}return q.mark||'ungraded'}
function tally(){const c={answered:0,unanswered:0,ungraded:0,correct:0,wrong:0,verified:0,manual:0};for(let i=0;i<TOTAL;i++){const v=grade(i);if(v==='unanswered')c.unanswered++;else{c.answered++;if(v==='correct')c.correct++;else if(v==='wrong')c.wrong++;else c.ungraded++;if(answerKeys.has(i+1))c.verified++;else if(answers[i].mark)c.manual++;}}return c}
function resultSummary(){const c=tally();const boxes=[['Đã trả lời',c.answered+'/'+TOTAL],['Chưa trả lời',c.unanswered],['Đúng (đã chấm)',c.correct],['Sai (đã chấm)',c.wrong],['Chưa chấm',c.ungraded]];const el=$('resultSummary');el.replaceChildren();boxes.forEach(([label,value])=>{const box=document.createElement('div'),name=document.createElement('span'),strong=document.createElement('strong');name.textContent=label;strong.textContent=String(value);box.append(name,strong);el.appendChild(box)});const msg=document.createElement('p');msg.style.gridColumn='1/-1';msg.style.fontSize='13px';msg.textContent=`Đáp án đã xác minh: ${answerKeys.size}/${TOTAL} câu. Kết quả đúng/sai gồm cả phần tự đánh dấu (${c.manual} câu), không phải điểm chính thức nếu chưa có đủ đáp án.`;el.appendChild(msg)}
function stopReviewTimer(){clearInterval(reviewTimer);reviewTimer=null}
function startReviewTimer(){stopReviewTimer();reviewUnlimited=typeof window.ioeHasActivePremium==='function'&&window.ioeHasActivePremium();const plan=typeof window.ioeGetPlanType==='function'?window.ioeGetPlanType():'free';if(reviewUnlimited){$('resultAccess').textContent=(plan==='ultimate'?'💎 ULTIMATE':'⭐ PREMIUM')+' — Không giới hạn thời gian xem lại bài.';return}reviewDeadline=Date.now()+5*60*1000;function tick(){const left=Math.max(0,Math.ceil((reviewDeadline-Date.now())/1000));$('resultAccess').textContent=`⏳ Tài khoản thường: còn ${Math.floor(left/60)}:${String(left%60).padStart(2,'0')} để xem lại bài. Hết thời gian sẽ trở về trang thi thử.`;if(left===0){stopReviewTimer();window.ioeExamActive=false;window.location.replace('./index.html')}}tick();reviewTimer=setInterval(tick,1000)}
function finishExam(auto=false){if(!started||finished)return;if(!auto&&!confirm(`Nộp bài 198 câu gốc? Bạn đã xác nhận ${counts().answered}/${TOTAL} câu. Các câu chưa có đáp án chuẩn sẽ được ghi là “chưa chấm”.`))return;
 clearInterval(timer);timer=null;finished=true;started=false;save();$('exam').classList.add('hidden');$('welcome').classList.add('hidden');$('results').classList.remove('hidden');reviewIndex=0;resultSummary();renderReview();startReviewTimer();
 if(answerKeys.size===TOTAL&&typeof window.ioeSaveResult==='function'){
  const c=tally();window.ioeSaveResult({score:c.correct*10,correct:c.correct,answered:c.answered,total:TOTAL,mode:'original198',finishedAt:new Date().toISOString()});
 }
}
function filteredIndices(){const f=$('reviewFilter').value;return Array.from({length:TOTAL},(_,i)=>i).filter(i=>f==='all'||grade(i)===f)}
function renderReview(){const arr=filteredIndices();if(!arr.length){$('reviewTitle').textContent='Không có câu phù hợp bộ lọc';$('reviewImage').classList.add('hidden');$('reviewGiven').textContent='';$('reviewKey').textContent='';$('reviewExplain').textContent='';$('manualMark').classList.add('hidden');$('reviewPrev').disabled=true;$('reviewNext').disabled=true;return}
 if(!arr.includes(reviewIndex))reviewIndex=arr[0];const i=reviewIndex,q=answers[i],key=answerKeys.get(i+1),g=grade(i);
 $('reviewImage').classList.remove('hidden');$('reviewTitle').textContent=`Câu ${i+1} / ${TOTAL} — ${g==='correct'?'✓ Đúng':g==='wrong'?'✕ Sai':g==='unanswered'?'Chưa trả lời':'Chưa chấm'}`;$('reviewImage').src=imagePath(i+1);$('reviewImage').alt=`Ảnh câu hỏi gốc số ${i+1}`;
 $('reviewGiven').textContent=`Bạn đã trả lời: ${q.locked?(response(q)||'(trống)'):'Chưa trả lời'}`;
 $('reviewKey').textContent=key?`Đáp án đã xác minh: ${key.answer}`:'Đáp án chuẩn: chưa được cung cấp hoặc xác minh';
 $('reviewExplain').textContent=key&&key.explanation?`Giải thích: ${key.explanation}`:'';
 $('manualMark').classList.toggle('hidden',!q.locked||!!key);
 document.querySelectorAll('[data-mark]').forEach(b=>b.classList.toggle('selected',(q.mark||'none')===b.dataset.mark));
 $('reviewJump').value=i+1;$('reviewPrev').disabled=arr.indexOf(i)===0;$('reviewNext').disabled=arr.indexOf(i)===arr.length-1;
}
function reviewStep(dir){const arr=filteredIndices();const p=arr.indexOf(reviewIndex);if(p<0)return;const next=arr[p+dir];if(next!==undefined){reviewIndex=next;renderReview()}}
function exportAnswers(){const payload={source:'TAT lớp 6 - 198 ảnh câu hỏi gốc',exportedAt:new Date().toISOString(),answers:answers.map((q,i)=>({number:i+1,image:imagePath(i+1),mode:q.mode,answer:q.locked?response(q):null,submitted:q.locked,grading:grade(i),manualMark:q.mark}))};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='TAT_lop6_198_cau_goc_cau_tra_loi.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}
async function beginExam(){if(starting||started)return;if(!window.ioeAllowed){$('ioeGate').classList.remove('ioe-hide');return}
 starting=true;$('begin').disabled=true;$('begin').textContent='ĐANG KIỂM TRA LƯỢT THI…';
 try{await metaReady;await window.ioeClaimAttempt();answers=fresh();cur=0;finished=false;started=true;window.ioeExamActive=true;$('welcome').classList.add('hidden');$('results').classList.add('hidden');$('exam').classList.remove('hidden');$('ioeGate').classList.add('ioe-hide');startTimer();render();save();}
 catch(e){alert(e?.message||'Không thể bắt đầu bài thi. Vui lòng thử lại.');}
 finally{starting=false;$('begin').disabled=false;$('begin').textContent='▶ BẮT ĐẦU THI 198 CÂU'}
}
function resetExam(){clearInterval(timer);timer=null;stopReviewTimer();started=false;finished=false;window.ioeExamActive=false;answers=fresh();cur=0;save();$('results').classList.add('hidden');$('exam').classList.add('hidden');$('welcome').classList.remove('hidden');$('clock').textContent='30:00'}
window.ioeReturnToStart=()=>{if(started)resetExam()};window.ioeForceReturnToStart=resetExam;
$('begin').addEventListener('click',beginExam);$('finishBtn').addEventListener('click',()=>finishExam(false));$('pagePrev').addEventListener('click',()=>go(Math.max(0,Math.floor(cur/10)*10-10)));$('pageNext').addEventListener('click',()=>go(Math.min(TOTAL-1,Math.floor(cur/10)*10+10)));$('answerBtn').addEventListener('click',submitAnswer);
$('questionImage').addEventListener('error',()=>$('imageError').classList.remove('hidden'));$('questionImage').addEventListener('load',()=>$('imageError').classList.add('hidden'));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{const q=answers[cur];if(q.locked)return;q.mode=b.dataset.mode;render();save()}));
document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{const q=answers[cur];if(q.locked)return;q.choice=b.dataset.choice;render();save()}));
$('textAnswer').addEventListener('input',e=>{if(!answers[cur].locked){answers[cur].text=e.target.value;save()}});
$('orderAnswer').addEventListener('input',e=>{if(!answers[cur].locked){answers[cur].order=e.target.value;answers[cur].picked=[];renderTiles();save()}});
$('tileSource').addEventListener('input',e=>{if(!answers[cur].locked){answers[cur].tileSource=e.target.value;save()}});
$('makeTiles').addEventListener('click',()=>{const q=answers[cur];if(q.locked)return;q.tiles=q.tileSource.split('|').map(s=>s.trim()).filter(Boolean).slice(0,24);q.picked=[];q.order='';$('orderAnswer').value='';renderTiles();save()});
$('reviewFilter').addEventListener('change',()=>{const arr=filteredIndices();if(arr.length)reviewIndex=arr[0];renderReview()});$('reviewPrev').addEventListener('click',()=>reviewStep(-1));$('reviewNext').addEventListener('click',()=>reviewStep(1));$('reviewJump').addEventListener('change',e=>{const n=Number(e.target.value)-1;if(Number.isInteger(n)&&n>=0&&n<TOTAL){reviewIndex=n;$('reviewFilter').value='all'}renderReview()});
document.querySelectorAll('[data-mark]').forEach(b=>b.addEventListener('click',()=>{const q=answers[reviewIndex];if(!q.locked||answerKeys.has(reviewIndex+1))return;q.mark=b.dataset.mark==='none'?null:b.dataset.mark;save();resultSummary();renderReview()}));
$('exportBtn').addEventListener('click',exportAnswers);$('newExam').addEventListener('click',()=>{if(confirm('Làm lại 198 câu sẽ xóa bài làm hiện tại. Bạn muốn tiếp tục?'))resetExam()});
document.addEventListener('keydown',e=>{if(!started||finished)return;if(e.key==='Enter'&&(e.target.id==='textAnswer'||e.target.id==='orderAnswer')&&(e.ctrlKey||e.metaKey)){e.preventDefault();submitAnswer()}});
const metaReady=loadQuestionMeta();
loadKeys();
