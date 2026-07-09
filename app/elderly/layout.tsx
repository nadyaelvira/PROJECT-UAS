"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import ElderlySidebar from "@/components/ElderlySidebar";
import ElderlyNavbar from "@/components/ElderlyNavbar";
import { TextSizeProvider } from "@/context/TextSizeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { useSharedStore } from "@/components/shared/sharedStore";
import { useGpsSimulation } from "@/hooks/useGpsSimulation";

type AlarmType = "alarm1" | "alarm2" | "alarm3";

function playTone(ctx: AudioContext, freq: number, duration: number, type: OscillatorType = "sine", startTime: number = 0, volume: number = 0.5) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

function playAlarmSound(ctx: AudioContext, alarm: AlarmType, volume: number) {
  const v = volume / 100;
  if (alarm === "alarm1") {
    [523, 659, 784, 1047].forEach((freq, i) => playTone(ctx, freq, 0.4, "sine", i * 0.3, v * 0.4));
    [523, 659, 784, 1047].forEach((freq, i) => playTone(ctx, freq, 0.4, "sine", 1.2 + i * 0.3, v * 0.4));
  }
  if (alarm === "alarm2") {
    for (let i = 0; i < 4; i++) {
      playTone(ctx, 880, 0.15, "square", i * 0.2, v * 0.3);
      playTone(ctx, 1100, 0.15, "square", i * 0.2 + 0.1, v * 0.2);
    }
    for (let i = 0; i < 4; i++) {
      playTone(ctx, 880, 0.15, "square", 0.9 + i * 0.2, v * 0.3);
      playTone(ctx, 1100, 0.15, "square", 0.9 + i * 0.2 + 0.1, v * 0.2);
    }
  }
  if (alarm === "alarm3") {
    const melody = [{ f: 523, d: 0.25 }, { f: 587, d: 0.25 }, { f: 659, d: 0.25 }, { f: 523, d: 0.25 }, { f: 659, d: 0.25 }, { f: 587, d: 0.25 }, { f: 784, d: 0.5 }];
    let t = 0;
    melody.forEach(({ f, d }) => { playTone(ctx, f, d + 0.05, "sine", t, v * 0.4); t += d; });
  }
}

function EmergencyGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { emergencyMode, alarmEnabled, alarmSound, alarmVolume } = useSharedStore();
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAlarm = useCallback(() => {
    if (ctxRef.current && ctxRef.current.state !== "closed") {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Navigate to emergency page when emergency mode activates
  useEffect(() => {
    if (emergencyMode && pathname !== "/elderly/emergency") {
      router.push("/elderly/emergency");
    }
  }, [emergencyMode, pathname, router]);

  // Play alarm when emergency mode activates
  useEffect(() => {
    if (emergencyMode && alarmEnabled) {
      stopAlarm();
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      playAlarmSound(ctx, alarmSound, alarmVolume);
      // Loop alarm every 3 seconds
      timerRef.current = setInterval(() => {
        if (ctxRef.current && ctxRef.current.state !== "closed") {
          ctxRef.current.close();
        }
        const newCtx = new AudioContext();
        ctxRef.current = newCtx;
        playAlarmSound(newCtx, alarmSound, alarmVolume);
      }, 3000);
    } else {
      stopAlarm();
    }

    return () => stopAlarm();
  }, [emergencyMode, alarmEnabled, alarmSound, alarmVolume, stopAlarm]);

  return <>{children}</>;
}

function GpsProvider({ children }: { children: React.ReactNode }) {
  useGpsSimulation();
  return <>{children}</>;
}

export default function ElderlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <TextSizeProvider>
        <EmergencyGuard>
          <GpsProvider>
            <div className="flex h-screen bg-gray-50">
              <ElderlySidebar />
              <div className="flex flex-col flex-1 min-w-0 w-full overflow-hidden">
                <ElderlyNavbar />
                <main className="flex-1 overflow-y-auto p-6 min-h-0 w-full">
                  {children}
                </main>
              </div>
            </div>
          </GpsProvider>
        </EmergencyGuard>
      </TextSizeProvider>
    </LanguageProvider>
  );
}
