import { QRCode } from "react-qrcode-logo";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";

const QrCode = () => {
  const URL = `${
    process.env.NODE_ENV === "development"
      ? "http://192.168.100.114:3000/"
      : process.env.NEXT_PUBLIC_VERCEL_URL
  }/stalls/`;
  const handleSaveButton = () => {
    const node = document.getElementById("qr-code-image") as HTMLElement;
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        saveAs(dataUrl, "qr-code.png");
      })
      .catch(() => {
        toast.error("Cannot print QR Code");
      });
  };
  return (
    <StallLayout>
      <StallHeader
        title="QR Code"
        goBack
        buttonText="Save QR"
        onClickButton={handleSaveButton}
      />
      <section
        id="qr-code"
        className="flex flex-row items-center justify-center gap-x-5 rounded-md bg-white p-5">
        <div id="qr-code-image" className="h-max w-max">
          <QRCode
            value={URL}
            size={200}
            logoWidth={198 * 0.35}
            logoHeight={124 * 0.35}
          />
        </div>
      </section>
    </StallLayout>
  );
};

export default QrCode;
