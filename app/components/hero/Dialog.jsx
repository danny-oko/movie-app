"use client";

import { useEffect, useState } from "react";
import { moviesService } from "@/lib/services/movies";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const buildYouTubeEmbed = (key) =>
  `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&rel=0&modestbranding=1`;

const pickOfficialTrailer = (results = []) => {
  const yt = results.filter((v) => v?.site === "YouTube");

  const score = (v) =>
    (v?.type === "Trailer") * 100 +
    (v?.official === true) * 50 +
    /official trailer/i.test(v?.name || "") * 20 +
    (Date.parse(v?.published_at || 0) ? Date.parse(v.published_at) / 1e12 : 0);

  yt.sort((a, b) => score(b) - score(a));
  return yt[0] ?? null;
};

export default function TrailerDialog({ open, movieId, onClose }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !movieId) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setEmbedUrl(null);

        const data = await moviesService.trailer(movieId);

        const video = pickOfficialTrailer(data?.results);
        const url = video?.key ? buildYouTubeEmbed(video.key) : null;

        if (!cancelled) setEmbedUrl(url);
      } catch {
        if (!cancelled) setEmbedUrl(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
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
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="!p-0 !overflow-hidden !max-w-none !w-[min(1200px,96vw)] !h-[min(80vh,720px)]">
        <VisuallyHidden>
          <DialogTitle>Movie Trailer</DialogTitle>
        </VisuallyHidden>

        <div className="relative h-full w-full bg-black">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Loading trailer...
            </div>
          )}

          {!loading && !embedUrl && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
              Trailer not available
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
