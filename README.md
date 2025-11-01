# 🔐 AptosProof - Blockchain Document Verification

> **Secure, Immutable, Decentralized Document Authentication on Aptos Blockchain**

![Hackathon Ready](https://img.shields.io/badge/Hackathon-Ready-brightgreen)
![Aptos](https://img.shields.io/badge/Blockchain-Aptos-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Overview

**AptosProof** is a decentralized document verification system built on the Aptos blockchain. It allows users to store cryptographic hashes of documents on-chain, creating an immutable proof of existence that can be verified at any time.

### Why AptosProof?

- **🔒 Immutable**: Once stored, document hashes cannot be altered or deleted
- **⚡ Fast**: Leverages Aptos's high-throughput blockchain for instant verification
- **🌐 Decentralized**: No central authority - you control your data
- **🔐 Secure**: Uses SHA-256 cryptographic hashing
- **✅ Easy to Use**: Simple, intuitive web interface with Petra Wallet integration

---

## ✨ Features

### Core Features
- ✅ **Document Hash Generation** - Creates SHA-256 hash of any file
- ✅ **Blockchain Storage** - Stores hashes immutably on Aptos
- ✅ **Document Verification** - Verifies if a document exists on-chain
- ✅ **Wallet Integration** - Seamless Petra Wallet connection
- ✅ **Real-time Feedback** - Loading states, success animations, error handling

### Technical Features
- 🎨 **Modern UI/UX** - Beautiful gradient design with animations
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔄 **File Metadata Display** - Shows file size, type, and name
- 📊 **Transaction Tracking** - Displays transaction hashes
- 🛡️ **Error Handling** - Comprehensive error messages and fallbacks
- 🌐 **Browser Compatible** - Works with or without HTTPS (crypto fallback)

---

## 🏗️ Architecture

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern animations and gradients
- **Vanilla JavaScript** - No frameworks, pure performance

### Blockchain
- **Aptos Move** - Smart contract for hash storage
- **Petra Wallet** - Web3 wallet integration
- **Aptos DevNet** - Fast, scalable blockchain

### Flow Diagram

```
User → Select File → Generate SHA-256 Hash → Sign with Petra → Store on Aptos
                                                                      ↓
User → Select File → Generate SHA-256 Hash → Query Aptos → Verify Match
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (optional, for development)
- Python 3 (for local server)
- Petra Wallet browser extension
- Web browser (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/AptosProof.git
cd AptosProof
```

2. **Start the development server**
```bash
./run.sh
```

Or manually:
```bash
cd frontend
python3 -m http.server 5500
```

3. **Open in browser**
```
http://localhost:5500
```

4. **Install Petra Wallet**
- Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci)
- Create or import a wallet
- Switch to DevNet in settings

---

## 📖 Usage Guide

### Step 1: Connect Wallet
1. Click **"Connect Petra Wallet"**
2. Approve the connection in Petra popup
3. You'll see your wallet address displayed

### Step 2: Store Document Hash
1. Click **"Choose File"** in the "Store Document Hash" section
2. Select any file from your computer
3. Click **"Generate Hash"** to create SHA-256 hash
4. Click **"Save to Aptos Blockchain"**
5. Approve the transaction in Petra
6. Wait for confirmation ✅

### Step 3: Verify Document
1. Click **"Choose File"** in the "Verify Document" section
2. Select the file you want to verify
3. Click **"Verify on Blockchain"**
4. See instant verification result!

---

## 🎯 Use Cases

### For Individuals
- **Proof of Authorship** - Timestamp your creative works
- **Document Integrity** - Prove a document hasn't been altered
- **Digital Notarization** - Create tamper-proof records

### For Businesses
- **Contract Verification** - Verify legal document authenticity
- **Audit Trails** - Create immutable audit logs
- **Supply Chain** - Track and verify product documentation
- **Compliance** - Maintain verifiable records

### For Developers
- **License Verification** - Prove software licenses
- **Code Timestamping** - Timestamp code releases
- **API Integration** - Build on top of AptosProof

---

## 🛠️ Technical Details

### Smart Contract

Located in `move/sources/DocumentStore.move`

```move
module DocumentStore {
    // Stores document hashes with owner address
    public entry fun add_hash(account: &signer, document_hash: vector<u8>)
    
    // Verifies if a hash exists for an owner
    public fun verify_hash(owner: address, document_hash: vector<u8>): bool
}
```

### API Endpoints

**Add Hash (Transaction)**
```javascript
{
  type: "entry_function_payload",
  function: "0x{address}::DocumentStore::add_hash",
  arguments: [Array.from(hashBytes)]
}
```

**Verify Hash (View Function)**
```javascript
{
  function: "0x{address}::DocumentStore::verify_hash",
  arguments: [ownerAddress, Array.from(hashBytes)]
}
```

### Hash Generation

- **Algorithm**: SHA-256
- **Format**: Hexadecimal (64 characters)
- **Fallback**: Simple hash for non-HTTPS contexts
- **Browser API**: `crypto.subtle.digest()`

---

## 🏆 Hackathon Highlights

### Innovation
- ✨ First-class Move smart contract integration
- ✨ Seamless Web3 wallet experience
- ✨ Beautiful, modern UI that stands out

### Technical Excellence
- 💻 Clean, well-documented code
- 💻 Comprehensive error handling
- 💻 Browser fallbacks for crypto API

### User Experience
- 🎨 Stunning gradient design
- 🎨 Smooth animations and transitions
- 🎨 Clear, informative feedback

### Real-World Application
- 🌍 Solves actual problems (document verification)
- 🌍 Scalable architecture
- 🌍 Production-ready code

---

## 📁 Project Structure

```
AptosProof/
├── frontend/
│   ├── index.html           # Main HTML file
│   ├── style.css            # Beautiful CSS with animations
│   ├── script.js            # Main application logic
│   └── utils/
│       ├── aptosClient.js   # Aptos blockchain interactions
│       └── hashUtils.js     # File hashing utilities
├── move/
│   └── sources/
│       └── DocumentStore.move  # Smart contract
├── scripts/
│   └── deploy_move_contract.sh # Deployment script
├── .aptos/
│   └── config.yaml          # Aptos configuration
├── run.sh                   # Quick start script
├── README.md                # This file
└── TROUBLESHOOTING.md       # Debug guide
```

---

## 🔧 Configuration

### Network Configuration
- **Network**: Aptos DevNet
- **RPC URL**: `https://fullnode.devnet.aptoslabs.com/v1`
- **Module Address**: Configured in `.aptos/config.yaml`

### Environment Variables
No environment variables needed! Everything is configured in the code.

---

## 🐛 Troubleshooting

### Common Issues

**❌ "Petra Wallet not installed"**
- Install Petra from Chrome Web Store
- Refresh the page after installation

**❌ "Error generating hash"**
- Try serving over HTTPS for crypto.subtle API
- Or use the fallback hash function (automatically enabled)

**❌ "Transaction failed"**
- Ensure you have APT tokens (use DevNet faucet)
- Check that smart contract is deployed
- Verify Petra is unlocked

**❌ "Document not found"**
- Ensure you uploaded the EXACT same file
- Hash must match byte-for-byte

See `TROUBLESHOOTING.md` for detailed debugging steps.

---

## 🚀 Deployment

### Deploy Smart Contract

```bash
cd move
aptos move compile
aptos move publish
```

### Deploy Frontend

Deploy to any static hosting:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `frontend/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **IPFS**: Decentralized hosting

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ for the hackathon by passionate blockchain developers.

---

## 🌟 Future Roadmap

- [ ] Multi-chain support (Ethereum, Solana)
- [ ] Batch document upload
- [ ] Document sharing and permissions
- [ ] Email notifications for verifications
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Enterprise dashboard
- [ ] NFT certificates for verified documents

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs](https://github.com/yourusername/AptosProof/issues)
- **Documentation**: See `/docs` folder
- **Email**: support@aptosproof.com (coming soon)

---

## 🎉 Acknowledgments

- **Aptos Labs** - For the amazing blockchain platform
- **Petra Wallet** - For seamless Web3 integration
- **Hackathon Organizers** - For the opportunity
- **Open Source Community** - For inspiration and tools

---

<div align="center">

**Built for excellence. Designed for hackathons. Ready for production.**

⭐ Star this repo if you like it! ⭐

[Demo](http://localhost:5500) • [Documentation](./docs) • [Report Bug](https://github.com/yourusername/AptosProof/issues)

</div>
