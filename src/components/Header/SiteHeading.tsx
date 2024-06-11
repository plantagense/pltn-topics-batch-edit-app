import logo from "../../assets/images/pltn.png";

export default function SiteHeading() {
  return (
    <div className="flex justify-between items-center bg-secondary-shell shadow rounded-b p-6 mb-3">
      <h1 className="text-2xl">
        Edit <span className="font-bold text-plantagen-red">TOPICS</span> on the
        fly...
      </h1>
      <img src={logo} alt="logo" width={48} height={48} />
    </div>
  );
}
