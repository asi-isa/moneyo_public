import { AiOutlineHome } from "react-icons/ai";
import { BiBook, BiCycling } from "react-icons/bi";
import { MdLocalGroceryStore } from "react-icons/md";
import { GiPlantRoots } from "react-icons/gi";

export default function getCategoryIcon(category) {
  if (category === "home") {
    return <AiOutlineHome />;
  } else if (category === "sport") {
    return <BiCycling />;
  } else if (category === "food") {
    return <MdLocalGroceryStore />;
  } else if (category === "education") {
    return <BiBook />;
  } else {
    return <AiOutlineHome />;
  }
}
