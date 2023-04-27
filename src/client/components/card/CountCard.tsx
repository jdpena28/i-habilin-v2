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
    <div className="w-max space-y-2 rounded-lg bg-white p-4">
      <p className="heading text-center">{title}</p>
      <div className="flex gap-x-2">
        <p className="w-full text-center font-bold">
          {isLoading
            ? "-"
            : isCurrency
            ? FormatCurrency(count)
            : count?.toLocaleString("en-US", {
                style: "decimal",
              })}
        </p>
        {trend && trend > 0 && (
          <div className="badge-lime flex items-center gap-x-1">
            <FiTrendingUp className="h-5 w-5" />
            {isLoading
              ? "-"
              : isCurrency
              ? FormatCurrency(trend, "PHP", true)
              : trend.toLocaleString("en-US", {
                  style: "decimal",
                })}{" "}
            today
          </div>
        )}
      </div>
    </div>
  );
};
export default CountCard;
