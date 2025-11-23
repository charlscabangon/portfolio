import Border from '@/components/ui/Border';
import Label from '@/components/ui/Label';
import { PrimaryBtn, SecondaryBtn } from '@/components/ui/Buttons';

export default function Hero() {
  return (
    <section className="mx-sm space-y-xl h-auto">
      <div className="space-y-sm">
        <div>
          <Label>maybe a friendly greeting here?</Label>
          <Border className="flex-col">
            <h1 className="display-text block">hello!</h1>
            <h1 className="display-text block">i am Charls</h1>
          </Border>
        </div>

        <div>
          <Label>frontend is awesome</Label>
          <Border>
            <h4>
              <span className="md:relative md:top-2">Frontend Developer </span>& Graphic Designer
            </h4>
          </Border>
        </div>
      </div>

      <div className="space-y-2 md:hidden">
        <Border className="flex-col">
          <PrimaryBtn>connect with me</PrimaryBtn>
        </Border>
        <Border className="flex-col">
          <SecondaryBtn>see my works</SecondaryBtn>
        </Border>
      </div>

      <Border className="hidden space-x-3 md:flex">
        <PrimaryBtn>connect with me</PrimaryBtn>
        <SecondaryBtn>see my works</SecondaryBtn>
      </Border>

      <div className="">
        <Border position="right">
          <p>i love making the web look pretty and feel easy</p>
        </Border>
      </div>
    </section>
  );
}
