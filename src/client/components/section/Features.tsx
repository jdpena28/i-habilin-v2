import FeatureDashboard from "@public/public/feature-dashboard";
import FeatureIOT from "@public/public/feature-iot";
import FeatureMaintenance from "@public/public/feature-maintenance";
import FeaturePreparation from "@public/public/feature-preparation";
import Image from "next/image";

const Features = () => {
  return (
    <section id="feature" className="min-h-screen w-full lg:min-h-[120vh]">
      <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-5">
          <div className="hidden h-full w-full flex-[32.5] rounded-md bg-[#E8DFC8] lg:block" />
          <div className="feature-public-card">
            <FeatureDashboard />
            <p className="heading text-2xl">Dashboard</p>
            <p className="subheading">
              Displays a comprehensive representation of data from day-to-day
              transactions.
            </p>
          </div>
          <div className="hidden h-full w-full flex-[32.5] rounded-md bg-[#E8DFC8] lg:block" />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <div className="feature-public-card">
            <FeatureMaintenance />
            <p className="heading text-2xl">Menu Maintenance</p>
            <p className="subheading">
              Customization of the food menu made it easy and hassle-free.
            </p>
          </div>
          <div className="feature-public-card">
            <div className="relative h-full max-h-[75%] w-full">
              <Image src="/public/feature-qr1.svg" alt="QR Code Icon" fill />
            </div>
            <p className="heading text-2xl">QR Code Technology</p>
            <p className="subheading">
              Obtaining food menu information via QR code
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="feature-public-card">
            <FeatureIOT />
            <p className="heading text-2xl">IoT Technology</p>
            <p className="subheading">
              Notify customers using vibration through a smartphone.
            </p>
          </div>
          <div className="feature-public-card">
            <FeaturePreparation />
            <p className="heading text-2xl">Food Preparation</p>
            <p className="subheading">
              Ensuring customer satisfaction and a positive dining experience
              through efficient preparation.
            </p>
          </div>
          <div className="hidden h-32 w-full flex-[.30] rounded-md bg-[#E8DFC8] lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Features;
