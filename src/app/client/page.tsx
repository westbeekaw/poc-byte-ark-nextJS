"use client";
import { ByteArkPlayerContainer } from "byteark-player-react";
import type { ByteArkPlayerContainerProps } from "byteark-player-react";
import { useEffect, useState } from "react";

const VIDEO_SOURCE_URL =
  "https://tcctechuprwieg.stream-playlist.byteark.com/streams/UPvCYWWDPd93/playlist.m3u8";

export default function VideoTestPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: "any",
    muted: true,
    aspectRatio: "16:9",
    // hide picture in picture button
    disablePictureInPicture: true,
    // workaround for play VR/360° video on Safari macOS/iOS
    // set crossorigin for Safari macOS/iOS
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    crossorigin: "anonymous",
    controlBar: {
      pictureInPictureToggle: false,
    },
    plugins: {
      vr: {
        projection: "360",
        motionControls: true,
        sphereDetail: 128,
        debug: true,
      },
      bytearkLighthouse: {
        projectId: "tcctech-1h9rax6noal",
      },
    },
    onReady(player) {
      // workaround for play VR/360° video on Safari macOS/iOS
      // set source after player create
      player.src({
        src: VIDEO_SOURCE_URL,
        type: "application/x-mpegURL",
      });
    },
  };

  if (!isClient) {
    return null; // or a loading indicator
  }

  return <ByteArkPlayerContainer {...options} />;
}
