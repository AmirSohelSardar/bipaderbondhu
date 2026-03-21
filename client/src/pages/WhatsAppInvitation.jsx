// // ╔══════════════════════════════════════════════════════════════════════════╗
// // ║         WhatsAppInvitation.jsx — COMPLETE SELF-CONTAINED FILE            ║
// // ║   Copy this entire file to: client/src/pages/WhatsAppInvitation.jsx      ║
// // ║                                                                           ║
// // ║  SETUP (2 steps only):                                                    ║
// // ║  1. In App.jsx add:                                                       ║
// // ║       import WhatsAppInvitation from "./pages/WhatsAppInvitation";        ║
// // ║       <Route path="/whatsapp-invitation" element={<WhatsAppInvitation/>}/>║
// // ║                                                                           ║
// // ║  2. In BloodDonation.jsx dashboard <nav>, add ONE button:                 ║
// // ║       import { useNavigate } from "react-router-dom";  ← top of file     ║
// // ║       const navigate = useNavigate();                  ← inside component ║
// // ║       <button onClick={()=>navigate("/whatsapp-invitation")}              ║
// // ║         className="px-4 py-2 rounded-lg text-sm font-bold"               ║
// // ║         style={{background:"linear-gradient(135deg,#c8a45a,#f0d070)",     ║
// // ║                 color:"#0d1b2a"}}>                                        ║
// // ║         💌 Send Invite                                                    ║
// // ║       </button>                                                           ║
// // ║                                                                           ║
// // ║  NO new backend files needed. NO new npm packages needed.                 ║
// // ║  Uses your existing: Cloudinary env vars + MongoDB backend                ║
// // ╚══════════════════════════════════════════════════════════════════════════╝

// import { useState, useEffect, useRef } from "react";
// import { toPng } from "html-to-image";
// import { useNavigate } from "react-router-dom";

// // ─── CONFIG (uses your existing env vars — no changes needed) ────────────────
// const ADMIN_EMAIL   = "narayanpurbipaderbondhu@gmail.com";
// const ADMIN_PASS    = "Kada@#2000";
// const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || "dfi3ywweg";
// const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
// const BACKEND_URL   = import.meta.env.VITE_BACKEND_URL;
// const API           = `${BACKEND_URL}/api/invitations`;

// // ─── NGO INFO ────────────────────────────────────────────────────────────────
// const NGO_NAME    = "Narayan Pur Bipader Bondhu Welfare Society";
// const NGO_REG     = "Govt. Registered NGO • Reg. No: S0042589 of 2024–2025";
// const NGO_ADDRESS = "Vill- Narayan Pur, P.O- Amiya Narayan Pur, P.S- Thanar Para, Dist- Nadia, Pin- 741165, West Bengal, India";
// const NGO_LOGO    = "/images/profile.png";

// const EVENT_TYPES = [
//   "Blood Donation Camp",
//   "Cloth Donation Drive",
//   "Food Distribution",
//   "Tree Plantation",
//   "Health Awareness Camp",
//   "Education Support Program",
//   "Flood Relief Drive",
//   "Winter Blanket Distribution",
//   "Community Clean-Up",
//   "Other (Custom)",
// ];

// // ─── HELPERS ─────────────────────────────────────────────────────────────────
// async function uploadToCloudinary(blob, folder) {
//   const fd = new FormData();
//   fd.append("file", blob);
//   fd.append("upload_preset", UPLOAD_PRESET);
//   fd.append("folder", folder);
//   const r = await fetch(
//     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//     { method: "POST", body: fd }
//   );
//   const j = await r.json();
//   if (!j.secure_url) throw new Error("Cloudinary upload failed: " + (j.error?.message || "unknown"));
//   return j.secure_url;
// }

// function cleanPhone(raw) {
//   // Remove spaces, dashes, dots, parentheses, leading +
//   return raw.replace(/[\s\-().+]/g, "").replace(/^00/, "");
// }

// function formatDateLong(dateStr) {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleDateString("en-IN", {
//     weekday: "long", day: "2-digit", month: "long", year: "numeric",
//   });
// }

// function buildWhatsAppMessage(form, imageUrl) {
//   const date     = formatDateLong(form.eventDate);
//   const address  = form.address || NGO_ADDRESS;
//   const eventName = form.eventName === "Other (Custom)" ? (form.customEvent || "Special Event") : form.eventName;

//   let msg =
//     `🌟 *আপনি আমন্ত্রিত! You're Cordially Invited!* 🌟\n\n` +
//     `আসসালামু আলাইকুম / নমস্কার 🙏\n\n` +
//     `প্রিয় *${form.name}*,\n\n` +
//     `*${NGO_NAME}* এর পক্ষ থেকে আপনাকে আমাদের আসন্ন অনুষ্ঠানে আন্তরিকভাবে আমন্ত্রণ জানাচ্ছি:\n\n` +
//     `🎉 *${eventName}*\n\n` +
//     `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
//     `📅 *তারিখ / Date:* ${date}\n` +
//     `📍 *স্থান / Venue:* ${form.eventLocation}\n` +
//     `🏠 *ঠিকানা / Address:* ${address}\n` +
//     `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

//   if (imageUrl) {
//     msg += `🖼️ *Invitation Card:* ${imageUrl}\n\n`;
//   }
//   if (form.inviteLink) {
//     msg += `🔗 *Details / Event Link:* ${form.inviteLink}\n\n`;
//   }

//   msg +=
//     `✨ আপনার উপস্থিতি এই অনুষ্ঠানকে সফল করবে।\n` +
//     `_Your presence will make this event truly special!_\n\n` +
//     `❤️ *ধন্যবাদ / Thank You*\n\n` +
//     `*${NGO_NAME}*\n` +
//     `_${NGO_REG}_\n` +
//     `📞 যোগাযোগের জন্য WhatsApp করুন।`;

//   return msg;
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  BEAUTIFUL INVITATION CARD  (1200 × 675 px — rendered offscreen → PNG)
// // ════════════════════════════════════════════════════════════════════════════
// function InviteCard({ data, cardRef }) {
//   const eventName = data.eventName === "Other (Custom)"
//     ? (data.customEvent || "Special Event")
//     : (data.eventName || "Special Event");

//   const date     = formatDateLong(data.eventDate);
//   const location = data.eventLocation || "—";
//   const address  = data.address || NGO_ADDRESS;
//   const name     = data.name || "Honoured Guest";

//   return (
//     <div
//       ref={cardRef}
//       style={{
//         width: 1200, height: 675,
//         position: "relative", overflow: "hidden", boxSizing: "border-box",
//         background: "linear-gradient(160deg, #0a0f1e 0%, #10192e 50%, #0a0f1e 100%)",
//         fontFamily: "'Georgia', 'Times New Roman', serif",
//       }}
//     >
//       {/* ── Noise texture overlay (SVG filter) ── */}
//       <svg style={{ position: "absolute", width: 0, height: 0 }}>
//         <filter id="noise">
//           <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
//           <feColorMatrix type="saturate" values="0"/>
//           <feBlend in="SourceGraphic" mode="overlay"/>
//         </filter>
//       </svg>
//       <div style={{
//         position: "absolute", inset: 0,
//         background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
//         opacity: 0.4, zIndex: 0,
//       }}/>

//       {/* ── Radial glow spots ── */}
//       <div style={{
//         position: "absolute", top: -100, left: "30%",
//         width: 500, height: 500, borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(200,164,90,0.15) 0%, transparent 65%)",
//         zIndex: 1,
//       }}/>
//       <div style={{
//         position: "absolute", bottom: -80, right: "20%",
//         width: 400, height: 400, borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(120,80,200,0.1) 0%, transparent 65%)",
//         zIndex: 1,
//       }}/>

//       {/* ── Gold top/bottom bars ── */}
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0, height: 6,
//         background: "linear-gradient(90deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
//         zIndex: 10,
//       }}/>
//       <div style={{
//         position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
//         background: "linear-gradient(90deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
//         zIndex: 10,
//       }}/>

//       {/* ── Left / right gold side bars ── */}
//       <div style={{
//         position: "absolute", top: 0, left: 0, bottom: 0, width: 5,
//         background: "linear-gradient(180deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
//         zIndex: 10,
//       }}/>
//       <div style={{
//         position: "absolute", top: 0, right: 0, bottom: 0, width: 5,
//         background: "linear-gradient(180deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
//         zIndex: 10,
//       }}/>

//       {/* ── Double border ── */}
//       <div style={{
//         position: "absolute", inset: 18,
//         border: "1.5px solid rgba(200,164,90,0.5)",
//         zIndex: 2, pointerEvents: "none",
//       }}/>
//       <div style={{
//         position: "absolute", inset: 26,
//         border: "1px solid rgba(200,164,90,0.2)",
//         zIndex: 2, pointerEvents: "none",
//       }}/>

//       {/* ── Corner ornaments ── */}
//       {[
//         { top: 18, left: 18 },
//         { top: 18, right: 18 },
//         { bottom: 18, left: 18 },
//         { bottom: 18, right: 18 },
//       ].map((s, i) => (
//         <div key={i} style={{
//           position: "absolute", ...s,
//           width: 50, height: 50, zIndex: 5,
//           borderTop:    s.top    !== undefined ? "3px solid #c8a45a" : "none",
//           borderBottom: s.bottom !== undefined ? "3px solid #c8a45a" : "none",
//           borderLeft:   s.left   !== undefined ? "3px solid #c8a45a" : "none",
//           borderRight:  s.right  !== undefined ? "3px solid #c8a45a" : "none",
//         }}/>
//       ))}

//       {/* ── Watermark ── */}
//       <div style={{
//         position: "absolute", top: "50%", left: "50%",
//         transform: "translate(-50%,-50%) rotate(-20deg)",
//         fontSize: 110, fontWeight: 900, letterSpacing: 12,
//         color: "rgba(200,164,90,0.035)",
//         whiteSpace: "nowrap", zIndex: 0, userSelect: "none",
//       }}>
//         INVITATION
//       </div>

//       {/* ════ MAIN LAYOUT ════ */}
//       <div style={{
//         position: "absolute", inset: 38,
//         display: "flex", flexDirection: "column",
//         alignItems: "center", justifyContent: "space-between",
//         zIndex: 6,
//       }}>

//         {/* ── HEADER: Logo + NGO name ── */}
//         <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
//             {/* Left flourish */}
//             <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
//               {["#c8a45a","#f5d87a","#c8a45a"].map((c,i) => (
//                 <div key={i} style={{
//                   width: i===1?3:2, height: i===1?32:22,
//                   background: c, borderRadius: 2,
//                 }}/>
//               ))}
//             </div>

//             <img src={NGO_LOGO} alt="Logo" crossOrigin="anonymous"
//               style={{
//                 width: 64, height: 64, borderRadius: "50%",
//                 border: "3px solid #c8a45a",
//                 boxShadow: "0 0 20px rgba(200,164,90,0.6), 0 0 40px rgba(200,164,90,0.2)",
//                 objectFit: "contain", background: "#fff", flexShrink: 0,
//               }}
//               onError={e => { e.target.style.display = "none"; }}
//             />

//             <div style={{ textAlign: "center" }}>
//               <div style={{
//                 fontSize: 18, fontWeight: 900,
//                 background: "linear-gradient(135deg, #f5d87a, #c8a45a, #f5d87a)",
//                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//                 letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
//               }}>
//                 {NGO_NAME}
//               </div>
//               <div style={{ fontSize: 10, color: "#a0856a", letterSpacing: 0.8, marginTop: 3 }}>
//                 {NGO_REG}
//               </div>
//             </div>

//             <img src={NGO_LOGO} alt="Logo" crossOrigin="anonymous"
//               style={{
//                 width: 64, height: 64, borderRadius: "50%",
//                 border: "3px solid #c8a45a",
//                 boxShadow: "0 0 20px rgba(200,164,90,0.6), 0 0 40px rgba(200,164,90,0.2)",
//                 objectFit: "contain", background: "#fff", flexShrink: 0,
//               }}
//               onError={e => { e.target.style.display = "none"; }}
//             />

//             {/* Right flourish */}
//             <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
//               {["#c8a45a","#f5d87a","#c8a45a"].map((c,i) => (
//                 <div key={i} style={{
//                   width: i===1?3:2, height: i===1?32:22,
//                   background: c, borderRadius: 2,
//                 }}/>
//               ))}
//             </div>
//           </div>

//           {/* Gold divider */}
//           <div style={{
//             width: "88%", height: 2, marginTop: 4,
//             background: "linear-gradient(90deg,transparent,#c8a45a,#f5d87a,#f5d87a,#c8a45a,transparent)",
//           }}/>
//         </div>

//         {/* ── INVITATION TITLE ── */}
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
//           <div style={{
//             fontSize: 11, color: "#a0856a",
//             letterSpacing: 7, textTransform: "uppercase",
//           }}>
//             ✦ &nbsp; cordially invites &nbsp; ✦
//           </div>
//           <div style={{
//             fontSize: 56, fontWeight: 900, letterSpacing: 4,
//             textTransform: "uppercase", lineHeight: 1,
//             background: "linear-gradient(135deg, #f5d87a 0%, #c8a45a 40%, #f5d87a 70%, #e8c060 100%)",
//             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//             textShadow: "none",
//           }}>
//             YOU'RE INVITED
//           </div>
//           <div style={{
//             display: "flex", alignItems: "center", gap: 8, marginTop: 2,
//           }}>
//             {[...Array(5)].map((_, i) => (
//               <div key={i} style={{
//                 width: i===2?8:i===1||i===3?5:3,
//                 height: i===2?8:i===1||i===3?5:3,
//                 borderRadius: "50%",
//                 background: i===2?"#f5d87a":"rgba(200,164,90,0.5)",
//               }}/>
//             ))}
//           </div>
//         </div>

//         {/* ── RECIPIENT NAME ── */}
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
//           <div style={{
//             fontSize: 11, color: "#6a7a8a",
//             letterSpacing: 5, textTransform: "uppercase",
//           }}>
//             Dear Honoured Guest
//           </div>
//           <div style={{
//             fontSize: 48, fontWeight: 900,
//             color: "#ffffff", letterSpacing: 2,
//             textAlign: "center",
//             borderBottom: "2px solid rgba(200,164,90,0.4)",
//             paddingBottom: 8, minWidth: 340,
//             textShadow: "0 0 30px rgba(200,164,90,0.3)",
//           }}>
//             {name}
//           </div>
//         </div>

//         {/* ── EVENT BOX ── */}
//         <div style={{
//           background: "linear-gradient(135deg, rgba(200,164,90,0.18), rgba(200,164,90,0.05))",
//           border: "1.5px solid rgba(200,164,90,0.45)",
//           borderRadius: 14, padding: "14px 48px",
//           textAlign: "center",
//           boxShadow: "0 0 30px rgba(200,164,90,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
//         }}>
//           <div style={{
//             fontSize: 10, color: "#a0856a",
//             letterSpacing: 4, textTransform: "uppercase", marginBottom: 5,
//           }}>
//             Event
//           </div>
//           <div style={{
//             fontSize: 30, fontWeight: 900,
//             color: "#f5d87a", letterSpacing: 1.5,
//           }}>
//             {eventName}
//           </div>
//         </div>

//         {/* ── DETAILS ROW ── */}
//         <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
//           {[
//             { icon: "📅", label: "Date", value: date },
//             { icon: "📍", label: "Venue", value: location },
//             { icon: "🏠", label: "Address", value: address },
//           ].map(({ icon, label, value }) => (
//             <div key={label} style={{
//               display: "flex", alignItems: "flex-start", gap: 10,
//               background: "rgba(255,255,255,0.04)",
//               border: "1px solid rgba(200,164,90,0.25)",
//               borderRadius: 10, padding: "10px 18px",
//               maxWidth: 300, flex: 1,
//             }}>
//               <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</div>
//               <div>
//                 <div style={{
//                   fontSize: 9, color: "#c8a45a",
//                   letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 3,
//                 }}>
//                   {label}
//                 </div>
//                 <div style={{
//                   fontSize: 12.5, fontWeight: 700,
//                   color: "#d4dde8", lineHeight: 1.4,
//                 }}>
//                   {value}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── FOOTER ── */}
//         <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
//           <div style={{
//             width: "80%", height: 1,
//             background: "linear-gradient(90deg,transparent,rgba(200,164,90,0.4),transparent)",
//           }}/>
//           <div style={{
//             display: "flex", alignItems: "center", gap: 12,
//             fontSize: 11.5, color: "#7a8a9a",
//           }}>
//             <span>🙏</span>
//             <span>Your presence will make this event truly successful</span>
//             <span style={{ color: "rgba(200,164,90,0.4)" }}>•</span>
//             <span style={{ color: "#a0856a" }}>{NGO_NAME}</span>
//             <span>❤️</span>
//           </div>
//           <div style={{ fontSize: 9, color: "rgba(120,130,145,0.6)", letterSpacing: 0.4 }}>
//             {NGO_ADDRESS}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  MAIN COMPONENT
// // ════════════════════════════════════════════════════════════════════════════
// export default function WhatsAppInvitation() {
//   const navigate = useNavigate();

//   // ── State ──
//   const [view, setView]           = useState("public");   // public|login|form|dashboard
//   const [loginData, setLogin]     = useState({ email: "", password: "" });
//   const [loginErr, setLoginErr]   = useState("");
//   const [invites, setInvites]     = useState([]);
//   const [loading, setLoading]     = useState(false);
//   const [generating, setGen]      = useState(false);
//   const [previewMsg, setPreviewMsg] = useState(null);
//   const [viewCard, setViewCard]   = useState(null);
//   const [toast, setToast]         = useState(null);
//   const [liveCard, setLiveCard]   = useState(null);

//   const [form, setForm] = useState({
//     name: "", address: "", whatsapp: "",
//     eventName: EVENT_TYPES[0],
//     customEvent: "",
//     eventDate: new Date().toISOString().split("T")[0],
//     eventLocation: "",
//     inviteLink: "",
//   });

//   const cardRef = useRef(null);

//   // ── Helpers ──
//   const toast_ = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3500);
//   };
//   const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

//   // ── Auth ──
//   useEffect(() => {
//     if (localStorage.getItem("wa_inv_admin")) setView("dashboard");
//   }, []);

//   // ── Load invites ──
//   const loadInvites = async () => {
//     setLoading(true);
//     try {
//       const r = await fetch(API);
//       const j = await r.json();
//       if (j.success) setInvites(j.data || []);
//     } catch {
//       toast_("Failed to load invitations", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (view === "dashboard") loadInvites();
//   }, [view]);

//   // ── Login ──
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASS) {
//       localStorage.setItem("wa_inv_admin", "1");
//       setLoginErr("");
//       setView("dashboard");
//     } else {
//       setLoginErr("Invalid email or password.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("wa_inv_admin");
//     setView("public");
//   };

//   // ── Generate + Send ──
//   const handleSend = async (e) => {
//     e.preventDefault();
//     setGen(true);
//     try {
//       // 1. Render hidden card in DOM
//       setLiveCard({ ...form });
//       await new Promise(r => setTimeout(r, 900));

//       // 2. Capture card as PNG
//       const dataUrl  = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2.5 });
//       const cardBlob = await (await fetch(dataUrl)).blob();

//       // 3. Upload to Cloudinary
//       const imageUrl = await uploadToCloudinary(cardBlob, "whatsapp-invitations");

//       // 4. Build WhatsApp message
//       const phone   = cleanPhone(form.whatsapp);
//       const message = buildWhatsAppMessage(form, imageUrl);
//       const waLink  = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

//       // 5. Save to MongoDB
//       const resolvedEventName = form.eventName === "Other (Custom)"
//         ? (form.customEvent || "Special Event")
//         : form.eventName;

//       const res  = await fetch(API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name:          form.name,
//           address:       form.address,
//           whatsapp:      phone,
//           eventName:     resolvedEventName,
//           eventDate:     new Date(form.eventDate),
//           eventLocation: form.eventLocation,
//           inviteLink:    form.inviteLink,
//           imageUrl,
//           waLink,
//         }),
//       });
//       const json = await res.json();
//       if (!json.success) throw new Error(json.message || "Save failed");

//       setInvites(p => [json.data, ...p]);
//       setLiveCard(null);

//       // 6. Open WhatsApp (browser or app)
//       window.open(waLink, "_blank");

//       toast_(`✅ Invitation sent to ${form.name}!`);
//       setView("dashboard");

//       // Reset form
//       setForm({
//         name: "", address: "", whatsapp: "",
//         eventName: EVENT_TYPES[0], customEvent: "",
//         eventDate: new Date().toISOString().split("T")[0],
//         eventLocation: "", inviteLink: "",
//       });
//     } catch (err) {
//       console.error(err);
//       toast_(err.message || "Something went wrong. Check console.", "error");
//     } finally {
//       setGen(false);
//     }
//   };

//   // ── Delete ──
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this invitation record?")) return;
//     try {
//       await fetch(`${API}/${id}`, { method: "DELETE" });
//       setInvites(p => p.filter(i => i._id !== id));
//       toast_("Deleted successfully");
//     } catch {
//       toast_("Delete failed", "error");
//     }
//   };

//   // ── Preview message ──
//   const handlePreview = () => {
//     if (!form.name || !form.eventLocation || !form.whatsapp) {
//       toast_("Please fill Name, Venue, and WhatsApp number first", "error");
//       return;
//     }
//     setPreviewMsg(buildWhatsAppMessage(form, "[Card image URL will appear here]"));
//   };

//   // ─────────────────────────────────────────────────────────────────────────
//   //  SHARED STYLES
//   // ─────────────────────────────────────────────────────────────────────────
//   const inp =
//     "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 " +
//     "dark:bg-gray-700/60 dark:text-white text-sm focus:outline-none " +
//     "focus:ring-2 focus:ring-yellow-400 transition bg-white/80 backdrop-blur-sm";

//   // ══════════════════════════════════════════════════════════════════════════
//   //  VIEW: PUBLIC  —  shown on /blood-donation page (teaser banner)
//   // ══════════════════════════════════════════════════════════════════════════
//   if (view === "public") return (
//     <>
//       {/* Hidden card for rendering */}
//       <div style={{ position:"fixed", top:"-9999px", left:"-9999px", zIndex:-1, opacity:0, pointerEvents:"none" }}>
//         {liveCard && <InviteCard data={liveCard} cardRef={cardRef}/>}
//       </div>

//       <div
//         className="relative rounded-2xl overflow-hidden my-6"
//         style={{
//           background: "linear-gradient(135deg, #0a0f1e 0%, #10192e 60%, #0a0f1e 100%)",
//           boxShadow: "0 8px 40px rgba(200,164,90,0.18), 0 2px 0 rgba(200,164,90,0.3) inset",
//           border: "1px solid rgba(200,164,90,0.25)",
//         }}
//       >
//         {/* Gold top line */}
//         <div style={{
//           position:"absolute", top:0, left:0, right:0, height:3,
//           background:"linear-gradient(90deg,transparent,#c8a45a,#f5d87a,#c8a45a,transparent)",
//         }}/>
//         {/* Glow */}
//         <div style={{
//           position:"absolute", top:"-50%", left:"40%",
//           width:400, height:300, borderRadius:"50%",
//           background:"radial-gradient(circle,rgba(200,164,90,0.12) 0%,transparent 70%)",
//         }}/>

//         <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-7 sm:p-8">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <div className="text-3xl">💌</div>
//               <h2 className="text-xl sm:text-2xl font-black tracking-wide"
//                 style={{ fontFamily:"Georgia,serif", color:"#f5d87a" }}>
//                 WhatsApp Invitation
//               </h2>
//             </div>
//             <p className="text-sm leading-relaxed max-w-sm" style={{ color:"#a0856a" }}>
//               Send beautiful, professionally designed event invitations directly via WhatsApp — completely free, no API needed.
//             </p>
//           </div>

//           <button
//             onClick={() => setView("login")}
//             className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm whitespace-nowrap hover:scale-105 transition-all"
//             style={{
//               background:"linear-gradient(135deg,#c8a45a,#f5d87a)",
//               color:"#0a0f1e",
//               boxShadow:"0 4px 20px rgba(200,164,90,0.4)",
//             }}
//           >
//             🔐 Admin Login
//           </button>
//         </div>
//       </div>
//     </>
//   );

//   // ══════════════════════════════════════════════════════════════════════════
//   //  VIEW: LOGIN
//   // ══════════════════════════════════════════════════════════════════════════
//   if (view === "login") return (
//     <div className="min-h-screen flex items-center justify-center p-4"
//       style={{ background:"linear-gradient(160deg,#050b18,#0a1428,#050b18)" }}>

//       <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
//         style={{ border:"1px solid rgba(200,164,90,0.3)" }}>

//         {/* Card header */}
//         <div className="px-8 py-7 text-center relative overflow-hidden"
//           style={{ background:"linear-gradient(160deg,#0d1b2e,#162338)" }}>
//           <div style={{
//             position:"absolute", top:"-40%", left:"30%",
//             width:300, height:200, borderRadius:"50%",
//             background:"radial-gradient(circle,rgba(200,164,90,0.12) 0%,transparent 70%)",
//           }}/>
//           <div className="relative z-10">
//             <div className="text-5xl mb-3">💌</div>
//             <h1 className="text-xl font-black tracking-widest uppercase"
//               style={{ fontFamily:"Georgia,serif", color:"#f5d87a" }}>
//               Invitation Admin
//             </h1>
//             <p className="text-xs mt-1.5" style={{ color:"#a0856a" }}>
//               {NGO_NAME}
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="bg-white dark:bg-gray-900 px-8 py-8">
//           {loginErr && (
//             <div className="mb-4 px-4 py-3 rounded-lg text-sm text-center"
//               style={{ background:"#fff0f0", border:"1px solid #fca5a5", color:"#dc2626" }}>
//               {loginErr}
//             </div>
//           )}
//           <form onSubmit={handleLogin} className="flex flex-col gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-widest">
//                 Email
//               </label>
//               <input type="email" value={loginData.email} required
//                 onChange={e => setLogin({ ...loginData, email: e.target.value })}
//                 placeholder="admin@email.com" className={inp}/>
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-widest">
//                 Password
//               </label>
//               <input type="password" value={loginData.password} required
//                 onChange={e => setLogin({ ...loginData, password: e.target.value })}
//                 placeholder="••••••••" className={inp}/>
//             </div>
//             <button type="submit"
//               className="mt-1 w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition"
//               style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
//               Login →
//             </button>
//             <button type="button" onClick={() => navigate("/blood-donation")}
//               className="text-xs text-gray-400 hover:text-gray-600 text-center">
//               ← Back to Blood Donation
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );

//   // ══════════════════════════════════════════════════════════════════════════
//   //  VIEW: FORM  —  Create new invitation
//   // ══════════════════════════════════════════════════════════════════════════
//   if (view === "form") return (
//     <div className="min-h-screen p-4"
//       style={{ background:"linear-gradient(160deg,#f8f4ed,#fffdf7,#f8f4ed)" }}>

//       {/* Hidden card for capturing */}
//       <div style={{ position:"fixed", top:"-9999px", left:"-9999px", zIndex:-1, opacity:0, pointerEvents:"none" }}>
//         {liveCard && <InviteCard data={liveCard} cardRef={cardRef}/>}
//       </div>

//       <div className="max-w-2xl mx-auto">
//         {/* Top bar */}
//         <div className="flex items-center gap-3 mb-6">
//           <button onClick={() => setView("dashboard")}
//             className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:bg-gray-50 transition">
//             ←
//           </button>
//           <div>
//             <h1 className="text-xl font-black text-gray-800">Send WhatsApp Invitation</h1>
//             <p className="text-xs text-gray-400">A beautiful invite card will be generated and sent</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm overflow-hidden"
//           style={{ border:"1px solid rgba(200,164,90,0.2)" }}>

//           {/* Form header */}
//           <div className="px-6 py-5 relative overflow-hidden"
//             style={{ background:"linear-gradient(135deg,#0a0f1e,#162238)" }}>
//             <div style={{
//               position:"absolute", top:"-50%", right:"-10%",
//               width:200, height:200, borderRadius:"50%",
//               background:"radial-gradient(circle,rgba(200,164,90,0.15) 0%,transparent 70%)",
//             }}/>
//             <div className="relative z-10 flex items-center gap-3">
//               <div className="text-2xl">💌</div>
//               <div>
//                 <p className="font-bold" style={{ color:"#f5d87a" }}>Invitation Details</p>
//                 <p className="text-xs" style={{ color:"#a0856a" }}>Fill in recipient & event info below</p>
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSend} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

//             {/* Name */}
//             <div className="sm:col-span-2">
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 Recipient Name *
//               </label>
//               <input value={form.name} required
//                 onChange={e => setF("name", e.target.value)}
//                 placeholder="Full name of the invitee" className={inp}/>
//             </div>

//             {/* WhatsApp */}
//             <div>
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 WhatsApp Number *
//               </label>
//               <input value={form.whatsapp} required
//                 onChange={e => setF("whatsapp", e.target.value)}
//                 placeholder="91 98765 43210" className={inp}/>
//               <p className="text-xs text-gray-400 mt-1">Country code required, e.g. 919876543210</p>
//             </div>

//             {/* Event type */}
//             <div>
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 Event Type *
//               </label>
//               <select value={form.eventName} required
//                 onChange={e => setF("eventName", e.target.value)} className={inp}>
//                 {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
//               </select>
//             </div>

//             {/* Custom event name */}
//             {form.eventName === "Other (Custom)" && (
//               <div className="sm:col-span-2">
//                 <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                   Custom Event Name *
//                 </label>
//                 <input value={form.customEvent} required
//                   onChange={e => setF("customEvent", e.target.value)}
//                   placeholder="Type your event name" className={inp}/>
//               </div>
//             )}

//             {/* Event date */}
//             <div>
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 Event Date *
//               </label>
//               <input type="date" value={form.eventDate} required
//                 onChange={e => setF("eventDate", e.target.value)} className={inp}/>
//             </div>

//             {/* Venue */}
//             <div>
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 Venue / Location *
//               </label>
//               <input value={form.eventLocation} required
//                 onChange={e => setF("eventLocation", e.target.value)}
//                 placeholder="e.g. Village Hall, School Ground" className={inp}/>
//             </div>

//             {/* Address */}
//             <div className="sm:col-span-2">
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 Full Address
//                 <span className="font-normal text-gray-400 ml-1">(optional — uses NGO address if blank)</span>
//               </label>
//               <input value={form.address}
//                 onChange={e => setF("address", e.target.value)}
//                 placeholder="Village, P.O., District, State, PIN" className={inp}/>
//             </div>

//             {/* Invite link */}
//             <div className="sm:col-span-2">
//               <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
//                 Event Link
//                 <span className="font-normal text-gray-400 ml-1">(optional)</span>
//               </label>
//               <input value={form.inviteLink}
//                 onChange={e => setF("inviteLink", e.target.value)}
//                 placeholder="https://... (Google Maps, website, form link)" className={inp}/>
//             </div>

//             {/* Buttons */}
//             <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-1 pt-3"
//               style={{ borderTop:"1px solid #f0ebe0" }}>

//               <button type="button" onClick={handlePreview}
//                 className="flex-1 py-3 rounded-xl text-sm font-bold border-2 hover:bg-yellow-50 transition"
//                 style={{ borderColor:"#c8a45a", color:"#8a6200" }}>
//                 👁 Preview Message
//               </button>

//               <button type="button" onClick={() => setView("dashboard")}
//                 className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
//                 Cancel
//               </button>

//               <button type="submit" disabled={generating}
//                 className="flex-1 py-3 rounded-xl text-sm font-bold text-white uppercase tracking-wider hover:opacity-90 disabled:opacity-60 transition"
//                 style={{
//                   background: generating ? "#4caf50" : "#25D366",
//                   boxShadow: "0 4px 15px rgba(37,211,102,0.4)",
//                 }}>
//                 {generating ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3"
//                         strokeDasharray="31.4" strokeDashoffset="10"/>
//                     </svg>
//                     Generating Card…
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
//                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                     </svg>
//                     Send via WhatsApp
//                   </span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Live card preview (small) */}
//         {form.name && form.eventLocation && (
//           <div className="mt-4 rounded-2xl overflow-hidden shadow-lg"
//             style={{ border:"1px solid rgba(200,164,90,0.3)" }}>
//             <div className="px-4 py-2 text-xs font-bold"
//               style={{ background:"linear-gradient(135deg,#0a0f1e,#162238)", color:"#a0856a" }}>
//               🔍 Live Preview — Invitation Card
//             </div>
//             <div style={{ transform:"scale(0.42)", transformOrigin:"top left",
//               width:1200, height:675, pointerEvents:"none" }}>
//               <InviteCard data={form} cardRef={{ current: null }}/>
//             </div>
//             <div style={{ height: 675*0.42 - 675 + "px" }}/>
//           </div>
//         )}
//       </div>

//       {/* ── Preview Message Modal ── */}
//       {previewMsg && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
//             <div className="px-5 py-3 flex items-center justify-between"
//               style={{ background:"#25D366" }}>
//               <span className="text-white font-bold text-sm">📱 WhatsApp Message Preview</span>
//               <button onClick={() => setPreviewMsg(null)}
//                 className="text-white font-bold text-lg opacity-80 hover:opacity-100">✕</button>
//             </div>
//             <div className="p-5">
//               <div className="rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed overflow-y-auto"
//                 style={{
//                   maxHeight:"55vh",
//                   background:"#dcf8c6",
//                   border:"1px solid #b5e8a0",
//                   fontFamily:"monospace",
//                 }}>
//                 {previewMsg}
//               </div>
//               <p className="text-xs text-gray-400 mt-3 text-center">
//                 ℹ️ The actual Cloudinary card image URL will be inserted automatically when you click Send
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast */}
//       {toast && (
//         <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );

//   // ══════════════════════════════════════════════════════════════════════════
//   //  VIEW: DASHBOARD
//   // ══════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

//       {/* Hidden card renderer */}
//       <div style={{ position:"fixed", top:"-9999px", left:"-9999px", zIndex:-1, opacity:0, pointerEvents:"none" }}>
//         {liveCard && <InviteCard data={liveCard} cardRef={cardRef}/>}
//       </div>

//       {/* ── Nav ── */}
//       <nav className="sticky top-0 z-40 px-5 py-3 flex items-center justify-between shadow-lg"
//         style={{ background:"linear-gradient(135deg,#0a0f1e,#10192e)", borderBottom:"1px solid rgba(200,164,90,0.2)" }}>
//         <div className="flex items-center gap-3">
//           <div className="text-2xl">💌</div>
//           <div>
//             <div className="font-black text-sm tracking-wide" style={{ fontFamily:"Georgia,serif", color:"#f5d87a" }}>
//               Invitation Manager
//             </div>
//             <div className="text-xs hidden sm:block" style={{ color:"#a0856a" }}>
//               WhatsApp Invitations — FREE (wa.me)
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-2 flex-wrap justify-end">
//           <button onClick={() => navigate("/blood-donation")}
//             className="px-3 py-2 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition border border-white/10">
//             ← Blood Certs
//           </button>
//           <button onClick={() => setView("form")}
//             className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition"
//             style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
//             + Send Invite
//           </button>
//           <button onClick={handleLogout}
//             className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:bg-white/10 transition">
//             Logout
//           </button>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto p-4 md:p-6">

//         {/* ── Stats ── */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {[
//             { label:"Total Invitations", value:invites.length,                                                                              icon:"📨", color:"#c8a45a" },
//             { label:"Unique People",     value:new Set(invites.map(i=>i.whatsapp)).size,                                                    icon:"👥", color:"#1565c0" },
//             { label:"This Month",        value:invites.filter(i=>new Date(i.createdAt).getMonth()===new Date().getMonth()).length,           icon:"📅", color:"#2e7d32" },
//             { label:"Event Types",       value:new Set(invites.map(i=>i.eventName)).size,                                                   icon:"🎉", color:"#6a1b9a" },
//           ].map(s => (
//             <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"
//               style={{ border:"1px solid rgba(200,164,90,0.12)" }}>
//               <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
//                 style={{ background: s.color+"18" }}>
//                 {s.icon}
//               </div>
//               <div>
//                 <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
//                 <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Table ── */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
//           style={{ border:"1px solid rgba(200,164,90,0.15)" }}>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20 gap-3">
//               <svg className="animate-spin w-8 h-8" style={{ color:"#c8a45a" }} viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
//                   strokeDasharray="31.4" strokeDashoffset="10"/>
//               </svg>
//               <p className="text-sm font-semibold text-gray-500">Loading invitations…</p>
//               <p className="text-xs text-gray-400">⏳ First load may take 10–15 sec (server waking up)</p>
//             </div>
//           ) : invites.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//               <div className="text-5xl mb-4">💌</div>
//               <p className="font-semibold text-gray-600 dark:text-gray-300">No invitations sent yet</p>
//               <button onClick={() => setView("form")}
//                 className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition"
//                 style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
//                 Send First Invitation
//               </button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="text-left text-xs uppercase tracking-widest"
//                     style={{ background:"linear-gradient(135deg,#0a0f1e,#10192e)" }}>
//                     {["#","Recipient","WhatsApp","Event","Date","Card","Actions"].map(h => (
//                       <th key={h} className="px-4 py-3 whitespace-nowrap font-bold"
//                         style={{ color:"#c8a45a" }}>
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invites.map((inv, idx) => (
//                     <tr key={inv._id}
//                       className="border-b border-gray-50 dark:border-gray-700 hover:bg-yellow-50/40 dark:hover:bg-gray-700/40 transition">
//                       <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx+1}</td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2.5">
//                           <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
//                             style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
//                             {(inv.name||"?").charAt(0).toUpperCase()}
//                           </div>
//                           <div>
//                             <div className="font-semibold text-gray-800 dark:text-white text-sm">{inv.name}</div>
//                             <div className="text-xs text-gray-400">{inv.address||"—"}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 font-mono text-xs text-gray-500">{inv.whatsapp}</td>
//                       <td className="px-4 py-3">
//                         <span className="px-2.5 py-1 rounded-full text-xs font-bold"
//                           style={{ background:"rgba(200,164,90,0.12)", color:"#8a6200" }}>
//                           {inv.eventName}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
//                         {inv.eventDate
//                           ? new Date(inv.eventDate).toLocaleDateString("en-IN",{ day:"2-digit", month:"short", year:"numeric" })
//                           : "—"}
//                       </td>
//                       <td className="px-4 py-3">
//                         {inv.imageUrl
//                           ? (
//                             <button onClick={() => setViewCard(inv)}>
//                               <img src={inv.imageUrl} alt="card"
//                                 className="w-20 h-11 object-cover rounded-lg hover:scale-110 transition"
//                                 style={{ border:"2px solid rgba(200,164,90,0.4)" }}/>
//                             </button>
//                           ) : <span className="text-gray-300 text-xs">—</span>
//                         }
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex gap-1.5 flex-wrap">
//                           {/* Resend */}
//                           <button onClick={() => window.open(inv.waLink, "_blank")}
//                             className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white"
//                             style={{ background:"#25D366" }}>
//                             📲
//                           </button>
//                           {/* View card */}
//                           {inv.imageUrl && (
//                             <button onClick={() => setViewCard(inv)}
//                               className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white"
//                               style={{ background:"#1565c0" }}>
//                               👁
//                             </button>
//                           )}
//                           {/* Download */}
//                           {inv.imageUrl && (
//                             <button
//                               onClick={async () => {
//                                 try {
//                                   const r = await fetch(inv.imageUrl);
//                                   const b = await r.blob();
//                                   const url = URL.createObjectURL(b);
//                                   const a = document.createElement("a");
//                                   a.href = url; a.download = `invite-${inv.name}.png`;
//                                   document.body.appendChild(a); a.click();
//                                   document.body.removeChild(a); URL.revokeObjectURL(url);
//                                 } catch { window.open(inv.imageUrl, "_blank"); }
//                               }}
//                               className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white"
//                               style={{ background:"#2e7d32" }}>
//                               ⬇
//                             </button>
//                           )}
//                           {/* Delete */}
//                           <button onClick={() => handleDelete(inv._id)}
//                             className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white"
//                             style={{ background:"#b71c1c" }}>
//                             🗑
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── View card modal ── */}
//       {viewCard && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
//             <div className="px-5 py-3 flex items-center justify-between"
//               style={{ background:"linear-gradient(135deg,#0a0f1e,#10192e)", borderBottom:"1px solid rgba(200,164,90,0.2)" }}>
//               <span className="font-bold text-sm" style={{ color:"#f5d87a" }}>
//                 💌 {viewCard.name}'s Invitation Card
//               </span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={async () => {
//                     try {
//                       const r = await fetch(viewCard.imageUrl);
//                       const b = await r.blob();
//                       const url = URL.createObjectURL(b);
//                       const a = document.createElement("a");
//                       a.href = url; a.download = `invite-${viewCard.name}.png`;
//                       document.body.appendChild(a); a.click();
//                       document.body.removeChild(a); URL.revokeObjectURL(url);
//                     } catch { window.open(viewCard.imageUrl, "_blank"); }
//                   }}
//                   className="px-4 py-1.5 rounded-lg text-xs font-bold"
//                   style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
//                   ⬇ Download
//                 </button>
//                 <button onClick={() => window.open(viewCard.waLink, "_blank")}
//                   className="px-4 py-1.5 rounded-lg text-xs font-bold text-white"
//                   style={{ background:"#25D366" }}>
//                   📲 Resend
//                 </button>
//                 <button onClick={() => setViewCard(null)}
//                   className="text-white text-xl font-bold opacity-70 hover:opacity-100 ml-1">✕</button>
//               </div>
//             </div>
//             <div className="p-4">
//               <img src={viewCard.imageUrl} alt="Invite Card"
//                 className="w-full h-auto rounded-xl"
//                 style={{ maxHeight:"70vh", objectFit:"contain" }}/>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast */}
//       {toast && (
//         <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );
// }


// ╔══════════════════════════════════════════════════════════════════════════╗
// ║       WhatsAppInvitation.jsx — FULLY INTEGRATED (No Separate Login)      ║
// ║                                                                           ║
// ║  This component works as an INDEPENDENT feature embedded inside the       ║
// ║  Blood Donation admin. It reuses the same admin session.                  ║
// ║                                                                           ║
// ║  HOW TO USE:                                                              ║
// ║  In BloodDonation.jsx dashboard nav, add ONE import + ONE button:         ║
// ║                                                                           ║
// ║    Step 1 — import at top of BloodDonation.jsx:                           ║
// ║      import WhatsAppInvitation from "./WhatsAppInvitation";               ║
// ║                                                                           ║
// ║    Step 2 — Add state in BloodDonation component:                         ║
// ║      const [showInvite, setShowInvite] = useState(false);                 ║
// ║                                                                           ║
// ║    Step 3 — Add button in dashboard <nav>:                                ║
// ║      <button onClick={() => setShowInvite(true)}                          ║
// ║        className="px-4 py-2 rounded-lg text-sm font-bold"                 ║
// ║        style={{background:"linear-gradient(135deg,#c8a45a,#f0d070)",      ║
// ║                color:"#0d1b2a"}}>                                          ║
// ║        💌 Send Invite                                                     ║
// ║      </button>                                                             ║
// ║                                                                           ║
// ║    Step 4 — Render at bottom of BloodDonation dashboard return:           ║
// ║      {showInvite && (                                                      ║
// ║        <WhatsAppInvitation onClose={() => setShowInvite(false)} />         ║
// ║      )}                                                                   ║
// ║                                                                           ║
// ║  NO new backend routes needed IF you add the /api/invitations endpoint.   ║
// ║  NO separate login. NO new npm packages beyond existing html-to-image.    ║
// ╚══════════════════════════════════════════════════════════════════════════╝

import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

// ─── CONFIG (uses existing env vars — no changes needed) ─────────────────────
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || "dfi3ywweg";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
const BACKEND_URL   = import.meta.env.VITE_BACKEND_URL;
const API           = `${BACKEND_URL}/api/invitations`;

// ─── NGO INFO ─────────────────────────────────────────────────────────────────
const NGO_NAME    = "Narayan Pur Bipader Bondhu Welfare Society";
const NGO_REG     = "Govt. Registered NGO • Reg. No: S0042589 of 2024–2025";
const NGO_ADDRESS = "Vill- Narayan Pur, P.O- Amiya Narayan Pur, P.S- Thanar Para, Dist- Nadia, Pin- 741165, West Bengal, India";
const NGO_LOGO    = "/images/profile.png";

const EVENT_TYPES = [
  "Blood Donation Camp",
  "Cloth Donation Drive",
  "Food Distribution",
  "Tree Plantation",
  "Health Awareness Camp",
  "Education Support Program",
  "Flood Relief Drive",
  "Winter Blanket Distribution",
  "Community Clean-Up",
  "Other (Custom)",
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
async function uploadToCloudinary(blob, folder) {
  const fd = new FormData();
  fd.append("file", blob);
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

function cleanPhone(raw) {
  return raw.replace(/[\s\-().+]/g, "").replace(/^00/, "");
}

function formatDateLong(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });
}

function buildWhatsAppMessage(form, imageUrl) {
  const date      = formatDateLong(form.eventDate);
  const address   = form.address || NGO_ADDRESS;
  const eventName = form.eventName === "Other (Custom)"
    ? (form.customEvent || "Special Event")
    : form.eventName;

  let msg =
    `🌟 *আপনি আমন্ত্রিত! You're Cordially Invited!* 🌟\n\n` +
    `আসসালামু আলাইকুম / নমস্কার 🙏\n\n` +
    `প্রিয় *${form.name}*,\n\n` +
    `*${NGO_NAME}* এর পক্ষ থেকে আপনাকে আমাদের আসন্ন অনুষ্ঠানে আন্তরিকভাবে আমন্ত্রণ জানাচ্ছি:\n\n` +
    `🎉 *${eventName}*\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📅 *তারিখ / Date:* ${date}\n` +
    `📍 *স্থান / Venue:* ${form.eventLocation}\n` +
    `🏠 *ঠিকানা / Address:* ${address}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (imageUrl) {
    msg += `🖼️ *Invitation Card:* ${imageUrl}\n\n`;
  }
  if (form.inviteLink) {
    msg += `🔗 *Details / Event Link:* ${form.inviteLink}\n\n`;
  }

  msg +=
    `✨ আপনার উপস্থিতি এই অনুষ্ঠানকে সফল করবে।\n` +
    `_Your presence will make this event truly special!_\n\n` +
    `❤️ *ধন্যবাদ / Thank You*\n\n` +
    `*${NGO_NAME}*\n` +
    `_${NGO_REG}_\n` +
    `📞 যোগাযোগের জন্য WhatsApp করুন।`;

  return msg;
}

// ════════════════════════════════════════════════════════════════════════════
//  INVITATION CARD  (1200 × 675 px — rendered offscreen → PNG)
// ════════════════════════════════════════════════════════════════════════════
function InviteCard({ data, cardRef }) {
  const eventName = data.eventName === "Other (Custom)"
    ? (data.customEvent || "Special Event")
    : (data.eventName || "Special Event");

  const date     = formatDateLong(data.eventDate);
  const location = data.eventLocation || "—";
  const address  = data.address || NGO_ADDRESS;
  const name     = data.name || "Honoured Guest";

  return (
    <div
      ref={cardRef}
      style={{
        width: 1200, height: 675,
        position: "relative", overflow: "hidden", boxSizing: "border-box",
        background: "linear-gradient(160deg, #0a0f1e 0%, #10192e 50%, #0a0f1e 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Radial glow spots */}
      <div style={{
        position: "absolute", top: -100, left: "30%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,164,90,0.15) 0%, transparent 65%)",
        zIndex: 1,
      }}/>
      <div style={{
        position: "absolute", bottom: -80, right: "20%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(120,80,200,0.1) 0%, transparent 65%)",
        zIndex: 1,
      }}/>

      {/* Gold top/bottom bars */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 6,
        background: "linear-gradient(90deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
        zIndex: 10,
      }}/>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
        background: "linear-gradient(90deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
        zIndex: 10,
      }}/>

      {/* Left/right gold side bars */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 5,
        background: "linear-gradient(180deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
        zIndex: 10,
      }}/>
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 5,
        background: "linear-gradient(180deg,#6b4400,#c8a45a,#f5d87a,#c8a45a,#6b4400)",
        zIndex: 10,
      }}/>

      {/* Double border */}
      <div style={{
        position: "absolute", inset: 18,
        border: "1.5px solid rgba(200,164,90,0.5)",
        zIndex: 2, pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", inset: 26,
        border: "1px solid rgba(200,164,90,0.2)",
        zIndex: 2, pointerEvents: "none",
      }}/>

      {/* Corner ornaments */}
      {[
        { top: 18, left: 18 },
        { top: 18, right: 18 },
        { bottom: 18, left: 18 },
        { bottom: 18, right: 18 },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", ...s,
          width: 50, height: 50, zIndex: 5,
          borderTop:    s.top    !== undefined ? "3px solid #c8a45a" : "none",
          borderBottom: s.bottom !== undefined ? "3px solid #c8a45a" : "none",
          borderLeft:   s.left   !== undefined ? "3px solid #c8a45a" : "none",
          borderRight:  s.right  !== undefined ? "3px solid #c8a45a" : "none",
        }}/>
      ))}

      {/* Watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%) rotate(-20deg)",
        fontSize: 110, fontWeight: 900, letterSpacing: 12,
        color: "rgba(200,164,90,0.035)",
        whiteSpace: "nowrap", zIndex: 0, userSelect: "none",
      }}>
        INVITATION
      </div>

      {/* MAIN LAYOUT */}
      <div style={{
        position: "absolute", inset: 38,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        zIndex: 6,
      }}>

        {/* HEADER */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {["#c8a45a","#f5d87a","#c8a45a"].map((c,i) => (
                <div key={i} style={{ width: i===1?3:2, height: i===1?32:22, background: c, borderRadius: 2 }}/>
              ))}
            </div>
            <img src={NGO_LOGO} alt="Logo" crossOrigin="anonymous"
              style={{
                width: 64, height: 64, borderRadius: "50%",
                border: "3px solid #c8a45a",
                boxShadow: "0 0 20px rgba(200,164,90,0.6), 0 0 40px rgba(200,164,90,0.2)",
                objectFit: "contain", background: "#fff", flexShrink: 0,
              }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 18, fontWeight: 900,
                background: "linear-gradient(135deg, #f5d87a, #c8a45a, #f5d87a)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
              }}>
                {NGO_NAME}
              </div>
              <div style={{ fontSize: 10, color: "#a0856a", letterSpacing: 0.8, marginTop: 3 }}>
                {NGO_REG}
              </div>
            </div>
            <img src={NGO_LOGO} alt="Logo" crossOrigin="anonymous"
              style={{
                width: 64, height: 64, borderRadius: "50%",
                border: "3px solid #c8a45a",
                boxShadow: "0 0 20px rgba(200,164,90,0.6), 0 0 40px rgba(200,164,90,0.2)",
                objectFit: "contain", background: "#fff", flexShrink: 0,
              }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {["#c8a45a","#f5d87a","#c8a45a"].map((c,i) => (
                <div key={i} style={{ width: i===1?3:2, height: i===1?32:22, background: c, borderRadius: 2 }}/>
              ))}
            </div>
          </div>
          <div style={{
            width: "88%", height: 2, marginTop: 4,
            background: "linear-gradient(90deg,transparent,#c8a45a,#f5d87a,#f5d87a,#c8a45a,transparent)",
          }}/>
        </div>

        {/* INVITATION TITLE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 11, color: "#a0856a", letterSpacing: 7, textTransform: "uppercase" }}>
            ✦ &nbsp; cordially invites &nbsp; ✦
          </div>
          <div style={{
            fontSize: 56, fontWeight: 900, letterSpacing: 4,
            textTransform: "uppercase", lineHeight: 1,
            background: "linear-gradient(135deg, #f5d87a 0%, #c8a45a 40%, #f5d87a 70%, #e8c060 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            YOU'RE INVITED
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                width: i===2?8:i===1||i===3?5:3,
                height: i===2?8:i===1||i===3?5:3,
                borderRadius: "50%",
                background: i===2?"#f5d87a":"rgba(200,164,90,0.5)",
              }}/>
            ))}
          </div>
        </div>

        {/* RECIPIENT NAME */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 11, color: "#6a7a8a", letterSpacing: 5, textTransform: "uppercase" }}>
            Dear Honoured Guest
          </div>
          <div style={{
            fontSize: 48, fontWeight: 900,
            color: "#ffffff", letterSpacing: 2, textAlign: "center",
            borderBottom: "2px solid rgba(200,164,90,0.4)",
            paddingBottom: 8, minWidth: 340,
            textShadow: "0 0 30px rgba(200,164,90,0.3)",
          }}>
            {name}
          </div>
        </div>

        {/* EVENT BOX */}
        <div style={{
          background: "linear-gradient(135deg, rgba(200,164,90,0.18), rgba(200,164,90,0.05))",
          border: "1.5px solid rgba(200,164,90,0.45)",
          borderRadius: 14, padding: "14px 48px", textAlign: "center",
          boxShadow: "0 0 30px rgba(200,164,90,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          <div style={{ fontSize: 10, color: "#a0856a", letterSpacing: 4, textTransform: "uppercase", marginBottom: 5 }}>
            Event
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#f5d87a", letterSpacing: 1.5 }}>
            {eventName}
          </div>
        </div>

        {/* DETAILS ROW */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
          {[
            { icon: "📅", label: "Date",    value: date },
            { icon: "📍", label: "Venue",   value: location },
            { icon: "🏠", label: "Address", value: address },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,164,90,0.25)",
              borderRadius: 10, padding: "10px 18px", maxWidth: 300, flex: 1,
            }}>
              <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 9, color: "#c8a45a", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 3 }}>
                  {label}
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#d4dde8", lineHeight: 1.4 }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: "80%", height: 1,
            background: "linear-gradient(90deg,transparent,rgba(200,164,90,0.4),transparent)",
          }}/>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, color: "#7a8a9a" }}>
            <span>🙏</span>
            <span>Your presence will make this event truly successful</span>
            <span style={{ color: "rgba(200,164,90,0.4)" }}>•</span>
            <span style={{ color: "#a0856a" }}>{NGO_NAME}</span>
            <span>❤️</span>
          </div>
          <div style={{ fontSize: 9, color: "rgba(120,130,145,0.6)", letterSpacing: 0.4 }}>
            {NGO_ADDRESS}
          </div>
        </div>

      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT  — props: { onClose }
//  onClose() is called when the user clicks "← Back" to return to dashboard
// ════════════════════════════════════════════════════════════════════════════
export default function WhatsAppInvitation({ onClose }) {
  // ── Internal view: "dashboard" | "form"
  const [view, setView]           = useState("dashboard");
  const [invites, setInvites]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [generating, setGen]      = useState(false);
  const [previewMsg, setPreviewMsg] = useState(null);
  const [viewCard, setViewCard]   = useState(null);
  const [toast, setToast]         = useState(null);
  const [liveCard, setLiveCard]   = useState(null);

  const [form, setForm] = useState({
    name: "", address: "", whatsapp: "",
    eventName: EVENT_TYPES[0],
    customEvent: "",
    eventDate: new Date().toISOString().split("T")[0],
    eventLocation: "",
    inviteLink: "",
  });

  const cardRef = useRef(null);

  // ── Helpers ──
  const toast_ = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const resetForm = () => setForm({
    name: "", address: "", whatsapp: "",
    eventName: EVENT_TYPES[0], customEvent: "",
    eventDate: new Date().toISOString().split("T")[0],
    eventLocation: "", inviteLink: "",
  });

  // ── Load invites ──
  const loadInvites = async () => {
    setLoading(true);
    try {
      const r = await fetch(API);
      const j = await r.json();
      if (j.success) setInvites(j.data || []);
    } catch {
      toast_("Failed to load invitations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInvites(); }, []);

  // ── Generate + Send ──
  const handleSend = async (e) => {
    e.preventDefault();
    setGen(true);
    try {
      // 1. Render hidden card
      setLiveCard({ ...form });
      await new Promise(r => setTimeout(r, 900));

      // 2. Capture card as PNG
      const dataUrl  = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2.5 });
      const cardBlob = await (await fetch(dataUrl)).blob();

      // 3. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(cardBlob, "whatsapp-invitations");

      // 4. Build WhatsApp message & link
      const phone   = cleanPhone(form.whatsapp);
      const message = buildWhatsAppMessage(form, imageUrl);
      const waLink  = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      // 5. Resolve event name
      const resolvedEventName = form.eventName === "Other (Custom)"
        ? (form.customEvent || "Special Event")
        : form.eventName;

      // 6. Save to MongoDB
      const res  = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:          form.name,
          address:       form.address,
          whatsapp:      phone,
          eventName:     resolvedEventName,
          eventDate:     new Date(form.eventDate),
          eventLocation: form.eventLocation,
          inviteLink:    form.inviteLink,
          imageUrl,
          waLink,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Save failed");

      setInvites(p => [json.data, ...p]);
      setLiveCard(null);

      // 7. Open WhatsApp
      window.open(waLink, "_blank");

      toast_(`✅ Invitation sent to ${form.name}!`);
      resetForm();
      setView("dashboard");
    } catch (err) {
      console.error(err);
      toast_(err.message || "Something went wrong.", "error");
    } finally {
      setGen(false);
      setLiveCard(null);
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!confirm("Delete this invitation record?")) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setInvites(p => p.filter(i => i._id !== id));
      toast_("Deleted successfully");
    } catch {
      toast_("Delete failed", "error");
    }
  };

  // ── Preview message ──
  const handlePreview = () => {
    if (!form.name || !form.eventLocation || !form.whatsapp) {
      toast_("Please fill Name, Venue, and WhatsApp number first", "error");
      return;
    }
    setPreviewMsg(buildWhatsAppMessage(form, "[Card image URL will appear here]"));
  };

  // ─── Shared input style ──────────────────────────────────────────────────
  const inp =
    "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 " +
    "dark:bg-gray-700/60 dark:text-white text-sm focus:outline-none " +
    "focus:ring-2 focus:ring-yellow-400 transition bg-white";

  // ══════════════════════════════════════════════════════════════════════════
  //  SHARED: Hidden card renderer (always present in DOM while this component
  //  is mounted, so toPng() can capture it)
  // ══════════════════════════════════════════════════════════════════════════
  const HiddenCard = () => (
    <div style={{ position:"fixed", top:"-9999px", left:"-9999px", zIndex:-1, opacity:0, pointerEvents:"none" }}>
      {liveCard && <InviteCard data={liveCard} cardRef={cardRef}/>}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: FORM
  // ══════════════════════════════════════════════════════════════════════════
  if (view === "form") return (
    <div className="min-h-screen p-4" style={{ background:"linear-gradient(160deg,#f8f4ed,#fffdf7,#f8f4ed)" }}>
      <HiddenCard />

      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setView("dashboard"); resetForm(); }}
            className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:bg-gray-50 transition"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-800">Send WhatsApp Invitation</h1>
            <p className="text-xs text-gray-400">A beautiful invite card will be generated and sent</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:"1px solid rgba(200,164,90,0.2)" }}>

          {/* Form header */}
          <div className="px-6 py-5 relative overflow-hidden" style={{ background:"linear-gradient(135deg,#0a0f1e,#162238)" }}>
            <div style={{
              position:"absolute", top:"-50%", right:"-10%",
              width:200, height:200, borderRadius:"50%",
              background:"radial-gradient(circle,rgba(200,164,90,0.15) 0%,transparent 70%)",
            }}/>
            <div className="relative z-10 flex items-center gap-3">
              <div className="text-2xl">💌</div>
              <div>
                <p className="font-bold" style={{ color:"#f5d87a" }}>Invitation Details</p>
                <p className="text-xs" style={{ color:"#a0856a" }}>Fill in recipient & event info below</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSend} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Recipient Name *</label>
              <input value={form.name} required onChange={e => setF("name", e.target.value)} placeholder="Full name of the invitee" className={inp}/>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">WhatsApp Number *</label>
              <input value={form.whatsapp} required onChange={e => setF("whatsapp", e.target.value)} placeholder="919876543210" className={inp}/>
              <p className="text-xs text-gray-400 mt-1">Country code required, e.g. 919876543210</p>
            </div>

            {/* Event type */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Event Type *</label>
              <select value={form.eventName} required onChange={e => setF("eventName", e.target.value)} className={inp}>
                {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Custom event name */}
            {form.eventName === "Other (Custom)" && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Custom Event Name *</label>
                <input value={form.customEvent} required onChange={e => setF("customEvent", e.target.value)} placeholder="Type your event name" className={inp}/>
              </div>
            )}

            {/* Event date */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Event Date *</label>
              <input type="date" value={form.eventDate} required onChange={e => setF("eventDate", e.target.value)} className={inp}/>
            </div>

            {/* Venue */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Venue / Location *</label>
              <input value={form.eventLocation} required onChange={e => setF("eventLocation", e.target.value)} placeholder="e.g. Village Hall, School Ground" className={inp}/>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
                Full Address <span className="font-normal text-gray-400 ml-1">(optional — uses NGO address if blank)</span>
              </label>
              <input value={form.address} onChange={e => setF("address", e.target.value)} placeholder="Village, P.O., District, State, PIN" className={inp}/>
            </div>

            {/* Invite link */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
                Event Link <span className="font-normal text-gray-400 ml-1">(optional)</span>
              </label>
              <input value={form.inviteLink} onChange={e => setF("inviteLink", e.target.value)} placeholder="https://... (Google Maps, website, form)" className={inp}/>
            </div>

            {/* Buttons */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-1 pt-3" style={{ borderTop:"1px solid #f0ebe0" }}>
              <button type="button" onClick={handlePreview}
                className="flex-1 py-3 rounded-xl text-sm font-bold border-2 hover:bg-yellow-50 transition"
                style={{ borderColor:"#c8a45a", color:"#8a6200" }}>
                👁 Preview Message
              </button>
              <button type="button" onClick={() => { setView("dashboard"); resetForm(); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
                Cancel
              </button>
              <button type="submit" disabled={generating}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white uppercase tracking-wider hover:opacity-90 disabled:opacity-60 transition"
                style={{ background: generating ? "#4caf50" : "#25D366", boxShadow:"0 4px 15px rgba(37,211,102,0.4)" }}>
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/>
                    </svg>
                    Generating Card…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live card preview */}
        {form.name && form.eventLocation && (
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg" style={{ border:"1px solid rgba(200,164,90,0.3)" }}>
            <div className="px-4 py-2 text-xs font-bold" style={{ background:"linear-gradient(135deg,#0a0f1e,#162238)", color:"#a0856a" }}>
              🔍 Live Preview — Invitation Card
            </div>
            <div style={{
              transform: "scale(0.42)", transformOrigin: "top left",
              width: 1200, height: 675, pointerEvents: "none",
            }}>
              <InviteCard data={form} cardRef={{ current: null }}/>
            </div>
            {/* Spacer to collapse the overflow */}
            <div style={{ height: Math.round(675 * 0.42) + "px", marginTop: -675 + "px" }}/>
          </div>
        )}
      </div>

      {/* Preview Message Modal */}
      {previewMsg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between" style={{ background:"#25D366" }}>
              <span className="text-white font-bold text-sm">📱 WhatsApp Message Preview</span>
              <button onClick={() => setPreviewMsg(null)} className="text-white font-bold text-lg opacity-80 hover:opacity-100">✕</button>
            </div>
            <div className="p-5">
              <div className="rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed overflow-y-auto"
                style={{ maxHeight:"55vh", background:"#dcf8c6", border:"1px solid #b5e8a0", fontFamily:"monospace" }}>
                {previewMsg}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                ℹ️ The actual Cloudinary card image URL will be inserted automatically when you click Send
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  //  VIEW: DASHBOARD  (default view)
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <HiddenCard />

      {/* ── Sub-nav (sits inside Blood Donation page context) ── */}
      <nav className="sticky top-0 z-40 px-5 py-3 flex items-center justify-between shadow-lg"
        style={{ background:"linear-gradient(135deg,#0a0f1e,#10192e)", borderBottom:"1px solid rgba(200,164,90,0.2)" }}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">💌</div>
          <div>
            <div className="font-black text-sm tracking-wide" style={{ fontFamily:"Georgia,serif", color:"#f5d87a" }}>
              WhatsApp Invitations
            </div>
            <div className="text-xs hidden sm:block" style={{ color:"#a0856a" }}>
              {NGO_NAME}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {/* Back to Blood Cert dashboard */}
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition border border-white/10"
            >
              ← Blood Certs
            </button>
          )}
          <button
            onClick={() => setView("form")}
            className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition"
            style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}
          >
            + Send Invite
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label:"Total Invitations", value:invites.length,                                                                             icon:"📨", color:"#c8a45a" },
            { label:"Unique People",     value:new Set(invites.map(i=>i.whatsapp)).size,                                                   icon:"👥", color:"#1565c0" },
            { label:"This Month",        value:invites.filter(i=>new Date(i.createdAt).getMonth()===new Date().getMonth()).length,          icon:"📅", color:"#2e7d32" },
            { label:"Event Types",       value:new Set(invites.map(i=>i.eventName)).size,                                                  icon:"🎉", color:"#6a1b9a" },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"
              style={{ border:"1px solid rgba(200,164,90,0.12)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background:s.color+"18" }}>
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
          style={{ border:"1px solid rgba(200,164,90,0.15)" }}>

          {/* Table header bar */}
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom:"1px solid rgba(200,164,90,0.12)" }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <h2 className="font-black text-gray-800 dark:text-white">All Invitations</h2>
              <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
                style={{ background:"rgba(200,164,90,0.12)", color:"#8a6200" }}>
                {invites.length}
              </span>
            </div>
            <button onClick={loadInvites}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition">
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <svg className="animate-spin w-8 h-8" style={{ color:"#c8a45a" }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/>
              </svg>
              <p className="text-sm font-semibold text-gray-500">Loading invitations…</p>
              <p className="text-xs text-gray-400">⏳ First load may take 10–15 sec (server waking up)</p>
            </div>
          ) : invites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-5xl mb-4">💌</div>
              <p className="font-semibold text-gray-600 dark:text-gray-300">No invitations sent yet</p>
              <button onClick={() => setView("form")}
                className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition"
                style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
                Send First Invitation
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest"
                    style={{ background:"linear-gradient(135deg,#0a0f1e,#10192e)" }}>
                    {["#","Recipient","WhatsApp","Event","Date","Card","Actions"].map(h => (
                      <th key={h} className="px-4 py-3 whitespace-nowrap font-bold" style={{ color:"#c8a45a" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invites.map((inv, idx) => (
                    <tr key={inv._id}
                      className="border-b border-gray-50 dark:border-gray-700 hover:bg-yellow-50/40 dark:hover:bg-gray-700/40 transition">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx+1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                            style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
                            {(inv.name||"?").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 dark:text-white text-sm">{inv.name}</div>
                            <div className="text-xs text-gray-400">{inv.address||"—"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{inv.whatsapp}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{ background:"rgba(200,164,90,0.12)", color:"#8a6200" }}>
                          {inv.eventName}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {inv.eventDate
                          ? new Date(inv.eventDate).toLocaleDateString("en-IN",{ day:"2-digit", month:"short", year:"numeric" })
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {inv.imageUrl ? (
                          <button onClick={() => setViewCard(inv)}>
                            <img src={inv.imageUrl} alt="card"
                              className="w-20 h-11 object-cover rounded-lg hover:scale-110 transition"
                              style={{ border:"2px solid rgba(200,164,90,0.4)" }}/>
                          </button>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {/* Resend via WhatsApp */}
                          <button onClick={() => window.open(inv.waLink, "_blank")}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background:"#25D366" }}
                            title="Resend on WhatsApp">
                            📲
                          </button>
                          {/* View card */}
                          {inv.imageUrl && (
                            <button onClick={() => setViewCard(inv)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background:"#1565c0" }}
                              title="View Card">
                              👁
                            </button>
                          )}
                          {/* Download */}
                          {inv.imageUrl && (
                            <button
                              title="Download Card"
                              onClick={async () => {
                                try {
                                  const r = await fetch(inv.imageUrl);
                                  const b = await r.blob();
                                  const url = URL.createObjectURL(b);
                                  const a = document.createElement("a");
                                  a.href = url; a.download = `invite-${inv.name}.png`;
                                  document.body.appendChild(a); a.click();
                                  document.body.removeChild(a); URL.revokeObjectURL(url);
                                } catch { window.open(inv.imageUrl, "_blank"); }
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background:"#2e7d32" }}>
                              ⬇
                            </button>
                          )}
                          {/* Delete */}
                          <button onClick={() => handleDelete(inv._id)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background:"#b71c1c" }}
                            title="Delete">
                            🗑
                          </button>
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

      {/* ── View card modal ── */}
      {viewCard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <div className="px-5 py-3 flex items-center justify-between"
              style={{ background:"linear-gradient(135deg,#0a0f1e,#10192e)", borderBottom:"1px solid rgba(200,164,90,0.2)" }}>
              <span className="font-bold text-sm" style={{ color:"#f5d87a" }}>
                💌 {viewCard.name}'s Invitation Card
              </span>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      const r = await fetch(viewCard.imageUrl);
                      const b = await r.blob();
                      const url = URL.createObjectURL(b);
                      const a = document.createElement("a");
                      a.href = url; a.download = `invite-${viewCard.name}.png`;
                      document.body.appendChild(a); a.click();
                      document.body.removeChild(a); URL.revokeObjectURL(url);
                    } catch { window.open(viewCard.imageUrl, "_blank"); }
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background:"linear-gradient(135deg,#c8a45a,#f5d87a)", color:"#0a0f1e" }}>
                  ⬇ Download
                </button>
                <button onClick={() => window.open(viewCard.waLink, "_blank")}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background:"#25D366" }}>
                  📲 Resend
                </button>
                <button onClick={() => setViewCard(null)}
                  className="text-white text-xl font-bold opacity-70 hover:opacity-100 ml-1">✕</button>
              </div>
            </div>
            <div className="p-4">
              <img src={viewCard.imageUrl} alt="Invite Card"
                className="w-full h-auto rounded-xl"
                style={{ maxHeight:"70vh", objectFit:"contain" }}/>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${toast.type==="error"?"bg-red-600":"bg-green-600"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}