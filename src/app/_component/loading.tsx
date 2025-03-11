import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex gap-2 items-center transform top-1/2 left-1/2 fixed ">
      <div>Түр хүлээнэ үү!</div>
      <div>
        <ImSpinner2 className="animate-spin" />
      </div>
    </div>
  );
}
