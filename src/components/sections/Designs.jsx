import { useState } from 'react';

import clsx from 'clsx';

import ImageLightbox from '@/features/Lightbox/ImageLightbox';
import Heading from '@/components/display/Heading/Heading';
import Border from '@/components/ui/Border';
import Label from '@/components/ui/Label';
import Tile from '@/components/ui/Tile';

import { getAllFeatures, getFeaturesForLightbox } from '@/data/sections/designs/features';
import { useDevice } from '@/utils/hooks/useDevice';

export default function Designs() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isTablet, isDesktop } = useDevice();

  const features = getAllFeatures();
  const lightboxSlides = getFeaturesForLightbox();

  const label = isTablet || isDesktop ? 'grid-cols-4 grid-rows-6' : 'grid-cols-3 grid-rows-6';

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="space-y-sm">
      <div className="ml-sm">
        <Heading level="h4">designs</Heading>
      </div>

      <div>
        <Label margin={true}>{`grid ${label}`}</Label>
        <Border isFront={true}>
          <div className="p-sm bg-background-secondary w-full">
            <div
              className={clsx(
                'grid w-full gap-1',
                'grid-cols-3 grid-rows-8',
                'md:gap-xs md:grid-cols-4 md:grid-rows-6',
                'h-[600px] md:h-[500px] lg:h-[700px] xl:h-[900px]'
              )}
            >
              {features.map((feature, index) => (
                <Tile
                  key={feature.id}
                  src={feature.image}
                  title={feature.title}
                  gridClass={feature.gridClass}
                  onClick={() => openLightbox(index)}
                />
              ))}

              {/* main */}
              <div
                className={clsx(
                  'relative overflow-hidden',
                  'pattern-dots-dense rounded-md border shadow-md',
                  'bg-background border-border',
                  'col-span-3 col-start-1 row-span-2 row-start-7',
                  'md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-3'
                )}
              >
                <div className="flex h-full w-full items-center justify-center" />
              </div>
            </div>
          </div>
        </Border>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={currentIndex}
      />
    </section>
  );
}
