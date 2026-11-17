'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroImage, heroImages as defaultHeroImages } from '@/config/hero';

interface HeroMasonryProps {
  images?: HeroImage[];
  className?: string;
}

interface MasonryFrameProps {
  image: HeroImage;
  indexKey: number;
  aspectClass: string;
  sizes: string;
  priority?: boolean;
  defaultPosition?: string;
}

function MasonryFrame({
  image,
  indexKey,
  aspectClass,
  sizes,
  priority = false,
  defaultPosition = 'object-center',
}: MasonryFrameProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-xs transition-all duration-500 hover:border-[var(--color-accent)] ${aspectClass}`}
    >
      <AnimatePresence>
        <motion.div
          key={`${image.src}-${indexKey}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={image.src}
            alt={image.alt || 'Deepak Photo Films Wedding Photography'}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover w-full h-full ${image.objectPosition || defaultPosition}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle hairline inner border using theme variable */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[var(--color-border)]/40 z-10" />
    </div>
  );
}

export function HeroMasonry({ images = defaultHeroImages, className = '' }: HeroMasonryProps) {
  const imageList = useMemo(() => {
    return images && images.length > 0 ? images : defaultHeroImages;
  }, [images]);

  const total = imageList.length;
  const isMulti = total > 1;

  // Stagger initial indices so frames display different imagery
  const [indices, setIndices] = useState<[number, number, number, number]>([
    0,
    1 % total,
    2 % total,
    3 % total,
  ]);

  const [isHovered, setIsHovered] = useState(false);

  // Staggered sequence: frames advance one-by-one in an organic cadence
  // Frame sequence order: 0 (Col 1 Top) -> 2 (Col 2 Top) -> 1 (Col 1 Bottom) -> 3 (Col 2 Bottom)
  const advanceFrame = useCallback((frameSlot: 0 | 1 | 2 | 3) => {
    setIndices((prev) => {
      const next = [...prev] as [number, number, number, number];
      next[frameSlot] = (next[frameSlot] + 1) % total;
      return next;
    });
  }, [total]);

  useEffect(() => {
    if (!isMulti || isHovered) return;

    const frameOrder: (0 | 1 | 2 | 3)[] = [0, 2, 1, 3];
    let step = 0;

    // Advances one frame every 2.4s, completing a full cycle every ~9.6s
    const timer = setInterval(() => {
      advanceFrame(frameOrder[step % 4]);
      step += 1;
    }, 2400);

    return () => clearInterval(timer);
  }, [isMulti, isHovered, advanceFrame]);

  // Extract active image for each frame
  const frame1Image = imageList[indices[0]];
  const frame2Image = imageList[indices[1]];
  const frame3Image = imageList[indices[2]];
  const frame4Image = imageList[indices[3]];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full grid grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 items-start ${className}`}
    >
      {/* Column 1 (Left): Starts at baseline */}
      <div className="flex flex-col space-y-3 sm:space-y-3.5 lg:space-y-4">
        {/* Frame 1: Tall Portrait */}
        <MasonryFrame
          image={frame1Image}
          indexKey={indices[0]}
          aspectClass="aspect-[3/4]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 22vw"
          priority
          defaultPosition="object-center"
        />

        {/* Frame 2: Landscape Detail (Revealed on sm and up) */}
        <div className="hidden sm:block">
          <MasonryFrame
            image={frame2Image}
            indexKey={indices[1]}
            aspectClass="aspect-[16/10]"
            sizes="(max-width: 1024px) 35vw, 22vw"
            defaultPosition="object-top"
          />
        </div>
      </div>

      {/* Column 2 (Right): Staggered downward for dynamic editorial rhythm */}
      <div className="flex flex-col space-y-3 sm:space-y-3.5 lg:space-y-4 pt-4 sm:pt-6 lg:pt-8">
        {/* Frame 3: Landscape on sm+, Portrait on mobile for balanced pairing */}
        <MasonryFrame
          image={frame3Image}
          indexKey={indices[2]}
          aspectClass="aspect-[3/4] sm:aspect-[16/10]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 22vw"
          defaultPosition="object-center"
        />

        {/* Frame 4: Tall Portrait (Revealed on sm and up) */}
        <div className="hidden sm:block">
          <MasonryFrame
            image={frame4Image}
            indexKey={indices[3]}
            aspectClass="aspect-[3/4]"
            sizes="(max-width: 1024px) 35vw, 22vw"
            defaultPosition="object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
