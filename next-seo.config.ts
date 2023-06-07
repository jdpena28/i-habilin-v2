import { DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
  title: "I-Habilin",
  description:
    " A revolutionize ordering system. An innovative solution that transforms the traditional way of ordering in food stalls. Say goodbye to long queues and waiting times. Our online platform, ordering from multiple stalls in a food court has never been easier.",
  openGraph: {
    title: "I-Habilin",
    description:
      " A revolutionize ordering system. An innovative solution that transforms the traditional way of ordering in food stalls. Say goodbye to long queues and waiting times. Our online platform, ordering from multiple stalls in a food court has never been easier.",
    type: "website",
    locale: "en_IE",
    url: "https://www.i-habilin.tech/",
    site_name: "I-Habilin",
    images: [
      {
        url: "https://ucarecdn.com/e5418ba0-bb8f-4039-aad7-5bb2989cf40f/",
        width: 800,
        height: 600,
        alt: "I-Habilin",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.svg",
    },
  ],
};

export default DEFAULT_SEO;
