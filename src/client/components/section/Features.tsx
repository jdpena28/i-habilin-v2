import BlankCard from "@public/blank-card";
import BlankICard from "@public/BlankI-Card";
import DashboardCard from "@public/Dashboard-card";
import FoodPreparation from "@public/Food-Preparation";
import IotCard from "@public/IoT-Card";
import MaintenanceCard from "@public/Maintenance-card";
import TechologyCard from "@public/Technology-Card";

const Features = () => {
  return (
    <section className="m-10">
      <div className=" gap-5 md:columns-3">
        <div className="mb-6 aspect-video w-auto">
          <BlankCard />
        </div>
        <div className="mb-6 aspect-square w-auto">
          <DashboardCard />
        </div>
        <div className="mb-6 aspect-video w-auto">
          <BlankICard />
        </div>
        <div className="mb-6 aspect-square w-auto">
          <MaintenanceCard />
        </div>
        <div className="mb-8 aspect-square w-auto">
          <TechologyCard />
        </div>
        <div className="mb-6 aspect-video w-auto">
          <BlankCard />
        </div>
        <div className="mb-6 aspect-square w-auto">
          <IotCard />
        </div>
        <div className="mb-6 aspect-video w-auto">
          <BlankCard />
        </div>
        <div className="mb-6 aspect-square w-auto">
          <FoodPreparation />
        </div>
      </div>
    </section>
  );
};

export default Features;
