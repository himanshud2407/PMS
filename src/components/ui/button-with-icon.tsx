import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ButtonWithIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ButtonWithIcon = ({ label, className, ...props }: ButtonWithIconProps) => {
  return (
    <Button 
      className={cn(
        "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer text-white",
        className
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-500">
        {label}
      </span>
      <div className="absolute right-1 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45 shadow-sm">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
