/* TAT shared listening and review assistance. Does not reveal answers during an exam. */
(()=>{'use strict';
const synth=window.speechSynthesis;
const $=s=>document.querySelector(s);
const clean=s=>String(s||'').replace(/\s+/g,' ').trim().slice(0,900);
const textOf=s=>clean($(s)?.innerText||$(s)?.textContent);
function visible(el){return !!(el&&el.getClientRects().length&&!el.closest('.hidden,[hidden]'));}
function firstText(selectors){for(const s of selectors){const el=$(s);if(visible(el)){const t=clean(el.innerText||el.textContent);if(t)return t;}}return '';}
function speak(t,rate){if(!synth||typeof SpeechSynthesisUtterance==='undefined')return false;t=clean(t);if(!t)return false;synth.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=rate;const voices=synth.getVoices()||[];u.voice=voices.find(v=>/^en-US/i.test(v.lang))||voices.find(v=>/^en/i.test(v.lang))||null;synth.speak(u);return true;}
function mount(){if($('#tat-shared-pronunciation'))return;const root=$('#exam')||$('main')||document.body;
const bar=document.createElement('aside');bar.id='tat-shared-pronunciation';bar.setAttribute('aria-label','Công cụ nghe và phát âm TAT');
bar.innerHTML=`<strong>🔊 Công cụ nghe và phát âm TAT</strong><div class="tat-speech-actions"><button type="button" data-tat-say="question">▶ Nghe câu hỏi</button><button type="button" data-tat-say="slow">🐢 Nghe chậm</button><button type="button" data-tat-say="options">🔉 Nghe các lựa chọn</button><button type="button" data-tat-say="answer">▶ Nghe đáp án (sau khi nộp)</button><button type="button" data-tat-say="selected">🔊 Nghe từ được chọn</button><button type="button" data-tat-say="stop">■ Dừng</button></div><p>Chọn từ hoặc câu tiếng Anh trong đề hay lời giải để nghe riêng. Đáp án chỉ được đọc khi đã mở phần kết quả.</p><span class="tat-speech-status" role="status" aria-live="polite"></span>`;
const style=document.createElement('style');style.textContent=`#tat-shared-pronunciation{margin:14px auto;padding:13px 16px;max-width:980px;border:1px solid #85b7d9;border-radius:10px;background:#eaf4ff;color:#143d60;font:14px/1.5 Arial,sans-serif}#tat-shared-pronunciation .tat-speech-actions{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}#tat-shared-pronunciation button{padding:8px 12px;border:1px solid #8ab3d2;border-radius:6px;background:white;color:#174568;cursor:pointer;font-weight:600}#tat-shared-pronunciation button:focus-visible{outline:3px solid orange}#tat-shared-pronunciation p{margin:5px 0;font-size:12px}#tat-shared-pronunciation .tat-speech-status{font-size:12px;font-weight:bold}`;document.head.append(style);
root.prepend(bar);
const resultVisible=()=>visible($('#results'))||visible($('#result'))||visible($('#reviewCard'));
bar.addEventListener('click',e=>{const btn=e.target.closest('button[data-tat-say]');if(!btn)return;const mode=btn.dataset.tatSay,status=$('#tat-shared-pronunciation .tat-speech-status');if(mode==='stop'){synth?.cancel();status.textContent='Đã dừng.';return;}
let t='';if(mode==='selected'){t=clean(window.getSelection()?.toString());}
else if(mode==='answer'){if(!resultVisible()){status.textContent='Chỉ nghe đáp án sau khi nộp bài.';return;}t=firstText(['#reviewKey','#reviewAnswer','.expected','.tat-review-key']);}
else if(mode==='options'){t=firstText(['#choiceBox','#reviewOptions','.options','.choices','.tat-native-choices']);}
else{t=firstText(['#questionPrompt','#reviewPrompt','.tat-prompt','#questionTitle','.prompt','#reviewCard']);}
if(!t){status.textContent='Chưa có nội dung để đọc; hãy mở câu hỏi hoặc chọn từ.';return;}
status.textContent=speak(t,mode==='slow'?0.62:0.88)?'Đang đọc tiếng Anh…':'Trình duyệt không hỗ trợ phát âm.';
});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
