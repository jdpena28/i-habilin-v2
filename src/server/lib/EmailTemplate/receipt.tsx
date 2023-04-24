/* eslint-disable react/no-unknown-property */
/* eslint-disable no-shadow */
import { FormatCurrency, formatDate } from "@/client/lib/TextFormatter";
import { RouterOutput } from "@/client/types/main";

export type CustomerOrderType = RouterOutput["public"]["order"]["getOrder"];

const ReceiptEmailTemplate = (data: CustomerOrderType) => {
  const URL_LINK =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/orders"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/orders`;

  const SUB_TOTAL = Object.keys(data.data).reduce((acc, key) => {
    const menuTotal = data.data[key].reduce((acc, item) => {
      const eachTotal = item.data.reduce((acc, item) => {
        if (item.status === "Cancelled") return acc;
        return (
          acc +
          parseInt(item.menu.total as unknown as string, 10) * item.quantity
        );
      }, 0);
      return acc + eachTotal;
    }, 0);
    return acc + menuTotal;
  }, 0);
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Order Receipt</title>
    
        <style>
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
            color: #555;
          }

          .font-bold {
            font-weight: 600;
          }
    
          .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
          }
    
          .invoice-box table td {
            padding: 5px;
            vertical-align: top;
          }
    
          .invoice-box table tr td:nth-child(2) {
            text-align: right;
          }
    
          .invoice-box table tr.top table td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
          }
    
          .invoice-box table tr.information table td {
            padding-bottom: 40px;
          }
    
          .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
    
          .invoice-box table tr.details td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
    
          .invoice-box table tr.item.last td {
            border-bottom: none;
          }
    
          .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
          }
    
          @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
              width: 100%;
              display: block;
              text-align: center;
            }
    
            .invoice-box table tr.information table td {
              width: 100%;
              display: block;
              text-align: center;
            }
          }
    
          /** RTL **/
          .invoice-box.rtl {
            direction: rtl;
            font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
              sans-serif;
          }
    
          .invoice-box.rtl table {
            text-align: right;
          }
    
          .invoice-box.rtl table tr td:nth-child(2) {
            text-align: left;
          }
        </style>
      </head>
    
      <body>
        <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <a href="ihabilin.tech">
                        <img
                          alt="I-Habilin Logo"
                          src="https://ucarecdn.com/ebfde885-5753-41b3-8a14-605f88c422b3/"
                          style="width: 100%; max-width: 200px" />
                      </a>
                    </td>
    
                    <td>
                      <strong>Transaction #:</strong> <a href="${URL_LINK}/${
    data.id
  }">${data.id}</a
                      ><br />
                      <strong>Date:</strong> ${formatDate(new Date())}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Capitol Drive.<br />
                      City of Balanga<br />
                      2100
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="heading">
              <td>Item</td>
    
              <td>Price</td>
            </tr>
            ${Object.keys(data.data).map((key) => {
              return `
                  <tr>
                    <td class="font-bold">${key}</td>
                  </tr>
                    ${data.data[key].map((i) => {
                      if (i.status === "Cancelled") return ``;
                      return i.data.map((item) => {
                        return `
                          <tr class="${item}">
                            <td>
                              ${item.quantity} x ${item.menu.name}
                            </td>
                            <td>
                              ${FormatCurrency(
                                (item.menu.total as unknown as number) *
                                  item.quantity
                              )}
                            </td>
                          </tr>
                        `;
                      });
                    })}
               `;
            })}
            <tr class="total">
              <td></td>
              <td><strong>Sub Total:</strong> ${FormatCurrency(SUB_TOTAL)}</td>
            </tr>
    
            <!-- discount row -->
            <tr class="heading">
              <td>Discount</td>
    
              <td>Discount (%)</td>
            </tr>
    
            <tr class="item">
              <td>[DISCOUNT CODE]</td>
    
              <td>- [TOTAL DISCOUNT]</td>
            </tr>
    
            <tr class="item details">
              <td>[DISCOUNT CODE]</td>
    
              <td>- [TOTAL DISCOUNT]</td>
            </tr>
    
            <tr class="total">
              <td></td>
              <td><strong>Total:</strong> ${FormatCurrency(SUB_TOTAL)}</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `;
};

export default ReceiptEmailTemplate;
