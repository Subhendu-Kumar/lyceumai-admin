interface TruncatedTextProps {
  text: string;
  limit?: number;
  expanded: boolean;
  onToggle: () => void;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  limit = 100,
  expanded,
  onToggle,
}) => {
  if (text.length <= limit) {
    return <p className="text-base text-gray-600">{text}</p>;
  }

  return (
    <p className="text-base text-gray-600">
      {expanded ? text : text.slice(0, limit) + "..."}
      <button onClick={onToggle} className="ml-2 text-blue-500 hover:underline">
        {expanded ? "Read less" : "Read more"}
      </button>
    </p>
  );
};

export default TruncatedText;
