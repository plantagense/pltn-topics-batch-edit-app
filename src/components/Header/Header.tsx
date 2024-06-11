import { FilePenLine, List } from "lucide-react";

export default async function Header() {
  return (
    <header>
      {/* <SiteHeading /> */}
      <div className="bg-secondary-shell shadow rounded p-6 mb-3 w-full">
        <ul className="flex gap-10">
          <li>{/* <ShapeChooser shapes={shapes} /> */}</li>
          <li>{/* <TopicsChooser topics={topics} /> */}</li>
          <li className="flex gap-5 ml-auto">
            <button className="flex justify-evenly items-center py-[6px] w-[125px] rounded shadow-md text-plantagen-soil hover:text-secondary-shell bg-secondary-shell hover:bg-plantagen-soil">
              <span className="font-bold">Edit Mode</span>
              <FilePenLine size={16} strokeWidth={3} />
            </button>
            <button className="flex justify-evenly items-center py-[6px] w-[125px] rounded shadow-md bg-plantagen-soil hover:bg-plantagen-red text-secondary-shell hover:text-secondary-shell">
              <span className="font-bold">Get List</span>
              <List size={16} strokeWidth={3} />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
