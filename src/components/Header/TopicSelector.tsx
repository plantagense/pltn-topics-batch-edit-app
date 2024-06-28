import { useEffect, useState } from "react";
import fetchTopicList from "../../api/fetchTopicList";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import { useTopic } from "../../context/TopicContext";

type Topic = {
  language?: string;
  name: string;
  id?: string;
  path?: string;
  parentId?: string;
  pathIdentifier?: string;
  children?: Topic[];
  descendants?: Topic[];
};

export default function TopicSelector() {
  const [topics, setTopic] = useState<Topic[] | null>(null);
  const { setSelectedTopic } = useTopic();

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await fetchTopicList(apiClient);
      setTopic(topics);
    };
    fetchTopics();
  }, []);

  return (
    <div>
      <select
        className="p-2 rounded text-sm"
        defaultValue=""
        onChange={(e) => {
          setSelectedTopic(e.target.value);
        }}
      >
        <option value="" disabled>
          Select topic
        </option>
        {topics?.map((topic) => (
          <optgroup key={topic.name} label={topic.name}>
            {topic.descendants?.map((topic: Topic) => (
              <option key={topic?.name} value={topic?.path}>
                {topic.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
