"use client";

import { useEffect, useState } from "react";
import { MoviesService } from "@/lib/services/movies";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function TrailerDialog({ open, movieId, onClose }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch trailer when opened + movieId changes
  useEffect(() => {
    if (!open || !movieId) return;

    (async () => {
      try {
        setLoading(true);
        const url = await MoviesService.trailer(movieId);
        setEmbedUrl(url ?? null);
      } catch {
        setEmbedUrl(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, movieId]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setEmbedUrl(null);
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="!p-0 !overflow-hidden !max-w-none !w-[min(1200px,96vw)] !h-[min(80vh,720px)]">
        <div className="relative h-full w-full bg-black">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Loading trailer...
            </div>
          )}

          {!loading && !embedUrl && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
              Trailer not available for this movie
            </div>
          )}

          {!loading && embedUrl && (
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title="YouTube trailer"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
