import { useCustomerReferenceStore } from "@/client/store";
import { CustomerLayout } from "@/client/components/layout";
import { formatDate } from "@/client/lib/TextFormatter";
import Link from "next/link";

const HistoryOrders = () => {
  const { customerReference } = useCustomerReferenceStore();
  return (
    <CustomerLayout isLoading={false}>
      <section id="orders" className="space-y-3">
        <div className="mt-3 w-full rounded-lg bg-white p-2 text-center">
          <h3 className="text-lg lg:text-2xl">Order History</h3>
        </div>
        <div className="space-y-3">
          {customerReference.history ? (
            customerReference.history.map((i) => {
              return (
                <Link key={i.transactionNo} href={`/orders/${i.transactionNo}`}>
                  <div className="rounded-lg bg-white p-2 text-sm">
                    <p>
                      <strong>Transaction No:</strong> {i.transactionNo}
                    </p>
                    <p>
                      <strong>Table Number</strong>: {i.tableNumber}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(new Date(i.date))}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </div>
      </section>
    </CustomerLayout>
  );
};

export default HistoryOrders;
