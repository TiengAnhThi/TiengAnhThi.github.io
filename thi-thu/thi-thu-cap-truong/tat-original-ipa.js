/* Shared TAT pronunciation assistance for original-question exams. */
(()=>{'use strict';
const GUIDE={
 'uː':['“u” dài','Chu tròn môi, giữ tiếng “u” lâu; ví dụ âm gạch chân trong food.'],
 'ʊ':['“u” ngắn, thả lỏng','Môi tròn nhẹ, âm ngắn hơn /uː/; ví dụ trong good.'],
 'iː':['“i” dài','Kéo âm “i” và hơi căng môi như khi mỉm cười.'],
 'ɪ':['“i” ngắn','Âm “i” ngắn, lưỡi thả lỏng hơn /iː/.'],
 'e':['“e” ngắn','Miệng mở vừa, giống “e” nhưng ngắn; ví dụ bed, pen.'],
 'æ':['“e-a” mở rộng','Mở miệng rộng hơn khi nói “e”; âm nằm giữa “e” và “a”, như cat.'],
 'ʌ':['“â” ngắn','Miệng mở vừa, âm gần “â” nhưng ngắn và không tròn môi; như cup.'],
 'ɒ':['“o” ngắn','Giọng Anh–Anh: mở miệng, tròn môi nhẹ; âm gần “o” ngắn trong hot.'],
 'ɑː':['“a” dài','Há miệng rộng, kéo dài âm “a”; ví dụ trong father.'],
 'ɔː':['“o” dài, tròn môi','Hạ hàm vừa, tròn môi và kéo âm; ví dụ law.'],
 'ə':['“ơ” rất nhẹ','Âm trung tính, đọc nhẹ và nhanh trong âm tiết không nhấn.'],
 'ɜː':['“ơ” dài','Lưỡi ở giữa miệng, giữ âm “ơ” lâu hơn âm /ə/.'],
 'ɚ':['“ơ” có âm r (Mỹ)','Đưa đầu lưỡi hơi cong về sau, không cuộn quá mạnh.'],
 'ɝ':['“ơ” nhấn, có âm r (Mỹ)','Kéo âm “ơ” có màu r; thường ở âm tiết được nhấn.'],
 'eɪ':['“ây”','Bắt đầu gần “e” rồi chuyển lên “i” nhẹ, như name.'],
 'aɪ':['“ai”','Mở miệng ở âm “a”, lướt nhanh sang âm “i”, như bike.'],
 'oʊ':['“âu/ô-u”','Bắt đầu gần âm “ô”, khép dần môi về “u”; như show (giọng Mỹ).'],
 'əʊ':['“âu/ô-u”','Bắt đầu bằng âm “ơ” nhẹ, trượt sang “u”; như go (giọng Anh–Anh).'],
 'aʊ':['“ao” chuyển sang “u”','Mở miệng như nói “a”, lướt tới “u”; như now.'],
 'ɔɪ':['“oi”','Bắt đầu bằng âm “o” tròn môi rồi chuyển sang “i”; như boy.'],
 'ʃ':['“sh” / “s” gió','Môi hơi chu, đẩy hơi liên tục; như âm đầu trong she.'],
 'ʒ':['“gi” rung nhẹ','Tương tự /ʃ/ nhưng có rung dây thanh; như trong vision.'],
 'tʃ':['“ch” bật hơi','Bắt đầu bằng t rồi bật ra “ch”, có luồng hơi; như chair.'],
 'dʒ':['“ch” có rung giọng','Gần “ch” nhưng bật nhẹ và rung dây thanh; như jam.'],
 'θ':['“th” thổi hơi','Đặt đầu lưỡi giữa hai hàm răng, thổi hơi nhẹ, không rung cổ; như think.'],
 'ð':['“th” rung giọng','Đặt đầu lưỡi giữa hai hàm răng, đẩy hơi và rung giọng; như they.'],
 's':['“s” không rung','Giống âm “s” xì hơi, không rung cổ; như see.'],
 'z':['“d/z” có rung','Gần âm “d” tiếng Bắc (âm z), xì hơi đồng thời rung cổ; như zoo.'],
 'k':['“k/c” bật nhẹ','Âm “c/k” vô thanh, bật hơi từ phía sau lưỡi; như cat.'],
 'g':['“g” rung giọng','Giống “g” trong ga nhưng phát âm ngắn, có rung cổ; như go.'],
 'j':['“y”','Gần âm “y” trong yêu, nối sang nguyên âm sau; như yes.'],
 'p':['“p” bật hơi','Khép hai môi rồi bật hơi mạnh; như pen.'],
 'b':['“b”','Khép hai môi và bật ra với rung giọng; như boy.'],
 't':['“t” bật hơi','Chạm đầu lưỡi lên lợi trên rồi bật ra; như tea.'],
 'd':['“đ” ngắn','Đầu lưỡi chạm lợi trên, bật ra có rung; như dog.'],
 'f':['“ph” thổi hơi','Răng trên đặt lên môi dưới, thổi hơi; như fish.'],
 'v':['“v” rung','Răng trên chạm môi dưới, có rung giọng; như van.'],
 'h':['“h” nhẹ','Thở hơi qua thanh quản, không rung cổ; như hat.'],
 'l':['“l”','Đầu lưỡi chạm lợi trên, bật âm “l” rõ; như leg.'],
 'r':['“r” tiếng Anh','Cong lưỡi nhẹ ra sau, không rung đầu lưỡi như r tiếng Việt; như red.'],
 'm':['“m”','Khép môi, phát âm qua mũi; như mum.'],
 'n':['“n”','Đầu lưỡi chạm lợi trên, hơi thoát qua mũi; như nine.'],
 'ŋ':['“ng”','Âm “ng” cuối trong “sang”, phát ra từ phía sau lưỡi; như sing.'],
 'w':['“u” lướt','Chu môi như nói “u” rồi chuyển nhanh vào nguyên âm sau; như we.'],
 'juː':['“iu” dài','Bắt đầu với âm “y” /j/, rồi nối sang “u” dài /uː/; như pupil.']
};
const WORDS={
 'think':'θɪŋk','bath':'bæθ','father':'ˈfɑːðər','this':'ðɪs','they':'ðeɪ',
 'moon':'muːn','book':'bʊk','foot':'fʊt','food':'fuːd','good':'ɡʊd',
 'cat':'kæt','bag':'bæɡ','game':'ɡeɪm','face':'feɪs','lake':'leɪk',
 'sit':'sɪt','six':'sɪks','fish':'fɪʃ','milk':'mɪlk','pen':'pen',
 'bed':'bed','hen':'hen','see':'siː','sea':'siː','pea':'piː',
 'time':'taɪm','bike':'baɪk','dog':'dɒɡ','chin':'tʃɪn',
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const phonemes=Object.keys(GUIDE).sort((a,b)=>b.length-a.length);
function syllable(word){const ipa=WORDS[word.toLowerCase()];if(!ipa)return null;const parts=[];let remain=ipa.replace(/[\/ˈˌ. ]/g,'');while(remain){const ph=phonemes.find(x=>remain.startsWith(x));if(ph){parts.push(ph);remain=remain.slice(ph.length)}else remain=remain.slice(1)}return {ipa,parts};}
function decorate(el){if(!el||el.querySelector('.tat-original-word'))return;const text=el.textContent;const frag=document.createDocumentFragment();let last=0;const re=/[A-Za-z]+(?:['’-][A-Za-z]+)*/g;for(const m of text.matchAll(re)){frag.append(document.createTextNode(text.slice(last,m.index)));const w=m[0],info=syllable(w);if(info){const btn=document.createElement('button');btn.type='button';btn.className='tat-original-word';btn.textContent=w;btn.dataset.word=w;btn.setAttribute('aria-label','Xem phiên âm và nghe từ '+w);frag.append(btn)}else frag.append(document.createTextNode(w));last=m.index+w.length}frag.append(document.createTextNode(text.slice(last)));el.replaceChildren(frag)}
window.tatOriginalDecorate=decorate;
function speak(word){if(!('speechSynthesis' in window))return false;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang='en-GB';u.rate=.82;window.speechSynthesis.speak(u);return true}
let pinned=null;
function close(){const tip=document.getElementById('tatOriginalIpaTip');if(tip)tip.hidden=true;pinned=null}
function show(btn){const w=btn.dataset.word,info=syllable(w);if(!info)return;let tip=document.getElementById('tatOriginalIpaTip');if(!tip){tip=document.createElement('div');tip.id='tatOriginalIpaTip';tip.setAttribute('role','dialog');document.body.append(tip)}tip.innerHTML='<b>'+esc(w)+'</b><div class="original-ipa-full">/'+esc(info.ipa)+'/</div>'+info.parts.map(ph=>'<div class="original-ipa-part"><strong>/'+esc(ph)+'/</strong> — Đọc gần đúng: '+esc(GUIDE[ph][0])+'<small>'+esc(GUIDE[ph][1])+'</small></div>').join('')+'<div class="original-ipa-actions"><button type="button" data-original-sound="'+esc(w)+'">🔊 Nghe âm</button><button type="button" data-original-word="'+esc(w)+'">▶ Nghe '+esc(w)+'</button><button type="button" data-original-close="1">✕</button></div><small>Cách đọc tiếng Việt chỉ mang tính gần đúng.</small>';tip.hidden=false;pinned=btn;const r=btn.getBoundingClientRect();const width=tip.offsetWidth,height=tip.offsetHeight;tip.style.left=Math.max(8,Math.min(innerWidth-width-8,r.left))+'px';tip.style.top=Math.max(8,Math.min(innerHeight-height-8,r.bottom+10))+'px'}
document.addEventListener('click',e=>{const btn=e.target.closest('.tat-original-word');if(btn){e.preventDefault();e.stopPropagation();show(btn);return}const w=e.target.closest('[data-original-word],[data-original-sound]');if(w){e.preventDefault();speak(w.dataset.originalWord||w.dataset.originalSound);return}if(e.target.closest('[data-original-close]')){close();return}if(!e.target.closest('#tatOriginalIpaTip'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
