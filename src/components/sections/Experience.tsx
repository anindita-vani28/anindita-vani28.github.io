import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type UIEvent as ReactUIEvent,
} from 'react';
import { experienceGroups } from '../../data/experience';

export function Experience() {
  const [activeGroupId, setActiveGroupId] = useState(experienceGroups[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    scrollLeft: 0,
  });
  const activeGroup =
    experienceGroups.find((group) => group.id === activeGroupId) ??
    experienceGroups[0];

  const selectGroup = (groupId: (typeof experienceGroups)[number]['id']) => {
    setActiveGroupId(groupId);
    setScrollProgress(0);
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const updateProgress = (track: HTMLDivElement) => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 1;
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  };

  const handleScroll = (event: ReactUIEvent<HTMLDivElement>) => {
    updateProgress(event.currentTarget);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;

    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    event.preventDefault();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    event.preventDefault();
    event.currentTarget.scrollLeft =
      dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(dragState.current.pointerId)) {
      event.currentTarget.releasePointerCapture(dragState.current.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="section section--panel reveal-section" id="experience">
      <div className="section__content experience">
        <div className="experience__heading">
          <div>
            <p className="eyebrow">03 / Experience</p>
            <h2>Where I’ve learned, led, and grown.</h2>
          </div>
          <p className="section__copy">
            A mix of technical learning, academic support, and leadership rooted
            in helping people move forward.
          </p>
        </div>

        <div
          className="experience__switcher"
          role="tablist"
          aria-label="Experience categories"
        >
          {experienceGroups.map((group) => (
            <button
              className={group.id === activeGroupId ? 'is-active' : undefined}
              type="button"
              role="tab"
              id={`experience-tab-${group.id}`}
              aria-selected={group.id === activeGroupId}
              aria-controls="experience-track"
              key={group.id}
              onClick={() => selectGroup(group.id)}
            >
              {group.label}
              <span>{String(group.items.length).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div className="experience__rail">
          <div className="experience__rail-heading">
            <p>{activeGroup.description}</p>
          </div>

          <div
            className={`experience__track${isDragging ? ' is-dragging' : ''}`}
            id="experience-track"
            ref={trackRef}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`experience-tab-${activeGroup.id}`}
            key={activeGroup.id}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            {activeGroup.items.map((item, index) => (
              <article className="experience-card" key={item.role}>
                <div className="experience-card__topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <time>{item.date}</time>
                </div>
                <p className="experience-card__organization">
                  {item.organization}
                </p>
                <h3>{item.role}</h3>
                <p className="experience-card__summary">{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="experience__rail-footer" aria-hidden="true">
            <div className="experience__progress">
              <span
                style={{
                  transform: `scaleX(${0.12 + scrollProgress * 0.88})`,
                }}
              />
            </div>
            <p>
              Drag to explore <span>↔</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
