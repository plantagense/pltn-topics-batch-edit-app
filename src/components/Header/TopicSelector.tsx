import type { Topic } from "@crystallize/schema";
interface TopicsChooserProps {
  topics: Topic[];
}

export default function TopicSelector({ topics }: TopicsChooserProps) {
  return (
    <div>
      <select
        className="p-2 rounded text-sm"
        defaultValue=""
        onChange={(e) => {
          e.target.value;
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
