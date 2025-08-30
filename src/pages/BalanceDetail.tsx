import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCard from "../hooks/useCard";
import useTransaction from "../hooks/useTransactions";

const BalanceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { card, fetchCard, loading } = useCard();
  const { transactionsBank, fetchTransactionsByBank } = useTransaction();

  useEffect(() => {
    if (!id) return;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) return;

    fetchCard(parsedId);
    fetchTransactionsByBank(parsedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {/* --- Card Section --- */}
      {loading ? (
        <p>Loading card...</p>
      ) : card && card.id ? (
        <div key={card.id}>
          <p>{card.bankName}</p>
          <p>{card.type}</p>
        </div>
      ) : (
        <p>Card not found</p>
      )}

      {/* --- Transactions Section --- */}
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactionsBank && transactionsBank.length > 0 ? (
        <div>
          {transactionsBank.map((tx: any) => (
            <div key={tx.id}>
              <p>{tx.item}</p>
              <p>{tx.ammount}</p>
              <p>{tx.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};

export default BalanceDetail;
