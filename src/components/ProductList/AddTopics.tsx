import { Topic } from "@crystallize/schema";
import { PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import fetchTopicList from "../../api/fetchTopicList";

interface AddTopicsProps {
  selectedTopicIds: string[];
  setSelectedTopicIds: (selectedTopicIds: string[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AddTopics({
  selectedTopicIds,
  setSelectedTopicIds,
  isOpen,
  setIsOpen,
}: AddTopicsProps) {
  const [topics, setTopics] = useState<Topic[] | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await fetchTopicList(apiClient);
      setTopics(topics);
    };
    fetchTopics();
  }, []);

  const handleCheckboxChange = (topicId: string) => {
    setSelectedTopicIds((prevSelected) => {
      if (prevSelected.includes(topicId)) {
        return prevSelected.filter((id) => id !== topicId);
      } else {
        return [...prevSelected, topicId];
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-5">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="flex p-2 rounded bg-plantagen-soil text-secondary-shell hover:bg-plantagen-red gap-4"
        >
          Add Topic <PlusSquare />
        </button>
      </div>
      {isOpen && (
        <div className="grid grid-cols-5 gap-2 h-60 overflow-y-auto overflow-hidden border border-gray-300 rounded p-2 bg-[#fff]">
          {topics?.map((topic) => (
            <div key={topic.id}>
              <h4 className="font-bold">{topic.name}</h4>
              <div className="flex flex-col gap-1 w-[150px]">
                {topic.descendants?.map((descendant: Topic) => (
                  <label
                    key={descendant.id}
                    className={`flex items-center gap-2 text-sm p-1 rounded ${
                      descendant?.id &&
                      selectedTopicIds.includes(descendant.id) &&
                      "bg-secondary-shell"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={descendant.id || ""}
                      checked={selectedTopicIds.includes(descendant.id || "")}
                      onChange={() => handleCheckboxChange(descendant.id || "")}
                    />
                    <span className="line-clamp-1">{descendant.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
