import userIcon from "./assets/user-icon.svg";
import logoIcon from "./assets/logo.svg";

function Navbar() {
  return (
    <nav className="bg-navbg rounded-full mt-4 px-8 py-3 flex justify-between items-center">
      <div className="flex items-center ">
        <div className="text-primary mr-2">
          <img src={logoIcon} />
        </div>
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Dine</span>Out
        </h1>
      </div>
      <div className="flex items-center">
        <img src={userIcon} className="h-10" />
      </div>
    </nav>
  );
}

export default Navbar;
