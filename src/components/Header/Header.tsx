// import { FilePenLine, List } from "lucide-react";
import SiteHeading from "./SiteHeading";
import TopicSelector from "./TopicSelector";
import ShapeSelect from "./ShapeSelect";

export default function Header() {
  return (
    <header>
      <SiteHeading />
      <div className="bg-secondary-shell shadow rounded p-3 mb-3 w-full">
        <ul className="flex gap-10">
          <li>
            <TopicSelector />
          </li>
          <li>
            <ShapeSelect />
          </li>
          {/* <li className="flex gap-5 ml-auto">
            <button className="flex justify-evenly items-center py-[6px] w-[125px] rounded shadow-md text-plantagen-soil hover:text-secondary-shell bg-secondary-shell hover:bg-plantagen-soil">
              <span className="font-bold">Edit Mode</span>
              <FilePenLine size={16} strokeWidth={3} />
            </button>
            <button className="flex justify-evenly items-center py-[6px] w-[125px] rounded shadow-md bg-plantagen-soil hover:bg-plantagen-red text-secondary-shell hover:text-secondary-shell">
              <span className="font-bold">Get List</span>
              <List size={16} strokeWidth={3} />
            </button>
          </li> */}
        </ul>
      </div>
    </header>
  );
}
