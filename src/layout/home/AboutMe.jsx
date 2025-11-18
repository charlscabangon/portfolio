import Border from '@/components/Border';

import image from '@/assets/images/portfolio-pic.avif';

export default function AboutMe() {
  //todo: not hard code the infos, ui refinement
  return (
    <Border>
      <section className="flex w-full flex-col md:flex-row md:justify-between">
        <div className="pattern-stripes flex w-full items-center justify-center md:w-[30%]">
          <div className="border-background-secondary/80 ring-border dark:ring-border h-[95%] w-[80%] overflow-hidden rounded-md border-10 shadow-md ring">
            <img src={image} alt="" className="h-auto w-full object-cover" />
          </div>
        </div>

        <div className="bg-background-secondary dark:bg-background-secondary border-border dark:border-border flex items-center justify-center border md:order-first md:w-[70%]">
          <article className="border-border bg-background dark:bg-background container h-[96%] w-[97%] rounded-md border shadow-md">
            <h5>what i do</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic qui aliquam cum
              repellendus dolorem quam impedit neque, veniam, aperiam laudantium minus aut, ipsa
              quod voluptatum. Velit repellat perspiciatis quasi sit!
            </p>
            <div className="border-border pattern-dots-dense container h-[40%] w-[80%] rounded-sm border shadow-sm">
              <div className="font-code text-foreground-tertiary dark:text-foreground-tertiary border-foreground-tertiary border-l-2 pl-3 text-xs md:text-sm">
                tech stack
              </div>
            </div>
          </article>
        </div>
      </section>
    </Border>
  );
}
