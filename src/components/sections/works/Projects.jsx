import { motion } from 'framer-motion';

import { Heading, Label, CardContainer } from '@/components/ui';
import { useDevice } from '@/lib/hooks';
import { useScrollReveal, useStagger } from '@/lib/hooks';
import { projects } from '@/data/sections/projects/projects';

export default function Projects() {
  const animation = useScrollReveal();
  const stagger = useStagger();

  const { isMobile } = useDevice();

  const label = isMobile ? 'grid-cols-1' : 'grid-cols-2';

  return (
    <motion.section ref={animation.ref} {...animation.props} className="space-y-sm">
      <div className="ml-sm">
        <Heading level="h4">projects</Heading>
      </div>
      <div className="w-full">
        <Label margin={true}>{`grid ${label} auto-rows-auto`}</Label>
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            ref={stagger.ref}
            {...stagger.container}
            className="gap-sm grid grid-cols-1 md:grid-cols-2"
          >
            {projects.map((project, index) => (
              <motion.div key={project.id} {...stagger.item}>
                <CardContainer project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
