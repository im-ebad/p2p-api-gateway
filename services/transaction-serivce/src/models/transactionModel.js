
const db = require("../database/db");

// Create a new transaction
const createTransaction = (sender_id, receiver_id, amount, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err, null);

        // Step 1: Check sender's balance
        const checkBalanceQuery = "SELECT balance FROM users WHERE id = ?";
        db.query(checkBalanceQuery, [sender_id], (err, result) => {
            if (err) return db.rollback(() => callback(err, null));
            if (result.length === 0) return db.rollback(() => callback({ message: "Sender not found" }, null));
            
            let senderBalance = result[0].balance;
            if (senderBalance < amount) {
                return db.rollback(() => callback({ message: "Insufficient balance" }, null));
            }

            // Step 2: Deduct from sender & add to receiver
            const updateSenderQuery = "UPDATE users SET balance = balance - ? WHERE id = ?";
            const updateReceiverQuery = "UPDATE users SET balance = balance + ? WHERE id = ?";

            db.query(updateSenderQuery, [amount, sender_id], err => {
                if (err) return db.rollback(() => callback(err, null));

                db.query(updateReceiverQuery, [amount, receiver_id], err => {
                    if (err) return db.rollback(() => callback(err, null));

                    // Step 3: Insert transaction record
                    const insertTransaction = `
                        INSERT INTO transactions (sender_id, receiver_id, amount, status)
                        VALUES (?, ?, ?, 'completed')
                    `;
                    db.query(insertTransaction, [sender_id, receiver_id, amount], (err, result) => {
                        if (err) return db.rollback(() => callback(err, null));

                        db.commit(err => {
                            if (err) return db.rollback(() => callback(err, null));
                            callback(null, result);
                        });
                    });
                });
            });
        });
    });
};

// Get transaction history for a user
const getUserTransactions = (user_id, callback) => {
    const query = `
        SELECT t.id, t.amount, t.status, t.created_at,
               sender.username AS sender_name, receiver.username AS receiver_name
        FROM transactions t
        JOIN users sender ON t.sender_id = sender.id
        JOIN users receiver ON t.receiver_id = receiver.id
        WHERE sender_id = ? OR receiver_id = ?
        ORDER BY t.created_at DESC
    `;
    db.query(query, [user_id, user_id], callback);
};

module.exports = { createTransaction, getUserTransactions };

