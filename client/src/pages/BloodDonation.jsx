// client/src/pages/BloodDonation.jsx
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

const ADMIN_EMAIL   = "narayanpurbipaderbondhu@gmail.com";
const ADMIN_PASS    = "Kada@#2000";
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || "dfi3ywweg";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
const API           = `${import.meta.env.VITE_BACKEND_URL}/api/blood-certificates`;
const WA_NUM        = "919733725202";
const BLOOD_GROUPS  = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
const NGO_LOGO      = "/images/profile.png";
const NGO_ADDRESS   = "Vill- Narayan Pur, P.O- Amiya Narayan Pur, P.S- Thanar Para, Dist- Nadia, Pin- 741165, West Bengal, India";

async function uploadCloud(file, folder) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  fd.append("folder", folder);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method:"POST", body:fd });
  return (await r.json()).secure_url;
}

// ─── CERTIFICATE DESIGN ───────────────────────────────────────────────────────
function Certificate({ donor, certRef }) {
  const {
    name = "", bloodGroup = "O+", donationCount = "1",
    donationDate = "", address = "", photoUrl = null, campName = ""
  } = donor;

  const date = donationDate
    ? new Date(donationDate).toLocaleDateString("en-IN", { day:"2-digit", month:"long", year:"numeric" })
    : "—";

  return (
    <div ref={certRef} style={{
      width: 1123,
      height: 794,
      background: "linear-gradient(160deg,#fff9f9 0%,#ffffff 55%,#fff5f5 100%)",
      fontFamily: "'Times New Roman',Times,serif",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    }}>

      {/* ── Top/bottom bars ── */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:12,background:"linear-gradient(90deg,#4a0000,#b71c1c,#e53935,#b71c1c,#4a0000)",zIndex:4}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:12,background:"linear-gradient(90deg,#4a0000,#b71c1c,#e53935,#b71c1c,#4a0000)",zIndex:4}}/>

      {/* ── Borders ── */}
      <div style={{position:"absolute",inset:14,border:"5px double #b71c1c",zIndex:1,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:24,border:"1.5px solid #e57373",zIndex:1,pointerEvents:"none"}}/>

      {/* ── Corner ornaments ── */}
      {[{top:14,left:14},{top:14,right:14},{bottom:14,left:14},{bottom:14,right:14}].map((s,i)=>(
        <div key={i} style={{position:"absolute",...s,width:44,height:44,
          borderTop:(s.top!==undefined)?"4px solid #b71c1c":"none",
          borderBottom:(s.bottom!==undefined)?"4px solid #b71c1c":"none",
          borderLeft:(s.left!==undefined)?"4px solid #b71c1c":"none",
          borderRight:(s.right!==undefined)?"4px solid #b71c1c":"none",
          zIndex:2}}/>
      ))}

      {/* ── Watermark ── */}
      <div style={{
        position:"absolute",top:"50%",left:"50%",
        transform:"translate(-50%,-50%) rotate(-28deg)",
        fontSize:100,fontWeight:900,color:"rgba(183,28,28,0.04)",
        whiteSpace:"nowrap",zIndex:0,userSelect:"none",letterSpacing:8,
      }}>
        BLOOD DONATION
      </div>

      {/* ── PHOTO — top right ── */}
      <div style={{position:"absolute",top:30,right:30,zIndex:6}}>
        <div style={{
          width:118,height:142,
          border:"3px solid #b71c1c",
          boxShadow:"0 4px 16px rgba(183,28,28,0.3)",
          background:"#f5f5f5",
          display:"flex",alignItems:"center",justifyContent:"center",
          overflow:"hidden",
        }}>
          {photoUrl
            ? <img src={photoUrl} alt="Donor" style={{width:"100%",height:"100%",objectFit:"cover"}} crossOrigin="anonymous"/>
            : <svg width="60" height="72" viewBox="0 0 24 28" fill="#ccc">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v4h19.2v-4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
          }
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT — uses absolute positioning
          to perfectly fill the certificate area
      ══════════════════════════════════════════ */}
      <div style={{
        position:"absolute",
        top:12, bottom:12, left:28, right:165,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        zIndex:5,
        padding:"12px 6px 12px",
        /* Space-between pushes sections to fill full height */
        justifyContent:"space-between",
      }}>

        {/* ══ SECTION 1: NGO Header ══ */}
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,width:"100%",justifyContent:"center",marginBottom:6}}>
            <svg width="26" height="32" viewBox="0 0 44 56">
              <path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="#b71c1c" stroke="#7f0000" strokeWidth="1.5"/>
              <path d="M14 40C14 40 11 36 11 33C11 27.477 15.477 23 21 23" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <img src={NGO_LOGO} alt="NGO Logo" crossOrigin="anonymous"
              style={{width:62,height:62,objectFit:"contain",borderRadius:"50%",border:"2px solid #e57373",flexShrink:0}}
              onError={e=>{e.target.style.display="none";}}/>
            <div style={{textAlign:"center"}}>
              {/* SOCIETY NAME — biggest element in header */}
              <div style={{
                fontSize:20,
                letterSpacing:2,
                color:"#b71c1c",
                fontWeight:900,
                textTransform:"uppercase",
                lineHeight:1.2,
              }}>
                Narayan Pur Bipader Bondhu Welfare Society
              </div>
              <div style={{fontSize:10.5,color:"#555",letterSpacing:0.5,marginTop:3,fontWeight:600}}>
                Govt. Registered NGO &nbsp;•&nbsp; Reg. No: S0042589 of 2024–2025
              </div>
              <div style={{fontSize:9.5,color:"#777",letterSpacing:0.3,marginTop:2}}>
                {NGO_ADDRESS}
              </div>
            </div>
            <img src={NGO_LOGO} alt="NGO Logo" crossOrigin="anonymous"
              style={{width:62,height:62,objectFit:"contain",borderRadius:"50%",border:"2px solid #e57373",flexShrink:0}}
              onError={e=>{e.target.style.display="none";}}/>
            <svg width="26" height="32" viewBox="0 0 44 56">
              <path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="#b71c1c" stroke="#7f0000" strokeWidth="1.5"/>
              <path d="M14 40C14 40 11 36 11 33C11 27.477 15.477 23 21 23" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Thick gradient divider under header */}
          <div style={{width:"95%",height:3,background:"linear-gradient(90deg,transparent,#b71c1c,#e53935,#b71c1c,transparent)"}}/>
        </div>

        {/* ══ SECTION 2: Certificate Title ══ */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <h1 style={{
            fontSize:48,
            fontWeight:900,
            color:"#7f0000",
            letterSpacing:5,
            textTransform:"uppercase",
            margin:0,
            textAlign:"center",
            lineHeight:1.1,
          }}>
            Blood Donation Certificate
          </h1>
          <p style={{fontSize:14,color:"#888",fontStyle:"italic",margin:0,letterSpacing:0.5}}>
            This certificate is proudly awarded to
          </p>
        </div>

        {/* ══ SECTION 3: Donor Name + Description ══ */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <div style={{
            fontSize:42,
            fontWeight:900,
            color:"#1a1a1a",
            borderBottom:"3px solid #b71c1c",
            paddingBottom:6,
            letterSpacing:3,
            textAlign:"center",
            minWidth:380,
          }}>
            {name}
          </div>
          <p style={{
            fontSize:14,
            color:"#444",
            textAlign:"center",
            lineHeight:1.75,
            margin:0,
            maxWidth:600,
          }}>
            for their selfless act of donating blood and demonstrating exceptional compassion,<br/>
            dedication and humanity in service of saving precious lives.
          </p>
        </div>

        {/* ══ SECTION 4: Stats + Camp ══ */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          {/* Stats boxes */}
          <div style={{display:"flex",gap:20,justifyContent:"center"}}>
            {[
              ["Blood Group", bloodGroup],
              ["Donation Count", `${donationCount} Time${parseInt(donationCount)>1?"s":""}`],
              ["Donation Date", date],
            ].map(([label,value])=>(
              <div key={label} style={{
                textAlign:"center",
                background:"linear-gradient(135deg,#fff0f0,#fff)",
                border:"2px solid #e57373",
                borderRadius:12,
                padding:"12px 28px",
                minWidth:138,
                boxShadow:"0 3px 12px rgba(183,28,28,0.1)",
              }}>
                <div style={{fontSize:9.5,color:"#b71c1c",letterSpacing:2,textTransform:"uppercase",fontWeight:800,marginBottom:5}}>
                  {label}
                </div>
                <div style={{fontSize:21,fontWeight:900,color:"#1a1a1a"}}>{value}</div>
              </div>
            ))}
          </div>

          {/* Camp + address row */}
          {(campName || address) && (
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              {campName && (
                <div style={{
                  display:"flex",alignItems:"center",gap:7,
                  background:"linear-gradient(135deg,#fff0f0,#fff)",
                  border:"1.5px solid #e57373",borderRadius:9,
                  padding:"7px 18px",
                }}>
                  <span style={{fontSize:15}}>🏕️</span>
                  <div>
                    <div style={{fontSize:9.5,color:"#b71c1c",letterSpacing:1.5,textTransform:"uppercase",fontWeight:800}}>Camp Name</div>
                    <div style={{fontSize:14.5,fontWeight:800,color:"#1a1a1a"}}>{campName}</div>
                  </div>
                </div>
              )}
              {address && (
                <div style={{
                  display:"flex",alignItems:"center",gap:7,
                  background:"#fafafa",border:"1px solid #eee",
                  borderRadius:9,padding:"7px 18px",
                }}>
                  <span style={{fontSize:15}}>📍</span>
                  <div style={{fontSize:13,color:"#555",fontWeight:500}}>{address}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ══ SECTION 5: Signatures ══ */}
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
          {/* Divider above signatures */}
          <div style={{width:"95%",height:1.5,background:"linear-gradient(90deg,transparent,#e57373,transparent)",marginBottom:10}}/>

          {/* President + Seal + Secretary */}
          <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"flex-end",padding:"0 45px"}}>

            {/* President */}
            <div style={{textAlign:"center"}}>
              <div style={{
                fontFamily:"'Brush Script MT','Dancing Script',cursive",
                fontSize:32,color:"#1a237e",marginBottom:4,letterSpacing:1,
              }}>
                Tariful Mia
              </div>
              <div style={{width:155,height:2,background:"#333",margin:"0 auto 5px"}}/>
              <div style={{fontSize:12,fontWeight:800,color:"#333",letterSpacing:2,textTransform:"uppercase"}}>President</div>
              <div style={{fontSize:9,color:"#777",marginTop:2}}>Narayan Pur Bipader Bondhu Welfare Society</div>
            </div>

            {/* Center seal */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{
                width:92,height:92,borderRadius:"50%",
                border:"3px solid #b71c1c",
                outline:"2px dashed #e57373",
                outlineOffset:"4px",
                display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",
                background:"linear-gradient(135deg,#fff0f0,#fff)",
                boxShadow:"0 4px 16px rgba(183,28,28,0.25)",
                transform:"rotate(-15deg)",
              }}>
                <div style={{fontSize:8,fontWeight:900,color:"#b71c1c",letterSpacing:2,textTransform:"uppercase",marginBottom:2,opacity:0.7}}>
                  CERTIFIED
                </div>
                <div style={{fontSize:14,fontWeight:900,color:"#b71c1c",letterSpacing:1,textTransform:"uppercase",lineHeight:1.1}}>
                  ✓ APPROVED
                </div>
                <div style={{fontSize:7,fontWeight:700,color:"#b71c1c",letterSpacing:1,marginTop:2,opacity:0.7}}>
                  2026
                </div>
              </div>
            </div>

            {/* Secretary */}
            <div style={{textAlign:"center"}}>
              <div style={{
                fontFamily:"'Brush Script MT','Dancing Script',cursive",
                fontSize:32,color:"#1a237e",marginBottom:4,letterSpacing:1,
              }}>
                Juel Rana Khan
              </div>
              <div style={{width:155,height:2,background:"#333",margin:"0 auto 5px"}}/>
              <div style={{fontSize:12,fontWeight:800,color:"#333",letterSpacing:2,textTransform:"uppercase"}}>Secretary</div>
              <div style={{fontSize:9,color:"#777",marginTop:2}}>Narayan Pur Bipader Bondhu Welfare Society</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BloodDonation() {
  const [view, setView]             = useState("public");
  const [loginData, setLogin]       = useState({ email:"", password:"" });
  const [loginErr, setLoginErr]     = useState("");
  const [certs, setCerts]           = useState([]);
  const [loading, setLoading]       = useState(false);
  const [generating, setGen]        = useState(false);
  const [viewCert, setViewCert]     = useState(null);
  const [toast, setToast]           = useState(null);
  const [donor, setDonor]           = useState(null);
  const [form, setForm]             = useState({
    name:"", email:"", phone:"", address:"",
    bloodGroup:"O+", donationCount:"1",
    donationDate: new Date().toISOString().split("T")[0],
    campName:"",
  });
  const [photoFile, setPhoto]       = useState(null);
  const [photoPreview, setPreview]  = useState(null);
  const certRef = useRef(null);

  const toast_ = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3000);
  };

  useEffect(() => {
    if (localStorage.getItem("blood_admin")) setView("dashboard");
  }, []);

  const loadCerts = () => {
    setLoading(true);
    fetch(API)
      .then(r=>r.json())
      .then(j=>{ if(j.success) setCerts(j.data); })
      .catch(()=>toast_("Failed to load","error"))
      .finally(()=>setLoading(false));
  };

  useEffect(() => {
    if (view === "dashboard") loadCerts();
  }, [view]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email===ADMIN_EMAIL && loginData.password===ADMIN_PASS) {
      localStorage.setItem("blood_admin","1");
      setView("dashboard");
    } else {
      setLoginErr("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("blood_admin");
    setView("public");
  };

  const handlePhotoChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPhoto(f);
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGen(true);
    try {
      setDonor({ ...form, photoUrl: photoPreview || null });
      await new Promise(r => setTimeout(r, 700));

      const dataUrl = await toPng(certRef.current, { cacheBust:true, pixelRatio:2 });
      const certBlob = await (await fetch(dataUrl)).blob();
      const certificateUrl = await uploadCloud(certBlob, "blood-certificates");

      let photoUrl = "";
      if (photoFile) {
        try { photoUrl = await uploadCloud(photoFile, "blood-certificates/photos"); } catch {}
      }

      const res  = await fetch(API, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          ...form,
          donationCount: Number(form.donationCount),
          donationDate: new Date(form.donationDate),
          photoUrl, certificateUrl,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setCerts(prev => [json.data, ...prev]);
      setView("dashboard");
      setDonor(null);
      setForm({ name:"", email:"", phone:"", address:"", bloodGroup:"O+", donationCount:"1", donationDate:new Date().toISOString().split("T")[0], campName:"" });
      setPhoto(null); setPreview(null);
      toast_(`Certificate generated for ${json.data.name}!`);
    } catch(err) {
      toast_(err.message, "error");
    } finally {
      setGen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this certificate?")) return;
    await fetch(`${API}/${id}`, { method:"DELETE" });
    setCerts(prev => prev.filter(c => c._id !== id));
    toast_("Deleted.");
  };

  const inp = "w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition";

  // ── PUBLIC ──────────────────────────────────────────────────────────────────
  if (view === "public") return (
    <div className="relative rounded-2xl overflow-hidden my-8 mx-4"
      style={{background:"linear-gradient(135deg,#7f0000,#b71c1c,#e53935)",boxShadow:"0 8px 32px rgba(183,28,28,0.35)"}}>
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 bg-white"/>
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10 bg-white"/>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8">
        <div className="text-white text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <svg width="26" height="32" viewBox="0 0 44 56">
              <path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="rgba(255,255,255,0.9)"/>
            </svg>
            <h2 className="text-2xl font-black tracking-wide" style={{fontFamily:"Georgia,serif"}}>Blood Donation Certificate</h2>
          </div>
          <p className="text-red-100 text-sm max-w-xs leading-relaxed">
            Donate blood, save lives — receive an official certificate from our Govt. registered NGO.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${WA_NUM}?text=Hello%20I%20want%20to%20donate%20blood%20and%20get%20a%20blood%20donation%20certificate%20from%20Narayan%20Pur%20Bipader%20Bondhu%20Welfare%20Society.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 transition-all"
            style={{background:"#25D366",boxShadow:"0 4px 14px rgba(37,211,102,0.4)"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Donate Blood &amp; Get Certificate
          </a>
          <button onClick={() => setView("login")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 transition-all"
            style={{background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.4)"}}>
            🔐 Admin Login
          </button>
        </div>
      </div>
    </div>
  );

  // ── LOGIN ───────────────────────────────────────────────────────────────────
  if (view === "login") return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background:"linear-gradient(135deg,#1a0000,#7f0000,#b71c1c)"}}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 text-center" style={{background:"rgba(0,0,0,0.35)"}}>
          <svg className="mx-auto mb-3" width="40" height="48" viewBox="0 0 44 56">
            <path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="#e53935"/>
          </svg>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase" style={{fontFamily:"Georgia,serif"}}>Admin Portal</h1>
          <p className="text-red-200 text-xs mt-1">Narayan Pur Bipader Bondhu Welfare Society</p>
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
              style={{background:"linear-gradient(135deg,#b71c1c,#e53935)"}}>Login</button>
            <button type="button" onClick={()=>setView("public")} className="text-sm text-gray-400 hover:text-gray-600 text-center">← Back</button>
          </form>
        </div>
      </div>
    </div>
  );

  // ── FORM ────────────────────────────────────────────────────────────────────
  if (view === "form") return (
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
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Donor's full name" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@example.com" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Phone *</label>
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required placeholder="+91 XXXXX XXXXX" className={inp}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Address</label>
              <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Village, District, State" className={inp}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">🏕️ Blood Donation Camp Name</label>
              <input value={form.campName} onChange={e=>setForm({...form,campName:e.target.value})} placeholder="e.g. Narayan Pur Blood Camp 2026" className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Blood Group *</label>
              <select value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})} className={inp}>
                {BLOOD_GROUPS.map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Donation Count *</label>
              <input type="number" min="1" value={form.donationCount} onChange={e=>setForm({...form,donationCount:e.target.value})} required className={inp}/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Donation Date *</label>
              <input type="date" value={form.donationDate} onChange={e=>setForm({...form,donationDate:e.target.value})} required className={inp}/>
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
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/>
                    </svg>
                    Generating…
                  </span>
                ) : "🎓 Generate Certificate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-lg"
        style={{background:"linear-gradient(135deg,#7f0000,#b71c1c)"}}>
        <div className="flex items-center gap-3">
          <svg width="22" height="26" viewBox="0 0 44 56">
            <path d="M22 2C22 2 2 24 2 38C2 48.493 11.058 56 22 56C32.942 56 42 48.493 42 38C42 24 22 2 22 2Z" fill="rgba(255,255,255,0.9)"/>
          </svg>
          <div>
            <div className="text-white font-black text-sm tracking-wide" style={{fontFamily:"Georgia,serif"}}>Blood Certificate Admin</div>
            <div className="text-red-200 text-xs hidden sm:block">Narayan Pur Bipader Bondhu Welfare Society</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setView("form")} className="px-4 py-2 rounded-lg bg-white text-red-700 text-sm font-bold hover:bg-red-50 transition">+ New Certificate</button>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:bg-white hover:bg-opacity-20 transition">Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {label:"Total Certificates", value:certs.length,                                                                         icon:"📋", color:"#b71c1c"},
            {label:"Unique Donors",       value:new Set(certs.map(c=>c.phone)).size,                                                 icon:"🩸", color:"#1565c0"},
            {label:"This Month",          value:certs.filter(c=>new Date(c.createdAt).getMonth()===new Date().getMonth()).length,     icon:"📅", color:"#2e7d32"},
            {label:"Blood Groups",        value:new Set(certs.map(c=>c.bloodGroup)).size,                                            icon:"🔬", color:"#6a1b9a"},
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

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <svg className="animate-spin w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/>
              </svg>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Loading from MongoDB…</p>
              <p className="text-xs text-gray-400 text-center px-4">⏳ First load may take 10–15 sec (server waking up)</p>
              <button onClick={loadCerts} className="mt-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{background:"#b71c1c"}}>🔄 Retry</button>
            </div>
          ) : certs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-5xl mb-4">📋</div>
              <p className="font-semibold">No certificates yet</p>
              <button onClick={()=>setView("form")} className="mt-3 px-5 py-2 rounded-lg text-white text-sm font-bold" style={{background:"#b71c1c"}}>
                Generate First Certificate
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest font-bold"
                    style={{background:"linear-gradient(135deg,#b71c1c,#e53935)",color:"#fff"}}>
                    {["#","Name","Phone","Blood","Camp","Date","Actions"].map(h=>(
                      <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {certs.map((cert,idx)=>(
                    <tr key={cert._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-gray-750 transition">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx+1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {cert.photoUrl
                            ? <img src={cert.photoUrl} alt="" className="w-8 h-9 object-cover border-2 border-red-200 flex-shrink-0"/>
                            : <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-black text-xs flex-shrink-0">{cert.name.charAt(0)}</div>
                          }
                          <div>
                            <div className="font-semibold text-gray-800 dark:text-white">{cert.name}</div>
                            <div className="text-xs text-gray-400">{cert.email||"—"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cert.phone}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{background:"#fce4ec",color:"#b71c1c"}}>{cert.bloodGroup}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{cert.campName||"—"}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                        {cert.donationDate ? new Date(cert.donationDate).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button onClick={()=>setViewCert(cert)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#1565c0"}}>👁 View</button>
                          <button onClick={async ()=>{
                            try {
                              const res = await fetch(cert.certificateUrl);
                              const blob = await res.blob();
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url; a.download = `certificate-${cert.name}.png`;
                              document.body.appendChild(a); a.click();
                              document.body.removeChild(a); URL.revokeObjectURL(url);
                            } catch { window.open(cert.certificateUrl, "_blank"); }
                          }} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#2e7d32"}}>⬇</button>
                          <button onClick={()=>handleDelete(cert._id)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:"#b71c1c"}}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {viewCert && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between" style={{background:"linear-gradient(135deg,#b71c1c,#e53935)"}}>
              <span className="text-white font-bold">{viewCert.name}'s Certificate</span>
              <div className="flex gap-2">
                <button onClick={async ()=>{
                  try {
                    const res = await fetch(viewCert.certificateUrl);
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url; a.download = `certificate-${viewCert.name}.png`;
                    document.body.appendChild(a); a.click();
                    document.body.removeChild(a); URL.revokeObjectURL(url);
                  } catch { window.open(viewCert.certificateUrl, "_blank"); }
                }} className="px-4 py-1.5 rounded-lg bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition">⬇ Download</button>
                <button onClick={()=>setViewCert(null)} className="text-white text-xl font-bold opacity-80 hover:opacity-100 ml-1">✕</button>
              </div>
            </div>
            <div className="p-4">
              <img src={viewCert.certificateUrl} alt="Certificate" className="w-full h-auto rounded-lg" style={{maxHeight:"70vh",objectFit:"contain"}}/>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>
          {toast.type==="error"?"❌":"✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}