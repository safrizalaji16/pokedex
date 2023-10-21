import { MdHourglassTop } from 'react-icons/md';

const Loader = () => {
  return (
    <div className="flex justify-center">
      <MdHourglassTop size={36} className="animate-spin" />
    </div>
  );
};

export default Loader;
