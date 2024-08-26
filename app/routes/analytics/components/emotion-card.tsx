type Props = {
  positive: number
  negative: number
};

export function EmotionCard({ positive, negative }: Props) {
  const generateEmotionColor = () => {
    const ratio = positive / (positive + negative);
    const color1 = "#2a9d90";
    const color2 = "#e76e50";
    const generatedColor = interpolateColor(color1, color2, ratio);
    return generatedColor;
  };

  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    const hex = (c: string) => parseInt(c, 16);
    const r = Math.round(
      hex(color1.slice(1, 3)) * (1 - ratio) + hex(color2.slice(1, 3)) * ratio,
    );
    const g = Math.round(
      hex(color1.slice(3, 5)) * (1 - ratio) + hex(color2.slice(3, 5)) * ratio,
    );
    const b = Math.round(
      hex(color1.slice(5, 7)) * (1 - ratio) + hex(color2.slice(5, 7)) * ratio,
    );
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  };

  return (
    <div className="grid size-8 place-items-center rounded-xl bg-white">
      <span className="size-4 rounded-full" style={{ backgroundColor: generateEmotionColor() }} />
    </div>
  );
}
