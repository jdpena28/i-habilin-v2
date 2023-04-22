import { groupBy, chain, mapValues, isEmpty } from "lodash";
import {
  getAllOrderSchema,
  getOrderSchema,
  deleteOrderSchema,
  updateOrderById,
  updateOrders,
} from "@/server/schema/stall/order";
import { protectedProcedure, router } from "@/server/trpc";
import { openai } from "@/server/lib/openai";

export const orderRouter = router({
  getAllOrders: protectedProcedure
    .input(getAllOrderSchema)
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findMany({
        where: {
          menu: {
            category: {
              registrantId: input.id,
            },
          },
          status: input.status,
        },
        include: {
          tableOrder: {
            select: {
              id: true,
              tableNumber: true,
              createdAt: true,
            },
          },
          menu: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          tableOrder: {
            createdAt: "desc",
          },
        },
      });

      const groupByTableNumber = groupBy(orders, "tableOrder.tableNumber");
      const result = mapValues(groupByTableNumber, (value) => {
        const addQuantity = chain(value)
          .groupBy("menuId")
          .map((value1) => {
            return {
              menu: value1[0].menu,
              quantity: value1.reduce((a, b) => a + b.quantity, 0),
            };
          })
          .value();
        return {
          id: value[0].tableId,
          createdAt: value[0].tableOrder.createdAt,
          tableNumber: value[0].tableOrder.tableNumber,
          orders: addQuantity,
        };
      });

      type resultType = typeof result;

      if (input.orderBy && ["Preparation Time"].includes(input.orderBy)) {
        const executionTime = Date.now();
        const prompt = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          max_tokens: 1500,
          temperature: 0,
          top_p: 0.2,
          messages: [
            {
              role: "system",
              content: `Act as a natural language for Sorting Algorithm 
      
              You are task to sort the JSON data to fastest to slowest to cook based on their menu name and the quantity of the food and they are group by order number with a key of their order number.
              
              Use any sorting algorithm to sort the JSON data to fastest to slowest to cook based on their menu name and the quantity
              
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
              Do not flatten the JSON Data
              Do not add any note
              Do not add note
              Limit up to 10 orders only
              
              Follow all of the above rules. This is important you MUST follow the above rules. There are no exceptions to these rules. You must always follow them. No exceptions.
                              `,
            },
            {
              role: "user",
              content: `
              Here are the orders and they are group by order number which is their key.
      
      orders : ${JSON.stringify(result, null, 2)}
      
      Based on the JSON Data "orders", sort the data to fastest to slowest to cook based on their menu name and quantity and they are group by orders which is their key, alter the JSON where group by order add an estimated time with key of "estimated_time" and a value of numbers on minutes each order. 
      
      Do not flatten the data  take note return it as JSON with key of "sorted".
      Do not return random data use the JSON Data Provided
      Do not flatten the JSON
      Do not add any note
      Do not provide any description
      Do not add any introduction
      Do not add any explanation
      Do not add any comments
      Limit up to 10 orders only
      Do not add note
      
      Again do not add notes or a note, return only it as JSON with key of "sorted"
              `,
            },
          ],
        });
        console.log(`Execution Time: ${Date.now() - executionTime}ms`);
        if (prompt.data.choices[0]?.message?.content === undefined) {
          return null;
        }
        const regex = /(Note|NOTE|notes|NOTES):.*/s;
        const sanitizePrompt = prompt.data.choices[0]?.message?.content.replace(
          regex,
          ""
        );
        const parseJSON = JSON.parse(sanitizePrompt);
        if (isEmpty(parseJSON.sorted)) return null;
        const entries = Object.entries(parseJSON.sorted);
        entries.sort(
          (a: any, b: any) => a[1].estimated_time - b[1].estimated_time
        );
        return Object.fromEntries(entries) as resultType;
      }
      /* if (input.orderBy && ["Order Time (Asc.)", "Order Time (Desc.)"].includes(input.orderBy)) {
        const sortByOrderTime = Object.values(result).sort((a, b) => {
          if (input.orderBy === "Order Time (Asc.)") {
            return a.createdAt.getTime() - b.createdAt.getTime();
          }
          return b.createdAt.getTime() - a.createdAt.getTime();
          
        })
        .reduce((acc, key) => (
          {
            [key.tableNumber]: {
              ...key,
            },
            ...acc
          }
        ),{})
        console.log(sortByOrderTime)
      
      } */
      return result;
    }),
  getOrder: protectedProcedure
    .input(getOrderSchema)
    .query(async ({ ctx, input }) => {
      const tableNumber = await ctx.prisma.tableOrder.findUnique({
        where: {
          id: input.id,
        },
      });
      const order = await ctx.prisma.order.findMany({
        where: {
          tableId: input.id,
          status: input.status,
          menu: {
            category: {
              registrantId: input.stallId,
            },
          },
        },
        orderBy: {
          menu: {
            name: "asc",
          },
        },
        include: {
          menu: {
            select: {
              name: true,
            },
          },
        },
      });
      return {
        ...tableNumber,
        menu: order,
      };
    }),
  deleteOrder: protectedProcedure
    .input(deleteOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.deleteMany({
        where: {
          id: {
            in: input.id,
          },
        },
      });
    }),
  updateOrderById: protectedProcedure
    .input(updateOrderById)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          quantity: input.quantity,
          status: input.status,
        },
      });
    }),
  updateOrders: protectedProcedure
    .input(updateOrders)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.updateMany({
        where: {
          id: {
            in: input.id,
          },
        },
        data: {
          status: input.status,
        },
      });
    }),
});
