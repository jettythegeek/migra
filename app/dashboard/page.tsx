"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, ClipboardList, CalendarDays, Compass, FileText, MapPin, Plane, ShieldCheck } from "lucide-react";
import "./dashboard.css";

const routes = {
  ca: { country: "Canada", name: "Express Entry", score: 86, detail: "Your work experience is a useful starting point. Confirm your occupation code, language scores and education assessment before making a decision." },
  gb: { country: "United Kingdom", name: "Skilled Worker", score: 78, detail: "Your career goals align with this pathway. Check eligible occupations, employer sponsorship and salary requirements before making a decision." },
  ie: { country: "Ireland", name: "Critical Skills", score: 72, detail: "Your experience may support this pathway. Check the eligible occupations list, qualifications and employment offer requirements before making a decision." },
};
type RouteKey = keyof typeof routes;
const stages = ["Assess", "Prepare", "Apply", "Interview", "Arrive"];
const guidance = [
  { title: "Turn your options into a plan.", text: "Review your route, then start gathering the evidence that will help you move forward.", cta: "Start preparing", heading: "Understand your starting point", tasks: ["Review your route requirements", "Confirm your occupation and qualifications", "Identify the details that need checking"] },
  { title: "Get your documents in order.", text: "Use your checklist to organise your evidence and identify anything you still need.", cta: "Explore the application stage", heading: "Build your evidence", tasks: ["Check your passport validity", "Gather education and work records", "Plan language tests and translations"] },
  { title: "Build a clear application plan.", text: "Confirm the official requirements and review your evidence before submitting through the appropriate official service.", cta: "Plan interview preparation", heading: "Prepare for your application", tasks: ["Check current official application guidance", "Review forms, evidence and fees", "Keep a copy of your submission and reference"] },
  { title: "Feel prepared for the conversation.", text: "Check whether your pathway needs an interview and practise explaining your plans clearly.", cta: "Plan your arrival", heading: "Prepare with confidence", tasks: ["Confirm whether an interview is required", "Review your application and supporting documents", "Prepare questions about your next steps"] },
  { title: "Make space for your next chapter.", text: "Organise the practical details of settling in once your permission to travel is confirmed.", cta: "Review your preparation", heading: "Plan a smoother arrival", tasks: ["Confirm travel permission before booking", "Research housing and arrival arrangements", "Plan insurance, banking and local registration"] },
];
const documents = ["Valid passport", "Education certificates", "Work experience records", "Language test evidence", "Proof of funds", "Route-specific documents"];

export default function DashboardPage() {
  const [routeKey, setRouteKey] = useState<RouteKey>("ca");
  const [stage, setStage] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("route");
    const key: RouteKey = requested === "gb" || requested === "ie" ? requested : "ca";
    setRouteKey(key);
    try {
      const saved = JSON.parse(localStorage.getItem(`migra-plan-${key}`) || "null");
      if (saved) {
        setStage(Number.isInteger(saved.stage) ? Math.max(0, Math.min(4, saved.stage)) : 0);
        setChecked(Array.isArray(saved.checked) ? saved.checked.filter((item: string) => documents.includes(item)) : []);
      }
    } catch { /* A fresh plan still works when browser storage is unavailable. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(`migra-plan-${routeKey}`, JSON.stringify({ stage, checked })); } catch { /* Keep the current session usable. */ }
  }, [stage, checked, ready, routeKey]);
  const route = routes[routeKey];
  const current = guidance[stage];
  const advance = () => setStage(value => value === 4 ? 1 : value + 1);

  return (
    <main className="dashboard-shell">
      <header className="dashboard-nav">
        <Link href="/" aria-label="Migra home"><Image src="/migra-logo.png" alt="Migra" width={146} height={24} /></Link>
        <span><span className="dashboard-live-dot" /> Your migration workspace</span>
        <Link href="/assessment">New assessment <ArrowUpRight size={16} /></Link>
      </header>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <p>YOUR WORKSPACE</p>
          <a href="#overview" className="active"><Compass size={19} /> Overview</a>
          <a href="#documents"><FileText size={19} /> Documents</a>
          <a href="#timeline"><CalendarDays size={19} /> Your timeline</a>
          <div className="dashboard-sidebar-note"><ShieldCheck size={24} /><b>One step at a time.</b><span>A clearer plan for a big life decision.</span></div>
        </aside>
        <div className="dashboard-content" id="overview">
          <div className="dashboard-greeting"><div><p className="dashboard-eyebrow">YOUR NEXT CHAPTER</p><h1>Your journey, in focus.</h1><p>You have a starting point. Let’s make your next move clearer.</p></div><span className="dashboard-avatar"><Compass size={25} /></span></div>
          <div className="dashboard-route-switch">
            <span>{route.country} <ChevronRight size={15} /> {route.name}</span>
            <Link href="/assessment?view=results">Change route <ArrowRight size={16} /></Link>
          </div>
          <div className="dashboard-columns">
            <div className="dashboard-main-column">
              <section className="dashboard-card migration-plan">
                <div className="plan-summary"><div className="plan-ring" style={{ "--progress": `${stage * 90}deg` } as React.CSSProperties}><span>{stage}<small>/ 4</small></span></div><div><h2>Your migration plan</h2><p>{stage === 0 ? "Start with a clear assessment" : `${stage} of 4 stage transitions explored`}</p></div><span className="stage-pill">{stages[stage]}</span></div>
                <ol className="journey-stages" aria-label="Migration stages">{stages.map((name, index) => <li key={name} className={index < stage ? "done" : index === stage ? "current" : ""} aria-current={index === stage ? "step" : undefined}><span>{index < stage ? <Check size={15} /> : <i />}</span><b>{name}</b>{index === stage && <small>You are here</small>}</li>)}</ol>
              </section>
              <section className="dashboard-next" aria-live="polite">
                <div className="flight-art" aria-hidden="true"><svg viewBox="0 0 400 65"><path d="M5 50 C70 -20 130 0 185 35 S290 75 360 10" /></svg><Plane size={29} /></div>
                <p className="dashboard-eyebrow">YOUR NEXT STEP · {stages[stage].toUpperCase()}</p><h2>{current.title}</h2><p>{current.text}</p><button onClick={advance} disabled={!ready}>{current.cta}<ArrowRight size={19} /></button>
              </section>
              <section className="dashboard-card route-breakdown"><div className="dashboard-section-heading"><div><p className="dashboard-eyebrow">YOUR SELECTED PATHWAY</p><h2>A closer look at your route</h2></div><img src={`https://flagcdn.com/w80/${routeKey}.png`} alt={`${route.country} flag`} width="48" height="32" /></div><h3>{route.country} <ChevronRight size={18} /> {route.name}</h3><p>{route.detail}</p><div className="route-fit"><span><ShieldCheck size={18} /> Illustrative profile fit</span><b>{route.score}%</b></div><small>This planning preview is not an eligibility decision. Requirements and evidence need checking against official guidance.</small></section>
              <section className="dashboard-card stage-focus" aria-live="polite"><p className="dashboard-eyebrow">{stages[stage].toUpperCase()} STAGE</p><h2>{current.heading}</h2><ul>{current.tasks.map((task,index)=><li key={task}><span>{index+1}</span>{task}</li>)}</ul></section>
            </div>
            <div className="dashboard-side-column">
              <section className="dashboard-card dashboard-documents" id="documents"><ClipboardList size={25} /><h2>Document checklist</h2><p>{checked.length} of {documents.length} organised</p><div className="document-progress"><span style={{width:`${checked.length/documents.length*100}%`}} /></div>{documents.map(doc=><label key={doc}><input type="checkbox" checked={checked.includes(doc)} onChange={()=>setChecked(items=>items.includes(doc)?items.filter(item=>item!==doc):[...items,doc])} /><span>{doc}</span></label>)}<small>Track what you have ready. Exact documents depend on your route; ticking an item does not upload or verify it.</small></section>
              <section className="dashboard-card dashboard-timeline" id="timeline"><CalendarDays size={25} /><h2>Your timeline</h2><p>A plan that moves at your pace.</p><div><span className="timeline-dot" /><b>Now</b><small>{stages[stage]} your next move</small></div><div><span className="timeline-dot muted" /><b>Coming up</b><small>{stage < 4 ? stages[stage+1] : "Your new chapter"}</small></div><p className="timeline-note">Timing depends on your evidence, chosen route and official processing times.</p></section>
              <section className="dashboard-destination"><MapPin size={22}/><span>FROM HERE TO THERE</span><h2>A big move.<br/>A clearer path.</h2><p>Keep your next step in sight.</p><div aria-hidden="true">{[32,54,40,82,61,105,48,70,38].map((height,i)=><i key={i} style={{height}} />)}</div></section>
            </div>
          </div>
          <p className="dashboard-footnote">Your checklist and stage are saved in this browser. Stage progress helps you plan; it does not submit an application or confirm approval.</p>
        </div>
      </div>
    </main>
  );
}
