import { useEffect } from "react";
import useTransaction from "../hooks/useTransactions";

const Transactions = () => {
  const { transactions, loading, fetchTransactions } = useTransaction();
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      {Array.isArray(transactions) && transactions.length > 0 ? (
        transactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <p>{transaction.item}</p>
              <p>{transaction.transactionType}</p>
            </div>
          );
        })
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <p>transactions not found</p>
      )}
    </div>
  );
};

export default Transactions;
