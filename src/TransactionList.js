// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get(`http://localhost:3001/transaction/history/${userId}`);
            setTransactions(response.data);
        };
        fetchTransactions();
    }, [userId]);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.type} - ${transaction.amount} on {transaction.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
