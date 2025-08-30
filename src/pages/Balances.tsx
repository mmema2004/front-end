import { useEffect } from "react";
import useCard from "../hooks/useCard";
import { useNavigate } from "react-router-dom";
import "../css/Balances.css";

const Balances = () => {
  const { cards, fetchCards, loading } = useCard()!;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <section className="balances-section">
      <p className="balances-title">Balances</p>
      <section style={{ flexDirection: "row", display: "flex", gap: "24px" }}>
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card) => {
            return (
              <section key={card.id} className="balances">
                <section className="balances-header">
                  <p className="balances-card-type">{card.type}</p>
                  <p className="balances-bankName">{card.bankName}</p>
                </section>
                <section className="balances-content">
                  <section className="balances-details">
                    <section className="balances-AccNumber">
                      <p className="balances-Acc">{card.accountNumber}</p>
                      <p className="Acc-title">Account Number</p>
                    </section>
                    <section className="balances-balance">
                      <p className="balance-num">{card.balance}</p>
                      <p className="balance-title">Total Amount</p>
                    </section>
                  </section>
                  <section className="balances-footer">
                    <p className="balances-remove-btn">Remove</p>
                    <button
                      className="balances-detail-btn"
                      onClick={() => navigate(`${card.id}`)}
                    >
                      Details {">"}
                    </button>
                  </section>
                </section>
              </section>
            );
          })
        ) : loading ? (
          <p>loading...</p>
        ) : (
          <p>no card found</p>
        )}
        <section className="balances">
          <button>Add Accounts</button>
          <button>Edit Accounts</button>
        </section>
      </section>
    </section>
  );
};

export default Balances;
