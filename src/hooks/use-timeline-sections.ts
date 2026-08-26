import { useEffect, useRef, useState } from "react";

export function useTimelineSections(sectionCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) return;

        const closestSection = visibleEntries.reduce((closest, entry) =>
          Math.abs(entry.boundingClientRect.top) < Math.abs(closest.boundingClientRect.top) ? entry : closest,
        );
        const index = sectionRefs.current.findIndex((section) => section === closestSection.target);

        if (index !== -1) setActiveIndex(index);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sectionRefs.current.forEach((section) => section && observer.observe(section));

    return () => observer.disconnect();
  }, [sectionCount]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { activeIndex, scrollToSection, sectionRefs };
}
