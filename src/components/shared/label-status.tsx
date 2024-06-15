import { cn } from "@/lib/utils";

interface LabelStatusProps {
  labels: string[] | undefined;
}

const LabelStatus = ({labels}: LabelStatusProps) => {

  return (
    <>
      {labels && labels.map((label) => (
        <span key={label} className={cn(
          "bg-red-500 text-white px-1 py-0.5 rounded-sm text-xs",
          {
            "bg-green-500": label === "admin",
            "bg-blue-500": label === "premium",
            "bg-yellow-500": label === "author",
          }
        )}>{label}</span>
      ))}
    </>
  );
};

export default LabelStatus;