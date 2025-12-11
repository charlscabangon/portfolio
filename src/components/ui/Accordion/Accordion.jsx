import { motion } from 'framer-motion';

import AccordionItem from './AccordionItem';
import { useStagger } from '@/lib/hooks';

export default function Accordion({ items }) {
  const stagger = useStagger({ delay: 0.2, y: 50 });
  return (
    <motion.div ref={stagger.ref} {...stagger.container} className="w-full">
      {items.map((item, index) => (
        <motion.div key={item.id} {...stagger.item}>
          <AccordionItem item={item} isFirst={index === 0} isLast={index === items.length - 1} />
        </motion.div>
      ))}
    </motion.div>
  );
}
