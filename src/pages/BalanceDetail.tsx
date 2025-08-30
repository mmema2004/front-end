import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCard from "../hooks/useCard";
import useTransaction from "../hooks/useTransactions";
import "../css/BalancesDetails.css";

type TransactionTable = {
  label: string;
};
const Transactions: TransactionTable[] = [
  {
    label: "Date",
  },
  {
    label: "Status",
  },
  {
    label: "Transaction Type",
  },
  { label: "Receipt" },
  { label: "Amount" },
];

const BalanceDetail = () => {
  const [showAll, setShowAll] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { card, fetchCard, loading, removeCard } = useCard();
  const { transactionsBank, fetchTransactionsByBank } = useTransaction();

  useEffect(() => {
    if (!id) return;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) return;

    fetchCard(parsedId);
    fetchTransactionsByBank(parsedId);
  }, [id]);

  const visibleCards = showAll
    ? transactionsBank
    : transactionsBank.slice(0, 4);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <section className="balance-details">
        <p className="account-details-title">Account Details</p>
        {loading ? (
          <p>Loading card...</p>
        ) : card && card.id ? (
          <section className="account-details" key={card.id}>
            <section className="details-section">
              <section className="details-top">
                <section className="account-divs">
                  <p className="account-titles">Bank Name</p>
                  <p className="account-infos">{card.bankName}</p>
                </section>
                <section className="account-divs">
                  <p className="account-titles">Account Type</p>
                  <p className="account-infos">{card.type}</p>
                </section>
                <section className="account-divs">
                  <p className="account-titles">Balance</p>
                  <p className="account-infos">{card.balance}</p>
                </section>
              </section>
              <section className="details-bottom">
                <section className="account-divs">
                  <p className="account-titles">Branch Name</p>
                  <p className="account-infos">{card.branchName}</p>
                </section>
                <section className="account-divs">
                  <p className="account-titles">Account Number</p>
                  <p className="account-infos">{card.accountNumber}</p>
                </section>
              </section>
            </section>
            <section className="account-buttons">
              <button className="account-edits">Edit Details</button>
              <button
                className="account-remove"
                onClick={() => removeCard(Number(card.id))}
              >
                Remove
              </button>
            </section>
          </section>
        ) : (
          <p>Card not found</p>
        )}
      </section>
      <section className="transaction-details">
        <p className="transaction-details-title">Transactions History</p>
        <section className="transaction-section">
          {loading ? (
            <p>Loading transactions...</p>
          ) : visibleCards && visibleCards.length > 0 ? (
            <>
              <section className="transaction-header">
                {Transactions.map((tran) => (
                  <div key={tran.label}>
                    <p>{tran.label}</p>
                  </div>
                ))}
              </section>

              <section className="transaction-body">
                {visibleCards.map((tx: any) => (
                  <section className="transaction-row" key={tx.id}>
                    <div>{new Date(tx.date).toLocaleDateString("en-GB")}</div>
                    <div>{tx.isActive ? "Completed" : "Not Completed"}</div>
                    <div>{tx.transactionType}</div>
                    <div>{tx.receipt}</div>
                    <div>{tx.ammount}</div>
                  </section>
                ))}
              </section>
            </>
          ) : (
            <p>No transactions found</p>
          )}
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <button
              className="transaction-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Load More"}
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default BalanceDetail;
