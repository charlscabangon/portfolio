import AccordionItem from './AccordionItem';

export default function Accordion({ items }) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
