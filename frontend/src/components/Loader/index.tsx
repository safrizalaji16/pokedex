import { MdHourglassTop } from "react-icons/md";

const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <div className="text-2xl text-gray-700 animate-spin">
        <MdHourglassTop />
      </div>
    </div>
  );
};

export default Loader;
