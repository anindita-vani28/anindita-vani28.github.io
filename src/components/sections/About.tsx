import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  {
    id: 'markets',
    label: 'Markets',
    eyebrow: 'Watching closely',
    title: 'There’s always a story behind the numbers.',
    copy: 'I follow the stock market because I’m curious about what moves it. For me, investing begins with learning, questioning, and understanding the story behind the numbers.',
  },
  {
    id: 'build',
    label: 'Learn & Build',
    eyebrow: 'Currently compiling',
    title: 'The best way to learn is to make something useful.',
    copy: 'I enjoy learning new technologies by building with them—turning unfamiliar ideas into projects that can make someone’s life a little simpler.',
  },
  {
    id: 'art',
    label: 'Art + Music',
    eyebrow: 'Always playing',
    title: 'Creativity belongs in the process.',
    copy: 'Art and music keep my thinking creative. They remind me that meaningful experiences should feel as thoughtful as they function.',
  },
  {
    id: 'open',
    label: 'Open to Anything',
    eyebrow: 'Say hello',
    title: 'A good conversation can lead anywhere.',
    copy: 'I’m always open to a new conversation, perspective, or experience. Curiosity keeps both my work and my life interesting.',
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

const shouldShowAllTabs = () =>
  window.innerWidth <= 760 ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function TabArtifact({ id }: { id: TabId }) {
  if (id === 'markets') {
    return (
      <div className="browser-artifact market-artifact" aria-hidden="true">
        <div className="market-artifact__meta">
          <span>CURIOUS</span>
          <strong>+3.82%</strong>
        </div>
        <svg viewBox="0 0 420 150" role="presentation">
          <path
            className="market-artifact__grid"
            d="M0 30H420M0 75H420M0 120H420"
          />
          <path
            className="market-artifact__line"
            d="M4 124C40 116 53 91 81 101S126 70 158 80s48-41 83-28 48-9 73-2 46-30 102-38"
          />
        </svg>
        <span className="market-artifact__note">learning before investing</span>
      </div>
    );
  }

  if (id === 'build') {
    return (
      <div className="browser-artifact code-artifact" aria-hidden="true">
        <span>01</span>
        <code>const curiosity = learn(newTechnology);</code>
        <span>02</span>
        <code>const idea = build(curiosity);</code>
        <span>03</span>
        <code>return simplify(idea);</code>
        <i />
      </div>
    );
  }

  if (id === 'art') {
    return (
      <div className="browser-artifact sound-artifact" aria-hidden="true">
        <div className="sound-artifact__record">
          <span />
        </div>
        <div className="sound-artifact__wave">
          {Array.from({ length: 19 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <small>ideas on repeat</small>
      </div>
    );
  }

  return (
    <div className="browser-artifact conversation-artifact" aria-hidden="true">
      <span>What are you working on?</span>
      <span>Tell me something I don’t know yet.</span>
      <i>↗</i>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [openedTabs, setOpenedTabs] = useState(() =>
    shouldShowAllTabs() ? TABS.length : 0,
  );
  const [activeTab, setActiveTab] = useState<number | null>(() =>
    shouldShowAllTabs() ? 0 : null,
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (shouldShowAllTabs()) return;

    let previousPhase = -1;
    const context = gsap.context(() => {
      gsap.fromTo(
        '.browser-about__window',
        { autoAlpha: 0, y: 55, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: true,
        onUpdate: ({ progress }) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: progress });
          }

          const phase =
            progress < 0.1
              ? -1
              : Math.min(TABS.length - 1, Math.floor((progress - 0.1) / 0.22));

          if (phase !== previousPhase) {
            previousPhase = phase;
            setOpenedTabs(Math.max(0, phase + 1));
            setActiveTab(phase >= 0 ? phase : null);
          }
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  const currentTab = activeTab === null ? null : TABS[activeTab];

  return (
    <section
      className="section section--panel browser-about"
      id="about"
      aria-labelledby="about-title"
      ref={sectionRef}
    >
      <div className="browser-about__stage">
        <header className="browser-about__heading">
          <p className="eyebrow">
            <span>01</span> / About
          </p>
          <h2 id="about-title">
            From algorithms to adventures, <em>I’m always exploring.</em>
          </h2>
          <div className="browser-about__progress" aria-hidden="true">
            <span ref={progressRef} />
          </div>
        </header>

        <div
          className={`browser-about__window${currentTab ? ` is-${currentTab.id}` : ''}`}
        >
          <div className="browser-about__chrome">
            <span className="browser-about__controls" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-about__address">
              anindita://about/open-tabs
            </span>
            <span className="browser-about__counter">
              {openedTabs} / {TABS.length} open
            </span>
          </div>

          <div
            className="browser-about__tabs"
            role="tablist"
            aria-label="About me"
          >
            {TABS.map((tab, index) => {
              const isOpen = index < openedTabs;
              const isActive = activeTab === index;

              return (
                <button
                  className={`browser-about__tab browser-about__tab--${tab.id}${isOpen ? ' is-open' : ''}${isActive ? ' is-active' : ''}`}
                  id={`about-tab-${tab.id}`}
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-controls="about-tab-panel"
                  aria-selected={isActive}
                  aria-hidden={!isOpen}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => isOpen && setActiveTab(index)}
                >
                  <span>{tab.label}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
            <span className="browser-about__new-tab" aria-hidden="true">
              +
            </span>
          </div>

          <div
            className="browser-about__panel"
            id="about-tab-panel"
            role="tabpanel"
            aria-labelledby={
              currentTab ? `about-tab-${currentTab.id}` : undefined
            }
          >
            {currentTab ? (
              <div
                className={`browser-about__panel-inner browser-about__panel-inner--${currentTab.id}`}
                key={currentTab.id}
              >
                <div className="browser-about__copy">
                  <span>{currentTab.eyebrow}</span>
                  <h3>{currentTab.title}</h3>
                  <p>{currentTab.copy}</p>
                </div>
                <TabArtifact id={currentTab.id} />
              </div>
            ) : (
              <div className="browser-about__empty">
                <span className="browser-about__cursor" aria-hidden="true" />
                <p>Scroll to open a few things currently on my mind.</p>
              </div>
            )}
          </div>
        </div>

        <div className="browser-about__footer">
          <span>Scroll to open tabs</span>
          <span>Every tab tells part of the story.</span>
        </div>
      </div>
    </section>
  );
}
