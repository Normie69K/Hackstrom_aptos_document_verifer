const uploadFile = document.getElementById("uploadFile");
const generateHashBtn = document.getElementById("generateHashBtn");
const hashDisplay = document.getElementById("hashDisplay");
const saveToAptosBtn = document.getElementById("saveToAptosBtn");
const txnStatus = document.getElementById("txnStatus");
const uploadFileInfo = document.getElementById("uploadFileInfo");

const verifyFile = document.getElementById("verifyFile");
const verifyHashBtn = document.getElementById("verifyHashBtn");
const verifyStatus = document.getElementById("verifyStatus");
const verifyFileInfo = document.getElementById("verifyFileInfo");

const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

let currentFileHash = "";
let connectedWallet = "";

console.log("AptosProof loaded successfully!");
console.log("Module Address:", MODULE_ADDRESS);
console.log("Node URL:", NODE_URL);

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Helper function to display file info
function displayFileInfo(file, infoElement) {
  const fileInfo = `
    <div class="file-info-item">
      <span class="file-info-label">📄 File Name:</span>
      <span class="file-info-value">${file.name}</span>
    </div>
    <div class="file-info-item">
      <span class="file-info-label">📦 Size:</span>
      <span class="file-info-value">${formatFileSize(file.size)}</span>
    </div>
    <div class="file-info-item">
      <span class="file-info-label">🏷️ Type:</span>
      <span class="file-info-value">${file.type || 'Unknown'}</span>
    </div>
  `;
  infoElement.innerHTML = fileInfo;
  infoElement.style.display = 'block';
}

// Upload file change listener
uploadFile.addEventListener("change", () => {
  const file = uploadFile.files[0];
  if (file) {
    displayFileInfo(file, uploadFileInfo);
    hashDisplay.textContent = "";
    saveToAptosBtn.disabled = true;
    txnStatus.textContent = "";
  }
});

// Verify file change listener
verifyFile.addEventListener("change", () => {
  const file = verifyFile.files[0];
  if (file) {
    displayFileInfo(file, verifyFileInfo);
    verifyStatus.textContent = "";
  }
});

connectBtn.addEventListener("click", async () => {
  console.log("Connect button clicked");
  walletAddress.textContent = "🔄 Connecting...";
  walletAddress.className = "loading";
  try {
    connectedWallet = await connectPetra();
    console.log("Connected wallet:", connectedWallet);
    if (connectedWallet) {
      walletAddress.textContent = `✅ Connected: ${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}`;
      walletAddress.className = "success";
      connectBtn.textContent = "✅ Wallet Connected";
      connectBtn.disabled = true;
    } else {
      walletAddress.textContent = "❌ Failed to connect";
      walletAddress.className = "error";
    }
  } catch (err) {
    console.error("Connection error:", err);
    walletAddress.textContent = "❌ Error: " + err.message;
    walletAddress.className = "error";
  }
});

generateHashBtn.addEventListener("click", async () => {
  console.log("Generate hash button clicked");
  const file = uploadFile.files[0];
  if (!file) {
    alert("⚠️ Please select a file first");
    return;
  }
  console.log("File selected:", file.name);
  hashDisplay.innerHTML = '<span class="spinner"></span> Generating hash...';
  hashDisplay.className = "status-message loading";
  try {
    const hash = await generateFileHash(file);
    currentFileHash = hash;
    console.log("Generated hash:", hash);
    hashDisplay.innerHTML = `<strong>🔑 SHA-256 Hash:</strong><br>${hash}`;
    hashDisplay.className = "status-message success";
    saveToAptosBtn.disabled = false;
  } catch (err) {
    console.error("Hash generation error:", err);
    hashDisplay.textContent = "❌ Error generating hash: " + err.message;
    hashDisplay.className = "status-message error";
  }
});

saveToAptosBtn.addEventListener("click", async () => {
  console.log("Save to Aptos button clicked");
  if (!connectedWallet) {
    alert("⚠️ Please connect your wallet first");
    return;
  }
  txnStatus.innerHTML = '<span class="spinner"></span> Submitting transaction to Aptos...';
  txnStatus.className = "status-message loading";
  console.log("Uploading hash:", currentFileHash);
  try {
    const txnHash = await uploadHashToAptos(currentFileHash);
    console.log("Transaction hash:", txnHash);
    if (txnHash) {
      txnStatus.innerHTML = `<span class="checkmark"></span> <strong>Successfully saved to Aptos!</strong><br>Transaction: ${txnHash.slice(0, 10)}...${txnHash.slice(-8)}`;
      txnStatus.className = "status-message success";
    } else {
      txnStatus.textContent = "❌ Transaction failed - Please try again";
      txnStatus.className = "status-message error";
    }
  } catch (err) {
    console.error("Upload error:", err);
    txnStatus.textContent = "❌ Error: " + err.message;
    txnStatus.className = "status-message error";
  }
});

verifyHashBtn.addEventListener("click", async () => {
  console.log("Verify button clicked");
  if (!connectedWallet) {
    alert("⚠️ Please connect your wallet first");
    return;
  }
  const file = verifyFile.files[0];
  if (!file) {
    alert("⚠️ Please select a file first");
    return;
  }
  console.log("Verifying file:", file.name);
  verifyStatus.innerHTML = '<span class="spinner"></span> Verifying on Aptos blockchain...';
  verifyStatus.className = "status-message loading";
  try {
    const hash = await generateFileHash(file);
    console.log("Hash to verify:", hash);
    const found = await verifyHashOnAptos(hash, connectedWallet);
    console.log("Verification result:", found);
    if (found) {
      verifyStatus.innerHTML = '<span class="checkmark"></span> <strong>✅ Document Verified!</strong><br>This document exists on the Aptos blockchain';
      verifyStatus.className = "status-message success";
    } else {
      verifyStatus.innerHTML = '❌ <strong>Document Not Found</strong><br>This document hash is not registered on the blockchain';
      verifyStatus.className = "status-message error";
    }
  } catch (err) {
    console.error("Verification error:", err);
    verifyStatus.textContent = "❌ Error: " + err.message;
    verifyStatus.className = "status-message error";
  }
});
