import { useEffect, useRef, useState } from "react";
import { Question } from "@/types/quiz";
import { Circle, Save } from "lucide-react";

const QuestionField = ({ question }: { question: Question }) => {
  const ref = useRef(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [fieldQuestion, setFieldQuestion] = useState<Question | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !(ref.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsEditable(false);
    }
  };

  useEffect(() => {
    // attach listener
    document.addEventListener("mousedown", handleClickOutside);

    // sync field with question
    setFieldQuestion(question);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, question]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFieldQuestion((prev) => ({
      ...prev!,
      question: value,
    }));
  };

  const handleOptionChange = (index: number, newValue: string) => {
    setFieldQuestion((prev) => {
      if (!prev) return null;
      const updatedOptions = [...prev.options];
      updatedOptions[index] = newValue;
      return { ...prev, options: updatedOptions };
    });
  };

  return (
    <div
      ref={ref}
      onClick={() => setIsEditable(true)}
      className="w-full h-auto bg-zinc-50 border border-gray-400 cursor-pointer rounded-xl p-6 flex items-center justify-center flex-col gap-2"
    >
      <div className="w-full h-auto flex items-center justify-between">
        {isEditable ? (
          <textarea
            className="w-full p-3 h-32 resize-none bg-blue-100 outline-none border-b border-gray-500 px-3 text-xl font-sans font-semibold placeholder:text-lg placeholder:font-sans placeholder:font-normal"
            placeholder="Question"
            value={fieldQuestion?.question}
            onChange={handleInputChange}
          />
        ) : (
          <p className="text-xl font-sans font-medium">
            {fieldQuestion?.question}
          </p>
        )}
      </div>
      <div className="w-full h-auto mt-4 flex flex-col items-start justify-start gap-2">
        {(fieldQuestion?.options || []).map((option, index) => (
          <div
            key={index}
            className="w-full h-auto flex items-center justify-between gap-2"
          >
            <div className="flex items-center justify-start gap-2 w-[90%]">
              <Circle className="text-lg" />
              <input
                type="text"
                className={`w-full h-auto bg-transparent outline-none ${
                  isEditable && "hover:border-b hover:border-gray-500"
                }  px-3 py-2`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      {isEditable && (
        <div className="w-full h-auto mt-10 border-t border-gray-500 pt-5 flex items-center justify-end gap-4">
          <button className="w-12 h-12 bg-transparent flex items-center justify-center text-2xl rounded-full hover:bg-gray-200">
            <Save />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionField;
