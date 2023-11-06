"use client";

import { Icons } from "@/components/icons";
import { cn } from "lib/utils";
import Image from "next/image";
import { useState } from "react";

export function GridTileImage({
  isInteractive = true,
  active,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={cn(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2 bg-zinc-950 hover:border-blue-600",
        {
          "border-2 border-blue-600": active,
          "border-zinc-700": !active
        }
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={cn("relative h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105": isInteractive
          })}
          {...props}
        />
      ) : null}
    </div>
  );
}

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [imageIndex, setImageIndex] = useState(0);

  const buttonClassName =
    "unset h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-white flex items-center justify-center";

  return (
    <>
      <div className="relative aspect-square h-full max-h-[650px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain "
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.alt as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}
        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-zinc-950 bg-zinc-900/80 text-neutral-400 backdrop-blur">
              <button
                aria-label="Previous product image"
                className={buttonClassName}
                onClick={() => setImageIndex(idx => (idx === 0 ? images.length - 1 : idx - 1))}
              >
                <Icons.ArrowLeft className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                aria-label="Next product image"
                className={buttonClassName}
                onClick={() => setImageIndex(idx => (idx === images.length - 1 ? 0 : idx + 1))}
              >
                <Icons.ArrowRight className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {images.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  aria-label="Enlarge product image"
                  className="h-full w-full"
                  onClick={() => {
                    setImageIndex(index);
                  }}
                >
                  <GridTileImage
                    alt={image.alt}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
