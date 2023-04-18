import { omit } from "lodash";
import { encrypt } from "@/client/lib/bcrypt";
import { createStallAccountSchema } from "@/server/schema/application/user";
import { protectedProcedure, router } from "@/server/trpc";

export const userRouter = router({
  createAccount: protectedProcedure
    .input(createStallAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const isEmailTaken = await ctx.prisma.account.findUnique({
        where: {
          email: input.email,
        },
      });
      if (isEmailTaken) {
        throw new Error("Email is already taken");
      }
      input.password = await encrypt(input.password);
      const account = await ctx.prisma.account.create({
        data: {
          ...omit(input, ["person", "confirmPassword", "registrantId"]),
          registrant: {
            connect: {
              id: input.registrantId,
            },
          },
          person: {
            create: {
              ...omit(input.person, ["address"]),
              address: {
                create: {
                  ...input.person.address,
                },
              },
            },
          },
        },
      });
      return account;
    }),
});
