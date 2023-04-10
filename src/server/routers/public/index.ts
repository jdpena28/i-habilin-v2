import { decrypt, encrypt } from "@/client/lib/bcrypt";
import { sendEmail } from "@/server/lib/SendInBlue";
import { slugify } from "@/server/lib/slugify";
import { getRegistrantSchema } from "@/server/schema/application/registrant";
import { createAccountSchema, createRegistrantSchema, getSuperAdminPassword } from "@/server/schema/public";
import { router, procedure } from "@/server/trpc";
import { omit } from "lodash";

export const registerRouter = router({
    createRegistrant: procedure.input(createRegistrantSchema).mutation(async ({ ctx, input }) => {
        const isEmailExist = await ctx.prisma.account.count({
            where: {
                email: input.registrant.email
            }
        })
        if (isEmailExist > 0) {
            throw new Error("Stall Email is already taken")
        }
        const isSlugExist = await ctx.prisma.registrants.count({
            where: {
                slug: slugify(input.registrant.name)
            },
        })
        if (isSlugExist > 0) {
            input.registrant.slug = `${slugify(input.registrant.name)}-${isSlugExist}`
        } else {
            input.registrant.slug = slugify(input.registrant.name)
        }
        sendEmail.sendTransacEmail({
            to: [{"email":`${input.registrant.email}`,"name":`${input.registrant.name}}`}],
            templateId: 1,
            params: {
              name: `${input.registrant.name}`,
            }
          })
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
    createAccount: procedure.input(createAccountSchema).mutation(async ({ ctx, input }) => { 
        const isEmailTaken = await ctx.prisma.account.findUnique({
            where: {
                email: input.email
            }
        })
        if (isEmailTaken) {
            throw new Error("Email is already taken")
        }
        input.password = await encrypt(input.password)
        const account = await ctx.prisma.account.create({
            data: {
                ...omit(input, ["person",'confirmPassword']),
                person: {
                    create: {
                        ...omit(input.person, ["address"]),
                        address: {
                            create: {
                                ...input.person.address,
                            }
                        }
                    },
                }
            },
        })
        return account
    }),
    getPassword: procedure.input(getSuperAdminPassword).mutation(async ({ ctx, input }) => {
        const adminPassword = await ctx.prisma.app_Meta.findUnique({
            where: {
                key: "ADMIN_PASSWORD"
            },
        })
        const isSame = await decrypt(input.password, adminPassword?.value ? adminPassword.value : "")
        if (isSame === false) {
            throw new Error("Password is incorrect")
        }
         return true
    }),
    getRegistrant: procedure
    .input(getRegistrantSchema)
    .query(async ({ ctx, input }) => {
      const data =  await ctx.prisma.registrants.findFirst({
        where: {
          slug: input.slug,
          AND: {
            status: "Active"
          }
        },
        include: {
            logo: {
                select: {
                    cdnUrl: true,
                }
            }
        }
      });
        return data
    }),
})
