"use client";

import { Loader } from "lucide-react";
import { useAuth } from "@/context/auth/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (loading || !user) {
      return;
    }
    if (!apiKey) {
      throw new Error("Missing stream api key");
    }
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.name || user?.id,
      },
      tokenProvider: () => tokenProvider(user?.id),
    });

    setVideoClient(client);
  }, [user, loading]);

  if (!videoClient) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
