"use client";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleAlert,
  FileCheck2,
  GraduationCap,
  Menu,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import {
  ArrowRight as PhosphorArrowRight,
  Briefcase as PhosphorBriefcase,
  GraduationCap as PhosphorGraduationCap,
  InstagramLogo,
  LinkedinLogo,
  UsersThree,
  XLogo,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const paths = [
  {
    title: "Work abroad",
    text: "Use your skills and experience",
    icon: BriefcaseBusiness,
    score: "86%",
  },
  {
    title: "Study abroad",
    text: "Find a course that moves you forward",
    icon: GraduationCap,
    score: "81%",
  },
  {
    title: "Move with family",
    text: "Plan for everyone going with you",
    icon: Users,
    score: "74%",
  },
  {
    title: "Still exploring",
    text: "Start with your priorities",
    icon: Search,
    score: "3 routes",
  },
];

function PathScore({ score, active }: { score: string; active: boolean }) {
  const target = Number.parseInt(score, 10);
  const isPercent = score.includes("%");
  const [value, setValue] = useState(active ? 0 : target);

  useEffect(() => {
    if (!active) {
      setValue(target);
      return;
    }
    setValue(0);
    let frame = 0;
    const frames = 42;
    const timer = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((target * frame) / frames));
      if (frame >= frames) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [active, target]);

  const sweep = isPercent ? target * 3.6 : 270;
  return (
    <strong
      className={`path-score ${active ? "animate" : ""}`}
      style={{ "--path-sweep": `${sweep}deg` } as React.CSSProperties}
    >
      <span>{value}</span>
      <small>{isPercent ? "%" : "routes"}</small>
    </strong>
  );
}

const destinations = [
  {
    country: "Canada",
    flagCode: "ca",
    routes: [{ type: "Work", name: "Skilled Worker Pathway" }],
  },
  {
    country: "United Kingdom",
    flagCode: "gb",
    routes: [
      { type: "Work", name: "Skilled Worker Route" },
      { type: "Family", name: "Family Route" },
    ],
  },
  {
    country: "Ireland",
    flagCode: "ie",
    routes: [
      { type: "Work", name: "Critical Skills Employment Permit" },
      { type: "Study", name: "Study Route" },
    ],
  },
  {
    country: "Sweden",
    flagCode: "se",
    routes: [{ type: "Work", name: "Work Permit Route" }],
  },
  {
    country: "Australia",
    flagCode: "au",
    routes: [
      { type: "Work", name: "Skilled Independent Visa" },
      { type: "Study", name: "Study Route" },
    ],
  },
  {
    country: "Netherlands",
    flagCode: "nl",
    routes: [{ type: "Work", name: "Highly Skilled Migrant Route" }],
  },
  {
    country: "Estonia",
    flagCode: "ee",
    routes: [{ type: "Work", name: "Work Permit Route" }],
  },
];
const faqs = [
  [
    "What does Migra actually do?",
    "Migra turns your profile, priorities and budget into a shortlist of realistic migration routes, then explains the gaps, costs and next actions.",
  ],
  [
    "Does a route match mean I am eligible?",
    "No. A match is a starting point, not a legal decision. Eligibility depends on complete evidence and current programme rules.",
  ],
  [
    "Do I need to know where I want to go?",
    "No. Begin with your goals and constraints. Migra helps you compare destinations before you commit.",
  ],
  [
    "Does Migra guarantee a visa?",
    "No. Migra never guarantees visas, admission, employment or settlement outcomes.",
  ],
];

function CustomArt({
  kind,
}: {
  kind:
    | "routes"
    | "cost"
    | "order"
    | "profile"
    | "match"
    | "roadmap"
    | "search"
    | "reason"
    | "money";
}) {
  const common = (
    <>
      <circle cx="160" cy="120" r="96" fill="#dff8f4" />
      <path
        d="M34 190C94 132 124 208 182 150S265 88 306 125"
        fill="none"
        stroke="#16c7bd"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </>
  );
  return (
    <svg
      className={`custom-art ${kind}`}
      viewBox="0 0 320 240"
      role="img"
      aria-label={`${kind} illustration`}
    >
      {common}
      {kind === "routes" && (
        <>
          <rect x="64" y="60" width="70" height="98" rx="18" fill="#071b39" />
          <circle cx="99" cy="95" r="19" fill="#16c7bd" />
          <path
            d="m91 95 6 6 12-14"
            fill="none"
            stroke="white"
            strokeWidth="5"
          />
          <rect x="185" y="84" width="78" height="40" rx="14" fill="white" />
          <rect x="201" y="99" width="43" height="7" rx="4" fill="#071b39" />
          <circle cx="234" cy="166" r="34" fill="#fff" />
          <path
            d="M218 167h32M234 151v32"
            stroke="#071b39"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "cost" && (
        <>
          <path d="M91 71h92v109H91z" fill="#fff" />
          <path
            d="M105 96h64M105 116h44M105 136h54"
            stroke="#a8b4bc"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="213" cy="146" r="46" fill="#071b39" />
          <path
            d="M213 119v55M198 132c0-12 30-12 30 0s-30 8-30 21 30 13 30 0"
            fill="none"
            stroke="#16c7bd"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "order" && (
        <>
          <path d="M88 55h116v136H88z" fill="#fff" />
          <circle cx="112" cy="87" r="15" fill="#16c7bd" />
          <circle cx="112" cy="125" r="15" fill="#16c7bd" />
          <circle cx="112" cy="163" r="15" fill="#071b39" />
          <path d="M112 102v8M112 140v8" stroke="#071b39" strokeWidth="5" />
          <path
            d="m104 87 6 6 10-13m-16 45 6 6 10-13"
            fill="none"
            stroke="white"
            strokeWidth="4"
          />
          <path
            d="M140 84h42M140 122h52M140 160h34"
            stroke="#a8b4bc"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "profile" && (
        <>
          <rect x="82" y="47" width="156" height="148" rx="22" fill="#fff" />
          <circle cx="127" cy="93" r="26" fill="#071b39" />
          <circle cx="127" cy="86" r="9" fill="#16c7bd" />
          <path d="M110 111c5-17 29-17 34 0" fill="#16c7bd" />
          <path
            d="M169 77h43M169 98h31M105 145h108M105 166h76"
            stroke="#a8b4bc"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "match" && (
        <>
          <circle cx="160" cy="118" r="67" fill="#fff" />
          <path
            d="M160 57a61 61 0 1 1-57 84"
            fill="none"
            stroke="#16c7bd"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <text
            x="160"
            y="132"
            textAnchor="middle"
            fontSize="35"
            fontWeight="800"
            fill="#071b39"
          >
            86%
          </text>
          <circle cx="257" cy="74" r="27" fill="#071b39" />
          <path
            d="m245 74 8 8 15-18"
            fill="none"
            stroke="#16c7bd"
            strokeWidth="6"
          />
        </>
      )}
      {kind === "roadmap" && (
        <>
          <path
            d="M73 167C104 72 185 188 250 76"
            fill="none"
            stroke="#071b39"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="78" cy="160" r="23" fill="#16c7bd" />
          <circle
            cx="156"
            cy="132"
            r="23"
            fill="#fff"
            stroke="#16c7bd"
            strokeWidth="7"
          />
          <circle cx="246" cy="80" r="23" fill="#071b39" />
          <path
            d="m68 160 8 8 14-18m158-85 4 13 13 3-13 5-4 13-5-13-13-5 13-3z"
            fill="white"
          />
        </>
      )}
      {kind === "search" && (
        <>
          <g transform="rotate(-7 130 120)">
            <rect x="52" y="54" width="146" height="118" rx="20" fill="#fff" />
            <path
              d="M75 82h96M75 107h72M75 132h86"
              stroke="#a8b4bc"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>
          <circle cx="228" cy="145" r="41" fill="#071b39" />
          <circle
            cx="215"
            cy="132"
            r="15"
            fill="none"
            stroke="#16c7bd"
            strokeWidth="7"
          />
          <path
            d="m226 144 18 18"
            stroke="#16c7bd"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "reason" && (
        <>
          <path d="M83 58h142v127H83z" fill="#fff" />
          <path
            d="M104 90h70M104 115h95M104 140h62"
            stroke="#a8b4bc"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="m203 135 18 18 34-44"
            fill="none"
            stroke="#16c7bd"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "money" && (
        <>
          <rect x="79" y="100" width="165" height="89" rx="26" fill="#071b39" />
          <path d="M79 127h165" stroke="#16c7bd" strokeWidth="10" />
          <circle cx="207" cy="157" r="17" fill="#16c7bd" />
          <path
            d="M101 73c27-28 70-29 96-3"
            fill="none"
            stroke="#071b39"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle cx="111" cy="74" r="25" fill="#fff" />
          <text
            x="111"
            y="83"
            textAnchor="middle"
            fontSize="24"
            fontWeight="800"
            fill="#071b39"
          >
            ₦
          </text>
        </>
      )}
    </svg>
  );
}

function Phone({ view = "home" }: { view?: "home" | "route" | "plan" }) {
  return (
    <div className="phone">
      <i className="notch" />
      <header>
        <Image src="/migra-logo.png" alt="" width={92} height={15} />
        <b>AO</b>
      </header>
      {view === "home" && (
        <div className="screen">
          <small>GOOD MORNING, AMARA</small>
          <h3>Where could you go?</h3>
          <label>
            <Search /> Find a route
          </label>
          <section>
            <div>
              <BriefcaseBusiness />
              <b>Work</b>
            </div>
            <div>
              <GraduationCap />
              <b>Study</b>
            </div>
          </section>
          <article>
            <small>BEST STARTING POINT</small>
            <strong>Canada</strong>
            <span>Express Entry · 86% fit</span>
            <i>
              <em />
            </i>
          </article>
        </div>
      )}
      {view === "route" && (
        <div className="route-screen">
          <small>YOUR TOP MATCH</small>
          <div className="score">
            86<span>%</span>
          </div>
          <h3>Canada</h3>
          <p>Express Entry</p>
          <div>
            <Check />
            <span>
              <b>Experience</b>
              <small>Supports this route</small>
            </span>
          </div>
          <div className="warn">
            <CircleAlert />
            <span>
              <b>Language test</b>
              <small>Still required</small>
            </span>
          </div>
          <button>See full breakdown</button>
        </div>
      )}
      {view === "plan" && (
        <div className="plan-screen">
          <small>YOUR ROADMAP</small>
          <h3>Canada, in order.</h3>
          {[
            "Complete profile",
            "Check occupation code",
            "Book language test",
            "Start assessment",
          ].map((x, i) => (
            <div className={i < 2 ? "done" : i === 2 ? "now" : ""} key={x}>
              <span>{i < 2 ? <Check /> : i + 1}</span>
              <p>
                <b>{x}</b>
                <small>
                  {i < 2 ? "Done" : i === 2 ? "Next best action" : "Coming up"}
                </small>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [faq, setFaq] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % paths.length),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [active]);
  return (
    <main>
      <nav className="nav wrap">
        <Image src="/migra-logo.png" alt="Migra" width={146} height={24} />
        <div>
          <a href="#about">What is Migra</a>
          <a href="#how">How it works</a>
          <a href="#explore">Explore Migra</a>
          <a href="#trust">Trust</a>
        </div>
        <a className="btn dark desktop" href="/assessment">
          Check my options
        </a>
        <button className="menu" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <a href="#about">What is Migra</a>
            <a href="#how">How it works</a>
            <a href="#explore">Explore Migra</a>
            <a className="btn dark" href="/assessment">
              Check my options
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="hero">
        <div className="faces">
          <Image src="/migra-professional.png" alt="" width={38} height={38} />
          <Image src="/migra-student.png" alt="" width={38} height={38} />
          <Image src="/migra-family.png" alt="" width={38} height={38} />
          <span>Built for Africans planning abroad</span>
        </div>
        <h1>
          Know your way out.
          <br />
          <span>Before you spend a naira.</span>
        </h1>
        <p>
          Find realistic routes, see what they require and know your next move.
        </p>
        <div className="actions">
          <a className="btn dark" href="/assessment">
            Check my options <ArrowRight />
          </a>
          <a className="btn white" href="#how">
            See how it works
          </a>
        </div>
        <motion.div
          className="campaign-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/migra-campaign-hero-v2.png"
            alt="Two African professionals with the Migra migration planning app"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
      </section>
      <section className="about wrap" id="about">
        <div className="about-top">
          <div className="lead">
            <span>ABOUT</span>
            <h2>Migration, without the confusion.</h2>
            <p>
              Migration advice is scattered across search results, social media
              and sales calls. Migra brings your options, requirements and next
              actions into one place.
            </p>
            <a className="btn teal" href="#start">
              Explore Migra <ArrowRight />
            </a>
          </div>
          <div className="about-editorial">
            <Image
              src="/migra-clarity-planning-v6.png"
              alt="A Nigerian professional exploring international migration options"
              fill
              sizes="48vw"
            />
            <i />
          </div>
        </div>
        <div className="path-stage">
          <div className="stage-photo">
            <Image
              src="/migra-pathway-cutout-v5.png"
              alt="A professional exploring migration routes"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div className="path-list">
            {paths.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.title}
                  className={active === i ? "active" : ""}
                  onClick={() => setActive(i)}
                >
                  <span>0{i + 1}</span>
                  <Icon />
                  <p>
                    <b>{p.title}</b>
                    <small>{p.text}</small>
                  </p>
                  <PathScore score={p.score} active={active === i} />
                  {active === i && (
                    <i className="path-timer" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="explore wrap" id="explore">
        <header className="explore-intro">
          <div>
            <span>EXPLORE MIGRA</span>
            <h2>Everything you need to choose your next move.</h2>
          </div>
          <div>
            <p>
              Go from scattered advice to a decision you can explain, budget for
              and act on.
            </p>
            <a className="explore-link" href="#start">
              <span>Start exploring</span>
              <PhosphorArrowRight size={18} weight="bold" />
            </a>
          </div>
        </header>
        <div className="feature-showcase">
          <article>
            <div className="feature-copy">
              <span>01 · COMPARE</span>
              <h3>Put your real options next to each other.</h3>
              <p>
                Compare fit, requirements, costs and trade-offs without juggling
                tabs, screenshots or sales calls.
              </p>
              <a href="#start">
                Compare my options{" "}
                <PhosphorArrowRight size={17} weight="bold" />
              </a>
            </div>
            <div className="feature-visual">
              <Image
                src="/migra-compare-cutout-v5.png"
                alt="Migration information organised into a clear route comparison"
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
          </article>
          <article className="feature-reverse">
            <div className="feature-copy">
              <span>02 · CHECK</span>
              <h3>Know what is ready—and what still needs work.</h3>
              <p>
                See the evidence supporting each route, the gaps in your profile
                and the questions that still need an answer.
              </p>
              <a href="#start">
                Check my readiness{" "}
                <PhosphorArrowRight size={17} weight="bold" />
              </a>
            </div>
            <div className="feature-visual">
              <Image
                src="/migra-readiness-cutout-v5.png"
                alt="Profile evidence connected to a realistic migration route"
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
          </article>
          <article>
            <div className="feature-copy">
              <span>03 · PLAN TOGETHER</span>
              <h3>Make one plan for everyone making the move.</h3>
              <p>
                Bring dependant rules, shared costs and family priorities into
                the decision before you commit.
              </p>
              <a href="#start">
                Plan our move <PhosphorArrowRight size={17} weight="bold" />
              </a>
            </div>
            <div className="feature-visual">
              <Image
                src="/migra-together-cutout-v5.png"
                alt="A couple using Migra to plan their move together"
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
          </article>
        </div>
      </section>
      <section className="destinations" id="destinations">
        <div className="wrap">
          <header className="destinations-head">
            <div>
              <span>WHERE COULD YOU GO?</span>
              <h2>See where your profile could take you.</h2>
            </div>
            <p>
              Explore the work, study and family pathways Migra currently
              supports. Tell us about you, and we&apos;ll help narrow the list.
            </p>
          </header>
        </div>
        <div className="destination-window">
          <div className="destination-track">
            {[0, 1].map((copy) => (
              <div
                className="destination-set"
                aria-hidden={copy === 1}
                key={copy}
              >
                {destinations.map((destination) => (
                  <article key={destination.country}>
                    <div className="destination-title">
                      <span>
                        <img
                          src={`https://flagcdn.com/w80/${destination.flagCode}.png`}
                          alt=""
                          width="40"
                          height="27"
                          loading="lazy"
                        />
                      </span>
                      <h3>{destination.country}</h3>
                    </div>
                    <div className="destination-routes">
                      {destination.routes.map((route) => {
                        const RouteIcon =
                          route.type === "Study"
                            ? PhosphorGraduationCap
                            : route.type === "Family"
                              ? UsersThree
                              : PhosphorBriefcase;
                        return (
                          <div key={route.name}>
                            <RouteIcon size={19} weight="duotone" />
                            <p>
                              <small>{route.type}</small>
                              <b>{route.name}</b>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <a
                      href="https://wa.me/2348153955718?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20my%20migration%20eligibility."
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      Check this route
                      <PhosphorArrowRight size={17} weight="bold" />
                    </a>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="family">
        <div className="family-photo">
          <Image
            src="/migra-family-cutout-v5.png"
            alt="A Nigerian family planning an international move together"
            fill
          />
          <label>
            <Users />
            <span>
              <b>Moving with family?</b>
              <small>See dependant rules early.</small>
            </span>
          </label>
        </div>
        <div>
          <span>FOR YOUR REAL LIFE</span>
          <h2>A route for you should work for the people you love.</h2>
          <p>
            Compare dependant rules, estimated costs and practical trade-offs
            before you choose a path that affects the whole family.
          </p>
          <section>
            <b>Dependants</b>
            <b>Full costs</b>
            <b>Settlement needs</b>
          </section>
        </div>
      </section>
      <section className="how" id="how">
        <div className="how-head wrap">
          <span>THREE SIMPLE STEPS</span>
          <h2>How Migra works</h2>
          <p>
            Build your profile. See what fits. Follow a plan you understand.
          </p>
        </div>
        <div className="how-grid wrap">
          <article>
            <div className="how-visual">
              <Image
                src="/migra-profile-cutout-v5.png"
                alt="Profile details organised for a Migra assessment"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
            <span>01</span>
            <h3>Tell us about you</h3>
            <p>
              Add your goals, experience, budget and the people moving with you.
            </p>
          </article>
          <article>
            <div className="how-visual">
              <Image
                src="/migra-match-cutout-v5.png"
                alt="Migra route matches shown in the product"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
            <span>02</span>
            <h3>See what fits</h3>
            <p>
              Compare realistic routes and understand why each one matches your
              profile.
            </p>
          </article>
          <article>
            <div className="how-visual">
              <Image
                src="/migra-roadmap-cutout-v5.png"
                alt="A clear migration roadmap inside Migra"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
            <span>03</span>
            <h3>Follow your plan</h3>
            <p>
              Work through costs, documents and next actions in the right order.
            </p>
          </article>
        </div>
      </section>
      <section className="trust" id="trust">
        <div>
          <span>CLEAR ANSWERS. HONEST LIMITS.</span>
          <h2>Know why a route fits before you act on it.</h2>
          <p>
            Migra shows you what supports each recommendation, what still needs
            checking and which official rules it is based on—so you can decide
            with your eyes open.
          </p>
          <a className="btn white" href="/assessment">
            See what fits me <ArrowRight />
          </a>
        </div>
        <div className="evidence">
          <header>
            <ShieldCheck />
            <span>
              <b>Why Migra suggested this</b>
              <small>How this recommendation was made</small>
            </span>
            <em>SAMPLE RESULT</em>
          </header>
          <h3>
            Your work experience strengthens this option. Your language score
            could still change the result.
          </h3>
          <label>
            <BadgeCheck />
            <span>
              <b>Rules checked</b>
              <small>Matched against official programme requirements</small>
            </span>
          </label>
          <label>
            <FileCheck2 />
            <span>
              <b>What you told us</b>
              <small>8 details from your profile shaped this result</small>
            </span>
          </label>
          <label className="uncertain">
            <CircleAlert />
            <span>
              <b>What needs confirming</b>
              <small>Your language score and credential assessment</small>
            </span>
          </label>
        </div>
      </section>
      <section className="start wrap" id="start">
        <div className="start-product">
          <Image
            src="/migra-cta-cutout-v5.png"
            alt="A single Migra route recommendation screen"
            fill
            sizes="55vw"
          />
        </div>
        <div>
          <Image src="/migra-logo.png" alt="Migra" width={146} height={24} />
          <h2>Your next move starts with a clearer answer.</h2>
          <p>
            Build your profile and see the routes worth exploring before you
            spend money.
          </p>
          <a className="btn dark" href="/assessment">
            Check my options <ArrowRight />
          </a>
        </div>
      </section>
      <section className="faq wrap">
        <h2>FAQs</h2>
        <div>
          {faqs.map(([q, a], i) => (
            <article key={q} className={faq === i ? "open" : ""}>
              <button onClick={() => setFaq(faq === i ? -1 : i)}>
                {q}
                <ChevronDown />
              </button>
              <AnimatePresence>
                {faq === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {a}
                  </motion.p>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>
      </section>
      <footer>
        <div className="wrap footer-grid">
          <div>
            <Image src="/migra-logo.png" alt="Migra" width={146} height={24} />
            <p>Migration intelligence for Africans.</p>
          </div>
          <div>
            <b>Product</b>
            <a href="#about">What is Migra</a>
            <a href="#how">How it works</a>
            <a href="#explore">Explore</a>
          </div>
          <div>
            <b>Company</b>
            <a href="#trust">Trust</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <b>Legal</b>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="wrap foot">
          © 2026 Migra
          <div className="footer-social" aria-label="Migra social media">
            <span title="Instagram">
              <InstagramLogo size={18} weight="fill" />
            </span>
            <span title="LinkedIn">
              <LinkedinLogo size={18} weight="fill" />
            </span>
            <span title="X">
              <XLogo size={18} weight="bold" />
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
