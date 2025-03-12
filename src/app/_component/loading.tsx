import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex gap-2 items-center justify-center justify-self-center">
      <div>Түр хүлээнэ үү!</div>
      <div>
        <ImSpinner2 className="animate-spin" />
      </div>
    </div>
  );
}
