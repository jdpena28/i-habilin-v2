import { FC } from "react";
import { FormatCurrency } from "@/client/lib/TextFormatter";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface CountCardProps {
  title: string;
  count: number | undefined;
  isCurrency?: boolean;
  trend?: number;
  isLoading: boolean;
  className?: string;
}

const CountCard: FC<CountCardProps> = ({
  title,
  count,
  trend,
  isCurrency,
  isLoading,
  className,
}) => {
  return (
    <div className={`w-max space-y-2 rounded-lg bg-white p-4 ${className}`}>
      <p className="heading text-center">{title}</p>
      <div className="flex gap-x-2">
        <p className="w-full text-center font-bold">
          {isLoading
            ? "-"
            : isCurrency
            ? FormatCurrency(count)
            : count
            ? count?.toLocaleString("en-US", {
                style: "decimal",
              })
            : 0}
        </p>
        {isLoading ? (
          <div className="badge-lime flex items-center gap-x-1">
            <FiTrendingUp className="h-5 w-5" />- today
          </div>
        ) : null}
        {typeof trend !== "undefined" && trend >= 0 && (
          <div className="badge-lime flex items-center gap-x-1">
            <FiTrendingUp className="h-5 w-5" />
            {isCurrency
              ? FormatCurrency(trend, "PHP", true)
              : trend.toLocaleString("en-US", {
                  style: "decimal",
                })}{" "}
            today
          </div>
        )}
        {typeof trend !== "undefined" && trend < 0 && (
          <div className="badge-red flex items-center gap-x-1">
            <FiTrendingDown className="h-5 w-5" />
            {isCurrency
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
