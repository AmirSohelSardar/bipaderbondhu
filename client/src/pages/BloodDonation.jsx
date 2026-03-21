// client/src/pages/BloodDonation.jsx
// ✅ ONE FILE — ONE LOGIN — BOTH FEATURES
// ✅ Blood Certificates + WhatsApp Invitations
// ✅ Same MongoDB Atlas + Same Cloudinary
// ✅ No useNavigate, No separate WhatsAppInvitation.jsx needed

import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const ADMIN_EMAIL   = "narayanpurbipaderbondhu@gmail.com";
const ADMIN_PASS    = "Kada@#2000";
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || "dfi3ywweg";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
const CERT_API      = `${import.meta.env.VITE_BACKEND_URL}/api/blood-certificates`;
const INV_API       = `${import.meta.env.VITE_BACKEND_URL}/api/invitations`;
const WA_NUM        = "919733725202";
const BLOOD_GROUPS  = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
const NGO_LOGO      = "/images/profile.png";
const NGO_NAME      = "Narayan Pur Bipader Bondhu Welfare Society";
const NGO_REG       = "Govt. Registered NGO • Reg. No: S0042589 of 2024–2025";
const NGO_ADDRESS   = "Vill- Narayan Pur, P.O- Amiya Narayan Pur, P.S- Thanar Para, Dist- Nadia, Pin- 741165, West Bengal, India";

const EVENT_TYPES = [
  "Blood Donation Camp","Cloth Donation Drive","Food Distribution",
  "Tree Plantation","Health Awareness Camp","Education Support Program",
  "Flood Relief Drive","Winter Blanket Distribution","Community Clean-Up","Other (Custom)",
];

// ─── CLOUDINARY UPLOAD ───────────────────────────────────────────────────────
async function uploadCloud(file, folder) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  fd.append("folder", folder);
  const r = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd }
  );
  const j = await r.json();
  if (!j.secure_url) throw new Error("Cloudinary upload failed: " + (j.error?.message || "unknown"));
  return j.secure_url;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function cleanPhone(raw) {
  return raw.replace(/[\s\-().+]/g, "").replace(/^00/, "");
}
function fmtDateLong(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday:"long", day:"2-digit", month:"long", year:"numeric",
  });
}
function fmtDateShort(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day:"2-digit", month:"short", year:"numeric",
  });
}
function buildWAMessage(f, imageUrl) {
  const evtName = f.eventName === "Other (Custom)" ? (f.customEvent||"Special Event") : f.eventName;
  const address = f.invAddress || NGO_ADDRESS;
  let msg =
    `🌟 *আপনি আমন্ত্রিত! You're Cordially Invited!* 🌟\n\n` +
    `আসসালামু আলাইকুম / নমস্কার 🙏\n\n` +
    `প্রিয় *${f.invName}*,\n\n` +
    `*${NGO_NAME}* এর পক্ষ থেকে আপনাকে আমাদের আসন্ন অনুষ্ঠানে আন্তরিকভাবে আমন্ত্রণ জানাচ্ছি:\n\n` +
    `🎉 *${evtName}*\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📅 *তারিখ / Date:* ${fmtDateLong(f.eventDate)}\n` +
    `📍 *স্থান / Venue:* ${f.eventLocation}\n` +
    `🏠 *ঠিকানা / Address:* ${address}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  if (imageUrl) msg += `🖼️ *Invitation Card:* ${imageUrl}\n\n`;
  if (f.inviteLink) msg += `🔗 *Event Link:* ${f.inviteLink}\n\n`;
  msg +=
    `✨ আপনার উপস্থিতি এই অনুষ্ঠানকে সফল করবে।\n` +
    `_Your presence will make this event truly special!_\n\n` +
    `❤️ *ধন্যবাদ / Thank You*\n\n` +
    `*${NGO_NAME}*\n_${NGO_REG}_\n` +
    `📞 যোগাযোগের জন্য WhatsApp করুন।`;
  return msg;
}

// ════════════════════════════════════════════════════════════════════════════
//  BLOOD DONATION CERTIFICATE CARD  (1123 × 794 px)
// ════════════════════════════════════════════════════════════════════════════
function Certificate({ donor, certRef }) {
  const { name="", bloodGroup="O+", donationCount="1", donationDate="", address="", photoUrl=null, campName="" } = donor;
  const date = donationDate ? new Date(donationDate).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}) : "—";
  return (
    <div ref={certRef} style={{width:1123,height:794,background:"linear-gradient(160deg,#fff9f9 0%,#ffffff 55%,#fff5f5 100%)",fontFamily:"'Times New Roman',Times,serif",position:"relative",overflow:"hidden",boxSizing:"border-box"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:10,background:"linear-gradient(90deg,#4a0000,#b71c1c,#e53935,#b71c1c,#4a0000)",zIndex:4}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:10,background:"linear-gradient(90deg,#4a0000,#b71c1c,#e53935,#b71c1c,#4a0000)",zIndex:4}}/>
      <div style={{position:"absolute",inset:22,border:"5px double #b71c1c",zIndex:1,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:32,border:"1.5px solid #e57373",zIndex:1,pointerEvents:"none"}}/>
      {[{top:22,left:22},{top:22,right:22},{bottom:22,left:22},{bottom:22,right:22}].map((s,i)=>(
        <div key={i} style={{position:"absolute",...s,width:40,height:40,borderTop:s.top!==undefined?"4px solid #b71c1c":"none",borderBottom:s.bottom!==undefined?"4px solid #b71c1c":"none",borderLeft:s.left!==undefined?"4px solid #b71c1c":"none",borderRight:s.right!==undefined?"4px solid #b71c1c":"none",zIndex:2}}/>
      ))}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-28deg)",fontSize:100,fontWeight:900,color:"rgba(183,28,28,0.04)",whiteSpace:"nowrap",zIndex:0,userSelect:"none",letterSpacing:8}}>BLOOD DONATION</div>
      <div style={{position:"absolute",top:36,right:36,zIndex:6}}>
        <div style={{width:118,height:142,border:"3px solid #b71c1c",boxShadow:"0 4px 16px rgba(183,28,28,0.3)",background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
          {photoUrl ? <img src={photoUrl} alt="Donor" style={{width:"100%",height:"100%",objectFit:"cover"}} crossOrigin="anonymous"/> : <svg width="60" height="72" viewBox="0 0 24 28" fill="#ccc"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v4h19.2v-4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>}
        </div>
      </div>
      <div style={{position:"absolute",top:22,bottom:22,left:36,right:170,display:"flex",flexDirection:"column",alignItems:"center",zIndex:5,padding:"12px 6px 12px",justifyContent:"space-between"}}>
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,width:"100%",justifyContent:"center",marginBottom:6}}>
            <svg width="26" height="32" viewBox="0 0 44 56"><path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="#b71c1c" stroke="#7f0000" strokeWidth="1.5"/><path d="M14 40C14 40 11 36 11 33C11 27.477 15.477 23 21 23" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/></svg>
            <img src={NGO_LOGO} alt="NGO Logo" crossOrigin="anonymous" style={{width:62,height:62,objectFit:"contain",borderRadius:"50%",border:"2px solid #e57373",flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:20,letterSpacing:2,color:"#b71c1c",fontWeight:900,textTransform:"uppercase",lineHeight:1.2}}>{NGO_NAME}</div>
              <div style={{fontSize:10.5,color:"#555",letterSpacing:0.5,marginTop:3,fontWeight:600}}>Govt. Registered NGO &nbsp;•&nbsp; Reg. No: S0042589 of 2024–2025</div>
              <div style={{fontSize:9.5,color:"#777",letterSpacing:0.3,marginTop:2}}>{NGO_ADDRESS}</div>
            </div>
            <img src={NGO_LOGO} alt="NGO Logo" crossOrigin="anonymous" style={{width:62,height:62,objectFit:"contain",borderRadius:"50%",border:"2px solid #e57373",flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
            <svg width="26" height="32" viewBox="0 0 44 56"><path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="#b71c1c" stroke="#7f0000" strokeWidth="1.5"/><path d="M14 40C14 40 11 36 11 33C11 27.477 15.477 23 21 23" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div style={{width:"95%",height:3,background:"linear-gradient(90deg,transparent,#b71c1c,#e53935,#b71c1c,transparent)"}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <h1 style={{fontSize:48,fontWeight:900,color:"#7f0000",letterSpacing:5,textTransform:"uppercase",margin:0,textAlign:"center",lineHeight:1.1}}>Blood Donation Certificate</h1>
          <p style={{fontSize:14,color:"#888",fontStyle:"italic",margin:0,letterSpacing:0.5}}>This certificate is proudly awarded to</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <div style={{fontSize:42,fontWeight:900,color:"#1a1a1a",borderBottom:"3px solid #b71c1c",paddingBottom:6,letterSpacing:3,textAlign:"center",minWidth:380}}>{name}</div>
          <p style={{fontSize:14,color:"#444",textAlign:"center",lineHeight:1.75,margin:0,maxWidth:600}}>for their selfless act of donating blood and demonstrating exceptional compassion,<br/>dedication and humanity in service of saving precious lives.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          <div style={{display:"flex",gap:20,justifyContent:"center"}}>
            {[["Blood Group",bloodGroup],["Donation Count",`${donationCount} Time${parseInt(donationCount)>1?"s":""}`],["Donation Date",date]].map(([label,value])=>(
              <div key={label} style={{textAlign:"center",background:"linear-gradient(135deg,#fff0f0,#fff)",border:"2px solid #e57373",borderRadius:12,padding:"12px 28px",minWidth:138,boxShadow:"0 3px 12px rgba(183,28,28,0.1)"}}>
                <div style={{fontSize:9.5,color:"#b71c1c",letterSpacing:2,textTransform:"uppercase",fontWeight:800,marginBottom:5}}>{label}</div>
                <div style={{fontSize:21,fontWeight:900,color:"#1a1a1a"}}>{value}</div>
              </div>
            ))}
          </div>
          {(campName||address) && (
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              {campName && <div style={{display:"flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#fff0f0,#fff)",border:"1.5px solid #e57373",borderRadius:9,padding:"7px 18px"}}><span style={{fontSize:15}}>🏕️</span><div><div style={{fontSize:9.5,color:"#b71c1c",letterSpacing:1.5,textTransform:"uppercase",fontWeight:800}}>Camp Name</div><div style={{fontSize:14.5,fontWeight:800,color:"#1a1a1a"}}>{campName}</div></div></div>}
              {address && <div style={{display:"flex",alignItems:"center",gap:7,background:"#fafafa",border:"1px solid #eee",borderRadius:9,padding:"7px 18px"}}><span style={{fontSize:15}}>📍</span><div style={{fontSize:13,color:"#555",fontWeight:500}}>{address}</div></div>}
            </div>
          )}
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
          <div style={{width:"95%",height:1.5,background:"linear-gradient(90deg,transparent,#e57373,transparent)",marginBottom:10}}/>
          <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"flex-end",padding:"0 45px"}}>
            <div style={{textAlign:"center"}}><div style={{fontFamily:"'Brush Script MT','Dancing Script',cursive",fontSize:32,color:"#1a237e",marginBottom:4,letterSpacing:1}}>Tariful Mia</div><div style={{width:155,height:2,background:"#333",margin:"0 auto 5px"}}/><div style={{fontSize:12,fontWeight:800,color:"#333",letterSpacing:2,textTransform:"uppercase"}}>President</div><div style={{fontSize:9,color:"#777",marginTop:2}}>{NGO_NAME}</div></div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:92,height:92,borderRadius:"50%",border:"3px solid #b71c1c",outline:"2px dashed #e57373",outlineOffset:"4px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#fff0f0,#fff)",boxShadow:"0 4px 16px rgba(183,28,28,0.25)",transform:"rotate(-15deg)"}}><div style={{fontSize:8,fontWeight:900,color:"#b71c1c",letterSpacing:2,textTransform:"uppercase",marginBottom:2,opacity:0.7}}>CERTIFIED</div><div style={{fontSize:14,fontWeight:900,color:"#b71c1c",letterSpacing:1,textTransform:"uppercase",lineHeight:1.1}}>✓ APPROVED</div><div style={{fontSize:7,fontWeight:700,color:"#b71c1c",letterSpacing:1,marginTop:2,opacity:0.7}}>2026</div></div></div>
            <div style={{textAlign:"center"}}><div style={{fontFamily:"'Brush Script MT','Dancing Script',cursive",fontSize:32,color:"#1a237e",marginBottom:4,letterSpacing:1}}>Juel Rana Khan</div><div style={{width:155,height:2,background:"#333",margin:"0 auto 5px"}}/><div style={{fontSize:12,fontWeight:800,color:"#333",letterSpacing:2,textTransform:"uppercase"}}>Secretary</div><div style={{fontSize:9,color:"#777",marginTop:2}}>{NGO_NAME}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  INVITATION CARD  (1200 × 675 px)
// ════════════════════════════════════════════════════════════════════════════
function InviteCard({ data, cardRef }) {
  const evtName = data.eventName === "Other (Custom)" ? (data.customEvent||"Special Event") : (data.eventName||"Special Event");
  const date = fmtDateLong(data.eventDate);
  const loc  = data.eventLocation || "—";
  const addr = data.invAddress || NGO_ADDRESS;
  const name = data.invName || "Honoured Guest";
  return (
    <div ref={cardRef} style={{width:1200,height:675,position:"relative",overflow:"hidden",boxSizing:"border-box",background:"linear-gradient(160deg,#0a0f1e 0%,#10192e 50%,#0a0f1e 100%)",fontFamily:"'Georgia','Times New Roman',serif"}}>
      <div style={{position:"absolute",top:-100,left:"30%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,164,90,0.15) 0%,transparent 65%)",zIndex:1}}/>
      <div style={{position:"absolute",bottom:-80,right:"20%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(120,80,200,0.1) 0%,transparent 65%)",zIndex:1}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:6,background:"linear-gradient(90deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#f5d87a,#c8a45a,#6b4400)",zIndex:10}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:6,background:"linear-gradient(90deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#f5d87a,#c8a45a,#6b4400)",zIndex:10}}/>
      <div style={{position:"absolute",top:0,left:0,bottom:0,width:5,background:"linear-gradient(180deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#6b4400)",zIndex:10}}/>
      <div style={{position:"absolute",top:0,right:0,bottom:0,width:5,background:"linear-gradient(180deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#6b4400)",zIndex:10}}/>
      <div style={{position:"absolute",inset:18,border:"1.5px solid rgba(200,164,90,0.5)",zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:26,border:"1px solid rgba(200,164,90,0.2)",zIndex:2,pointerEvents:"none"}}/>
      {[{top:18,left:18},{top:18,right:18},{bottom:18,left:18},{bottom:18,right:18}].map((s,i)=>(
        <div key={i} style={{position:"absolute",...s,width:50,height:50,zIndex:5,borderTop:s.top!==undefined?"3px solid #c8a45a":"none",borderBottom:s.bottom!==undefined?"3px solid #c8a45a":"none",borderLeft:s.left!==undefined?"3px solid #c8a45a":"none",borderRight:s.right!==undefined?"3px solid #c8a45a":"none"}}/>
      ))}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-20deg)",fontSize:110,fontWeight:900,letterSpacing:12,color:"rgba(200,164,90,0.035)",whiteSpace:"nowrap",zIndex:0,userSelect:"none"}}>INVITATION</div>
      <div style={{position:"absolute",inset:38,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",zIndex:6}}>
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center"}}>
            <div style={{display:"flex",gap:3,alignItems:"center"}}>{["#c8a45a","#f5d87a","#c8a45a"].map((c,i)=><div key={i} style={{width:i===1?3:2,height:i===1?32:22,background:c,borderRadius:2}}/>)}</div>
            <img src={NGO_LOGO} alt="Logo" crossOrigin="anonymous" style={{width:64,height:64,borderRadius:"50%",border:"3px solid #c8a45a",boxShadow:"0 0 20px rgba(200,164,90,0.6)",objectFit:"contain",background:"#fff",flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,background:"linear-gradient(135deg,#f5d87a,#c8a45a,#f5d87a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:1.5,textTransform:"uppercase",lineHeight:1.25}}>{NGO_NAME}</div>
              <div style={{fontSize:10,color:"#a0856a",letterSpacing:0.8,marginTop:3}}>{NGO_REG}</div>
            </div>
            <img src={NGO_LOGO} alt="Logo" crossOrigin="anonymous" style={{width:64,height:64,borderRadius:"50%",border:"3px solid #c8a45a",boxShadow:"0 0 20px rgba(200,164,90,0.6)",objectFit:"contain",background:"#fff",flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
            <div style={{display:"flex",gap:3,alignItems:"center"}}>{["#c8a45a","#f5d87a","#c8a45a"].map((c,i)=><div key={i} style={{width:i===1?3:2,height:i===1?32:22,background:c,borderRadius:2}}/>)}</div>
          </div>
          <div style={{width:"88%",height:2,marginTop:4,background:"linear-gradient(90deg,transparent,#c8a45a,#f5d87a,#c8a45a,transparent)"}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <div style={{fontSize:11,color:"#a0856a",letterSpacing:7,textTransform:"uppercase"}}>✦ &nbsp; cordially invites &nbsp; ✦</div>
          <div style={{fontSize:56,fontWeight:900,letterSpacing:4,textTransform:"uppercase",lineHeight:1,background:"linear-gradient(135deg,#f5d87a 0%,#c8a45a 40%,#f5d87a 70%,#e8c060 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>YOU'RE INVITED</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}>{[...Array(5)].map((_,i)=><div key={i} style={{width:i===2?8:i===1||i===3?5:3,height:i===2?8:i===1||i===3?5:3,borderRadius:"50%",background:i===2?"#f5d87a":"rgba(200,164,90,0.5)"}}/>)}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={{fontSize:11,color:"#6a7a8a",letterSpacing:5,textTransform:"uppercase"}}>Dear Honoured Guest</div>
          <div style={{fontSize:48,fontWeight:900,color:"#ffffff",letterSpacing:2,textAlign:"center",borderBottom:"2px solid rgba(200,164,90,0.4)",paddingBottom:8,minWidth:340,textShadow:"0 0 30px rgba(200,164,90,0.3)"}}>{name}</div>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(200,164,90,0.18),rgba(200,164,90,0.05))",border:"1.5px solid rgba(200,164,90,0.45)",borderRadius:14,padding:"14px 48px",textAlign:"center"}}>
          <div style={{fontSize:10,color:"#a0856a",letterSpacing:4,textTransform:"uppercase",marginBottom:5}}>Event</div>
          <div style={{fontSize:30,fontWeight:900,color:"#f5d87a",letterSpacing:1.5}}>{evtName}</div>
        </div>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",width:"100%"}}>
          {[{icon:"📅",label:"Date",value:date},{icon:"📍",label:"Venue",value:loc},{icon:"🏠",label:"Address",value:addr}].map(({icon,label,value})=>(
            <div key={label} style={{display:"flex",alignItems:"flex-start",gap:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(200,164,90,0.25)",borderRadius:10,padding:"10px 18px",maxWidth:300,flex:1}}>
              <div style={{fontSize:20,flexShrink:0,marginTop:2}}>{icon}</div>
              <div>
                <div style={{fontSize:9,color:"#c8a45a",letterSpacing:2.5,textTransform:"uppercase",marginBottom:3}}>{label}</div>
                <div style={{fontSize:12.5,fontWeight:700,color:"#d4dde8",lineHeight:1.4}}>{value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={{width:"80%",height:1,background:"linear-gradient(90deg,transparent,rgba(200,164,90,0.4),transparent)"}}/>
          <div style={{display:"flex",alignItems:"center",gap:12,fontSize:11.5,color:"#7a8a9a"}}>
            <span>🙏</span><span>Your presence will make this event truly successful</span>
            <span style={{color:"rgba(200,164,90,0.4)"}}>•</span>
            <span style={{color:"#a0856a"}}>{NGO_NAME}</span><span>❤️</span>
          </div>
          <div style={{fontSize:9,color:"rgba(120,130,145,0.6)",letterSpacing:0.4}}>{NGO_ADDRESS}</div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
export default function BloodDonation() {

  // view: "public" | "login" | "dashboard" | "certForm" | "inviteForm"
  const [view, setView]       = useState("public");
  const [dashTab, setDashTab] = useState("certs"); // "certs" | "invites"

  // Auth
  const [loginData, setLogin]   = useState({ email:"", password:"" });
  const [loginErr, setLoginErr] = useState("");

  // Blood Certificate
  const [certs, setCerts]             = useState([]);
  const [certsLoading, setCertsLoading] = useState(false);
  const [generating, setGen]          = useState(false);
  const [viewCert, setViewCert]       = useState(null);
  const [donor, setDonor]             = useState(null);
  const [certForm, setCertForm]       = useState({
    name:"", email:"", phone:"", address:"",
    bloodGroup:"O+", donationCount:"1",
    donationDate: new Date().toISOString().split("T")[0],
    campName:"",
  });
  const [photoFile, setPhoto]    = useState(null);
  const [photoPreview, setPreview] = useState(null);
  const certRef = useRef(null);

  // Invitation
  const [invites, setInvites]         = useState([]);
  const [invLoading, setInvLoading]   = useState(false);
  const [invGen, setInvGen]           = useState(false);
  const [previewMsg, setPreviewMsg]   = useState(null);
  const [viewInvCard, setViewInvCard] = useState(null);
  const [liveCard, setLiveCard]       = useState(null);
  const [invForm, setInvForm]         = useState({
    invName:"", invAddress:"", whatsapp:"",
    eventName: EVENT_TYPES[0], customEvent:"",
    eventDate: new Date().toISOString().split("T")[0],
    eventLocation:"", inviteLink:"",
  });
  const invCardRef = useRef(null);

  // Toast
  const [toast, setToast] = useState(null);
  const toast_ = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3500);
  };

  // Input styles
  const inp  = "w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition";
  const inp2 = "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white";

  // Persist login
  useEffect(() => {
    if (localStorage.getItem("blood_admin")) setView("dashboard");
  }, []);

  // Load both on dashboard
  useEffect(() => {
    if (view === "dashboard") {
      loadCerts();
      loadInvites();
    }
  }, [view]);

  const loadCerts = () => {
    setCertsLoading(true);
    fetch(CERT_API)
      .then(r=>r.json())
      .then(j=>{ if(j.success) setCerts(j.data||[]); })
      .catch(()=>toast_("Failed to load certificates","error"))
      .finally(()=>setCertsLoading(false));
  };

  const loadInvites = () => {
    setInvLoading(true);
    fetch(INV_API)
      .then(r=>r.json())
      .then(j=>{ if(j.success) setInvites(j.data||[]); })
      .catch(()=>toast_("Failed to load invitations","error"))
      .finally(()=>setInvLoading(false));
  };

  // Login / Logout
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email===ADMIN_EMAIL && loginData.password===ADMIN_PASS) {
      localStorage.setItem("blood_admin","1");
      setLoginErr("");
      setView("dashboard");
    } else {
      setLoginErr("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("blood_admin");
    setView("public");
  };

  // Photo
  const handlePhotoChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPhoto(f);
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  // Generate Certificate
  const handleGenerate = async (e) => {
    e.preventDefault();
    setGen(true);
    try {
      setDonor({ ...certForm, photoUrl: photoPreview || null });
      await new Promise(r => setTimeout(r, 700));
      const dataUrl = await toPng(certRef.current, { cacheBust:true, pixelRatio:3 });
      const certBlob = await (await fetch(dataUrl)).blob();
      const certificateUrl = await uploadCloud(certBlob, "blood-certificates");
      let photoUrl = "";
      if (photoFile) { try { photoUrl = await uploadCloud(photoFile,"blood-certificates/photos"); } catch {} }
      const res  = await fetch(CERT_API, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...certForm, donationCount:Number(certForm.donationCount), donationDate:new Date(certForm.donationDate), photoUrl, certificateUrl }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setCerts(prev=>[json.data,...prev]);
      setView("dashboard"); setDashTab("certs");
      setDonor(null);
      setCertForm({name:"",email:"",phone:"",address:"",bloodGroup:"O+",donationCount:"1",donationDate:new Date().toISOString().split("T")[0],campName:""});
      setPhoto(null); setPreview(null);
      toast_(`Certificate generated for ${json.data.name}!`);
    } catch(err) { toast_(err.message,"error"); }
    finally { setGen(false); }
  };

  const handleDeleteCert = async (id) => {
    if (!confirm("Delete this certificate?")) return;
    await fetch(`${CERT_API}/${id}`,{method:"DELETE"});
    setCerts(prev=>prev.filter(c=>c._id!==id));
    toast_("Deleted.");
  };

  // Send Invitation
  const handleSendInvite = async (e) => {
    e.preventDefault();
    setInvGen(true);
    try {
      setLiveCard({ ...invForm });
      await new Promise(r => setTimeout(r, 900));
      const dataUrl  = await toPng(invCardRef.current, { cacheBust:true, pixelRatio:2.5 });
      const cardBlob = await (await fetch(dataUrl)).blob();
      const imageUrl = await uploadCloud(cardBlob, "whatsapp-invitations");
      const phone    = cleanPhone(invForm.whatsapp);
      const message  = buildWAMessage(invForm, imageUrl);
      const waLink   = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      const evtName  = invForm.eventName === "Other (Custom)" ? (invForm.customEvent||"Special Event") : invForm.eventName;
      const res = await fetch(INV_API, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          name:invForm.invName, address:invForm.invAddress, whatsapp:phone,
          eventName:evtName, eventDate:new Date(invForm.eventDate),
          eventLocation:invForm.eventLocation, inviteLink:invForm.inviteLink,
          imageUrl, waLink,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message||"Save failed");
      setInvites(p=>[json.data,...p]);
      setLiveCard(null);
      window.open(waLink, "_blank");
      toast_(`Invitation sent to ${invForm.invName}!`);
      setView("dashboard"); setDashTab("invites");
      setInvForm({invName:"",invAddress:"",whatsapp:"",eventName:EVENT_TYPES[0],customEvent:"",eventDate:new Date().toISOString().split("T")[0],eventLocation:"",inviteLink:""});
    } catch(err) { console.error(err); toast_(err.message||"Something went wrong","error"); }
    finally { setInvGen(false); }
  };

  const handleDeleteInvite = async (id) => {
    if (!confirm("Delete this invitation?")) return;
    await fetch(`${INV_API}/${id}`,{method:"DELETE"});
    setInvites(p=>p.filter(i=>i._id!==id));
    toast_("Deleted.");
  };

  const handlePreviewMsg = () => {
    if (!invForm.invName || !invForm.eventLocation || !invForm.whatsapp) {
      toast_("Fill Name, Venue & WhatsApp number first","error"); return;
    }
    setPreviewMsg(buildWAMessage(invForm,"[Card image URL will appear here]"));
  };

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: PUBLIC
  // ══════════════════════════════════════════════════════════════════════════
  if (view === "public") return (
    <div className="relative rounded-2xl overflow-hidden my-8 mx-4"
      style={{background:"linear-gradient(135deg,#7f0000,#b71c1c,#e53935)",boxShadow:"0 8px 32px rgba(183,28,28,0.35)"}}>
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 bg-white"/>
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10 bg-white"/>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8">
        <div className="text-white text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <svg width="26" height="32" viewBox="0 0 44 56"><path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="rgba(255,255,255,0.9)"/></svg>
            <h2 className="text-2xl font-black tracking-wide" style={{fontFamily:"Georgia,serif"}}>Blood Donation Certificate</h2>
          </div>
          <p className="text-red-100 text-sm max-w-xs leading-relaxed">Donate blood, save lives — receive an official certificate from our Govt. registered NGO.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={`https://wa.me/${WA_NUM}?text=Hello%20I%20want%20to%20donate%20blood%20and%20get%20a%20blood%20donation%20certificate%20from%20Narayan%20Pur%20Bipader%20Bondhu%20Welfare%20Society.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 transition-all"
            style={{background:"#25D366",boxShadow:"0 4px 14px rgba(37,211,102,0.4)"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Donate Blood &amp; Get Certificate
          </a>
          <button onClick={()=>setView("login")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 transition-all"
            style={{background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.4)"}}>
            🔐 Admin Login
          </button>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: LOGIN
  // ══════════════════════════════════════════════════════════════════════════
  if (view === "login") return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background:"linear-gradient(135deg,#1a0000,#7f0000,#b71c1c)"}}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 text-center" style={{background:"rgba(0,0,0,0.35)"}}>
          <svg className="mx-auto mb-3" width="40" height="48" viewBox="0 0 44 56"><path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="#e53935"/></svg>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase" style={{fontFamily:"Georgia,serif"}}>Admin Portal</h1>
          <p className="text-red-200 text-xs mt-1">{NGO_NAME}</p>
          <p className="text-red-300 text-xs mt-0.5 opacity-60">Blood Certificates + WhatsApp Invitations</p>
        </div>
        <div className="bg-white px-8 py-8">
          {loginErr && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">{loginErr}</div>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={loginData.email} onChange={e=>setLogin({...loginData,email:e.target.value})} required placeholder="admin@email.com" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
              <input type="password" value={loginData.password} onChange={e=>setLogin({...loginData,password:e.target.value})} required placeholder="••••••••" className={inp}/>
            </div>
            <button type="submit" className="mt-2 w-full py-3 rounded-lg font-bold text-white text-sm uppercase tracking-wider hover:opacity-90 transition"
              style={{background:"linear-gradient(135deg,#b71c1c,#e53935)"}}>Login →</button>
            <button type="button" onClick={()=>setView("public")} className="text-sm text-gray-400 hover:text-gray-600 text-center">← Back</button>
          </form>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: CERTIFICATE FORM
  // ══════════════════════════════════════════════════════════════════════════
  if (view === "certForm") return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div style={{position:"fixed",top:"-9999px",left:"-9999px",zIndex:-1,opacity:0,pointerEvents:"none"}}>
        {donor && <Certificate donor={donor} certRef={certRef}/>}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={()=>setView("dashboard")} className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition">←</button>
          <h1 className="text-xl font-black text-gray-800 dark:text-white">Generate New Certificate</h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4" style={{background:"linear-gradient(135deg,#b71c1c,#e53935)"}}>
            <p className="text-white font-bold">Donor Information</p>
          </div>
          <form onSubmit={handleGenerate} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
              <input value={certForm.name} onChange={e=>setCertForm({...certForm,name:e.target.value})} required placeholder="Donor's full name" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={certForm.email} onChange={e=>setCertForm({...certForm,email:e.target.value})} placeholder="email@example.com" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Phone *</label>
              <input value={certForm.phone} onChange={e=>setCertForm({...certForm,phone:e.target.value})} required placeholder="+91 XXXXX XXXXX" className={inp}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Address</label>
              <input value={certForm.address} onChange={e=>setCertForm({...certForm,address:e.target.value})} placeholder="Village, District, State" className={inp}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">🏕️ Camp Name</label>
              <input value={certForm.campName} onChange={e=>setCertForm({...certForm,campName:e.target.value})} placeholder="e.g. Narayan Pur Blood Camp 2026" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Blood Group *</label>
              <select value={certForm.bloodGroup} onChange={e=>setCertForm({...certForm,bloodGroup:e.target.value})} className={inp}>
                {BLOOD_GROUPS.map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Donation Count *</label>
              <input type="number" min="1" value={certForm.donationCount} onChange={e=>setCertForm({...certForm,donationCount:e.target.value})} required className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Donation Date *</label>
              <input type="date" value={certForm.donationDate} onChange={e=>setCertForm({...certForm,donationDate:e.target.value})} required className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Candidate Photo</label>
              <div className="flex items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-red-400 transition text-sm text-gray-500 dark:text-gray-400">
                  📷 {photoFile ? photoFile.name.slice(0,20)+"…" : "Upload Photo"}
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden"/>
                </label>
                {photoPreview && <img src={photoPreview} alt="preview" className="w-12 h-14 object-cover border-2 border-red-400"/>}
              </div>
            </div>
            <div className="sm:col-span-2 flex gap-3 mt-2">
              <button type="button" onClick={()=>setView("dashboard")} className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
              <button type="submit" disabled={generating} className="flex-1 py-3 rounded-lg font-bold text-white text-sm uppercase tracking-wider hover:opacity-90 disabled:opacity-60 transition"
                style={{background:"linear-gradient(135deg,#b71c1c,#e53935)"}}>
                {generating
                  ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>Generating…</span>
                  : "🎓 Generate Certificate"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast && <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>{toast.msg}</div>}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: INVITE FORM
  // ══════════════════════════════════════════════════════════════════════════
  if (view === "inviteForm") return (
    <div className="min-h-screen p-4" style={{background:"linear-gradient(160deg,#f8f4ed,#fffdf7,#f8f4ed)"}}>
      {/* Hidden invite card for toPng */}
      <div style={{position:"fixed",top:"-9999px",left:"-9999px",zIndex:-1,opacity:0,pointerEvents:"none"}}>
        {liveCard && <InviteCard data={liveCard} cardRef={invCardRef}/>}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={()=>setView("dashboard")} className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:bg-gray-50 transition">←</button>
          <div>
            <h1 className="text-xl font-black text-gray-800">Send WhatsApp Invitation</h1>
            <p className="text-xs text-gray-400">Beautiful invite card → Cloudinary → MongoDB → WhatsApp</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{border:"1px solid rgba(200,164,90,0.2)"}}>
          <div className="px-6 py-5 relative overflow-hidden" style={{background:"linear-gradient(135deg,#0a0f1e,#162238)"}}>
            <div style={{position:"absolute",top:"-50%",right:"-10%",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,164,90,0.15) 0%,transparent 70%)"}}/>
            <div className="relative z-10 flex items-center gap-3">
              <div className="text-2xl">💌</div>
              <div>
                <p className="font-bold" style={{color:"#f5d87a"}}>Invitation Details</p>
                <p className="text-xs" style={{color:"#a0856a"}}>Fill in recipient & event info below</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSendInvite} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Recipient Name *</label>
              <input value={invForm.invName} required onChange={e=>setInvForm({...invForm,invName:e.target.value})} placeholder="Full name of the invitee" className={inp2}/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">WhatsApp Number *</label>
              <input value={invForm.whatsapp} required onChange={e=>setInvForm({...invForm,whatsapp:e.target.value})} placeholder="91 98765 43210" className={inp2}/>
              <p className="text-xs text-gray-400 mt-1">With country code, e.g. 919876543210</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Event Type *</label>
              <select value={invForm.eventName} required onChange={e=>setInvForm({...invForm,eventName:e.target.value})} className={inp2}>
                {EVENT_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            {invForm.eventName === "Other (Custom)" && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Custom Event Name *</label>
                <input value={invForm.customEvent} required onChange={e=>setInvForm({...invForm,customEvent:e.target.value})} placeholder="Type your event name" className={inp2}/>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Event Date *</label>
              <input type="date" value={invForm.eventDate} required onChange={e=>setInvForm({...invForm,eventDate:e.target.value})} className={inp2}/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Venue / Location *</label>
              <input value={invForm.eventLocation} required onChange={e=>setInvForm({...invForm,eventLocation:e.target.value})} placeholder="Village Hall, School Ground" className={inp2}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Full Address <span className="font-normal text-gray-400">(optional — uses NGO address if blank)</span></label>
              <input value={invForm.invAddress} onChange={e=>setInvForm({...invForm,invAddress:e.target.value})} placeholder="Leave blank to use NGO address" className={inp2}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Event Link <span className="font-normal text-gray-400">(optional)</span></label>
              <input value={invForm.inviteLink} onChange={e=>setInvForm({...invForm,inviteLink:e.target.value})} placeholder="https://... (Google Maps, website)" className={inp2}/>
            </div>
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2 pt-3" style={{borderTop:"1px solid #f0ebe0"}}>
              <button type="button" onClick={handlePreviewMsg} className="flex-1 py-3 rounded-xl text-sm font-bold border-2 hover:bg-yellow-50 transition" style={{borderColor:"#c8a45a",color:"#8a6200"}}>👁 Preview Message</button>
              <button type="button" onClick={()=>setView("dashboard")} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition">Cancel</button>
              <button type="submit" disabled={invGen} className="flex-1 py-3 rounded-xl text-sm font-bold text-white uppercase tracking-wider hover:opacity-90 disabled:opacity-60 transition"
                style={{background:invGen?"#4caf50":"#25D366",boxShadow:"0 4px 15px rgba(37,211,102,0.4)"}}>
                {invGen
                  ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>Generating Card…</span>
                  : <span className="flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Send via WhatsApp
                    </span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Preview Modal */}
      {previewMsg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between" style={{background:"#25D366"}}>
              <span className="text-white font-bold text-sm">📱 WhatsApp Message Preview</span>
              <button onClick={()=>setPreviewMsg(null)} className="text-white font-bold text-lg">✕</button>
            </div>
            <div className="p-5">
              <div className="rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed overflow-y-auto" style={{maxHeight:"55vh",background:"#dcf8c6",border:"1px solid #b5e8a0",fontFamily:"monospace"}}>{previewMsg}</div>
              <p className="text-xs text-gray-400 mt-3 text-center">ℹ️ Cloudinary card URL inserted automatically when you click Send</p>
            </div>
          </div>
        </div>
      )}
      {toast && <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>{toast.msg}</div>}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: DASHBOARD  (two tabs)
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg flex-wrap gap-2"
        style={{background:"linear-gradient(135deg,#7f0000,#b71c1c)"}}>
        <div className="flex items-center gap-3">
          <svg width="22" height="26" viewBox="0 0 44 56"><path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="rgba(255,255,255,0.9)"/></svg>
          <div>
            <div className="text-white font-black text-sm tracking-wide" style={{fontFamily:"Georgia,serif"}}>NGO Admin Panel</div>
            <div className="text-red-200 text-xs hidden sm:block">{NGO_NAME}</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Blood Certificate button */}
          <button onClick={()=>setView("certForm")}
            className="px-3 py-2 rounded-lg bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition">
            🩸 New Certificate
          </button>
          {/* Send Invite button — gold, prominent */}
          <button onClick={()=>setView("inviteForm")}
            className="px-3 py-2 rounded-lg text-xs font-bold hover:scale-105 transition-all"
            style={{background:"linear-gradient(135deg,#c8a45a,#f5d87a)",color:"#0a0f1e",boxShadow:"0 3px 10px rgba(200,164,90,0.4)"}}>
            💌 Send Invite
          </button>
          <button onClick={handleLogout}
            className="px-3 py-2 rounded-lg text-white text-xs font-semibold hover:bg-white hover:bg-opacity-20 transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {label:"Total Certificates", value:certs.length,                              icon:"📋", color:"#b71c1c"},
            {label:"Unique Donors",      value:new Set(certs.map(c=>c.phone)).size,        icon:"🩸", color:"#1565c0"},
            {label:"Total Invitations",  value:invites.length,                             icon:"💌", color:"#c8a45a"},
            {label:"Invite Events",      value:new Set(invites.map(i=>i.eventName)).size,  icon:"🎉", color:"#6a1b9a"},
          ].map(s=>(
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:s.color+"18"}}>{s.icon}</div>
              <div>
                <div className="text-2xl font-black" style={{color:s.color}}>{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-4">
          <button onClick={()=>setDashTab("certs")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${dashTab==="certs"?"text-white":"bg-white dark:bg-gray-800 text-gray-500 hover:bg-red-50"}`}
            style={dashTab==="certs"?{background:"linear-gradient(135deg,#b71c1c,#e53935)"}:{}}>
            🩸 Blood Certificates ({certs.length})
          </button>
          <button onClick={()=>setDashTab("invites")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${dashTab==="invites"?"text-white":"bg-white dark:bg-gray-800 text-gray-500 hover:bg-yellow-50"}`}
            style={dashTab==="invites"?{background:"linear-gradient(135deg,#c8a45a,#f0d070)",color:"#0a0f1e"}:{}}>
            💌 Invitations ({invites.length})
          </button>
        </div>

        {/* CERTS TABLE */}
        {dashTab === "certs" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            {certsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                <svg className="animate-spin w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Loading from MongoDB…</p>
                <p className="text-xs text-gray-400 text-center px-4">⏳ First load may take 10–15 sec (server waking up)</p>
                <button onClick={loadCerts} className="mt-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{background:"#b71c1c"}}>🔄 Retry</button>
              </div>
            ) : certs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">📋</div>
                <p className="font-semibold">No certificates yet</p>
                <button onClick={()=>setView("certForm")} className="mt-3 px-5 py-2 rounded-lg text-white text-sm font-bold" style={{background:"#b71c1c"}}>Generate First Certificate</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-widest font-bold" style={{background:"linear-gradient(135deg,#b71c1c,#e53935)",color:"#fff"}}>
                      {["#","Name","Phone","Blood","Camp","Date","Actions"].map(h=><th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {certs.map((cert,idx)=>(
                      <tr key={cert._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-gray-750 transition">
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx+1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {cert.photoUrl ? <img src={cert.photoUrl} alt="" className="w-8 h-9 object-cover border-2 border-red-200 flex-shrink-0"/> : <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-black text-xs flex-shrink-0">{cert.name.charAt(0)}</div>}
                            <div><div className="font-semibold text-gray-800 dark:text-white">{cert.name}</div><div className="text-xs text-gray-400">{cert.email||"—"}</div></div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cert.phone}</td>
                        <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{background:"#fce4ec",color:"#b71c1c"}}>{cert.bloodGroup}</span></td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{cert.campName||"—"}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">{fmtDateShort(cert.donationDate)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button onClick={()=>setViewCert(cert)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#1565c0"}}>👁 View</button>
                            <button onClick={async()=>{try{const res=await fetch(cert.certificateUrl);const blob=await res.blob();const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`cert-${cert.name}.png`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}catch{window.open(cert.certificateUrl,"_blank");}}} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#2e7d32"}}>⬇</button>
                            <button onClick={()=>handleDeleteCert(cert._id)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#b71c1c"}}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* INVITES TABLE */}
        {dashTab === "invites" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden" style={{border:"1px solid rgba(200,164,90,0.15)"}}>
            {invLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <svg className="animate-spin w-8 h-8" style={{color:"#c8a45a"}} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                <p className="text-sm font-semibold text-gray-500">Loading invitations…</p>
                <p className="text-xs text-gray-400">⏳ First load may take 10–15 sec (server waking up)</p>
                <button onClick={loadInvites} className="mt-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{background:"#c8a45a"}}>🔄 Retry</button>
              </div>
            ) : invites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">💌</div>
                <p className="font-semibold text-gray-600 dark:text-gray-300">No invitations sent yet</p>
                <button onClick={()=>setView("inviteForm")} className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition" style={{background:"linear-gradient(135deg,#c8a45a,#f5d87a)",color:"#0a0f1e"}}>Send First Invitation</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-widest" style={{background:"linear-gradient(135deg,#0a0f1e,#1b2a3b)"}}>
                      {["#","Recipient","WhatsApp","Event","Date","Card","Actions"].map(h=><th key={h} className="px-4 py-3 whitespace-nowrap font-bold" style={{color:"#c8a45a"}}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {invites.map((inv,idx)=>(
                      <tr key={inv._id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-yellow-50/40 transition">
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx+1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{background:"linear-gradient(135deg,#c8a45a,#f5d87a)",color:"#0a0f1e"}}>{(inv.name||"?").charAt(0).toUpperCase()}</div>
                            <div><div className="font-semibold text-gray-800 dark:text-white text-sm">{inv.name}</div><div className="text-xs text-gray-400">{inv.address||"—"}</div></div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{inv.whatsapp}</td>
                        <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{background:"rgba(200,164,90,0.12)",color:"#8a6200"}}>{inv.eventName}</span></td>
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{fmtDateShort(inv.eventDate)}</td>
                        <td className="px-4 py-3">{inv.imageUrl ? <button onClick={()=>setViewInvCard(inv)}><img src={inv.imageUrl} alt="card" className="w-20 h-11 object-cover rounded-lg hover:scale-110 transition" style={{border:"2px solid rgba(200,164,90,0.4)"}}/></button> : <span className="text-gray-300 text-xs">—</span>}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5 flex-wrap">
                            <button onClick={()=>window.open(inv.waLink,"_blank")} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#25D366"}}>📲</button>
                            {inv.imageUrl && <button onClick={()=>setViewInvCard(inv)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#1565c0"}}>👁</button>}
                            {inv.imageUrl && <button onClick={async()=>{try{const r=await fetch(inv.imageUrl);const b=await r.blob();const url=URL.createObjectURL(b);const a=document.createElement("a");a.href=url;a.download=`invite-${inv.name}.png`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}catch{window.open(inv.imageUrl,"_blank");}}} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#2e7d32"}}>⬇</button>}
                            <button onClick={()=>handleDeleteInvite(inv._id)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#b71c1c"}}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cert view modal */}
      {viewCert && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between" style={{background:"linear-gradient(135deg,#b71c1c,#e53935)"}}>
              <span className="text-white font-bold">{viewCert.name}'s Certificate</span>
              <div className="flex gap-2">
                <button onClick={async()=>{try{const res=await fetch(viewCert.certificateUrl);const blob=await res.blob();const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`cert-${viewCert.name}.png`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}catch{window.open(viewCert.certificateUrl,"_blank");}}} className="px-4 py-1.5 rounded-lg bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition">⬇ Download</button>
                <button onClick={()=>setViewCert(null)} className="text-white text-xl font-bold opacity-80 hover:opacity-100 ml-1">✕</button>
              </div>
            </div>
            <div className="p-4"><img src={viewCert.certificateUrl} alt="Certificate" className="w-full h-auto rounded-lg" style={{maxHeight:"70vh",objectFit:"contain"}}/></div>
          </div>
        </div>
      )}

      {/* Invite card view modal */}
      {viewInvCard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between" style={{background:"linear-gradient(135deg,#0a0f1e,#10192e)",borderBottom:"1px solid rgba(200,164,90,0.2)"}}>
              <span className="font-bold text-sm" style={{color:"#f5d87a"}}>💌 {viewInvCard.name}'s Invitation</span>
              <div className="flex gap-2">
                <button onClick={async()=>{try{const r=await fetch(viewInvCard.imageUrl);const b=await r.blob();const url=URL.createObjectURL(b);const a=document.createElement("a");a.href=url;a.download=`invite-${viewInvCard.name}.png`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}catch{window.open(viewInvCard.imageUrl,"_blank");}}} className="px-4 py-1.5 rounded-lg text-xs font-bold" style={{background:"linear-gradient(135deg,#c8a45a,#f5d87a)",color:"#0a0f1e"}}>⬇ Download</button>
                <button onClick={()=>window.open(viewInvCard.waLink,"_blank")} className="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#25D366"}}>📲 Resend</button>
                <button onClick={()=>setViewInvCard(null)} className="text-white text-xl font-bold opacity-70 hover:opacity-100 ml-1">✕</button>
              </div>
            </div>
            <div className="p-4"><img src={viewInvCard.imageUrl} alt="Invite" className="w-full h-auto rounded-xl" style={{maxHeight:"70vh",objectFit:"contain"}}/></div>
          </div>
        </div>
      )}

      {toast && <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>{toast.msg}</div>}
    </div>
  );
}