import { FC } from "react";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FiTrendingUp } from "react-icons/fi";

interface CountCardProps {
  title: string;
  count: number | undefined;
  isCurrency?: boolean;
  trend?: number;
  isLoading: boolean;
}

const CountCard: FC<CountCardProps> = ({
  title,
  count,
  trend,
  isCurrency,
  isLoading,
}) => {
  return (
    <div className="w-max space-y-2">
      <p className="heading text-center">{title}</p>
      <div className="flex gap-x-2">
        <p className="w-full text-center font-bold">
          {isLoading ? "-" : isCurrency ? FormatCurrency(count) : count}
        </p>
        {trend && trend > 0 && (
          <div className="badge-lime flex items-center gap-x-1">
            <FiTrendingUp className="h-5 w-5" />
            {FormatCurrency(trend, "PHP", true)} today
          </div>
        )}
      </div>
    </div>
  );
};

export default CountCard;
