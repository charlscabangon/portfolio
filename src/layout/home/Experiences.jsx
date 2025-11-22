import Accordion from '@/features/exp/Accordion';
import Border from '@/components/ui/Border';
import Heading from '@/components/Heading';

export default function Experiences() {
  return (
    <section className="space-y-sm">
      <div className="ml-sm">
        <Heading level="h4">my journey</Heading>
      </div>
      <Border className="pattern-stripes md:pl-xl lg:pl-4xl before:z-10 after:z-10">
        <Accordion />
      </Border>
    </section>
  );
}
