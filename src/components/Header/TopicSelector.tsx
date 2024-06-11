import type { Topic } from "@crystallize/schema";
import { useEffect, useState } from "react";
import fetchTopicList from "../../api/fetchTopicList";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import { useTopic } from "../../context/TopicContext";

export default function TopicSelector() {
  const { setSelectedTopic } = useTopic();
  const [topics, setTopic] = useState<Topic[] | null>(null);

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
