import Heading from '@/components/display/Heading/Heading';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

import { useDevice } from '@/utils/hooks/useDevice';
import { projects } from '@/data/projects';

export default function Projects() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const label = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <section className="space-y-sm">
      <div className="ml-sm">
        <Heading level="h4">works</Heading>
      </div>
      <div className="w-full">
        <Label margin={true}>{`grid ${label} auto-rows-auto`}</Label>
        <div className="mx-auto w-full max-w-7xl">
          <div className="gap-sm grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
