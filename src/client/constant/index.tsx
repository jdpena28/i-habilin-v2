export const { UPLOADCARE_SECRET_KEY } = process.env;
export const INCLUDED_ADDRESS = {
  include: {
    address: {
      select: {
        addressLine: true,
        Brgy: {
          select: {
            brgy_loc: true,
            id: true,
          },
        },
        city: {
          select: {
            city_name: true,
            city_code: true,
          },
        },
        province: {
          select: {
            prov_name: true,
            prov_code: true,
          },
        },
      },
    },
  },
};
export const animateVariants = {
  mobileHidden: {
    x: "-100vw",
    opacity: 0,
  },
  mobileVisible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      ease: "easeInOut",
      bounce: 0.14,
    },
  },
  mobileExit: {
    x: "-100vw",
    opacity: 0,
  },
  cartHidden: {
    x: "200vw",
    opacity: 0,
  },
  cartVisible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      ease: "easeInOut",
      bounce: 0.14,
    },
  },
  cartExit: {
    x: "200vw",
    opacity: 0,
  },
};
