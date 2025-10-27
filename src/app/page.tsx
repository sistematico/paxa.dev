import AudioPlayer from "@/components/AudioPlayer";
import TextSwitcher, {ContactLink} from "@/components/TextSwitcher";
import {tracks} from "@/config";

export default function Home() {
  return (
    <>
      <div className="prose-neutral dark:prose-invert">
        <TextSwitcher/>
      </div>
      <ContactLink/>
      <div className="mt-4">
        <AudioPlayer tracks={tracks} autoPlay={false}/>
      </div>
    </>
  );
}
