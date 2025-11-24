import clsx from 'clsx';
import Border from '@/components/ui/Border';

import image from '@/assets/images/portfolio-pic.avif';

export default function AboutMe() {
  const stack = ['JS', 'React', 'TW', 'Vite', 'Git', 'JS', 'React'];
  const design = ['Ps', 'Ai', 'Ae', 'Xd', 'Figma', 'Canva'];

  //todo: not hard code the infos, ui refinement, BORDERS, h w
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
              <img src={image} alt="" className="h-auto w-full object-cover" />
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
                'md:pr-2xl container h-full w-full rounded-md border shadow-md'
              )}
            >
              <h6>what i do</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic qui aliquam cum
                repellendus dolorem quam impedit neque, veniam, aperiam laudantium minus aut, ipsa
                quod voluptatum. Velit repellat perspiciatis quasi sit!
              </p>
              <div
                className={clsx(
                  'border-border dark:border-border dark:ring-ring pattern-dots-dense container',
                  'm-auto flex h-fit flex-col rounded-sm border shadow-sm',
                  'xl:mt-lg md:m-0 lg:w-[90%] 2xl:w-[85%]'
                )}
              >
                <div className="font-code text-foreground-secondary dark:text-foreground-secondary border-foreground-secondary border-l-2 pl-3 text-xs">
                  tech stack
                </div>
                <div className="gap-sm flex flex-wrap">
                  {stack.map((s, index) => {
                    return (
                      <div key={index} className="bg-foreground rounded-sm p-2 text-xs text-white">
                        {s}
                      </div>
                    );
                  })}
                </div>
                <div className="font-code text-foreground-secondary dark:text-foreground-secondary border-foreground-secondary border-l-2 pl-3 text-xs">
                  design tools
                </div>
                <div className="gap-sm flex flex-wrap">
                  {design.map((s, index) => {
                    return (
                      <div key={index} className="bg-foreground rounded-sm p-2 text-xs text-white">
                        {s}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          </div>
        </div>
      </Border>
    </section>
  );
}
