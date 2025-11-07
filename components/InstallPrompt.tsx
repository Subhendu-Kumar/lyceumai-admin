"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  platforms?: string[];
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
  prompt: () => Promise<void>;
};

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    type NavigatorWithStandalone = Navigator & { standalone?: boolean };
    const iosStandalone =
      (window.navigator as NavigatorWithStandalone).standalone === true;
    setIsStandalone(standalone || iosStandalone);

    if (standalone || iosStandalone) {
      return;
    }

    // Check if user previously dismissed
    const dismissedTime = localStorage.getItem("pwa-install-dismissed");
    if (dismissedTime) {
      const daysSinceDismissed =
        (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      } else {
        localStorage.removeItem("pwa-install-dismissed");
      }
    }

    if (ios) {
      // Show iOS prompt immediately
      setShowInstallPrompt(true);
    } else {
      // Listen for the beforeinstallprompt event (Android/Chrome)
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallPrompt(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  if (!showInstallPrompt || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-2xl z-[9999] animate-slide-up">
      <div className="max-w-md mx-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">
                📱
              </div>
              <div>
                <h3 className="font-bold text-lg">Install App</h3>
              </div>
            </div>

            {isIOS ? (
              <div className="text-sm space-y-2">
                <p className="opacity-90">Install this app on your iPhone:</p>
                <ol className="space-y-1 text-xs opacity-90">
                  <li className="flex items-center gap-2">
                    <span className="text-xl">1.</span>
                    <span>
                      Tap the Share button
                      <svg
                        className="inline w-4 h-4 mx-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                      </svg>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-xl">2.</span>
                    <span>Select &apos;Add to Home Screen&apos;</span>
                  </li>
                </ol>
              </div>
            ) : (
              <p className="text-sm opacity-90">
                Get quick access and a better experience by installing our app
              </p>
            )}
          </div>

          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white text-2xl leading-none p-1 -mt-1"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {!isIOS && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-sm transition-colors"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors"
            >
              Install
            </button>
          </div>
        )}

        {isIOS && (
          <button
            onClick={handleDismiss}
            className="w-full mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-sm transition-colors"
          >
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
