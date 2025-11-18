import Border from '@/components/Border';
import Label from '@/components/Label';
import Heading from '@/components/Heading';
import { PrimaryBtn, SecondaryBtn } from '@/components/ui/Buttons';

export default function Hero() {
  return (
    <section className="mx-sm space-y-sm h-screen">
      <Heading label="maybe a friendly greeting here?">hello,</Heading>
      <Heading>i am Charls!</Heading>
      <Border>
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
