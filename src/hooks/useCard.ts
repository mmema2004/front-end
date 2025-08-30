import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../util/axios";

type Card = {
  id: string;
  bankName: string;
  type: string;
  branchName: string;
  accountNumber: number;
  balance: number;
  currencyId: number;
  clientId: number;
  isActive: boolean;
};

function useCard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [card, setCard] = useState<Card | null>(null);
  const { token } = useContext(AuthContext)!;
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    if (!token) return; 
    setLoading(true);
    try {
      const res = await axiosInstance.get("/bankaccount", {
         headers: { token },
      });
      setCards(res.data ?? []);
    } catch (error: any) {
      if (
        error.response?.status === 401 ||
        error.response?.data === "Invalid Token"
      )
        setCards([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchCard = useCallback(
    async (id: number) => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/bankaccount/${id}`, {
          headers: { token },
        });
        setCard(res.data ?? null);
      } catch (error: any) {
        if (
          error.response?.status === 401 ||
          error.response?.data === "Invalid Token"
        )
          setCard(null);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

    const removeCard = useCallback(
    async (id: number) => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axiosInstance.delete(`/bankaccount/${id}`, {
          headers: { token },
        });
        setCard(null);
      } catch (error: any) {
       
          error.response?.status === 401 ||
          error.response?.data === "Invalid Token"
        
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchCards();
  }, [fetchCards]); 

  return { cards, fetchCards, loading, fetchCard, card ,removeCard};
}

export default useCard;
