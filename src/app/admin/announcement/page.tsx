"use client";

import { useState, useEffect } from "react";
import { useAdminContext } from "../context";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Loader2,
  Sparkles,
  Eye,
  Megaphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementSettings {
  isActive: boolean;
  backgroundColor: string;
  textColor: string;
  interval: number;
  announcements: string[];
}

const DEFAULT_SETTINGS: AnnouncementSettings = {
  isActive: true,
  backgroundColor: "#2d1c14",
  textColor: "#F6F4EE",
  interval: 4500,
  announcements: [
    "FREE SHIPPING ON ALL ORDERS ACROSS INDIA — RESTORING RESILIENCE",
    "NEW CLIENT EXCLUSIVE: USE CODE 'RECOVER10' FOR 10% OFF YOUR BAG",
    "CELLULAR BODYCARE SCIENCE — 100% BIODEGRADABLE SURFACTANTS",
  ],
};

export default function AdminAnnouncementPage() {
  const { showToast } = useAdminContext();
  
  const [initialSettings, setInitialSettings] = useState<AnnouncementSettings | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#2d1c14");
  const [textColor, setTextColor] = useState("#F6F4EE");
  const [interval, setIntervalVal] = useState(4500);
  const [announcementsList, setAnnouncementsList] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Load settings
  useEffect(() => {
    fetch("/api/announcement-bar")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((resJson) => {
        if (resJson && resJson.success && resJson.data) {
          const apiData = resJson.data;
          try {
            const list = JSON.parse(apiData.announcements);
            const loaded = {
              isActive: apiData.isActive,
              backgroundColor: apiData.backgroundColor,
              textColor: apiData.textColor,
              interval: apiData.interval,
              announcements: list,
            };
            setInitialSettings(loaded);
            setIsActive(loaded.isActive);
            setBackgroundColor(loaded.backgroundColor);
            setTextColor(loaded.textColor);
            setIntervalVal(loaded.interval);
            setAnnouncementsList(list);
          } catch (e) {
            console.error("Failed to parse announcement list:", e);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch settings, fallback to default:", err);
        setInitialSettings(DEFAULT_SETTINGS);
        setIsActive(DEFAULT_SETTINGS.isActive);
        setBackgroundColor(DEFAULT_SETTINGS.backgroundColor);
        setTextColor(DEFAULT_SETTINGS.textColor);
        setIntervalVal(DEFAULT_SETTINGS.interval);
        setAnnouncementsList(DEFAULT_SETTINGS.announcements);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Live preview interval animation
  useEffect(() => {
    if (announcementsList.length <= 1 || !isActive) return;
    const timer = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % announcementsList.length);
    }, interval);
    return () => clearInterval(timer);
  }, [announcementsList.length, interval, isActive]);

  // Adjust preview index if size decreases
  useEffect(() => {
    if (previewIndex >= announcementsList.length) {
      setPreviewIndex(0);
    }
  }, [announcementsList.length, previewIndex]);

  const handleAddAnnouncement = () => {
    setAnnouncementsList([...announcementsList, "NEW ANNOUNCEMENT CAMPAIGN — EDIT TEXT HERE"]);
  };

  const handleRemoveAnnouncement = (index: number) => {
    if (announcementsList.length <= 1) {
      showToast("At least one announcement is required.");
      return;
    }
    const updated = announcementsList.filter((_, i) => i !== index);
    setAnnouncementsList(updated);
  };

  const handleTextChange = (index: number, val: string) => {
    const updated = [...announcementsList];
    updated[index] = val;
    setAnnouncementsList(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...announcementsList];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setAnnouncementsList(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === announcementsList.length - 1) return;
    const updated = [...announcementsList];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setAnnouncementsList(updated);
  };

  const handleSaveChanges = async () => {
    const cleanList = announcementsList.map(a => a.trim()).filter(Boolean);
    if (cleanList.length === 0) {
      showToast("Cannot save empty announcements list.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/announcement-bar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive,
          backgroundColor,
          textColor,
          interval,
          announcements: cleanList,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(resJson.error?.message || "Failed to update configuration.");

      showToast("Announcement settings saved successfully.");
      setInitialSettings({
        isActive,
        backgroundColor,
        textColor,
        interval,
        announcements: cleanList,
      });
      setAnnouncementsList(cleanList);
    } catch (e: any) {
      showToast(e.message || "Failed to save configurations.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToLoaded = () => {
    if (!initialSettings) return;
    setIsActive(initialSettings.isActive);
    setBackgroundColor(initialSettings.backgroundColor);
    setTextColor(initialSettings.textColor);
    setIntervalVal(initialSettings.interval);
    setAnnouncementsList(initialSettings.announcements);
    showToast("Reset to loaded values.");
  };

  const handleResetToDefaults = () => {
    setIsActive(DEFAULT_SETTINGS.isActive);
    setBackgroundColor(DEFAULT_SETTINGS.backgroundColor);
    setTextColor(DEFAULT_SETTINGS.textColor);
    setIntervalVal(DEFAULT_SETTINGS.interval);
    setAnnouncementsList(DEFAULT_SETTINGS.announcements);
    showToast("Reset to factory defaults. Remember to click Save.");
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-muted">Retrieving Announcement Panel Settings...</p>
        </div>
      </div>
    );
  }

  const isChanged =
    !initialSettings ||
    isActive !== initialSettings.isActive ||
    backgroundColor !== initialSettings.backgroundColor ||
    textColor !== initialSettings.textColor ||
    interval !== initialSettings.interval ||
    JSON.stringify(announcementsList) !== JSON.stringify(initialSettings.announcements);

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header Banner */}
      <div className="bg-[#2D2622] text-[#F6F4EE] rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center border border-accent/20 shadow-md">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 max-w-lg text-left z-10">
          <span className="text-[9px] tracking-[0.25em] font-semibold text-accent uppercase block">Marketing Suite</span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl uppercase tracking-tight text-white">
            Announcement Bar Editor
          </h2>
          <p className="text-xs text-muted/90 max-w-md leading-relaxed">
            Configure, reorder, or completely style your store-wide promo bar carousel. Updates immediately across all shopfront surfaces upon saving.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-6 md:mt-0 z-10 shrink-0">
          <Button variant="outline" size="sm" onClick={handleResetToLoaded} disabled={!isChanged || isSaving}>
            Reset
          </Button>
          <Button variant="default" size="sm" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Settings Panel (Left Column) */}
        <div className="lg:col-span-7 bg-card-bg/40 backdrop-blur-md border border-line rounded-3xl p-6 space-y-8">
          <div className="border-b border-line pb-4 flex justify-between items-center">
            <h3 className="font-display font-semibold text-sm uppercase text-ink tracking-wider">
              Bar Settings
            </h3>
            {isChanged && (
              <span className="text-[9px] font-bold text-accent uppercase bg-accent/10 px-2 py-0.5 rounded-full animate-pulse">
                Unsaved Changes
              </span>
            )}
          </div>

          <div className="space-y-6">
            {/* Toggle Status */}
            <div className="flex items-center justify-between p-4 bg-bg/50 border border-line/60 rounded-2xl">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-0.5">
                  Announcement Status
                </label>
                <span className="text-[10px] text-muted block">
                  Show or hide the announcement bar across all client pages
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden ${
                  isActive ? "bg-accent" : "bg-[#2d1c14]/20"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-250 ease-in-out ${
                    isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Colors Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Background Color */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                  Background Color
                </label>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-10 h-10 rounded-xl border border-line flex items-center justify-center overflow-hidden shrink-0 relative cursor-pointer"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                  <input
                    type="text"
                    value={backgroundColor.toUpperCase()}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="#2D1C14"
                    maxLength={7}
                    className="flex-1 min-w-0 bg-bg/60 border border-line rounded-xl px-3 py-2 text-xs uppercase tracking-wider text-ink font-mono focus:border-accent focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                  Text/Label Color
                </label>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-10 h-10 rounded-xl border border-line flex items-center justify-center overflow-hidden shrink-0 relative cursor-pointer"
                    style={{ backgroundColor: textColor }}
                  >
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                  <input
                    type="text"
                    value={textColor.toUpperCase()}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#F6F4EE"
                    maxLength={7}
                    className="flex-1 min-w-0 bg-bg/60 border border-line rounded-xl px-3 py-2 text-xs uppercase tracking-wider text-ink font-mono focus:border-accent focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Slide speed slider */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                  Slide Rotation Interval
                </label>
                <span className="text-[11px] font-mono font-bold text-ink">
                  {(interval / 1000).toFixed(1)}s
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min={1000}
                  max={15000}
                  step={500}
                  value={interval}
                  onChange={(e) => setIntervalVal(Number(e.target.value))}
                  className="flex-1 accent-accent h-1.5 bg-line/60 rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  min={1000}
                  max={30000}
                  step={500}
                  value={interval}
                  onChange={(e) => setIntervalVal(Number(e.target.value))}
                  className="w-20 bg-bg/60 border border-line rounded-xl px-2 py-1.5 text-xs text-center text-ink font-mono focus:border-accent focus:outline-hidden"
                />
              </div>
            </div>

            {/* List of announcements */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-t border-line/60 pt-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-0.5">
                    Announcements Carousel ({announcementsList.length})
                  </label>
                  <span className="text-[9px] text-muted block">
                    Double-click or type to edit the text of each sliding banner.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddAnnouncement}
                  className="flex items-center gap-1.5 py-1 px-3 bg-ink text-bg text-[9px] font-bold uppercase tracking-widest hover:bg-accent hover:text-bg rounded-lg border-none cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {announcementsList.map((ann, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 items-center bg-bg/40 border border-line rounded-2xl p-3 hover:border-line/90 transition-all duration-200"
                  >
                    <span className="text-[10px] font-mono text-muted/80 font-bold w-6 text-center">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={ann}
                      onChange={(e) => handleTextChange(idx, e.target.value)}
                      placeholder="Write your promo text here..."
                      className="flex-1 min-w-0 bg-transparent border-none text-xs text-ink placeholder-muted/50 focus:outline-hidden"
                    />
                    <div className="flex gap-1 items-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 hover:bg-bg/80 text-muted hover:text-ink disabled:opacity-30 rounded-lg cursor-pointer border-none bg-transparent"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === announcementsList.length - 1}
                        className="p-1 hover:bg-bg/80 text-muted hover:text-ink disabled:opacity-30 rounded-lg cursor-pointer border-none bg-transparent"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveAnnouncement(idx)}
                        className="p-1 hover:bg-red-50 text-muted hover:text-red-600 rounded-lg cursor-pointer border-none bg-transparent"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-line/60 pt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="text-[9px] uppercase tracking-widest text-muted hover:text-ink font-semibold flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
            >
              <RefreshCw className="w-3 h-3" />
              Reset factory settings
            </button>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleResetToLoaded} disabled={!isChanged || isSaving}>
                Reset
              </Button>
              <Button variant="default" size="sm" onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Live Preview Screen (Right Column) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
          <div className="bg-card-bg/40 backdrop-blur-md border border-line rounded-3xl p-6">
            <div className="flex justify-between items-center border-b border-line pb-4 mb-5">
              <h3 className="font-display font-semibold text-sm uppercase text-ink tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent" />
                Live Preview
              </h3>
              <span className="text-[8px] tracking-widest text-muted uppercase font-bold">
                WYSIWYG Mockup
              </span>
            </div>

            {/* Browser Mock Frame */}
            <div className="border border-line rounded-2xl overflow-hidden bg-bg shadow-lg flex flex-col">
              {/* Browser bar */}
              <div className="bg-[#2d2622]/5 border-b border-line/75 px-4 py-3 flex items-center gap-2 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 block shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 block shrink-0" />
                <div className="flex-1 bg-white/50 border border-line/60 rounded-lg py-1 px-3 text-[9px] font-mono text-muted text-center max-w-[200px] mx-auto select-none truncate">
                  bodybarrel.com
                </div>
              </div>

              {/* Dynamic Announcement Bar Preview inside frame */}
              <div className="relative overflow-hidden bg-white/20 select-none">
                <AnimatePresence mode="wait">
                  {isActive && announcementsList.length > 0 ? (
                    <motion.div
                      key={previewIndex}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                      }}
                      className="px-4 py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.15em] flex items-center justify-center min-h-[34px] leading-normal"
                    >
                      {announcementsList[previewIndex] || "ANNOUNCEMENT PREVIEW"}
                    </motion.div>
                  ) : (
                    <div className="px-4 py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.15em] bg-neutral-100 text-neutral-400 flex items-center justify-center min-h-[34px] italic border-b border-dashed border-neutral-200">
                      Announcement Bar Disabled
                    </div>
                  )}
                </AnimatePresence>

                {/* Mock Shop Navigation Header */}
                <div className="bg-[#F6F4EE]/95 border-b border-line/60 p-4 flex justify-between items-center select-none opacity-80 pointer-events-none">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink">
                      BODYBARREL
                    </span>
                  </div>
                  <div className="flex gap-4 text-[8px] uppercase tracking-widest text-ink font-semibold">
                    <span>Science</span>
                    <span>Us</span>
                    <span>Shop</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-ink/10 flex items-center justify-center text-[7px] text-ink font-bold">
                    0
                  </div>
                </div>

                {/* Mock Shop Hero Banner content */}
                <div className="bg-bg p-8 flex flex-col items-center justify-center text-center space-y-4 select-none relative min-h-[160px]">
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg border border-accent/15 bg-accent/5 flex items-center gap-1 text-[8px] text-accent uppercase font-bold tracking-wider">
                    <Sparkles className="w-2.5 h-2.5 animate-spin" />
                    Interactive
                  </div>
                  <h4 className="font-display font-semibold text-lg uppercase tracking-tight text-ink/70">
                    Restoring skin resilience
                  </h4>
                  <p className="text-[10px] text-muted max-w-xs leading-normal">
                    Advanced PDRN cellular formulas engineered for absolute skin longevity.
                  </p>
                  <div className="w-24 h-6 border border-line rounded-lg flex items-center justify-center text-[7px] font-semibold uppercase tracking-widest text-ink">
                    Explore
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-[#2D2622] text-[#F6F4EE] border border-accent/20 rounded-3xl p-6 space-y-3">
            <h4 className="font-display font-semibold text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <Megaphone className="w-3.5 h-3.5" />
              Pro Tips
            </h4>
            <ul className="space-y-2 text-[10px] text-muted/95 list-disc pl-4 leading-relaxed text-left">
              <li>Use high contrast hex colors for maximum legibility.</li>
              <li>Keep texts under 80 characters to prevent wrapping on mobile viewports.</li>
              <li>Use uppercase character codes to align with BODYBARREL minimalism brand identity.</li>
              <li>Reorder campaign sliders dynamically relative to current sales priorities.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
