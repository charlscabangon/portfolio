import { motion } from 'framer-motion';
import clsx from 'clsx';

import Logo from '@/components/icons/Logo';
import { Border, Clipboard } from '@/components/ui';
import { useScrollReveal } from '@/lib/hooks';
import { transition } from '@/styles/animation';
import { footerData } from '@/data/layout/footerData';
import { getLink, getLinks } from '@/data/sections/about/links';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const animation = useScrollReveal({
    preset: 'slideUp',
    transition: { ...transition.normal },
  });

  return (
    <motion.footer ref={animation.ref} {...animation.props} className="w-full">
      <Border>
        <div className="flex w-full flex-col lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col justify-between">
            <div className="my-auto flex w-full items-center justify-center">
              <Logo className="w-20 md:w-24 lg:w-30" />
            </div>
            <div
              className={clsx(
                'p-sm flex w-full flex-row items-center justify-center gap-1.5',
                'border-t sm:border-y lg:border-b-0'
              )}
            >
              <Clipboard
                text={getLink('email').href}
                className="text-foreground-secondary group text-sm font-light hover:underline"
              >
                <ArrowRightIcon
                  className={clsx(
                    'w-4',
                    'transition-transform duration-200 ease-out group-hover:-rotate-45'
                  )}
                  strokeWidth={1}
                />
              </Clipboard>
            </div>
          </div>
          <div className="gap-sm flex flex-col sm:flex-row sm:justify-between">
            {footerData.sections.map((section) => {
              const sectionLinks = getLinks(section.linkKeys);
              return (
                <div
                  key={section.title}
                  className={clsx(
                    'p-sm text-center',
                    'border-y last:border-b-0',
                    'sm:w-full sm:border-y-0 sm:first:border-r sm:last:border-l',
                    'md:py-xl md:pl-lg md:pr-4xl md:text-left',
                    'md:border-x md:first:border-l-0 md:last:border-x-0 md:last:border-l lg:first:border-l'
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
    </motion.footer>
  );
}
