import Image from "next/image";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import type { RouterOutput } from "@/client/types/main";

const FeaturedMenu = ({
  data,
}: {
  data: RouterOutput["public"]["getAllMenu"] | undefined;
}) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
      }}
      direction="vertical"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        // stopOnLastSlide: true,
      }}
      className="h-[30vh] w-full rounded-xl border-[.1px] border-highlight shadow-lg">
      {data?.map((i) => {
        return (
          <SwiperSlide>
            <FeaturedSlide
              url={i.media.cdnUrl}
              title={i.name}
              description={i.description}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

interface FeaturedSlideProps {
  url: string;
  title: string;
  description: string;
}

const FeaturedSlide: FC<FeaturedSlideProps> = ({ url, title, description }) => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-around gap-x-3 bg-gradient-to-t from-primary via-transparent to-transparent p-2">
      <div className="flex-[.4] space-y-1  self-end">
        <p className="max-h-44 w-full overflow-hidden text-ellipsis text-xs">
          {description}
        </p>
        <p className="heading text-sm">{title}</p>
      </div>
      <div className="mr-0.5 flex-[.6] p-2">
        <Image src={url} alt="Mang Inasal" height={576} width={720} />
      </div>
    </div>
  );
};

export default FeaturedMenu;
