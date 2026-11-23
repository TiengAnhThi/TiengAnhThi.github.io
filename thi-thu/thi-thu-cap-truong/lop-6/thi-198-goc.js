/* TAT — 198 ảnh mẫu chuyển thành ngân hàng câu hỏi tương tác.
 * Trắc nghiệm/Đúng-Sai: chạm là khóa + tự chuyển. Điền từ/sắp xếp: nút ANSWER.
 * Câu thiếu âm thanh hoặc dữ liệu, câu trùng: chỉ tham khảo, không yêu cầu làm. */
'use strict';
const $=id=>document.getElementById(id);
const STORAGE='tat-grade6-original198-native-v3';
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[‘’‛`´＇ʼ]/g,"'").replace(/[^a-z0-9\p{L}]+/gu,' ').replace(/\s+/g,' ').trim();
const pad=n=>String(n).padStart(3,'0');
const sourceImage=n=>`./mau-198/cau-${pad(n)}.webp`;
let all=[],questions=[],references=[],answers=[],cur=0,started=false,finished=false,starting=false;
let timer=null,reviewTimer=null,deadline=0,reviewDeadline=0,unlimited=false,reviewUnlimited=false,reviewIndex=0;
function fresh(){return questions.map(()=>({value:null,picked:[],locked:false,lockedAt:null}));}
const currentQ=()=>questions[cur];
const currentA=()=>answers[cur];
function countLocked(){return answers.filter(a=>a.locked).length;}
function response(i){const q=questions[i],a=answers[i];return q.mode==='order'?a.picked.map(j=>q.tiles[j]).join(' '):a.value;}
function correct(i){const q=questions[i];if(!answers[i].locked)return null;const v=response(i);return [q.answer,...(q.alternatives||[])].some(expected=>normalize(v)===normalize(expected));}
function tally(){let answered=0,correctCount=0;for(let i=0;i<questions.length;i++){if(answers[i].locked){answered++;if(correct(i))correctCount++;}}return {answered,correct:correctCount,wrong:answered-correctCount,unanswered:questions.length-answered,reference:references.length};}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({version:3,answers,updatedAt:new Date().toISOString(),finished}));}catch(_){}}
function setStatus(s,warn=false){const el=$('answerStatus');el.textContent=s;el.className='answer-status'+(warn?' warn':'');}
function showReferenceList(target){const el=$(target);if(!el)return;el.replaceChildren();references.forEach(q=>{const item=document.createElement('div');item.className='ref-item';const title=document.createElement('b');title.textContent=`Câu gốc ${q.number} — CÂU THAM KHẢO, KHÔNG CẦN LÀM`;const p=document.createElement('div');p.textContent=q.reason;const details=document.createElement('details'),summary=document.createElement('summary'),img=document.createElement('img');summary.textContent='Xem ảnh gốc (chỉ để tham khảo)';img.loading='lazy';img.alt=`Ảnh tham khảo câu ${q.number}`;details.addEventListener('toggle',()=>{if(details.open&&!img.src)img.src=sourceImage(q.number)});details.append(summary,img);item.append(title,p,details);el.append(item);});}
async function loadData(){const r=await fetch('./mau-198-tat-data.json',{cache:'no-store'});if(!r.ok)throw new Error('Không tải được dữ liệu TAT ('+r.status+').');const data=await r.json();if(!Array.isArray(data.questions)||data.questions.length!==198)throw new Error('Dữ liệu chưa đủ 198 câu mẫu.');const ids=new Set();for(const q of data.questions){if(!Number.isInteger(q.number)||q.number<1||q.number>198||ids.has(q.number))throw new Error('Trùng mã câu hỏi.');ids.add(q.number);if(q.mode!=='reference'&&(!q.prompt||!q.answer))throw new Error('Thiếu nội dung/đáp án câu '+q.number);if(q.mode==='choice'&&(!Array.isArray(q.options)||q.options.length!==4))throw new Error('Thiếu lựa chọn câu '+q.number);if(q.mode==='order'&&(!Array.isArray(q.tiles)||q.tiles.length<2))throw new Error('Thiếu thẻ câu '+q.number);}
 all=data.questions;questions=all.filter(q=>q.mode!=='reference');references=all.filter(q=>q.mode==='reference');answers=fresh();$('begin').textContent=`▶ BẮT ĐẦU LÀM ${questions.length} CÂU`;
 showReferenceList('referenceList');showReferenceList('resultReferences');return data;}
let dataReady=loadData().catch(err=>{$('begin').disabled=true;$('begin').textContent='Không tải được dữ liệu câu hỏi';const msg=$('welcome').querySelector('.notice');if(msg)msg.textContent='⚠️ '+err.message+' Vui lòng tải lại trang sau khi kiểm tra mau-198-tat-data.json.';throw err;});
function nav(){const start=Math.floor(cur/10)*10;const el=$('nav');el.replaceChildren();for(let i=start;i<Math.min(start+10,questions.length);i++){const b=document.createElement('button');b.type='button';b.className='nav-item'+(i===cur?' active':'')+(answers[i].locked?' answered':'');b.textContent=String(i+1);b.title=`Câu ${i+1} · mẫu gốc #${questions[i].number}${answers[i].locked?' · đã khóa':''}`;b.addEventListener('click',()=>go(i));el.append(b);}$('pagePrev').disabled=start===0;$('pageNext').disabled=start+10>=questions.length;}
function renderOrder(){const q=currentQ(),a=currentA(),bank=$('tileBank'),selected=$('tileSelected');bank.replaceChildren();selected.replaceChildren();const used=new Set(a.picked);
 a.picked.forEach((j,pos)=>{const b=document.createElement('button');b.type='button';b.textContent=q.tiles[j];b.disabled=a.locked;b.title='Chạm để bỏ thẻ';b.addEventListener('click',()=>{if(a.locked)return;a.picked.splice(pos,1);renderOrder();save();});selected.append(b)});
 q.tiles.forEach((word,j)=>{if(used.has(j))return;const b=document.createElement('button');b.type='button';b.textContent=word;b.disabled=a.locked;b.addEventListener('click',()=>{if(a.locked)return;a.picked.push(j);renderOrder();save();});bank.append(b)});
}
function render(){if(!started||finished||!questions.length)return;const q=currentQ(),a=currentA();nav();$('progress').textContent=`Câu ${cur+1}/${questions.length}`;$('savedCount').textContent=`Đã trả lời ${countLocked()}/${questions.length}`;$('progressFill').style.width=(100*countLocked()/questions.length)+'%';$('questionTitle').textContent=`Câu ${cur+1} / ${questions.length}`;$('sourceLabel').textContent=`Nguồn: câu gốc #${q.number}`;
 $('questionPrompt').textContent=q.prompt;
 const passage=$('passage');passage.classList.toggle('hidden',!q.passage);passage.textContent=q.passage||'';
 const ill=$('questionIllustration');ill.classList.toggle('hidden',!q.illustration);if(q.illustration)ill.src=q.illustration;else ill.removeAttribute('src');
 $('choiceBox').classList.toggle('hidden',!['choice','tf'].includes(q.mode));$('textBox').classList.toggle('hidden',q.mode!=='text');$('orderBox').classList.toggle('hidden',q.mode!=='order');$('answerControls').classList.toggle('hidden',q.mode==='choice'||q.mode==='tf');$('answerControls').style.display=(q.mode==='choice'||q.mode==='tf')?'none':'';
 $('answerType').textContent=({choice:'Chạm một đáp án để khóa và tự chuyển câu tiếp theo.',tf:'Chạm ĐÚNG hoặc SAI để khóa và tự chuyển.',text:'Điền đúng phần còn thiếu, sau đó nhấn ANSWER.',order:'Sắp xếp đầy đủ thẻ từ, sau đó nhấn ANSWER.'})[q.mode]||'';
 if(q.mode==='choice'||q.mode==='tf'){const box=$('choiceBox');box.replaceChildren();const choices=q.mode==='tf'?['TRUE','FALSE']:q.options;choices.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.textContent=q.mode==='tf'?(text==='TRUE'?'✓ TRUE (ĐÚNG)':'✕ FALSE (SAI)'):`${'ABCD'[i]}. ${text}`;b.disabled=a.locked;b.addEventListener('click',()=>selectChoice(q.mode==='tf'?text:'ABCD'[i]));box.append(b)});}
 if(q.mode==='text'){$('textAnswer').value=String(a.value??'');$('textAnswer').disabled=a.locked;}
 if(q.mode==='order')renderOrder();
 if(q.mode!=='text')window.tatOriginalDecorate?.($('questionPrompt'));
 window.tatOriginalDecorate?.($('passage'));
 if(q.mode==='choice'||q.mode==='tf')document.querySelectorAll('#choiceBox button').forEach(b=>window.tatOriginalDecorate?.(b));
 $('answerBtn').disabled=a.locked;setStatus(a.locked?'🔒 Đã khóa đáp án. Có thể xem lại bằng thanh số câu phía trên.':'');
}
function go(i){if(!started||finished||i<0||i>=questions.length)return;cur=i;render();}
function selectChoice(value){if(!started||finished||currentA().locked)return;const q=currentQ();if(q.mode!=='choice'&&q.mode!=='tf')return;currentA().value=value;confirmCurrent();}
function submitAnswer(){if(!started||finished||currentA().locked)return;const q=currentQ(),a=currentA();if(q.mode==='text'){a.value=$('textAnswer').value.trim();if(!a.value){setStatus('⚠️ Hãy nhập phần còn thiếu trước khi nhấn ANSWER.',true);$('textAnswer').focus();return;}}
 else if(q.mode==='order'){if(a.picked.length!==q.tiles.length){setStatus('⚠️ Hãy xếp đủ tất cả thẻ trước khi nhấn ANSWER.',true);return;}}
 else return;
 confirmCurrent();}
function confirmCurrent(){const a=currentA();if(a.locked)return;a.locked=true;a.lockedAt=new Date().toISOString();save();const just=cur;let next=-1;for(let offset=1;offset<questions.length;offset++){const i=(just+offset)%questions.length;if(!answers[i].locked){next=i;break;}}if(next>=0){go(next);return;}finishExam(true);}
function renderClock(){if(unlimited){$('clock').textContent='∞';return;}const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('clock').textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;if(started&&!finished&&left===0)finishExam(true);}
function startTimer(){clearInterval(timer);unlimited=typeof window.ioeHasUltimate==='function'&&window.ioeHasUltimate();deadline=unlimited?0:Date.now()+30*60*1000;renderClock();if(!unlimited)timer=setInterval(renderClock,1000);}
function stopReviewTimer(){clearInterval(reviewTimer);reviewTimer=null;}
function startReviewTimer(){stopReviewTimer();reviewUnlimited=typeof window.ioeHasActivePremium==='function'&&window.ioeHasActivePremium();const plan=typeof window.ioeGetPlanType==='function'?window.ioeGetPlanType():'free';if(reviewUnlimited){$('resultAccess').textContent=(plan==='ultimate'?'💎 ULTIMATE':'⭐ PREMIUM')+' — Không giới hạn thời gian xem lại bài.';return;}reviewDeadline=Date.now()+5*60*1000;function tick(){const left=Math.max(0,Math.ceil((reviewDeadline-Date.now())/1000));$('resultAccess').textContent=`⏳ Tài khoản thường: còn ${Math.floor(left/60)}:${String(left%60).padStart(2,'0')} để xem lại và đọc lời giải.`;if(left===0){stopReviewTimer();window.ioeExamActive=false;window.location.replace('./index.html');}}tick();reviewTimer=setInterval(tick,1000);}
function resultSummary(){const t=tally(),score=t.correct*10,maximum=questions.length*10;const box=$('resultSummary');box.replaceChildren();[['Điểm TAT',score+' / '+maximum],['Đã làm',t.answered+' / '+questions.length],['Đúng',t.correct],['Sai',t.wrong],['Chưa trả lời',t.unanswered],['Tham khảo (bỏ qua)',t.reference]].forEach(([label,value])=>{const item=document.createElement('div'),l=document.createElement('span'),v=document.createElement('strong');l.textContent=label;v.textContent=String(value);item.append(l,v);box.append(item);});}
function filteredIndices(){const f=$('reviewFilter').value;return questions.map((q,i)=>i).filter(i=>f==='all'||(f==='unanswered'&&!answers[i].locked)||(f==='correct'&&correct(i)===true)||(f==='wrong'&&correct(i)===false));}
function reviewFilterTabs(){
 const f=$('reviewFilter').value;
 for(const kind of ['wrong','correct']){
  const tab=$(kind==='wrong'?'reviewWrongTab':'reviewCorrectTab');
  tab.classList.toggle('active',f===kind);
  tab.setAttribute('aria-pressed',String(f===kind));
 }
}
function reviewFullQuestion(q){
 const el=$('reviewOptions');el.replaceChildren();
 if(q.mode==='choice'){
  const title=document.createElement('div');title.className='tat-review-heading';title.textContent='Các lựa chọn A–D';el.append(title);
  q.options.forEach((opt,j)=>{
   const letter='ABCD'[j],b=document.createElement('div');
   b.className='tat-review-option'+(letter===q.answer?' correct':'')+(letter===answers[reviewIndex].value&&letter!==q.answer?' wrong':'');
   b.textContent=`${letter}. ${opt}`;el.append(b);
  });
 }else if(q.mode==='order'){
  const title=document.createElement('div');title.className='tat-review-heading';title.textContent='Các thẻ từ trong đề gốc';el.append(title);
  const bank=document.createElement('div');bank.className='tat-review-tiles';
  q.tiles.forEach(tile=>{const b=document.createElement('span');b.textContent=tile;bank.append(b)});
  el.append(bank);
 }else if(q.mode==='tf'){
  const hint=document.createElement('p');hint.className='tat-review-hint';hint.textContent='Dạng Đúng / Sai — đối chiếu với đoạn văn hoặc hình minh họa phía trên.';el.append(hint);
 }
}
function reviewDetailedExplanation(q,i,result){
 const box=$('reviewExplain');box.replaceChildren();
 const h=document.createElement('h4');h.textContent='📘 Giải thích chi tiết';box.append(h);
 const helper=window.TATOriginalReview;
 if(!helper){const p=document.createElement('p');p.textContent=q.explanation||'Đối chiếu nội dung câu hỏi và đáp án TAT.';box.append(p);return;}
 const detail=helper.explain(q,response(i),result);
 for(const step of detail.steps){
  const section=document.createElement('section');section.className='tat-review-explain-step';
  const label=document.createElement('strong');label.textContent=step.label+': ';
  const body=document.createElement('span');body.textContent=step.text;
  section.append(label,body);box.append(section);
 }
}
function renderReview(){const arr=filteredIndices();if(!arr.length){$('reviewTitle').textContent='Không có câu phù hợp bộ lọc';['reviewPassage','reviewIllustration','reviewPrompt','reviewGiven','reviewKey','reviewExplain','reviewOptions','reviewImage'].forEach(id=>{const el=$(id);if(el)el.textContent='';});$('reviewPrev').disabled=true;$('reviewNext').disabled=true;reviewFilterTabs();return;}
 if(!arr.includes(reviewIndex))reviewIndex=arr[0];const i=reviewIndex,q=questions[i],a=answers[i],result=correct(i),pos=arr.indexOf(i);$('reviewCounter').textContent=`Câu ${pos+1}/${arr.length} (gốc #${q.number})`;$('reviewTitle').textContent=`Câu ${i+1} · Mẫu #${q.number} — ${result===null?'Chưa trả lời':result?'✓ Đúng':'✕ Sai'}`;
 $('reviewPassage').textContent=q.passage||'';$('reviewPassage').classList.toggle('hidden',!q.passage);const ill=$('reviewIllustration');ill.classList.toggle('hidden',!q.illustration);if(q.illustration)ill.src=q.illustration;else ill.removeAttribute('src');
 $('reviewPrompt').textContent=q.prompt;window.tatOriginalDecorate?.($('reviewPrompt'));window.tatOriginalDecorate?.($('reviewPassage'));
 reviewFullQuestion(q);
 const display=q.mode==='choice'?(v=>{const idx='ABCD'.indexOf(v);return idx<0?String(v):`${v}. ${q.options[idx]}`;}):v=>String(v);
 const user=a.locked?(q.mode==='tf'?(response(i)==='TRUE'?'ĐÚNG (TRUE)':'SAI (FALSE)'):display(response(i))):'Chưa trả lời';
 const expected=q.mode==='choice'?display(q.answer):q.mode==='tf'?(q.answer==='TRUE'?'ĐÚNG (TRUE)':'SAI (FALSE)'):q.answer;
 $('reviewGiven').textContent=`Bạn đã trả lời: ${user}`;
 $('reviewKey').textContent=`Đáp án đúng (TAT): ${expected}`;
 const card=$('reviewCard');card.classList.toggle('tat-review-wrong',result===false);card.classList.toggle('tat-review-correct',result===true);card.classList.toggle('tat-review-unanswered',result===null);
 reviewDetailedExplanation(q,i,result);
 reviewFilterTabs();
 $('reviewImage').src=sourceImage(q.number);$('reviewPrev').disabled=pos===0;$('reviewNext').disabled=pos===arr.length-1;
}
function reviewStep(d){const arr=filteredIndices(),p=arr.indexOf(reviewIndex);if(p<0)return;const next=arr[p+d];if(next!==undefined){reviewIndex=next;renderReview();}}
function finishExam(auto=false){if(!started||finished)return;if(!auto&&!confirm(`Nộp bài? Bạn đã làm ${countLocked()}/${questions.length} câu. Những câu chưa làm sẽ được tính chưa trả lời.`))return;clearInterval(timer);timer=null;started=false;finished=true;window.ioeExamActive=false;save();$('exam').classList.add('hidden');$('welcome').classList.add('hidden');$('results').classList.remove('hidden');reviewIndex=0;resultSummary();$('reviewWrongCount').textContent=String(tally().wrong);$('reviewCorrectCount').textContent=String(tally().correct);$('reviewFilter').value=tally().wrong?'wrong':'all';reviewIndex=filteredIndices()[0]??0;renderReview();startReviewTimer();const t=tally();if(typeof window.ioeSaveResult==='function'){try{window.ioeSaveResult({score:t.correct*10,correct:t.correct,answered:t.answered,total:questions.length,mode:'original198-native',finishedAt:new Date().toISOString()});}catch(e){console.warn('Không lưu được kết quả TAT:',e);}}}
function exportAnswers(){const payload={source:'TAT lớp 6 — 198 ảnh mẫu đã nhập thành dữ liệu TAT',generatedAt:new Date().toISOString(),totalOriginal:198,practice:questions.length,reference:references.map(x=>({number:x.number,reason:x.reason})),answers:questions.map((q,i)=>({sourceNumber:q.number,mode:q.mode,prompt:q.prompt,answer:answers[i].locked?response(i):null,locked:answers[i].locked,correct:correct(i),tatKey:q.answer}))};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='TAT_lop6_198_anh_175_cau_lam_bai.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function beginExam(){if(starting||started)return;if(!window.ioeAllowed){$('ioeGate').classList.remove('ioe-hide');return;}starting=true;$('begin').disabled=true;$('begin').textContent='ĐANG KIỂM TRA LƯỢT…';try{await dataReady;await window.ioeClaimAttempt();answers=fresh();cur=0;finished=false;started=true;window.ioeExamActive=true;$('welcome').classList.add('hidden');$('results').classList.add('hidden');$('exam').classList.remove('hidden');$('ioeGate').classList.add('ioe-hide');startTimer();render();save();}catch(e){alert(e?.message||'Không thể bắt đầu. Vui lòng thử lại.');}finally{starting=false;$('begin').disabled=false;$('begin').textContent=`▶ BẮT ĐẦU LÀM ${questions.length||175} CÂU`;}}
function resetExam(){clearInterval(timer);timer=null;stopReviewTimer();started=false;finished=false;window.ioeExamActive=false;answers=fresh();cur=0;save();$('results').classList.add('hidden');$('exam').classList.add('hidden');$('welcome').classList.remove('hidden');$('clock').textContent='30:00';}
window.ioeReturnToStart=()=>{if(started)resetExam();};window.ioeForceReturnToStart=resetExam;
$('begin').addEventListener('click',beginExam);
$('showReferences').addEventListener('click',()=>$('referenceList').classList.toggle('hidden'));
$('finishBtn').addEventListener('click',()=>finishExam(false));
$('pagePrev').addEventListener('click',()=>go(Math.max(0,Math.floor(cur/10)*10-10)));
$('pageNext').addEventListener('click',()=>go(Math.min(questions.length-1,Math.floor(cur/10)*10+10)));
$('answerBtn').addEventListener('click',submitAnswer);
$('textAnswer').addEventListener('input',e=>{if(!started||currentA().locked)return;currentA().value=e.target.value;save();});
$('textAnswer').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submitAnswer();}});
$('reviewFilter').addEventListener('change',()=>{reviewIndex=filteredIndices()[0]??0;renderReview();reviewFilterTabs();});
for(const kind of ['wrong','correct'])$(kind==='wrong'?'reviewWrongTab':'reviewCorrectTab').addEventListener('click',()=>{$('reviewFilter').value=kind;reviewIndex=filteredIndices()[0]??0;renderReview();reviewFilterTabs();});
$('reviewPrev').addEventListener('click',()=>reviewStep(-1));$('reviewNext').addEventListener('click',()=>reviewStep(1));
$('exportBtn').addEventListener('click',exportAnswers);
$('newExam').addEventListener('click',()=>{if(confirm('Làm lại sẽ xóa bài làm hiện tại. Bạn có muốn tiếp tục?'))resetExam();});
