type Trade = 'roofing' | 'windows' | 'electrical' | 'fire-protection' | 'plumbing';

const photoPath = (trade: Trade, width: 480 | 960) =>
  `${import.meta.env.BASE_URL}jobsite-photos/${trade}-${width}.webp`;

export function JobsitePhoto({ trade, alt, sizes }: { trade: Trade; alt: string; sizes: string }) {
  return (
    <img
      src={photoPath(trade, 960)}
      srcSet={`${photoPath(trade, 480)} 480w, ${photoPath(trade, 960)} 960w`}
      sizes={sizes}
      alt={alt}
      width={960}
      height={640}
      loading="lazy"
      decoding="async"
      className="block aspect-[3/2] w-full object-cover"
    />
  );
}
