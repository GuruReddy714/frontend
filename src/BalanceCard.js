import React, { useState, useEffect } from 'react';

const BalanceCard = () => {
    const [balance, setBalance] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const userId = 1;

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await fetch(`http://localhost:3000/wallet/${userId}`);
            const data = await response.json();
            if (data.balance !== undefined) {
                setBalance(data.balance);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const handleAddFunds = async () => {
        const amount = prompt('Enter the amount to add:');
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid positive number');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/wallet/add-funds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, amount: parseFloat(amount) }),
            });
            const data = await response.json();
            if (data.balance !== undefined) {
                setBalance(data.balance);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error adding funds:', error);
        }
    };

    const handleDeductFunds = async () => {
        const amount = prompt('Enter the amount to deduct:');
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid positive number');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/wallet/deduct-funds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, amount: parseFloat(amount) }),
            });
            const data = await response.json();
            if (data.balance !== undefined) {
                setBalance(data.balance);
                setErrorMessage('');
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error('Error deducting funds:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Wallet Balance</h2>
            <div style={{ fontSize: '24px', margin: '20px 0' }}>${balance}</div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleAddFunds} style={{ marginRight: '10px' }}>
                Add Funds
            </button>
            <button onClick={handleDeductFunds}>Deduct Funds</button>
        </div>
    );
};

export default BalanceCard;
