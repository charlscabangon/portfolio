import clsx from 'clsx';

import Border from '@/components/ui/Border';
import Markdown from '@/features/markdown/components/Markdown';
import Tooltip from '../ui/Tooltip';
import { about, tools } from '@/data/sections/about/about';

export default function AboutMe() {
  return (
    <section>
      <Border isFront={true}>
        <div className="flex w-full flex-col md:flex-row">
          {/* image container */}
          <div
            className={clsx(
              'pattern-stripes',
              'flex w-full items-center justify-center',
              'p-md sm:p-md md:w-[30%]'
            )}
          >
            <div
              className={clsx(
                'border-background-tertiary/70 ring-ring dark:ring-ring',
                'aspect-[3/5] overflow-hidden rounded-md border-10 shadow-lg ring',
                'md:-ml-20'
              )}
            >
              <img src={about.image} alt={about.title} className="h-auto w-full object-cover" />
            </div>
          </div>

          {/* text content */}
          <div
            className={clsx(
              'bg-background-secondary dark:bg-background-secondary border-border dark:border-border border-t md:border-t-0 md:border-r',
              'p-sm flex items-center justify-center',
              'md:order-first md:w-[70%]'
            )}
          >
            <article
              className={clsx(
                'border-border bg-background dark:bg-background container',
                'md:pr-2xl lg:pr-3xl container h-full w-full rounded-md border shadow-md'
              )}
            >
              <h6>what i do</h6>
              <Markdown path={about.content.path} file={about.content.filename} />

              <div
                className={clsx(
                  'border-border dark:border-border dark:ring-ring pattern-dots-dense container',
                  'gap-sm m-auto flex h-fit flex-col rounded-sm border shadow-sm',
                  'xl:mt-lg md:m-0 lg:w-[90%] 2xl:w-[85%]'
                )}
              >
                {tools.map((tool, index) => {
                  return (
                    <div key={index} className="gap-sm flex flex-col">
                      <div className="font-code text-foreground-secondary dark:text-foreground-secondary border-foreground-secondary border-l-2 pl-3 text-xs">
                        {tool.title}
                      </div>
                      <div className="gap-sm flex flex-wrap">
                        {tool.tools.map((item) => {
                          return (
                            <Tooltip key={item.id} content={item.name}>
                              <img
                                src={item.icon}
                                alt={item.name}
                                className="h-9 w-9 cursor-pointer rounded-sm shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                              />
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        </div>
      </Border>
    </section>
  );
}
