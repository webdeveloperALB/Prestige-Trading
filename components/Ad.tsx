interface AdProps {
  slot: 'banner-top' | 'mid-article' | string;
}

export default function Ad({ slot }: AdProps) {
  return (
    <div className="bg-gray-100 border border-gray-300 p-6 text-center rounded">
      {/* Replace with your real ad logic */}
      <em>[Ad slot: {slot}]</em>
    </div>
  );
}
