var alishan=function(e){"use strict";var t=[{re:/^(.+?)(ss|i)es$/,handle:(e,t)=>e.replace(t,"$1$2")},{re:/^(.+?)([^s])s$/,handle:(e,t)=>e.replace(t,"$1$2")}];const s="[aeiouy]",n="[^aeiou][^aeiouy]*",r="[aeiouy][aeiou]*",o=`^(${n})?`,i=r+n,h={gt0:new RegExp(o+i),eq1:new RegExp(o+i+`(${r})?$`),gt1:new RegExp(o+i.repeat(2))},a=new RegExp(o+s),l=(e,t,...s)=>{try{const n=e.exec(t)||[];return(s.length?s:[1]).map(e=>n[e])}catch(n){throw[`match(es) [${s.join(", ")}]`,"not found:",`${e.toString()}.exec('${t}')`].join(" ")}},u=(e,t=1)=>{const s=new RegExp(`.{${t}}$`);return e.replace(s,"")},c=(e,t="|")=>Object.keys(e).join(t),m=(e,t,s)=>{const[n,r]=l(t,e,1,2);return h.gt0.test(n)?n+s[r]:e};var d=[{re:/^(.+?)eed$/,handle:(e,t)=>{const s=l(t,e)[0];return h.gt0.test(s)?u(e):e}},{re:/^(.+?)(ed|ing)$/,handle:(e,t)=>{const s=l(t,e)[0];return a.test(s)?/(at|bl|iz)$/.test(s)?`${s}e`:new RegExp("([^aeiouylsz])\\1$").test(s)?u(s):new RegExp(`^${n}[aeiouy][^aeiouwxy]$`).test(s)?`${s}e`:s:e}}];var w=[{re:/^(.+?)y$/,handle:(e,t)=>{const s=l(t,e)[0];return a.test(s)?s+"i":e}}];const g={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"};var y=[{re:new RegExp(`^(.+?)(${c(g)})$`),handle:(e,t)=>m(e,t,g)}];const p={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""};var b=[{re:new RegExp(`^(.+?)(${c(p)})$`),handle:(e,t)=>m(e,t,p)}];const f=(e,t)=>h.gt1.test(e)?e:t;var v=[{re:new RegExp(["^(.+?)(al|ance|ence|er|ic|able|ible|ant","|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$"].join("")),handle:(e,t)=>{const s=l(t,e)[0];return f(s,e)}},{re:/^(.+?)(s|t)(ion)$/,handle:(e,t)=>{const s=l(t,e,1,2).join("");return f(s,e)}}];var $=[{re:/^(.+?)e$/,handle:(e,t)=>{const r=l(t,e)[0];return h.gt1.test(r)||h.eq1.test(r)&&(e=>!new RegExp("^"+n+s+"[^aeiouwxy]$").test(e))(r)?r:e}}];var S=[{re:/ll$/,handle:(e,t)=>h.gt1.test(e)?u(e):e}];const x=(e,t,s)=>{for(let s of t)if(s.re.test(e)){return s.handle(e,s.re)}return e},j={name:"default",tag:"en-US",idealSentenceLength:20,minimumKeywordRank:10,positionScores:[.17,.23,.14,.08,.05,.04,.06,.04,.04,.15],stem:e=>{if(e.length<3)return e;const s="y"===e.charAt(0),n=[t,d,w,y,b,v,$,S].reduce(x,s?"Y"+e.substr(1):e);return s?`y${n.substr(1)}`:n},stopWords:["-"," ",",",".","a","e","i","o","u","t","mon","tue","wed","thu","fri","sat","sun","monday","tuesday","wednesday","thursday","friday","saturday","sunday","january","february","march","april","may","june","july","august","september","october","november","december","about","above","across","after","afterwards","again","against","all","almost","alone","along","already","also","always","am","among","amongst","amoungst","amount","an","and","another","any","anyhow","anyone","anything","anyway","anywhere","are","around","as","at","back","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","below","beside","besides","between","beyond","both","bottom","but","by","call","can","can't","cannot","co","con","could","couldn't","de","describe","detail","did","do","done","down","due","during","each","eg","eight","either","eleven","else","elsewhere","empty","enough","etc","even","ever","every","everyone","everything","everywhere","except","few","fifteen","fifty","fill","find","fire","first","five","for","former","formerly","forty","found","four","from","front","full","further","get","give","go","got","had","has","hasnt","have","he","hence","her","here","hereafter","hereby","herein","hereupon","hers","herself","him","himself","his","how","however","hundred","i","ie","if","in","inc","indeed","into","is","it","it's","its","itself","just","keep","last","latter","latterly","least","less","like","ltd","made","make","many","may","me","meanwhile","might","mill","mine","more","moreover","most","mostly","move","much","must","my","myself","name","namely","neither","never","nevertheless","new","next","nine","no","nobody","none","noone","nor","not","nothing","now","nowhere","of","off","often","on","once","one","only","onto","or","other","others","otherwise","our","ours","ourselves","out","over","own","part","people","per","perhaps","please","put","rather","re","said","same","see","seem","seemed","seeming","seems","several","she","should","show","side","since","sincere","six","sixty","so","some","somehow","someone","something","sometime","sometimes","somewhere","still","such","take","ten","than","that","the","their","them","themselves","then","thence","there","thereafter","thereby","therefore","therein","thereupon","these","they","thick","thin","third","this","those","though","three","through","throughout","thru","thus","to","together","too","top","toward","towards","twelve","twenty","two","un","under","until","up","upon","us","use","very","via","want","was","we","well","were","what","whatever","when","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole","whom","whose","why","will","with","within","without","would","yet","you","your","yours","yourself","yourselves"]};class R{constructor(e={}){const{name:t,tag:s,idealSentenceLength:n,minimumKeywordRank:r,positionScores:o,stopWords:i,stem:h}=Object.assign({},j,e);this.name=t,this.tag=s,this.idealSentenceLength=n,this.minimumKeywordRank=r,this.positionScores=o,this.stopWords=i,this.stem=h}}const E=(...e)=>e.flat(1/0).map(Number).reduce((e,t)=>e+t,0),T=(e,t=1)=>{const s=Math.pow(10,e);return e=>Math.round(e*s*t)/s},k=(e,t)=>{const s=e.sort((e,t)=>t-e);return s[Math.min(s.length,t)-1]},z=T(12);class K{constructor(e,t,s){this.word=e,this.score=((e,t)=>z(e/t*1.5))(t,s)}toString(){return this.word}}function M(e){const t=t=>!e.includes(t);return{all:e=>e.filter(t),one:t}}const O=e=>e.toLowerCase().replace(/[^a-z0-9\.]/gi,"").trim(),L=e=>{const t="[\\.\\?\\!\\;]".replace("\\;",""),s=new RegExp("(?<="+t+"+)\\s+");return e.split(s).map(e=>e.trim()).filter(e=>!!e)},W=(e,t=!0)=>{const s=t?O:e=>e;return e.split(/[\s]+/).map(e=>e.replace(new RegExp("[\\.\\?\\!\\;]","g"),"")).map(s).filter(e=>!!e)},P=(e,t)=>{var s;return e[t]=(null!=(s=e[t])?s:0)+1,e},_=(e,t=new R)=>{const s=((e,t,s)=>{const n=M(t).one;return W(e).filter(n).map(s)})(e,t.stopWords,t.stem).reduce(P,{}),n=E(Object.values(s));return Object.entries(s).map(e=>{const[t,s]=e;return new K(t,s,n)})},A=(e,t=10)=>{const s=e.substr(0,t).trim();return s+(e.length>s.length?"...":"")},C=T(6,.25),q=(e,t,s)=>{const n=t.indexOf(e);return n<0?0:s[n]},N=(e,t,s,n)=>{if(s<1)return e;const r=n[s-1],o=t.index-r.index;return e+r.score*t.score/Math.pow(o,2)},U=(e,t,s)=>{const n=((e,t)=>Array.from(new Set(e)).filter(e=>t.includes(e)).length+1)(e,t);return 1/n*(n+1)*e.map((e,n)=>({index:n,score:q(e,t,s)})).filter(e=>e.score>0).reduce(N,0)};class Y{constructor(e){const t=Object.values(e).map(e=>[String(e),typeof e]).filter(e=>"undefined"===e[1]);var s,n,r,o,i,h;t.length>0&&(e=>{const t=e.map(e=>e[0]).join(", ");throw new Error(`uninitialized sentence subscores [${t}]`)})(t),this.dbs=e.dbs,this.sbs=e.sbs,this.length=e.length,this.position=e.position,this.title=e.title,this.keyword=(s=this.dbs,n=this.sbs,5*(s+n)),this.total=(r=this.keyword,o=this.length,i=this.position,h=this.title,C(E([1.5*h,2*r,.5*o,i])))}toString(){return String(this.total)}get[Symbol.toStringTag](){return`Score(${e=this,`{\n\t\tdbs: ${e.dbs},\n\t\tsbs: ${e.sbs},\n\t\tlength: ${e.length},\n\t\tposition: ${e.position},\n\t\ttitle: ${e.title},\n\t}`.replace(/[\n\r\t]+/g," ")})`;var e}}class B{constructor(e,t,s){this.text=e.trim(),this.index=Math.round(t),this.score=new Y(s)}get[Symbol.toStringTag](){const e=this.text.substr(0,10).trim();return`Sentence('${e}${this.text.length>e.length?"...":""}', ${this.index}, {...})`}}class D{constructor(e,t){this.sentStems=[],this.text=e.trim(),this.idiom=null!=t?t:new R,this.sentStems=this.stemText(this.text),this.subScores=this._setSubs()}_setSubs(){var e,t;return{dbs:0,sbs:0,length:(e=this.sentStems.length,((t=this.idiom.idealSentenceLength)-Math.abs(t-e))/t),position:0,title:0}}stemText(e){return W(e).map(this.idiom.stem)}stemTitle(e){const t=M(this.idiom.stopWords).one;return this.stemText(e).filter(t)}setKeywords(e,t){const s=this.sentStems,{length:n}=s;return n<1?this:(this.subScores.dbs=U(s,e,t),this.subScores.sbs=((e,t,s,n)=>{const r=1/(null!=n?n:e.length),o=e.filter(e=>t.includes(e)).map(e=>q(e,t,s));return r*E(o)})(s,e,t,n),this)}setPosition(e,t){const s=Math.round(e),n=Math.round(t);if(n-s<1||s<0)throw new Error(["invalid sentence position:",`Array(${t})[${e}]`].join(" "));return this.index=s,this.subScores.position=((e,t,s)=>{const n=s.length;return s[Math.round(Math.ceil((e+1)/t*n))-1]})(s,n,this.idiom.positionScores),this}_scoreTitleStems(e){const t=this.sentStems.filter(t=>e.includes(t)).length;return 0===t?t:t/e.length}setTitle(e){const t=this.stemTitle(e);return 0===t.length?(this.subScores.title=0,this):(this.subScores.title=this._scoreTitleStems(t),this)}getSentence(){try{return new B(this.text,this.index,this.subScores)}catch(e){throw new Error([`error scoring sentence '${A(this.text)}': `,e.toString()].join(" "))}}get[Symbol.toStringTag](){return`Scorer('${A(this.text)}')`}}class F{constructor(e,t,s){this.title=t,this.sentences=L(e),this.idiom=null!=s?s:new R}get body(){return this.sentences.join(" ")}getKeywords(){return _(this.body,this.idiom)}getTopKeywords(){return((e,t)=>{const s=e.map(e=>e.score),n=k(s,t);return e.filter(e=>e.score>=n)})(this.getKeywords(),this.idiom.minimumKeywordRank)}getTopKeywordPairs(){const e=this.getTopKeywords();return[e.map(e=>e.word),e.map(e=>e.score)]}scoreSentence(e,t,s,n){const r=this.sentences[e];return new D(r,this.idiom).setKeywords(s,n).setPosition(e,t).setTitle(this.title).getSentence()}score(){const e=this.sentences.length,[t,s]=this.getTopKeywordPairs();return this.sentences.map((n,r)=>this.scoreSentence(r,e,t,s))}summarize(e){const t=this.score();return((e,t)=>{const s=e.map(e=>e.score.total),n=k(s,t);return e.filter(e=>e.score.total>=n)})(t,((e,t)=>{let s=e;return e>t?s=t:e<1&&(s=t*e),Math.round(s)})(e,t.length)).map(e=>e.text)}}return e.summarize=(e,t,s={returnCount:5})=>{const n=new F(e,t,new R(s));return 0===n.sentences.length?[]:n.summarize(s.returnCount)},e}({});
