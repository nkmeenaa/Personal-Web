import { Fragment, useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi';
// Only fonts, smooth scrolling and the dialog animation need CSS; everything else is Tailwind.
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=Public+Sans:wght@400;500;600&display=swap');
html { scroll-behavior: smooth; }
@keyframes pf-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes pf-rise { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
.pf-backdrop { animation: pf-fade .18s ease-out; }
.pf-panel { animation: pf-rise .22s ease-out; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .pf-backdrop, .pf-panel { animation: none; }
}
`;
const serif = "font-['Literata',Georgia,serif]";
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a5d9f]';
const link = `text-[#1d4678] underline decoration-[#2a5d9f]/35 underline-offset-[3px] transition-colors hover:decoration-[#2a5d9f] rounded-sm ${focus}`;
const certLink = `text-amber-700 underline decoration-amber-700/30 underline-offset-[3px] hover:decoration-amber-700 rounded-sm ${focus}`;
const section =
  'grid scroll-mt-16 gap-x-10 gap-y-4 border-t border-[#d3d9d3] py-11 md:grid-cols-[11rem_minmax(0,1fr)]';
const sub = 'mt-0.5 text-[0.925rem] text-[#5e6b67]';
const date = 'shrink-0 whitespace-nowrap text-sm text-[#5e6b67]';
const row = 'flex flex-wrap items-baseline justify-between gap-x-4 sm:flex-nowrap [&>h3]:min-w-0';
const chip = 'rounded bg-[#e3e8e2] px-2 py-0.5 text-xs text-[#2c3a37]';
const outlineBtn = `rounded-md border border-[#c3cbc3] px-4 py-2 text-sm font-medium transition-colors hover:border-[#2a5d9f] hover:text-[#1d4678] ${focus}`;
const solidBtn = `rounded-md bg-[#2a5d9f] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1d4678] ${focus}`;

function SectionTitle({ children }) {
  return (
    <h2 className={`${serif} flex items-center gap-2.5 text-[1.1rem] font-semibold leading-tight md:self-start`}>
      <span aria-hidden="true" className="h-4 w-1 rounded-full bg-[#2a5d9f]" />
      {children}
    </h2>
  );
}

function ProjectCard({ proj, onOpen }) {
  const shown = proj.tech.slice(0, 3);
  const extra = proj.tech.length - shown.length;

  return (
    <button
      type="button"
      onClick={(e) => onOpen(proj, e.currentTarget)}
      aria-haspopup="dialog"
      className={`group flex h-full flex-col rounded-xl border border-[#d3d9d3] bg-white/60 p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#2a5d9f]/50 hover:bg-white hover:shadow-[0_10px_28px_-14px_rgba(29,70,120,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focus}`}
    >
      <span className="flex items-center justify-between gap-3 text-xs text-[#5e6b67]">
        <span className="rounded-full bg-[#2a5d9f]/10 px-2 py-0.5 font-medium text-[#1d4678]">{proj.subtitle}</span>
        <span className="whitespace-nowrap">{proj.date}</span>
      </span>
      <span className={`${serif} mt-3 block text-[1.05rem] font-semibold leading-snug`}>{proj.title}</span>
      <span className="mt-2 line-clamp-3 block text-[0.9rem] leading-relaxed text-[#46544f]">{proj.points[0]}</span>
      <span className="mt-4 flex flex-wrap gap-1.5">
        {shown.map((t, i) => (
          <span key={i} className={chip}>{t}</span>
        ))}
        {extra > 0 && <span className={`${chip} text-[#5e6b67]`}>+{extra}</span>}
      </span>
      <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-[#1d4678]">
        View details
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}

function ProjectDialog({ proj, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="pf-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-[#16211f]/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="pf-panel max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-[#d3d9d3] bg-[#f7f8f5] shadow-2xl sm:rounded-2xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#d3d9d3] bg-[#f7f8f5]/95 px-6 py-5 backdrop-blur">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#5e6b67]">
              <span className="rounded-full bg-[#2a5d9f]/10 px-2 py-0.5 text-xs font-medium text-[#1d4678]">
                {proj.subtitle}
              </span>
              <span>{proj.date}</span>
            </p>
            <h3 id="project-dialog-title" className={`${serif} mt-2 text-xl font-semibold leading-snug`}>
              {proj.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className={`-mr-2 -mt-1 shrink-0 rounded-md p-2 text-[#5e6b67] transition-colors hover:bg-[#e3e8e2] hover:text-[#16211f] ${focus}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6">
          <h4 className="text-sm font-semibold text-[#1d4678]">What I did</h4>
          <ul className="mt-3 grid gap-2.5">
            {proj.points.map((pt, i) => (
              <li
                key={i}
                className="relative pl-4 text-[0.975rem] text-[#2c3a37] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-[6px] before:bg-[#2a5d9f]"
              >
                {pt}
              </li>
            ))}
          </ul>

          <h4 className="mt-7 text-sm font-semibold text-[#1d4678]">Tech stack</h4>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {proj.tech.map((t, i) => (
              <span key={i} className={chip}>{t}</span>
            ))}
          </div>

          {(proj.github || proj.live || proj.certificate) && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-[#d3d9d3] pt-6">
              {proj.live && (
                <a href={proj.live} target="_blank" rel="noopener noreferrer" className={solidBtn}>
                  Open live site
                </a>
              )}
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
                  Source code
                </a>
              )}
              {proj.certificate && (
                <a href={proj.certificate} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
                  Certificate
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PortfolioView({ data, cfData }) {
  const { profile } = data;
  const [active, setActive] = useState(null);
  const lastTrigger = useRef(null);

  const openProject = (proj, trigger) => {
    lastTrigger.current = trigger;
    setActive(proj);
  };
  const closeProject = () => {
    setActive(null);
    lastTrigger.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#f2f4f1] font-['Public_Sans',system-ui,sans-serif] leading-relaxed text-[#16211f] selection:bg-[#2a5d9f]/20">
      <style>{fontImport}</style>

      <header className="sticky top-0 z-50 border-b border-[#d3d9d3] bg-[#f2f4f1]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl justify-end px-6 py-4">
          <nav aria-label="Sections" className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#5e6b67]">
            {['projects', 'achievements', 'education', 'experience', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`capitalize transition-colors hover:text-[#1d4678] ${focus} rounded-sm`}
              >
                {id}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        <section className="relative pb-14 pt-16 sm:pt-20">
          {/* faint dot grid that fades out, purely decorative */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-8 hidden h-64 w-1/2 bg-[radial-gradient(#b9c3b9_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom_left,black,transparent_75%)] sm:block"
          />
          <div className="relative">
            <h1 className={`${serif} text-[clamp(2.4rem,6vw,3.75rem)] font-bold leading-tight tracking-tight`}>
              {profile.name}
            </h1>
            <p className="mt-3 text-[#5e6b67]">
              {profile.degree}, {profile.institute}.
            </p>
            <p className={`${serif} mt-7 max-w-xl text-xl leading-[1.7]`}>
              I’m an aspiring Software Development Engineer (SDE) focused on backend development, with an interest in AI and machine learning.
            </p>

          </div>
        </section>

        <section id="education" className={section}>
          <SectionTitle>Education</SectionTitle>
          <ul className="grid gap-6">
            {data.education.map((edu, i) => (
              <li key={i} className="border-l-2 border-[#2a5d9f]/25 pl-4">
                <div className={row}>
                  <h3 className="text-[0.975rem] font-semibold">{edu.degree}</h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-[#2a5d9f]/25 bg-[#2a5d9f]/10 px-2.5 py-0.5 text-xs font-medium text-[#1d4678]">
                    {edu.year}
                  </span>
                </div>
                <p className={sub}>{edu.institute}</p>
              </li>
            ))}
          </ul>
        </section>
        
        <section id="projects" className={section}>
          <SectionTitle>Projects</SectionTitle>
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.projects.map((proj, idx) => (
                <ProjectCard key={idx} proj={proj} onOpen={openProject} />
              ))}
            </div>
            <p className="mt-4 text-[0.85rem] text-[#5e6b67]">Select a project to see the full details and links.</p>
          </div>
        </section>


        <section id="achievements" className={section}>
          <SectionTitle>Achievements</SectionTitle>
          <div>
            {cfData && (
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d3d9d3] bg-white/60 px-5 py-4 text-[0.95rem]">
                <div>
                  <p className="text-xs text-[#5e6b67]">Codeforces</p>
                  <a
                    href={profile.codeforcesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${serif} text-lg font-semibold ${link}`}
                  >
                    {cfData.handle}
                  </a>
                  {cfData.rank && <span className="ml-2 text-sm capitalize text-[#5e6b67]">{cfData.rank}</span>}
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-xs text-[#5e6b67]">Rating</p>
                    <p className="font-semibold">{cfData.rating || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#5e6b67]">Highest</p>
                    <p className="font-semibold text-emerald-700">{cfData.maxRating || 1011}</p>
                  </div>
                </div>
              </div>
            )}
            <ul className="grid gap-5">
              {data.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-l-2 border-[#2a5d9f]/25 pl-4"
                >
                  <div>
                    <h3 className="text-[0.975rem] font-semibold">{ach.title}</h3>
                    <p className={sub}>{ach.subtitle}</p>
                  </div>
                  <div className="text-sm text-[#5e6b67] sm:text-right">
                    <div>{ach.date}</div>
                    {ach.linkUrl && (
                      <a href={ach.linkUrl} target="_blank" rel="noopener noreferrer" className={link}>
                        {ach.linkText}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        

        <section id="experience" className={section}>
          <SectionTitle>Experience</SectionTitle>
          <ul className="grid gap-6">
            {data.extracurriculars.map((item, i) => (
              <li key={i} className="border-l-2 border-[#2a5d9f]/25 pl-4">
                <div className={row}>
                  <h3 className="text-[0.975rem] font-semibold">{item.role}</h3>
                  <span className={date}>{item.date}</span>
                </div>
                <p className="mt-0.5 text-[0.925rem] text-[#1d4678]">{item.org}</p>
                <p className="mt-1.5 max-w-xl text-[0.95rem] text-[#2c3a37]">{item.desc}</p>
                {item.certificate && (
                  <p className="mt-2 text-[0.925rem] font-medium">
                    <a href={item.certificate} target="_blank" rel="noopener noreferrer" className={certLink}>
                      Certificate
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

      </main>

      <footer id="contact" className="border-t border-[#d3d9d3] pb-12 pt-8 text-[0.85rem] text-[#5e6b67]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineBtn}
              aria-label="GitHub Profile"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineBtn}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={`mailto:${profile.email2}`}
              className={outlineBtn}
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>
          <p className="mt-6 text-center">
            © {new Date().getFullYear()} Nitin Kumar Meena, IIT Guwahati
          </p>
        </div>
      </footer>

      {active && <ProjectDialog proj={active} onClose={closeProject} />}
    </div>
  );
}

export default PortfolioView;