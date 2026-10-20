import { ParallaxPhoto } from './motion';

export function PageIntro({
  eyebrow,
  title,
  lede,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  alt: string;
}) {
  return (
    <header className="wrap page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
      <ParallaxPhoto src={image} alt={alt} wide />
    </header>
  );
}
