# AptosProof — Blockchain Document Verification

Secure, Immutable, Decentralized Document Authentication on Aptos Blockchain

# Overview

AptosProof is a decentralized document verification system that stores cryptographic hashes of documents on the Aptos blockchain. It provides immutable proof of existence and allows verification at any time.

Core Highlights

Immutable — Stored hashes cannot be changed
Fast — Powered by Aptos high-throughput network
Decentralized — No central control
Secure — SHA-256 based integrity protection
Simple — Minimal user interface, wallet integrated

# Features

Main Functions

Document hash generation (SHA-256)

On-chain hash storage

File verification and proof retrieval

Petra Wallet connection

## Project Tree

```
AptosProof/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── utils/
│       ├── aptosClient.js
│       └── hashUtils.js
├── move/
│   └── sources/
│       └── DocumentStore.move
├── scripts/
│   └── deploy_move_contract.sh
├── .aptos/
│   └── config.yaml
├── run.sh
├── README.md
└── TROUBLESHOOTING.md
```

---

## Screenshots

**1. Dashboard**

![Dashboard](./screenshots/dashboard.jpg)

**2. Store Document Hash**

![Store Hash](./screenshots/store-hash.jpg)

**3. Verify Document & Transaction Confirmation**

![Verify](./screenshots/verify.jpg)

---

# Contact Address

0xea365a84a0ab9824484073536f5ed85b3bf6aaa2f7a5c0b15856b7ae9c6c4841

---

**Summary**
AptosProof is a decentralized system for document authentication using the Aptos blockchain. It generates SHA-256 hashes of documents and stores them immutably on-chain, allowing later verification of authenticity without centralized databases. Built with a minimal HTML, CSS, and JavaScript frontend and a Move smart contract backend, it ensures immutability, transparency, and cryptographic integrity.

---
