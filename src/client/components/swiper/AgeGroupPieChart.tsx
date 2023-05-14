/* eslint-disable no-underscore-dangle */
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { isEmpty } from "lodash";

import type { RouterOutput } from "@/client/types/main";
import type { ReturnAgeGroupItemsType } from "@/server/routers/stall/dashboard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { EChart } from "@/client/components/charts";
import type { ReactEChartsProps } from "../charts/EChart";

interface AgeGroupPieChartProps {
  data: RouterOutput["stall"]["dashboard"]["getAgeGroupOrderCount"] | undefined;
  isLoading: boolean;
}

const AgeGroupPieChart: FC<AgeGroupPieChartProps> = ({ data, isLoading }) => {
  const option: ReactEChartsProps["option"] = {
    title: {
      text: "Age Group",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "-1%",
      left: "center",
    },
    series: [
      {
        name: "Menu Name",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
  if (isLoading) {
    return (
      <div className="col-span-5 w-full rounded-lg bg-white">
        <EChart option={option} loading />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
      }}
      direction="horizontal"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        // stopOnLastSlide: true,
      }}
      className="col-span-5 w-full rounded-lg bg-white">
      {!isEmpty(data) &&
        Object.entries(data).map(([key, value]) => {
          if (isEmpty(value)) return null;
          return (
            <SwiperSlide>
              <EChart
                className=""
                option={{
                  ...option,
                  title: {
                    ...option.title,
                    text: `Age Group: ${key}`,
                  },
                  series: [
                    {
                      name: "Menu Name",
                      type: "pie",
                      radius: ["40%", "70%"],
                      avoidLabelOverlap: false,
                      itemStyle: {
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 2,
                      },
                      label: {
                        show: false,
                        position: "center",
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: 40,
                          fontWeight: "bold",
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: value.map((i: ReturnAgeGroupItemsType) => {
                        return {
                          value: i._sum.quantity as number,
                          name: i.name,
                        };
                      }),
                    },
                  ],
                }}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default AgeGroupPieChart;
