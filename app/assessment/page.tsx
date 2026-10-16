"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  FileText,
  GraduationCap,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "../assessment.css";

type Answers = {
  goal: string;
  age: string;
  education: string;
  occupation: string;
  experience: string;
  english: string;
  savings: string;
  timeline: string;
  dependants: string;
};

const initialAnswers: Answers = {
  goal: "",
  age: "",
  education: "",
  occupation: "",
  experience: "",
  english: "",
  savings: "",
  timeline: "",
  dependants: "",
};

const goals = [
  {
    value: "work",
    label: "Build my career",
    note: "I want to work abroad",
    icon: BriefcaseBusiness,
  },
  {
    value: "study",
    label: "Study and grow",
    note: "I am exploring education",
    icon: GraduationCap,
  },
  {
    value: "family",
    label: "Move with family",
    note: "We are planning together",
    icon: Users,
  },
  {
    value: "explore",
    label: "Show me what fits",
    note: "I am keeping an open mind",
    icon: MapPin,
  },
];

const processingLines = [
  "Reading your goals and priorities",
  "Comparing your profile with supported pathways",
  "Checking likely costs, timing and requirements",
  "Preparing your clearest starting points",
];

const matches = [
  {
    country: "Canada",
    flag: "🇨🇦",
    route: "Express Entry",
    score: 86,
    label: "Strong starting point",
    tone: "green",
    reasons: [
      "Your work experience supports this route",
      "A language result would strengthen the picture",
    ],
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    route: "Skilled Worker",
    score: 78,
    label: "Worth exploring",
    tone: "blue",
    reasons: [
      "Your career goal aligns with this route",
      "You would usually need an eligible sponsored role",
    ],
  },
  {
    country: "Ireland",
    flag: "🇮🇪",
    route: "Critical Skills",
    score: 72,
    label: "Possible alternative",
    tone: "cream",
    reasons: [
      "Relevant experience may support your case",
      "Your occupation needs a closer eligibility check",
    ],
  },
];

function AnimatedScore({ score }: { score: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 55;
    const timer = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((score * frame) / total));
      if (frame >= total) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [score]);
  return (
    <div
      className="score-ring"
      style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}
    >
      <span>{value}%</span>
    </div>
  );
}

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [attempted, setAttempted] = useState(false);
  const [upload, setUpload] = useState({ name: "", progress: 0, done: false });
  const [processing, setProcessing] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const uploadTimer = useRef<number | null>(null);

  const progress = showResults ? 100 : Math.min(((step + 1) / 4) * 100, 100);
  const valid =
    step === 0
      ? Boolean(answers.goal)
      : step === 1
        ? Boolean(
            answers.age &&
            answers.education &&
            answers.occupation &&
            answers.experience,
          )
        : step === 2
          ? Boolean(
              answers.english &&
              answers.savings &&
              answers.timeline &&
              answers.dependants,
            )
          : true;

  const update = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setAttempted(false);
  };

  const next = () => {
    if (!valid) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    if (step < 3) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep(4);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setProcessing(index);
      if (index >= processingLines.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setShowResults(true);
        }, 650);
      }
    }, 720);
  };

  const handleUpload = (file?: File) => {
    if (!file) return;
    if (uploadTimer.current) window.clearInterval(uploadTimer.current);
    setUpload({ name: file.name, progress: 4, done: false });
    let current = 4;
    uploadTimer.current = window.setInterval(() => {
      current = Math.min(current + Math.floor(Math.random() * 13) + 6, 100);
      setUpload({ name: file.name, progress: current, done: current === 100 });
      if (current === 100 && uploadTimer.current)
        window.clearInterval(uploadTimer.current);
    }, 180);
  };

  if (showResults) {
    return (
      <main className="assessment-shell results-shell">
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 90 }).map((_, index) => (
            <i
              key={index}
              style={
                {
                  "--i": index,
                  left: `${(index * 29) % 100}%`,
                  "--drift": `${((index * 37) % 121) - 60}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <header className="assessment-nav">
          <Link href="/" aria-label="Return to Migra home">
            <Image
              src="/migra-logo.png"
              alt="Migra"
              width={146}
              height={24}
              priority
            />
          </Link>
          <span className="privacy-pill">
            <ShieldCheck size={16} /> Illustrative preview
          </span>
        </header>
        <section className="results wrap">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="result-intro"
          >
            <span>
              <Sparkles size={17} /> Your starting points are ready
            </span>
            <h1>You have options worth exploring.</h1>
            <p>
              Based on what you shared, these routes deserve a closer look. This
              preview uses a predetermined result to show how Migra will explain
              your options—not to confirm eligibility.
            </p>
          </motion.div>
          <div className="match-grid">
            {matches.map((match, index) => (
              <motion.article
                className={`match-card ${match.tone}`}
                key={match.country}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 + index * 0.14 }}
              >
                <header>
                  <span className="match-flag">{match.flag}</span>
                  <div>
                    <small>{match.label}</small>
                    <h2>{match.country}</h2>
                    <p>{match.route}</p>
                  </div>
                  <AnimatedScore score={match.score} />
                </header>
                <div className="match-reasons">
                  {match.reasons.map((reason, reasonIndex) => (
                    <p key={reason}>
                      <span>
                        {reasonIndex === 0 ? (
                          <Check size={15} />
                        ) : (
                          <Sparkles size={15} />
                        )}
                      </span>
                      {reason}
                    </p>
                  ))}
                </div>
                <button>
                  See the full breakdown <ArrowRight size={17} />
                </button>
              </motion.article>
            ))}
          </div>
          <section className="next-action">
            <div>
              <span>YOUR NEXT BEST ACTION</span>
              <h2>Confirm the details that could change your result.</h2>
              <p>
                Language scores, occupation codes and document evidence can
                materially affect pathway fit.
              </p>
            </div>
            <div className="next-checklist">
              <p>
                <span>1</span>
                <b>Check your occupation code</b>
                <small>Make sure your experience maps correctly.</small>
              </p>
              <p>
                <span>2</span>
                <b>Plan your language test</b>
                <small>A verified score makes the assessment sharper.</small>
              </p>
              <p>
                <span>3</span>
                <b>Review with a specialist</b>
                <small>Confirm the assumptions before spending money.</small>
              </p>
            </div>
          </section>
          <div className="result-actions">
            <a
              className="assessment-primary"
              href="https://wa.me/2348153955718"
              target="_blank"
              rel="noreferrer"
            >
              Talk through my options <ArrowRight size={18} />
            </a>
            <button
              onClick={() => {
                setAnswers(initialAnswers);
                setUpload({ name: "", progress: 0, done: false });
                setProcessing(0);
                setShowResults(false);
                setStep(0);
              }}
            >
              Start again
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (step === 4) {
    return (
      <main className="assessment-shell processing-shell">
        <header className="assessment-nav">
          <Link href="/">
            <Image
              src="/migra-logo.png"
              alt="Migra"
              width={146}
              height={24}
              priority
            />
          </Link>
          <span className="privacy-pill">
            <LockKeyhole size={15} /> Preview only
          </span>
        </header>
        <section className="processing-card">
          <div className="analysis-orbit">
            <Sparkles />
            <i />
            <i />
            <i />
          </div>
          <span>PUTTING THE PIECES TOGETHER</span>
          <h1>We’re finding the clearest places to start.</h1>
          <p>
            This takes a moment. Migra looks at the whole picture—not one answer
            in isolation.
          </p>
          <div className="processing-list">
            {processingLines.map((line, index) => (
              <div
                className={
                  processing > index
                    ? "done"
                    : processing === index
                      ? "active"
                      : ""
                }
                key={line}
              >
                <span>
                  {processing > index ? <Check size={15} /> : index + 1}
                </span>
                <p>{line}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="assessment-shell">
      <header className="assessment-nav">
        <Link href="/" aria-label="Return to Migra home">
          <Image
            src="/migra-logo.png"
            alt="Migra"
            width={146}
            height={24}
            priority
          />
        </Link>
        <div className="assessment-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="step-label">Step {step + 1} of 4</span>
      </header>
      <section className="assessment-stage">
        <aside className="assessment-aside">
          <div>
            <span>YOUR MIGRA PREVIEW</span>
            <h2>Let’s understand the move you have in mind.</h2>
            <p>
              You do not need perfect answers. Share what you know today and you
              can update it later.
            </p>
          </div>
          <div className="aside-trust">
            <ShieldCheck size={22} />
            <p>
              <b>This is a safe demo.</b>
              <small>
                Your answers and files stay in this browser and are not
                submitted anywhere.
              </small>
            </p>
          </div>
        </aside>
        <section className="question-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
            >
              {step === 0 && (
                <>
                  <p className="question-kicker">FIRST, THE BIG PICTURE</p>
                  <h1>What would make moving abroad worth it for you?</h1>
                  <p className="question-help">
                    Choose the answer that feels closest. There is no wrong
                    place to begin.
                  </p>
                  <div className="choice-grid">
                    {goals.map(({ value, label, note, icon: Icon }) => (
                      <button
                        className={answers.goal === value ? "selected" : ""}
                        onClick={() => update("goal", value)}
                        key={value}
                      >
                        <span>
                          <Icon size={22} />
                        </span>
                        <b>{label}</b>
                        <small>{note}</small>
                        <i>{answers.goal === value && <Check size={14} />}</i>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <p className="question-kicker">
                    A LITTLE ABOUT YOUR EXPERIENCE
                  </p>
                  <h1>Help us understand what you’re bringing with you.</h1>
                  <p className="question-help">
                    These details help Migra separate realistic routes from
                    expensive distractions.
                  </p>
                  <div className="form-grid">
                    <label>
                      <span>Age range</span>
                      <select
                        aria-invalid={attempted && !answers.age}
                        value={answers.age}
                        onChange={(e) => update("age", e.target.value)}
                      >
                        <option value="">Choose a range</option>
                        <option>18–24</option>
                        <option>25–34</option>
                        <option>35–44</option>
                        <option>45+</option>
                      </select>
                    </label>
                    <label>
                      <span>Highest education</span>
                      <select
                        aria-invalid={attempted && !answers.education}
                        value={answers.education}
                        onChange={(e) => update("education", e.target.value)}
                      >
                        <option value="">Choose your level</option>
                        <option>Secondary school</option>
                        <option>Diploma</option>
                        <option>Bachelor’s degree</option>
                        <option>Postgraduate degree</option>
                      </select>
                    </label>
                    <label className="full">
                      <span>What kind of work do you do?</span>
                      <input
                        aria-invalid={attempted && !answers.occupation}
                        value={answers.occupation}
                        onChange={(e) => update("occupation", e.target.value)}
                        placeholder="For example, product designer or registered nurse"
                      />
                    </label>
                    <label className="full">
                      <span>Years of relevant experience</span>
                      <select
                        aria-invalid={attempted && !answers.experience}
                        value={answers.experience}
                        onChange={(e) => update("experience", e.target.value)}
                      >
                        <option value="">Choose an estimate</option>
                        <option>Less than 1 year</option>
                        <option>1–2 years</option>
                        <option>3–5 years</option>
                        <option>6+ years</option>
                      </select>
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <p className="question-kicker">
                    WHAT YOUR PLAN NEEDS TO WORK
                  </p>
                  <h1>Let’s make the recommendation fit your real life.</h1>
                  <p className="question-help">
                    Rough estimates are enough. This is for planning—not
                    judgement.
                  </p>
                  <div className="form-grid">
                    <label>
                      <span>English readiness</span>
                      <select
                        aria-invalid={attempted && !answers.english}
                        value={answers.english}
                        onChange={(e) => update("english", e.target.value)}
                      >
                        <option value="">Choose one</option>
                        <option>I have a recent test score</option>
                        <option>I can take a test soon</option>
                        <option>I need time to prepare</option>
                      </select>
                    </label>
                    <label>
                      <span>Budget available now</span>
                      <select
                        aria-invalid={attempted && !answers.savings}
                        value={answers.savings}
                        onChange={(e) => update("savings", e.target.value)}
                      >
                        <option value="">Choose a comfortable range</option>
                        <option>Under ₦2 million</option>
                        <option>₦2–5 million</option>
                        <option>₦5–10 million</option>
                        <option>Above ₦10 million</option>
                      </select>
                      <small>
                        We ask so the plan does not ignore the financial
                        reality.
                      </small>
                    </label>
                    <label>
                      <span>When would you like to move?</span>
                      <select
                        aria-invalid={attempted && !answers.timeline}
                        value={answers.timeline}
                        onChange={(e) => update("timeline", e.target.value)}
                      >
                        <option value="">Choose a timeframe</option>
                        <option>Within 6 months</option>
                        <option>6–12 months</option>
                        <option>1–2 years</option>
                        <option>I am still exploring</option>
                      </select>
                    </label>
                    <label>
                      <span>Who is moving with you?</span>
                      <select
                        aria-invalid={attempted && !answers.dependants}
                        value={answers.dependants}
                        onChange={(e) => update("dependants", e.target.value)}
                      >
                        <option value="">Choose one</option>
                        <option>Just me</option>
                        <option>My partner</option>
                        <option>My partner and children</option>
                        <option>My children</option>
                      </select>
                    </label>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <p className="question-kicker">OPTIONAL, BUT USEFUL</p>
                  <h1>Add a CV to see how document review will feel.</h1>
                  <p className="question-help">
                    You can skip this. In the full product, Migra uses your
                    evidence to make recommendations more precise.
                  </p>
                  <label
                    className={`upload-box ${upload.done ? "complete" : ""}`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) =>
                        handleUpload(event.target.files?.[0])
                      }
                    />
                    {upload.name ? (
                      <>
                        <span className="upload-icon">
                          {upload.done ? <CheckCircle2 /> : <FileText />}
                        </span>
                        <div>
                          <b>{upload.name}</b>
                          <small>
                            {upload.done
                              ? "Ready for review"
                              : `Preparing securely… ${upload.progress}%`}
                          </small>
                        </div>
                        <strong>{upload.progress}%</strong>
                        <i>
                          <em style={{ width: `${upload.progress}%` }} />
                        </i>
                      </>
                    ) : (
                      <>
                        <span className="upload-icon">
                          <UploadCloud />
                        </span>
                        <div>
                          <b>Choose a CV or résumé</b>
                          <small>
                            PDF, DOC or DOCX · Nothing leaves this browser
                          </small>
                        </div>
                      </>
                    )}
                  </label>
                  <div className="upload-reassurance">
                    <LockKeyhole size={17} />
                    <p>
                      <b>You stay in control.</b>
                      <small>
                        This demo simulates an upload to show the experience.
                        The file is not stored or sent.
                      </small>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          {attempted && (
            <p className="validation-message">
              A few details are still missing. Complete the highlighted fields
              so we can continue.
            </p>
          )}
          <footer className="question-actions">
            <button
              className="back-button"
              disabled={step === 0}
              onClick={() => {
                setAttempted(false);
                setStep((current) => Math.max(0, current - 1));
              }}
            >
              <ArrowLeft size={17} /> Back
            </button>
            <button className="assessment-primary" onClick={next}>
              {step === 3 ? "See my options" : "Continue"}{" "}
              <ArrowRight size={18} />
            </button>
          </footer>
        </section>
      </section>
    </main>
  );
}
