import { decrypt, encrypt } from "@/client/lib/bcrypt";
import { sendEmail } from "@/server/lib/SendInBlue";
import { openai } from "@/server/lib/openai";
import { slugify } from "@/server/lib/slugify";
import { getRegistrantSchema } from "@/server/schema/application/registrant";
import { createAccountSchema, createRegistrantSchema, createSurveySchema, forgotPasswordSchema, generateRecommendationSchema, getAllCategorySchema, getSuperAdminPassword, updatePasswordSchema } from "@/server/schema/public";
import { getAllMenuSchema } from "@/server/schema/stall/menu";
import { CreateStallSettingsSchema } from "@/server/schema/stall/settings";
import { router, procedure } from "@/server/trpc";
import { omit } from "lodash";
import { orderRouter } from "./order";
import { format } from "date-fns"

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
                scope: "SUPER ADMIN",
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
    getAllStalls: procedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.registrants.findMany({
            where: {
                status: "Active"
            },
            include: {
                logo: {
                    select: {
                        cdnUrl: true,
                    }
                }
            }
        })
        return data
    }),
    getAllCategory: procedure.input(getAllCategorySchema).query(async ({input, ctx}) => {
       const operatingHours = await ctx.prisma.registrants.findUnique({
          where: {
            slug: input.slug
          },
          select: {
            operatingHours: true,
            isClosed: true,
          }
       })
        if (operatingHours?.isClosed) {
            return {
                isClosed: true,
            }
        }
        if (operatingHours?.operatingHours) {
            const parseJSON = JSON.parse(operatingHours.operatingHours) as CreateStallSettingsSchema
            switch (parseJSON.type) {
                case "Everyday":
                  if (
                    (parseJSON?.endTime &&
                      format(new Date(), "HH:mm") > parseJSON?.endTime) ||
                    (parseJSON?.startTime &&
                      format(new Date(), "HH:mm") < parseJSON?.startTime)
                  ) {
                    return {
                            isClosed: true
                           };
                  }
                  break;
                case "Weekdays":
                  if (
                    ["Saturday", "Sunday"].includes(format(new Date(), "EEEE")) ||
                    (parseJSON?.endTime &&
                      format(new Date(), "HH:mm") > parseJSON?.endTime) ||
                    (parseJSON?.startTime &&
                      format(new Date(), "HH:mm") < parseJSON?.startTime)
                  ) {
                    return {
                        isClosed: true
                       };
                  }
                  break;
                case "Weekends":
                  if (
                    (parseJSON?.startTime &&
                      parseJSON?.endTime &&
                      !["Saturday", "Sunday"].includes(format(new Date(), "EEEE"))) ||
                    (parseJSON?.endTime &&
                      format(new Date(), "HH:mm") > parseJSON?.endTime) ||
                    (parseJSON?.startTime &&
                      format(new Date(), "HH:mm") < parseJSON?.startTime)
                  ) {
                    return {
                        isClosed: true
                       };
                  }
                  break;
                case "Custom":
                  if (parseJSON?.operationHours) {
                    const findIndex = parseJSON?.operationHours?.findIndex(
                      (i) => i?.day === format(new Date(), "EEEE")
                    );
                    if (findIndex === -1) {
                        return {
                            isClosed: true
                           };
                    }
                    const operatingHours = parseJSON?.operationHours[findIndex];
                    if (operatingHours === null) return {
                        isClosed: true
                       };
                    if (
                      format(new Date(), "HH:mm") > operatingHours.endTime ||
                      format(new Date(), "HH:mm") < operatingHours.startTime
                    ) {
                        return {
                            isClosed: true
                           };
                    }
                  }
                  break;
                default:
                  return {
                    isClosed: false
                  };
              }
        }
       return await ctx.prisma.category.findMany({
            where: {
                registrant: {
                    slug: input.slug
                }
            },
            orderBy: {
                order: "asc"
            },
            include: {
                customIcon: true,
            }
       })
    }),
    getAllMenu: procedure.input(getAllMenuSchema).query(async ({input, ctx}) => {
        if (input.featured) {
            return await ctx.prisma.menu.findMany({
               where: {
                    category:{
                      registrant: {
                          slug: input.slug
                      }
                    },
                    featured: true
               },
               orderBy: {
                    order: "asc"
               },
               include: {
                    media: true,
                    category: {
                      select: {
                          registrant: {
                              select: {
                                  id: true,
                                  name: true,
                              }
                          }
                      }
                    }
               }
            })
     }
       if(!input.categoryId) return null
       return await ctx.prisma.menu.findMany({
            where: {
                categoryId: input.categoryId
            },
            orderBy: {
                order: "asc"
            },
            include: {
                media: true,
                category: {
                  select: {
                      registrant: {
                          select: {
                              id: true,
                              name: true,
                          }
                      }
                  }
                }
           }
       })
    }),
    createCustomer: procedure.input(createSurveySchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.customer.create({
            data: {
                name: input.name,
                surveyAnswer: JSON.stringify(input),
                ageGroup: input.age,
            }
        })
    }),
    getGenerateFoodRecommendation: procedure.input(generateRecommendationSchema).query(async ({ ctx, input }) => {
        const menu = await ctx.prisma.menu.findMany({
            where: {
                status: "Available",
                category: {
                    registrant: {
                        slug: input.slug
                    }
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                status: true,
                total: true,
                discount: true,
                media: {
                    select: {
                        cdnUrl: true,
                    }
                },
                category: {
                    select: {
                        registrant: {
                            select: {
                                id: true,
                            }
                        }
                    }
                  }
            },
            take: 20,
        })

        const surveyAnswer = await ctx.prisma.customer.findUnique({
            where: {
                id: input.customerId
            },
            select: {
                surveyAnswer: true,
            }
        })

        /* console.log(JSON.stringify(menu,null,2))
        console.log(JSON.stringify(JSON.parse(surveyAnswer?.surveyAnswer),null,2)) */
        const recommended = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 1000,
            temperature: .02,
            top_p:  .2,
            messages: [
              {
                role: "system",
                content: `
                Act as a natural language for Data Analytics.
                You are an expert in Data Analytics, you are tasked to recommend food based on the user output JSON data.
                
                Follow these rules:
                Be concise
                Even if there is a lack of details, attempt to find the most logical solution by going about it step by step
                Do not show html, styled, colored formatting or any code.
                Do not add unnecessary text in the response
                Do not add notes or intro sentences
                Do not show multiple distinct solutions to the question
                Do not add explanations 
                Do not return what the question was
                Do not repeat or paraphrase the question in your response
                Do not add any random JSON Data
                Use only the JSON Data provided
                Return the data in JSON format
                
                
                Follow all of the above rules. This is important you MUST follow the above rules. There are no exceptions to these rules. You must always follow them. No exceptions.`,
              },
              {
                role: "user",
                content: `
                Based on this customer preference data: 
                ${JSON.stringify(JSON.parse(surveyAnswer?.surveyAnswer ? surveyAnswer?.surveyAnswer : "{}"),null,2)}
        
                As Expert on Data Analyst, return all recommended food based on customer preference data make sure that the menu or recommended food does not contain any allergens of the customer that are in this menu JSON Data:
                 ${JSON.stringify(menu,null,2)}
        
        
                 Return it as JSON with a key of "recommended_food" note that you are only allowed to return your recommended food that are only in the menu JSON Data and limit recommended food up to 10, also in JSON add a confidence rate of recommended food based on their preference.

                 Again make sure that all recommended food including the ingredients of the food does not contain any of the allergens that are in the customer preference data.
                 
                 Return only the id of the menu here is an example of returning response:
                 {
                    recommended_food:  ["clgg7w1234hd","clsdf123","cl123hf"],
                    confidence: 85,
                 }
                `
              }
            ],
          });
        if (recommended.data.choices[0]?.message?.content === undefined) {
            return null
        }
        const regex = /(Note|NOTE|notes|NOTES):.*/s;
        const sanitizePrompt = recommended.data.choices[0]?.message?.content.replace(
          regex,
          ""
        );
        const parseJSON = JSON.parse(sanitizePrompt);
        return {
            recommended_food: menu.filter((menu) => parseJSON.recommended_food.includes(menu.id)),
            confidence: parseJSON.confidence as number
        }
    }),
    forgotPasswordEmail: procedure.input(forgotPasswordSchema).mutation(async ({ctx,input}) => {
        const findUserAccount = await ctx.prisma.account.findUnique({
            where: {
                email: input.email
            },
            include: {
                person: true
            }
        }
        )
        if(!findUserAccount) {
            throw new Error("Email not found")
        }
        sendEmail.sendTransacEmail({
            to: [{"email":`${input.email}`,"name":`${findUserAccount.person ? findUserAccount.person.firstName + " " + findUserAccount.person.lastName : input.email }`}],
            templateId: 3,
            params: {
                token: findUserAccount.id,
                slug: input.slug,
                pageFrom: input.pageFrom
            }
           
          })
        return findUserAccount
    }),
    updatePassword: procedure.input(updatePasswordSchema).mutation(async ({ctx,input}) => {
      const isAccountExist = await ctx.prisma.account.findUnique({
            where: {
                id: input.id
            }
      })
        if(!isAccountExist) {
            throw new Error("Invalid token")
        }
        input.password = await encrypt(input.password)
        return await ctx.prisma.account.update({
            where: {
                id: input.id
            },
            data: {
                password: input.password
            }
        })
    }),
    order: orderRouter
})
