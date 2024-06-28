import logo from "../../assets/images/pltn.png";
// import SiteHeading from "./SiteHeading";
import TopicSelector from "./TopicSelector";
// import ShapeSelect from "./ShapeSelect";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between bg-secondary-shell shadow rounded p-3 mb-3 w-full">
        <TopicSelector />
        <img src={logo} alt="logo" width={48} height={48} />
      </div>
    </header>
  );
}
