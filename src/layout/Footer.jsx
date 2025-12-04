import clsx from 'clsx';
import Border from '@/components/ui/Border';
import { footerData } from '@/data/layout/footerData';
import { getLinks } from '@/data/sections/about/links';

export default function Footer() {
  return (
    <footer className="w-full">
      <Border>
        <div className="flex w-full flex-col md:flex-row md:justify-between">
          <div className="flex w-full items-center justify-center sm:border-b md:border-0">
            LOGO
          </div>
          <div className="gap-sm flex flex-col sm:flex-row sm:justify-between">
            {footerData.sections.map((section, index) => {
              const sectionLinks = getLinks(section.linkKeys);
              return (
                <div
                  key={section.title}
                  className={clsx(
                    'p-sm text-center',
                    'border-y last:border-b-0',
                    'sm:w-full sm:border-y-0 sm:first:border-r sm:last:border-l',
                    'md:py-xl md:pl-lg md:pr-4xl md:text-left',
                    'md:border-x md:last:border-x-0 md:last:border-l'
                  )}
                >
                  <p className="text-lead mb-lg">{section.title}</p>
                  <ul className="space-y-md">
                    {sectionLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="hover:text-foreground text-sm hover:underline"
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Border>
      <div className="py-sm flex items-center justify-center">
        <p className="text-center text-xs select-none">
          © {new Date().getFullYear()} Charls Cabangon
        </p>
      </div>
    </footer>
  );
}
