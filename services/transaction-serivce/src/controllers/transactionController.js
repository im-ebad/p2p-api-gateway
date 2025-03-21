
const Transaction = require("../models/transactionModel");

exports.transfer = (req, res) => {
    const { sender_id, receiver_id, amount } = req.body;

    if (sender_id === receiver_id) {
        return res.status(400).json({ message: "Cannot send money to yourself" });
    }

    Transaction.createTransaction(sender_id, receiver_id, amount, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Transaction successful", transaction_id: result.insertId });
    });
};

exports.getHistory = (req, res) => {
    const user_id = req.params.user_id;

    Transaction.getUserTransactions(user_id, (err, transactions) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(transactions);
    });
};

