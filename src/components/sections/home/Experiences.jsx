import { motion } from 'framer-motion';
import { Accordion, Border, Heading, Label } from '@/components/ui';
import { useScrollReveal } from '@/lib/hooks';
import { experiences } from '@/data/sections/experiences/experiences';

export default function Experiences() {
  const animation = useScrollReveal();

  return (
    <motion.section ref={animation.ref} {...animation.props} className="space-y-sm">
      <div className="ml-sm">
        <Heading level="h4">my journey</Heading>
      </div>
      <div>
        <Label margin={true}>an accordion with an animate-ping would do it</Label>
        <Border className="pattern-stripes md:pl-xl lg:pl-4xl before:z-10 after:z-10">
          <Accordion items={experiences} />
        </Border>
      </div>
    </motion.section>
  );
}
