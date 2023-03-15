import { createRegistrantSchema } from "@/server/schema/public";
import { router, procedure } from "@/server/trpc";
import { omit } from "lodash";

export const registerRouter = router({
    createRegistrant: procedure.input(createRegistrantSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.registrants.create({
            data: {
                ...omit(input.registrant, ["logo", "address"]),
                logo: {
                    create: {
                        ...input.registrant.logo,
                    }
                },
                address: {
                    create: {
                        ...input.registrant.address,
                    }
                },
                owner: {
                    create: {
                        ...omit(input.owner, ["address"]),
                        address: {
                            create: {
                                ...input.owner.address,
                            }
                        }
                    }
                },
                representative: {
                    create: {
                        ...omit(input.owner, ["address"]),
                        address: {
                            create: {
                                ...input.representative.address,
                            }
                        }
                    }
                },
                dtiPermit: {
                    create: {
                        ...input.dtiPermit,
                    }
                },
                sanitaryPermit: {
                    create: {
                        ...input.sanitaryPermit,
                    }
                },
                bussinessPermit: {
                    create: {
                        ...input.businessPermit,
                    }
                },
            }
        })
    }),
})