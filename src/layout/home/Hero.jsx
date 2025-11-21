import Border from '@/components/ui/Border';
import Label from '@/components/ui/Label';
import Heading from '@/components/Heading';
import { PrimaryBtn, SecondaryBtn } from '@/components/ui/Buttons';

// todo: refine actions in mobile
export default function Hero() {
  return (
    <section className="mx-sm space-y-sm h-screen">
      <Heading label="maybe a friendly greeting here?">hello,</Heading>
      <Heading>i am Charls!</Heading>
      <div className="space-y-1 md:hidden">
        <Border className="">
          <PrimaryBtn>connect with me</PrimaryBtn>
        </Border>
        <Border>
          <SecondaryBtn>see my works</SecondaryBtn>
        </Border>
      </div>
      <Border className="hidden space-x-3 md:flex">
        <PrimaryBtn>connect with me</PrimaryBtn>
        <SecondaryBtn>see my works</SecondaryBtn>
      </Border>
      <div className="mt-3xl">
        <Border position="right">
          <p>i love making the web look pretty and feel easy</p>
        </Border>
      </div>
    </section>
  );
}
