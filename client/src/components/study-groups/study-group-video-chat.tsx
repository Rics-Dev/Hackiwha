import React, { useState, useEffect, useRef } from "react";
import Peer, { DataConnection, MediaConnection } from "peerjs";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Video,
  MessageSquare,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Send,
} from "lucide-react";

interface StudyGroupVideoChatProps {
  groupId: string;
  groupName: string;
}

const StudyGroupVideoChat: React.FC<StudyGroupVideoChatProps> = ({
  groupId,
  groupName,
}) => {
  const { user } = useAuth();
  const [peerId, setPeerId] = useState<string>("");
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; sender: string; isMine: boolean }[]
  >([]);
  const [isMeetingActive, setIsMeetingActive] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);

  const peerInstance = useRef<Peer | null>(null);
  const connections = useRef<{ [key: string]: DataConnection }>({});
  const calls = useRef<{ [key: string]: MediaConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideosRef = useRef<{ [key: string]: HTMLVideoElement | null }>(
    {}
  );
  const localStreamRef = useRef<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize PeerJS when the component mounts
  useEffect(() => {
    if (isMeetingActive && !peerInstance.current) {
      // Create a unique ID based on user ID and group ID
      const uniqueId = `${user?.id}-${groupId}`;

      // Create a new Peer instance
      const peer = new Peer(uniqueId);

      // When the peer connection is open, get the assigned ID
      peer.on("open", (id: string) => {
        setPeerId(id);
        console.log("My peer ID is: " + id);
        // Add a system message
        setMessages((prev) => [
          ...prev,
          {
            text: `You joined the meeting`,
            sender: "System",
            isMine: false,
          },
        ]);
      });

      // Handle incoming data connections (for messaging)
      peer.on("connection", (conn: DataConnection) => {
        const remotePeer = conn.peer;
        connections.current[remotePeer] = conn;

        conn.on("data", (data: any) => {
          if (typeof data === "object" && data.type === "message") {
            setMessages((prev) => [
              ...prev,
              {
                text: data.message,
                sender: data.sender,
                isMine: false,
              },
            ]);
          }
        });

        conn.on("open", () => {
          setConnectedPeers((prev) => [...prev, remotePeer]);
          setMessages((prev) => [
            ...prev,
            {
              text: `${remotePeer.split("-")[0]} joined the meeting`,
              sender: "System",
              isMine: false,
            },
          ]);
        });

        conn.on("close", () => {
          setConnectedPeers((prev) => prev.filter((id) => id !== remotePeer));
          setMessages((prev) => [
            ...prev,
            {
              text: `${remotePeer.split("-")[0]} left the meeting`,
              sender: "System",
              isMine: false,
            },
          ]);
          delete connections.current[remotePeer];
        });
      });

      // Handle incoming media calls (audio/video)
      peer.on("call", (call: MediaConnection) => {
        const remotePeer = call.peer;
        calls.current[remotePeer] = call;

        // Request access to camera and microphone if not already done
        if (!localStreamRef.current) {
          navigator.mediaDevices
            .getUserMedia({ video: isVideoEnabled, audio: isAudioEnabled })
            .then((stream) => {
              localStreamRef.current = stream;
              if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
              }

              // Answer the call with local stream
              call.answer(stream);

              // Handle the remote stream
              call.on("stream", (remoteStream: MediaStream) => {
                // Create or get the video element for this peer
                if (!remoteVideosRef.current[remotePeer]) {
                  const videoElement = document.createElement("video");
                  videoElement.autoplay = true;
                  videoElement.playsInline = true;
                  const remoteVideosContainer =
                    document.getElementById("remote-videos");
                  if (remoteVideosContainer) {
                    const videoContainer = document.createElement("div");
                    videoContainer.id = `video-container-${remotePeer}`;
                    videoContainer.className = "relative";

                    const nameLabel = document.createElement("div");
                    nameLabel.className =
                      "absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded";
                    nameLabel.textContent = remotePeer.split("-")[0];

                    videoContainer.appendChild(videoElement);
                    videoContainer.appendChild(nameLabel);
                    remoteVideosContainer.appendChild(videoContainer);
                  }
                  remoteVideosRef.current[remotePeer] = videoElement;
                }

                if (remoteVideosRef.current[remotePeer]) {
                  remoteVideosRef.current[remotePeer]!.srcObject = remoteStream;
                }
              });

              call.on("close", () => {
                // Remove the video element when call ends
                const videoContainer = document.getElementById(
                  `video-container-${remotePeer}`
                );
                if (videoContainer) {
                  videoContainer.remove();
                }
                delete remoteVideosRef.current[remotePeer];
                delete calls.current[remotePeer];
              });
            })
            .catch((err) => {
              console.error("Failed to get local stream:", err);
              setMessages((prev) => [
                ...prev,
                {
                  text: `Error: Failed to access media`,
                  sender: "System",
                  isMine: false,
                },
              ]);
            });
        } else {
          // If we already have a local stream, use it to answer the call
          call.answer(localStreamRef.current);

          // Handle the remote stream
          call.on("stream", (remoteStream: MediaStream) => {
            // Create or get the video element for this peer
            if (!remoteVideosRef.current[remotePeer]) {
              const videoElement = document.createElement("video");
              videoElement.autoplay = true;
              videoElement.playsInline = true;
              const remoteVideosContainer =
                document.getElementById("remote-videos");
              if (remoteVideosContainer) {
                const videoContainer = document.createElement("div");
                videoContainer.id = `video-container-${remotePeer}`;
                videoContainer.className = "relative";

                const nameLabel = document.createElement("div");
                nameLabel.className =
                  "absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded";
                nameLabel.textContent = remotePeer.split("-")[0];

                videoContainer.appendChild(videoElement);
                videoContainer.appendChild(nameLabel);
                remoteVideosContainer.appendChild(videoContainer);
              }
              remoteVideosRef.current[remotePeer] = videoElement;
            }

            if (remoteVideosRef.current[remotePeer]) {
              remoteVideosRef.current[remotePeer]!.srcObject = remoteStream;
            }
          });
        }
      });

      // Handle errors
      peer.on("error", (err: Error) => {
        console.error("PeerJS error:", err);
        setMessages((prev) => [
          ...prev,
          {
            text: `Error: ${err.message}`,
            sender: "System",
            isMine: false,
          },
        ]);
      });

      peerInstance.current = peer;
    }

    // Cleanup on component unmount or when meeting ends
    return () => {
      if (!isMeetingActive && peerInstance.current) {
        // Stop all media tracks
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => track.stop());
          localStreamRef.current = null;
        }

        // Close all connections
        Object.values(connections.current).forEach((conn) => conn.close());
        connections.current = {};

        // Close all calls
        Object.values(calls.current).forEach((call) => call.close());
        calls.current = {};

        // Destroy the peer instance
        peerInstance.current.destroy();
        peerInstance.current = null;

        // Reset state
        setPeerId("");
        setRemotePeerId("");
        setConnectedPeers([]);
        setMessages([]);
      }
    };
  }, [isMeetingActive, groupId, user, isAudioEnabled, isVideoEnabled]);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start the meeting
  const startMeeting = () => {
    setIsMeetingActive(true);
  };

  // End the meeting
  const endMeeting = () => {
    setIsMeetingActive(false);
  };

  // Connect to another peer for messaging and video
  const connectToPeer = () => {
    if (!remotePeerId || !peerInstance.current) {
      return;
    }

    // Check if already connected
    if (connections.current[remotePeerId]) {
      return;
    }

    // Create data connection for messaging
    const conn = peerInstance.current.connect(remotePeerId);
    if (conn) {
      connections.current[remotePeerId] = conn;

      conn.on("open", () => {
        setConnectedPeers((prev) => [...prev, remotePeerId]);
        setMessages((prev) => [
          ...prev,
          {
            text: `Connected to ${remotePeerId.split("-")[0]}`,
            sender: "System",
            isMine: false,
          },
        ]);

        // After connection is established, initiate video call
        startCallWithPeer(remotePeerId);
      });

      conn.on("data", (data: any) => {
        if (typeof data === "object" && data.type === "message") {
          setMessages((prev) => [
            ...prev,
            {
              text: data.message,
              sender: data.sender,
              isMine: false,
            },
          ]);
        }
      });

      conn.on("close", () => {
        setConnectedPeers((prev) => prev.filter((id) => id !== remotePeerId));
        setMessages((prev) => [
          ...prev,
          {
            text: `Disconnected from ${remotePeerId.split("-")[0]}`,
            sender: "System",
            isMine: false,
          },
        ]);
        delete connections.current[remotePeerId];
      });
    }
  };

  // Start a video call with a specific peer
  const startCallWithPeer = (targetPeerId: string) => {
    if (!peerInstance.current) return;

    // Request access to camera and microphone if not already done
    if (!localStreamRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: isVideoEnabled, audio: isAudioEnabled })
        .then((stream) => {
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }

          // Initiate the call
          const call = peerInstance.current?.call(targetPeerId, stream);
          if (call) {
            calls.current[targetPeerId] = call;

            call.on("stream", (remoteStream: MediaStream) => {
              // Create or get the video element for this peer
              if (!remoteVideosRef.current[targetPeerId]) {
                const videoElement = document.createElement("video");
                videoElement.autoplay = true;
                videoElement.playsInline = true;
                const remoteVideosContainer =
                  document.getElementById("remote-videos");
                if (remoteVideosContainer) {
                  const videoContainer = document.createElement("div");
                  videoContainer.id = `video-container-${targetPeerId}`;
                  videoContainer.className = "relative";

                  const nameLabel = document.createElement("div");
                  nameLabel.className =
                    "absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded";
                  nameLabel.textContent = targetPeerId.split("-")[0];

                  videoContainer.appendChild(videoElement);
                  videoContainer.appendChild(nameLabel);
                  remoteVideosContainer.appendChild(videoContainer);
                }
                remoteVideosRef.current[targetPeerId] = videoElement;
              }

              if (remoteVideosRef.current[targetPeerId]) {
                remoteVideosRef.current[targetPeerId]!.srcObject = remoteStream;
              }
            });

            call.on("close", () => {
              // Remove the video element when call ends
              const videoContainer = document.getElementById(
                `video-container-${targetPeerId}`
              );
              if (videoContainer) {
                videoContainer.remove();
              }
              delete remoteVideosRef.current[targetPeerId];
              delete calls.current[targetPeerId];
            });
          }
        })
        .catch((err) => {
          console.error("Failed to get local stream:", err);
          setMessages((prev) => [
            ...prev,
            {
              text: `Error: Failed to access media`,
              sender: "System",
              isMine: false,
            },
          ]);
        });
    } else {
      // If we already have a local stream, use it to initiate the call
      const call = peerInstance.current?.call(
        targetPeerId,
        localStreamRef.current
      );
      if (call) {
        calls.current[targetPeerId] = call;

        call.on("stream", (remoteStream: MediaStream) => {
          // Create or get the video element for this peer
          if (!remoteVideosRef.current[targetPeerId]) {
            const videoElement = document.createElement("video");
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            const remoteVideosContainer =
              document.getElementById("remote-videos");
            if (remoteVideosContainer) {
              const videoContainer = document.createElement("div");
              videoContainer.id = `video-container-${targetPeerId}`;
              videoContainer.className = "relative";

              const nameLabel = document.createElement("div");
              nameLabel.className =
                "absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded";
              nameLabel.textContent = targetPeerId.split("-")[0];

              videoContainer.appendChild(videoElement);
              videoContainer.appendChild(nameLabel);
              remoteVideosContainer.appendChild(videoContainer);
            }
            remoteVideosRef.current[targetPeerId] = videoElement;
          }

          if (remoteVideosRef.current[targetPeerId]) {
            remoteVideosRef.current[targetPeerId]!.srcObject = remoteStream;
          }
        });
      }
    }
  };

  // Send a message to all connected peers
  const sendMessage = () => {
    if (!message.trim()) return;

    // Add message to local state
    const newMessage = {
      text: message,
      sender: user?.name || "You",
      isMine: true,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Send message to all connected peers
    Object.values(connections.current).forEach((conn) => {
      if (conn.open) {
        conn.send({
          type: "message",
          message: message,
          sender: user?.name || "Anonymous",
        });
      }
    });

    // Clear input
    setMessage("");
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {!isMeetingActive ? (
        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-xl font-semibold">Start a Video Meeting</h2>
          <p className="text-muted-foreground text-center">
            Connect with your study group members via video and chat
          </p>
          <Button onClick={startMeeting} className="mt-4">
            <Video className="mr-2 h-4 w-4" />
            Start Meeting
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-[600px]">
          <div className="bg-muted p-3 flex items-center justify-between">
            <h3 className="font-medium">{groupName} - Video Meeting</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAudio}
                className={!isAudioEnabled ? "bg-red-100 text-red-600" : ""}
              >
                {isAudioEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleVideo}
                className={!isVideoEnabled ? "bg-red-100 text-red-600" : ""}
              >
                {isVideoEnabled ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4" />
                )}
              </Button>
              <Button variant="destructive" size="sm" onClick={endMeeting}>
                <PhoneOff className="h-4 w-4 mr-2" />
                End
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] flex-1 overflow-hidden">
            {/* Video area */}
            <div className="bg-black p-4 relative overflow-auto">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                id="remote-videos"
              >
                {/* Remote videos will be added here dynamically */}
              </div>

              {/* Local video */}
              <div className="absolute bottom-4 right-4 w-1/4 max-w-[200px] border-2 border-white rounded overflow-hidden">
                <video
                  ref={localVideoRef}
                  muted
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  You
                </div>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex flex-col border-l">
              <div className="p-3 border-b">
                <h3 className="font-medium">Group Chat</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.isMine ? "items-end" : "items-start"
                    }`}
                  >
                    {msg.sender !== "System" && (
                      <span className="text-xs text-muted-foreground">
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className={`px-3 py-2 rounded-lg max-w-[85%] ${
                        msg.sender === "System"
                          ? "bg-muted text-muted-foreground text-xs italic text-center w-full"
                          : msg.isMine
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Peer connection input (for testing) */}
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    value={remotePeerId}
                    onChange={(e) => setRemotePeerId(e.target.value)}
                    placeholder="Enter peer ID to connect"
                    className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                  />
                  <Button size="sm" variant="outline" onClick={connectToPeer}>
                    Connect
                  </Button>
                </div>

                {peerId && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Your ID: {peerId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroupVideoChat;
