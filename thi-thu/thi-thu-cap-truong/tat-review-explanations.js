/* TAT - lời giải bài gốc lớp 3 và lớp 6.
 * Dùng cùng cách phân tích câu sai như phần ôn tập TAT, giữ nguyên dữ liệu/đáp án gốc.
 * Chỉ suy luận quy tắc từ nội dung đã có; không tự nhận là đáp án chính thức. */
(function(){
'use strict';
function tatPhanTichBoSung(q){
 if(!q||q.type!=='order')return '';
 const sentence=String(q.answer||'').trim().replace(/[.!?]+$/,'');
 const words=sentence.split(/\s+/).filter(Boolean);
 if(words.length<2)return '';
 const low=words.map(x=>x.toLowerCase());
 const be=['am','is','are','was','were'];
 const aux=['do','does','did','can','could','will','would','should','must','have','has'];
 const verbs=['ride','rides','play','plays','go','goes','study','studies','read','reads','wash','washes','watch','watches','like','likes','eat','eats','drink','drinks','have','has','live','lives','visit','visits','help','helps','walk','walks','run','runs','get','gets','make','makes','take','takes','see','sees','want','wants','love','loves','speak','speaks','learn','learns','listen','listens','write','writes','buy','buys','work','works','clean','cleans','cook','cooks','sleep','sleeps','sit','sits','stand','stands','open','opens','close','closes','draw','draws','sing','sings','dance','dances','swim','swims'];
 const times=['right now','at the moment','on sundays','on mondays','on tuesdays','on wednesdays','on thursdays','on fridays','on saturdays','after school','before school','every day','every morning','every afternoon','every evening','every night','last night','last week','next week','in the morning','in the afternoon','in the evening','today','tomorrow','yesterday','now'];
 let time='';let core=sentence;
 for(const t of times.sort((a,b)=>b.length-a.length))if(core.toLowerCase().endsWith(' '+t)){time=core.slice(-t.length);core=core.slice(0,-t.length).trim();break;}
 let w=core.split(/\s+/);let l=w.map(x=>x.toLowerCase());
 let question=/\?$/.test(String(q.answer||''));
 let wh=/^(what|where|when|why|who|how|which|whose)$/i.test(w[0]||'');
 let start=0, subject='',helper='',verb='',object='',freq='';
 if(question && (wh||aux.includes(l[0])||be.includes(l[0]))){
   let lead=wh?1:0;let h=l[lead];
   if(aux.includes(h)||be.includes(h)){
     helper=w[lead];subject=w[lead+1]||'';start=lead+2;
     if(wh)helper=w[0]+' + '+helper;
   }else return '';
 }else{
   let vi=l.findIndex((x,i)=>i>0&&(be.includes(x)||aux.includes(x)||verbs.includes(x)||/ing$/.test(x)||/ed$/.test(x)));
   if(vi<1)return '';
   subject=w.slice(0,vi).join(' ');start=vi;
 }
 if(!subject)return '';
 if(!question){
   if(be.includes(l[start])||aux.includes(l[start])){helper=w[start++];if(['not',"n't"].includes(l[start]))helper+=' '+w[start++];}
 }
 if(['always','usually','often','sometimes','never'].includes(l[start]))freq=w[start++];
 if(!question && helper && ['always','usually','often','sometimes','never'].includes(l[start]))freq=w[start++];
 if(w[start])verb=w[start++];
 if(verb.toLowerCase()==='not'&&w[start]){helper+=' not';verb=w[start++];}
 if(!verb && helper && be.includes(helper.toLowerCase()))verb=helper,helper='';
 if(!verb)return '';
 object=w.slice(start).join(' ');
 let form='S + V + (O) + (thời gian)';
 if(/\b(am|is|are)\b/i.test(helper)&&/ing$/i.test(verb))form='S + am/is/are + V-ing + (O) + (thời gian)';
 else if(/\b(do|does|did)\s+not\b/i.test(helper))form='S + do/does/did not + V nguyên mẫu + (O) + (thời gian)';
 else if(question)form=wh?'Từ để hỏi + trợ động từ/to be + S + V + (phần còn lại)?':'Trợ động từ/to be + S + V + (phần còn lại)?';
 else if(be.includes(verb.toLowerCase()))form='S + am/is/are + bổ ngữ + (thời gian)';
 else if(freq)form='S + trạng từ tần suất + V + (O) + (thời gian)';
 const lines=['📘 PHÂN TÍCH BỔ SUNG','Công thức tổng quát: '+form,'S – Chủ ngữ: '+subject+' (người/vật được nói đến).'];
 if(helper)lines.push('Trợ động từ / to be: '+helper+'.');
 if(freq)lines.push('Trạng từ tần suất: '+freq+'.');
 lines.push('V – Động từ: '+verb+'.');
 if(object)lines.push((be.includes(verb.toLowerCase())?'Bổ ngữ: ':'O / phần bổ sung: ')+object+'.');
 if(time)lines.push('Cụm từ chỉ thời gian: '+time+'.');
 lines.push('Áp dụng: '+[subject,helper,freq,verb,object,time].filter(Boolean).join(' + ')+'.');
 lines.push('Ghi nhớ: S = chủ ngữ; V = động từ; O = tân ngữ. Không phải câu nào cũng có tân ngữ.');
 return lines.join('\n');
}

function ioeGiaiThichSapXep(q){
 const a=String(q.answer||'').trim();
 if(!a)return 'Ghép các từ thành một câu hoàn chỉnh, đặt chủ ngữ trước động từ và kiểm tra dấu câu.';
 const low=a.toLowerCase();
 const parts=[];
 const add=(x)=>{if(!parts.includes(x))parts.push(x)};
 const isQuestion=/\?$/.test(a);
 const who=/^(what|where|when|why|who|whose|which|how)\b/i.test(a);
 if(who)add('Từ để hỏi đứng đầu câu; tiếp theo là trợ động từ hoặc động từ to be, rồi đến chủ ngữ và phần còn lại.');
 else if(/^(do|does|did|is|are|am|can|could|will|would|should|have|has)\b/i.test(a)&&isQuestion)add('Đây là câu hỏi: đưa trợ động từ hoặc động từ to be lên trước chủ ngữ.');
 else if(/^(please |don't |do not |let's |open |close |look |listen |put |stand |sit )/i.test(a))add('Đây là câu yêu cầu hoặc mệnh lệnh: bắt đầu bằng động từ hoặc từ chỉ dẫn.');
 else add('Đặt chủ ngữ (người hoặc vật được nói đến) trước cụm động từ.');
 if(/\b(always|usually|often|sometimes|never)\b/i.test(a))add('Trạng từ chỉ tần suất như usually (thường) đứng trước động từ thường, nhưng đứng sau am/is/are.');
 if(/\b(am|is|are)\s+\w+ing\b/i.test(a))add('Thì hiện tại tiếp diễn: am/is/are + động từ thêm -ing, diễn tả hành động đang xảy ra.');
 else if(/\b(don't|doesn't|do not|does not)\b/i.test(a))add('Câu phủ định hiện tại đơn dùng do not/does not + động từ nguyên mẫu.');
 else if(/\b(he|she|it|my brother|my sister|my mother|my father|lan|nam|mai)\b/i.test(a)&&/\b(plays|washes|watches|reads|goes|does|has|likes|studies)\b/i.test(a))add('Chủ ngữ ngôi thứ ba số ít ở hiện tại đơn thường làm động từ thêm -s hoặc -es.');
 if(/\b(taller|shorter|bigger|smaller|older|younger|better|more\s+\w+)\s+than\b/i.test(a))add('Cấu trúc so sánh hơn: tính từ so sánh + than (hơn).');
 if(/\b(after school|before dinner|every day|every morning|every evening|on sundays|at the moment|right now|tomorrow|yesterday)\b/i.test(a))add('Cụm từ chỉ thời gian thường đặt ở cuối câu để cho biết khi nào hành động diễn ra.');
 if(/\b(in|on|under|behind|between|next to|near|at)\b/i.test(a))add('Giữ giới từ chỉ nơi chốn hoặc thời gian đi cùng cụm danh từ phía sau nó.');
 const dict={
  'my brother':'anh trai tôi','my sister':'chị/em gái tôi','my mother':'mẹ tôi','my father':'bố tôi','my best friend':'bạn thân nhất của tôi','i':'tôi','we':'chúng tôi','they':'họ','he':'cậu ấy','she':'cô ấy',
  'usually':'thường','always':'luôn luôn','often':'thường xuyên','sometimes':'đôi khi','never':'không bao giờ',
  'washes the dishes':'rửa bát','does my homework':'làm bài tập về nhà','do my homework':'làm bài tập về nhà','plays badminton':'chơi cầu lông','reads comics':'đọc truyện tranh','watches cartoons':'xem phim hoạt hình','goes to school':'đi học','after school':'sau giờ học','before dinner':'trước bữa tối','every day':'mỗi ngày','tomorrow':'ngày mai','right now':'ngay lúc này','at the moment':'lúc này','on sundays':'vào các ngày Chủ nhật',
  'is playing badminton':'đang chơi cầu lông','is reading comics':'đang đọc truyện tranh','is studying english':'đang học tiếng Anh','wants to':'muốn','does not':'không','do not':'không','my house':'nhà tôi','the library':'thư viện','the park':'công viên','near':'gần','between':'ở giữa','and':'và','is':'là/ở','are':'là/ở','the computer room':'phòng máy tính'};
 let translated='';
 let rest=low.replace(/[.!?]+$/,'').trim();
 const keys=Object.keys(dict).sort((x,y)=>y.length-x.length);
 const tokens=[];
 while(rest){let match=keys.find(k=>rest===k||rest.startsWith(k+' '));if(match){tokens.push(dict[match]);rest=rest.slice(match.length).trim()}else{const m=rest.match(/^\S+/);if(!m)break;tokens.push(null);rest=rest.slice(m[0].length).trim()}}
 if(tokens.length&&tokens.every(Boolean))translated=' Nghĩa gần đúng: '+tokens.join(' ')+'.';
 const old=String(q.explain||'').trim();
 const specific=old&& !/^(sắp xếp đúng|trật tự câu đúng|xếp từ theo thứ tự|sắp xếp các từ)/i.test(old) && old!==a ? ' Ghi nhớ thêm: '+old : '';
 return 'Câu đúng: '+a+'. '+parts.join(' ')+translated+specific;
}


const str=x=>String(x??'').trim();
const lower=x=>str(x).toLowerCase();
const sentence=s=>str(s).replace(/\s+/g,' ');
const normalize=s=>sentence(s).normalize('NFKC').toLowerCase().replace(/[^a-z0-9\p{L}]+/gu,' ').trim();
const textOption=q=>q.mode==='choice'?q.options['ABCD'.indexOf(q.answer)]||'':'';
function completed(q){
 const raw=str(q.prompt),a=str(q.answer);
 if(q.mode!=='text')return '';
 if(/_{2,}/.test(raw))return raw.replace(/_{2,}/,a);
 return raw;
}
function explainSound(q){
 const p=lower(q.prompt),opts=(q.options||[]).map(lower);
 if(p.includes('stress')){
   if(opts.includes('admire'))return 'Trọng âm: busy /ˈbɪzi/, sleepy /ˈsliːpi/, peaceful /ˈpiːsfəl/ nhấn âm tiết 1; admire /ədˈmaɪə(r)/ nhấn âm tiết 2.';
   if(opts.includes('behind'))return 'Trọng âm: clever, station, island nhấn âm tiết 1; behind /bɪˈhaɪnd/ nhấn âm tiết 2.';
   if(opts.includes('careful'))return 'Trọng âm: correct, invite, control nhấn âm tiết 2; careful /ˈkeəfəl/ nhấn âm tiết 1.';
   if(opts.includes('explain'))return 'Trọng âm: money, enter, lucky nhấn âm tiết 1; explain /ɪkˈspleɪn/ nhấn âm tiết 2.';
   return 'Xác định âm tiết được nhấn mạnh trong mỗi từ, rồi tìm từ có vị trí trọng âm khác ba từ còn lại.';
 }
 if(p.includes('(-ed)'))return 'Đuôi -ed có thể đọc /t/, /d/ hoặc /ɪd/. Booked, washed, hoped kết thúc bằng âm /t/; scared kết thúc bằng /d/.';
 if(p.includes('(u)'))return 'Funny, such, under có chữ u đọc /ʌ/; buy có chữ u nằm trong cụm uy đọc /aɪ/.';
 if(p.includes('(c)'))return 'Cathedral có chữ c đầu từ đọc /k/; ancient, delicious, ocean có chữ c tương ứng đọc /ʃ/.';
 if(p.includes('(h)'))return 'Hour có h câm; hotel, honey và house đều phát âm /h/ ở đầu từ.';
 return 'Chỉ so sánh phần được yêu cầu (âm gạch chân hoặc trọng âm), không chọn theo cách viết của toàn bộ từ.';
}
function grammar(q){
 const p=lower(q.prompt), a=lower(q.answer), correct=lower(textOption(q));
 const combined=p+' '+correct;
 if(/different sound|pronounced differently|underlined part|main stress|position of the main stress/.test(p))return explainSound(q);
 if(/odd one out/.test(p)){if((q.options||[]).some(x=>lower(x)==='animal'))return 'Animal là danh từ chỉ nhóm động vật nói chung; hippo, panda, giraffe là tên các con vật cụ thể. Từ chỉ nhóm chung là từ khác loại.';return 'Xác định nhóm nghĩa chung của ba từ; từ còn lại không cùng nhóm sẽ là đáp án.';}
 if(/part (that needs correction|needs correction)|underlined part that needs correction/.test(p)){
   if(/much interesting|most convenient/.test(p))return 'Câu có “than” cần dùng dạng so sánh hơn, ví dụ more interesting / more convenient; không dùng much interesting hoặc most convenient trong cấu trúc này.';
   if(/how much pages/.test(p))return 'Pages là danh từ đếm được số nhiều nên dùng “How many pages”, không dùng “How much pages”.';
   if(/slowlier/.test(p))return 'Trạng từ của slow là slowly; dạng so sánh hơn là more slowly, không phải slowlier.';
   if(/children receives/.test(p))return 'Children là chủ ngữ số nhiều, động từ hiện tại đơn giữ nguyên dạng receive, không thêm -s.';
   if(/when time will/.test(p))return 'Câu hỏi về thời điểm dùng “What time ...?” hoặc “When ...?”, không ghép “When time ...”.';
   return 'Kiểm tra sự hòa hợp chủ ngữ – động từ, dạng từ, giới từ và cấu trúc câu; chỉ chọn thành phần thực sự sai.';
 }
 if(/right now|at present|at the moment|look!|\bnow\b/.test(p)&&/usually|always|often|every day/.test(p))return 'Đối chiếu hai thì: thói quen dùng hiện tại đơn; hành động đang xảy ra dùng hiện tại tiếp diễn (am/is/are + V-ing).';
 if(/right now|at present|at the moment|look!|\bnow\b/.test(p))return 'Dấu hiệu thời gian cho thấy hành động đang diễn ra: dùng hiện tại tiếp diễn, S + am/is/are + V-ing; chọn am/is/are theo chủ ngữ.';
 if(/every day|usually|always|often|regularly/.test(p)&&/\b(does|do|is|are|has|have|go|goes|play|plays|watch|watches|listen|listens|drive|drives)\b/.test(combined))return 'Đây là thói quen ở hiện tại đơn. I/you/we/they dùng động từ nguyên mẫu; he/she/it thường thêm -s/-es; phủ định dùng do not/does not.';
 if(/\bthan\b|comparative|comparison sentence/.test(combined))return 'So sánh hơn: tính từ ngắn thường thêm -er + than (big → bigger); tính từ dài thường dùng more + tính từ + than. Với động từ/trạng từ, xét cấu trúc riêng.';
 if(/\b(some|any)\b/.test(combined))return 'Some thường dùng trong câu khẳng định; any thường dùng trong câu hỏi và phủ định. Chú ý cách dùng theo từng vế của câu.';
 if(/\b(should|shouldn't|must|mustn't|can|cannot)\b/.test(combined))return 'Sau động từ khuyết thiếu should/must/can, dùng động từ nguyên mẫu không “to”. Xét nghĩa để chọn lời khuyên, sự bắt buộc hoặc điều cấm.';
 if(/\b(in the morning|in the afternoon|in the evening|on friday|on monday|at night|at [0-9])\b/.test(combined))return 'Giới từ thời gian: in + buổi trong ngày; on + thứ/ngày; at + giờ hoặc địa điểm cụ thể. Đọc cả cụm thời gian trước khi chọn.';
 if(/there (is|are)|\b(is there|are there)\b/.test(combined))return 'There is đi với danh từ số ít; there are đi với danh từ số nhiều. Câu hỏi đảo is/are lên trước there.';
 if(/\b(where|what|who|which|when|why|how)\b/.test(p)&&/\?/.test(p))return 'Xác định từ hỏi (who = ai, where = ở đâu, when = khi nào, what = cái gì), rồi chọn câu trả lời đúng thông tin được hỏi.';
 if(/\b(nationality|country)\b/.test(p))return 'Phân biệt tên quốc gia (ví dụ Denmark, Argentina) với quốc tịch (ví dụ Canadian, Korean).';
 if(/look at the picture|what is (between|opposite)|according to the picture/.test(p))return 'Dựa vào đúng chi tiết trong hình: đối tượng, vị trí, màu sắc hoặc hoạt động; tránh chọn chỉ vì đáp án có từ quen thuộc.';
 if(/\b(reading|passage|text|story)\b/.test(p)&&q.passage)return 'Đọc đoạn văn kèm câu hỏi, tìm thông tin liên quan và so sánh từng lựa chọn với nội dung đã nêu.';
 if(/\b(what is the name of|which is|what is a)\b/.test(p))return 'Đây là câu phân loại từ vựng. Đọc nghĩa của từng lựa chọn, rồi xác định từ thuộc đúng nhóm được hỏi.';
 if(/\b(choose the correct sentence|correct sentence)\b/.test(p))return 'So sánh cấu trúc của bốn câu: chia động từ, giới từ, số ít/số nhiều và trật tự từ. Chỉ một câu phù hợp đầy đủ.';
 if(/\b(like|likes|hobby|favourite|favorite)\b/.test(p))return 'Đọc ngữ cảnh về sở thích và hoạt động; chú ý từ loại và cách dùng động từ đi kèm.';
 if(q.illustration)return 'Quan sát hình minh họa, đối chiếu chi tiết trong tranh với từng phương án. Đáp án TAT đã được đối chiếu từ ảnh mẫu.';
 return 'Dựa vào ngữ cảnh câu và nghĩa của từng phương án để chọn từ/cấu trúc phù hợp; kiểm tra chủ ngữ, dạng động từ và các từ đứng trước/sau chỗ trống.';
}
function findEvidence(q){
 const passage=sentence(q.passage||'');
 if(!passage||q.illustration||passage.startsWith('Hình minh họa:'))return '';
 const statements=passage.match(/[^.!?]+[.!?]?/g)||[passage];
 const ignore=new Set(['the','a','an','is','are','was','were','and','in','on','of','at','to','with','this','that','he','she','it','they','their','his','her','for','has','have','do','does','not']);
 const target=new Set(normalize(q.prompt).split(' ').filter(x=>x.length>2&&!ignore.has(x)));
 let best='',score=0;
 for(const part of statements){const words=normalize(part).split(' ');const matches=words.filter(w=>target.has(w)).length;if(matches>score){score=matches;best=part.trim();}}
 return score>=2?best:'';
}
function explain(q,answer,isCorrect){
 const mode=q.mode, val=str(answer), key=str(q.answer), steps=[];
 const add=(label,text)=>{if(str(text))steps.push({label,text:str(text).replace(/[ \t]+/g,' ')});};
 if(q.explanation)add('Ghi chú của câu mẫu',q.explanation);
 if(mode==='order'){
   const adapted={...q,type:'order',explain:q.explanation||''};
   const source=ioeGiaiThichSapXep(adapted);
   add('Cách sắp xếp',source);
   const analysis=tatPhanTichBoSung(adapted);
   if(analysis)add('Phân tích cấu trúc',analysis);
   if(isCorrect===false)add('Chỗ cần sửa',val?'So sánh thứ tự các thẻ bạn xếp với câu đúng. Giữ đúng vị trí chủ ngữ, động từ, cụm bổ nghĩa và dấu câu.':'Bạn chưa xếp đủ hoặc chưa xác nhận các thẻ.');
 }else if(mode==='choice'){
   const correctOption=textOption(q);
   if(/_{2,}/.test(q.prompt)&&correctOption){
     const blanks=(q.prompt.match(/_{2,}/g)||[]).length;
     const parts=blanks>1?correctOption.split(/\s+[-–]\s+/):[correctOption];
     let k=0;
     const completedChoice=q.prompt.replace(/_{2,}/g,()=>parts[Math.min(k++,parts.length-1)]);
     add('Câu hoàn chỉnh với đáp án đúng',completedChoice);
   }
   add('Quy tắc / cách suy luận',grammar(q));
   if(isCorrect===false){
     const idx='ABCD'.indexOf(val),wrong=idx>=0?q.options[idx]:'';
     add('Vì sao cần sửa',wrong?`Bạn đã chọn ${val}. ${wrong}; đáp án phù hợp theo dữ liệu TAT là ${key}. ${textOption(q)}. Hãy đối chiếu quy tắc trên với cả bốn phương án.`:'Hãy đọc lại các lựa chọn và so sánh với quy tắc trên.');
   }
 }else if(mode==='tf'){
   add('Cách xác định',key==='TRUE'?'Nhận định phù hợp với dữ liệu đoạn văn hoặc hình minh họa.':'Nhận định không phù hợp với dữ liệu đoạn văn hoặc hình minh họa.');
   const evidence=findEvidence(q);
   if(evidence)add('Chi tiết trong đoạn văn',evidence);
   else if(q.passage)add('Thông tin cần đối chiếu',q.illustration?'Đọc mô tả và quan sát hình minh họa đi kèm.':'Đọc lại đoạn văn ngay phía trên và tìm câu liên quan trực tiếp đến nhận định.');
   else if(q.illustration)add('Thông tin cần đối chiếu','Quan sát đúng hình minh họa đi kèm câu hỏi.');
   if(isCorrect===false)add('Chỗ cần sửa',`Bạn chọn ${val==='TRUE'?'ĐÚNG':'SAI'}; nhận định này phải được đánh dấu ${key==='TRUE'?'ĐÚNG':'SAI'} theo dữ liệu TAT.`);
 }else if(mode==='text'){
   const full=completed(q);
   if(full&&full!==q.prompt)add('Câu / từ hoàn chỉnh',full);
   if(/\b(give the correct form|correct form of)\b/i.test(q.prompt))add('Cách làm','Đổi từ gốc trong ngoặc sang đúng từ loại và dạng từ theo vị trí của chỗ trống; sau đó đọc lại cả câu.');
   else if(/viết lại|rewrite/i.test(q.prompt))add('Cách làm','Giữ nguyên ý nghĩa câu ban đầu và thay đổi cấu trúc đúng với gợi ý; chú ý thì, chủ ngữ và mức độ so sánh.');
   else if(/_{2,}/.test(q.prompt)&&/\w_{2,}\w/.test(q.prompt))add('Cách làm','Ghép phần chữ đã có với các chữ còn thiếu để tạo thành từ tiếng Anh đúng chính tả và phù hợp ngữ cảnh.');
   else if(/_{2,}/.test(q.prompt))add('Cách làm','Đọc cả câu để xác định từ hoặc cụm từ cần điền, rồi kiểm tra nghĩa và ngữ pháp.');
   else add('Cách làm','Điền từ hoặc cụm từ đúng theo yêu cầu và kiểm tra lại chính tả.');
   if(isCorrect===false)add('Chỗ cần sửa',val?`Bạn điền “${val}”, trong khi đáp án TAT là “${key}”. Đối chiếu lại cách viết, dạng từ và nghĩa trong câu.`:`Bạn chưa điền đáp án; từ/cụm từ cần dùng là “${key}”.`);
 }
 if(!steps.length)add('Cách làm','Đọc kỹ câu hỏi, đối chiếu đáp án TAT và kiểm tra lại ngữ pháp, từ vựng.');
 return {steps,completed:completed(q)};
}
window.TATOriginalReview=Object.freeze({explain,completed});
})();
