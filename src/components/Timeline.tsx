import { useEffect, useRef } from 'react';
import '../styles/Timeline.scss';

interface TimelineEvent {
  year: string;
  title: string;
  text: string;
  highlight?: boolean;
}

// Edit this array to change the timeline. Add `highlight: true` to make an entry stand out.
const events: TimelineEvent[] = [
  { year: '2018', title: 'Where it began', text: 'Landon, Bain and Toby join RoboCupJunior Australia.' },
  { year: '2021', title: 'William joins', text: 'The fourth member joins the team.' },
  { year: '2022', title: 'First season together', text: 'EV3 robot in MicroPython. NSW state champions, 3rd at Nationals.' },
  { year: '2023', title: 'SPIKE era', text: 'NSW state champions again and 3rd at Nationals.' },
  { year: '2024', title: 'Going custom', text: 'First robot with our own hardware: Raspberry Pi and PWM motor control.' },
  { year: '2025', title: 'National Champions', text: 'Won the Australian Open and qualified for internationals.', highlight: true },
  { year: '2026', title: 'Incheon', text: 'Rebuilt from scratch: custom PCB, ROS2, four-wheel drive.', highlight: true },
];

export default function Timeline() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Fade each item in as it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">Our Journey</h2>

      <ol className="timeline__list">
        {events.map((event, i) => (
          <li
            key={event.year}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`timeline__item${event.highlight ? ' timeline__item--highlight' : ''}`}
          >
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__card">
              <time className="timeline__year">{event.year}</time>
              <h3 className="timeline__title">{event.title}</h3>
              <p className="timeline__text">{event.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
