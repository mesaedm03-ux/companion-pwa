const $=id=>document.getElementById(id);
let persona="لطيفة وداعمة ومرحة", name="لونا", history=[];
$("startBtn").onclick=()=>{persona=$("cPersona").value;name=$("cName").value||"لونا";
 localStorage.setItem("companion",JSON.stringify({persona,name}));
 $("setup").hidden=true;$("chat").hidden=false;addMsg("ai",`أهلًا! أنا ${name}. ${persona}. إزيك النهاردة؟`)};
$("sendBtn").onclick=send;$("msg").addEventListener("keydown",e=>{if(e.key==="Enter")send()});
$("clearBtn").onclick=()=>{history=[];$("messages").innerHTML=""};
$("imgBtn").onclick=()=>addMsg("ai","توليد الصور سيُربط هنا بـ API الصور في النسخة الكاملة.");
async function send(){const t=$("msg").value.trim();if(!t)return;$("msg").value="";addMsg("user",t);
 const key=$("apiKey").value.trim();
 if(!key){addMsg("ai","ضيف مفتاح OpenAI API من صفحة إنشاء الرفيق لتشغيل الردود الذكية.");return}
 try{const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+key},
 body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"system",content:`أنت رفيق افتراضي اسمه ${name}. شخصيتك: ${persona}. رد بالعربية المصرية البسيطة، كن دافئًا ومختصرًا.`},...history,{role:"user",content:t}]})});
 const j=await r.json();addMsg("ai",j.choices?.[0]?.message?.content||"حصلت مشكلة في الاتصال.")}catch(e){addMsg("ai","تعذر الاتصال بالخدمة.")}}
function addMsg(role,text){history.push({role:role==="user"?"user":"assistant",content:text});
 const d=document.createElement("div");d.className="msg "+role;d.textContent=text;$("messages").appendChild(d);$("messages").scrollTop=1e9}
let deferred;addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;$("installBtn").hidden=false});
$("installBtn").onclick=async()=>{if(deferred){deferred.prompt();await deferred.userChoice;deferred=null;$("installBtn").hidden=true}};
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js");