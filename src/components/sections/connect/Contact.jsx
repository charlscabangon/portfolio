import { motion } from 'framer-motion';

import { ContactForm } from '@/features/Contact';
import { Border, Heading } from '@/components/ui';
import { useScrollReveal } from '@/lib/hooks';

export default function Contact() {
  const animation = useScrollReveal();

  return (
    <motion.section ref={animation.ref} {...animation.props} className="space-y-sm">
      <div className="space-y-sm ml-sm">
        <Heading level="h4">you made it here!</Heading>
        <Border>
          <p>i’m ready to join your team, send an email!</p>
        </Border>
      </div>
      <Border
        border="top"
        isFront="true"
        position="center"
        className="p-sm xs:p-md md:px-lg lg:px-xl xl:px-4xl pattern-stripes"
      >
        <ContactForm />
      </Border>
    </motion.section>
  );
}
