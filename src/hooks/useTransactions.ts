import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../util/axios";

type Transaction = {
  id: number;
  bankId: number,
  item: string,
  shopName: string,
  date: Date,
  transactionType: string,
  ammount: number,
  currencyId: string,
  receipt:string,
  paymentMethod: string,
  isActive: boolean

};

function useTransaction() {
  const [transactions, setTransactions] = useState< Transaction[]>([]);
  const [transactionsBank , setTransactionsBank] = useState<Transaction[]>([]);
   const [transactionsType , setTransactionsType] = useState<Transaction[]>([]);
  const { token} = useContext(AuthContext)!;
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
      
      
      setLoading(true);
    try {
      const res = await axiosInstance.get("/transactions", {
        headers: { token }, 
      });
      const getTransactions = res.data ?? [];
      setTransactions(getTransactions);
      
     
      
    } catch (error: any) {
        if (
          error.response?.status === 401 ||
          error.response?.data === "Invalid Token"
        ) 
        setTransactions([]);
      } finally {
        setLoading(false);
      }
  };

  const fetchTransactionsByBank = async (id:number) => {
      
      
      setLoading(true);
    try {
      const res = await axiosInstance.get(`/transactions/${id}`, {
        headers: { token:token }, 
      });
      const getTransactions = res.data ?? [];
      setTransactionsBank(getTransactions);
      
     
      
    } catch (error: any) {
        if (
          error.response?.status === 401 ||
          error.response?.data === "Invalid Token"
        ) 
        setTransactionsBank([]);
      } finally {
        setLoading(false);
      }
  };

  const fetchTransactionsByType = async (transactionType:string) => {
      
      
      setLoading(true);
    try {
      const res = await axiosInstance.get(`/transactions/${transactionType}`, {
        headers: { token }, 
      });
      const getTransactions = res.data ?? [];
      setTransactionsType(getTransactions);
      
     
      
    } catch (error: any) {
        if (
          error.response?.status === 401 ||
          error.response?.data === "Invalid Token"
        ) 
        setTransactionsType([]);
      } finally {
        setLoading(false);
      }
  };



  useEffect(() => {
    fetchTransactions();
  
  }, [token ]);

  return { transactions,fetchTransactions , loading,transactionsBank,fetchTransactionsByBank ,fetchTransactionsByType , transactionsType };
}

export default useTransaction;