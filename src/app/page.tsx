import AudioPlayer from "@/components/AudioPlayer";
import TextSwitcher, { ContactLink } from "@/components/TextSwitcher";
import { tracks } from "@/config";

export default function Home() {
  return (
    <div className="p-4">
      <div>
        <TextSwitcher />
      </div>
      <ContactLink />
      <div className="my-4">
        <AudioPlayer tracks={tracks} autoPlay={false} />
      </div>
    </div>
  );
}
