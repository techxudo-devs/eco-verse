import Image from "next/image";

type ContentImageGridProps = {
  images: string[];
  altBase: string;
};

export default function ContentImageGrid({ images, altBase }: ContentImageGridProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={`grid w-full gap-5 ${images.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
      {images.map((image, imageIndex) => (
        <div
          key={`${altBase}-image-${imageIndex}`}
          className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 aspect-[4/3]"
        >
          <Image
            src={image}
            alt={`${altBase} image ${imageIndex + 1}`}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

