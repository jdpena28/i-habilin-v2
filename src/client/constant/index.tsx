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
