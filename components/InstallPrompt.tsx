"use client";

import { useEffect, useState } from "react";
import { Share, Smartphone, X } from "lucide-react";
import { BeforeInstallPromptEvent } from "@/types/miscellaneous";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    type NavigatorWithStandalone = Navigator & { standalone?: boolean };
    const iosStandalone =
      (window.navigator as NavigatorWithStandalone).standalone === true;
    setIsStandalone(standalone || iosStandalone);
    if (standalone || iosStandalone) {
      return;
    }
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
      setShowInstallPrompt(true);
    } else {
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
    <div className="fixed bottom-4 left-4 right-4 bg-white border rounded-2xl p-4 shadow-lg z-[9999] animate-slide-up">
      <div className="max-w-md mx-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Install App</h3>
            </div>
            {isIOS ? (
              <div className="text-sm space-y-2 text-gray-700">
                <p>Install this app on your iPhone:</p>
                <ol className="space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="text-lg font-medium">1.</span>
                    <span className="flex items-center gap-1">
                      Tap the Share button <Share className="h-4 w-4" />
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg font-medium">2.</span>
                    <span>Select ‘Add to Home Screen’</span>
                  </li>
                </ol>
              </div>
            ) : (
              <p className="text-sm text-gray-700">
                Get faster access and a smoother experience by installing our
                app.
              </p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none p-1 -mt-1"
            aria-label="Close"
          >
            <X />
          </button>
        </div>
        {!isIOS && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm text-gray-800 transition"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Install
            </button>
          </div>
        )}
        {isIOS && (
          <button
            onClick={handleDismiss}
            className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm text-gray-800 transition"
          >
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
