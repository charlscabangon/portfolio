import Heading from '@/components/display/Heading/Heading';
import Label from '@/components/ui/Label';
import CardContainer from '@/components/display/Card/CardContainer';

import { useDevice } from '@/utils/hooks/useDevice';
import { projects } from '@/data/sections/projects/projects';

export default function Projects() {
  const { isMobile, isTablet } = useDevice();

  const label = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <section id="works" className="space-y-sm">
      <div className="ml-sm">
        <Heading level="h4">projects</Heading>
      </div>
      <div className="w-full">
        <Label margin={true}>{`grid ${label} auto-rows-auto`}</Label>
        <div className="mx-auto w-full max-w-7xl">
          <div className="gap-sm grid grid-cols-1 md:grid-cols-2">
            {projects.map((project, index) => (
              <CardContainer key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
