const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const MODULE_ADDRESS = "0x1b4f9f57c1525220fe12d508291a670f4aa9330aa650dfa37d9e7c065a2006fb";

console.log("aptosClient.js loaded");
console.log("NODE_URL:", NODE_URL);
console.log("MODULE_ADDRESS:", MODULE_ADDRESS);
console.log("Smart Contract Deployed: ✅");

async function connectPetra() {
  if (!window.petra) {
    alert("❌ Petra Wallet not installed!\n\nPlease install Petra Wallet extension from Chrome Web Store or Firefox Add-ons.");
    console.error("Petra wallet not found");
    return null;
  }
  try {
    console.log("Attempting to connect to Petra...");
    const response = await window.petra.connect();
    console.log("Petra connected successfully:", response);
    return response.address;
  } catch (err) {
    console.error("Connection failed:", err);
    alert("Failed to connect to Petra Wallet. Please make sure the extension is unlocked.");
    return null;
  }
}

async function uploadHashToAptos(fileHash) {
  if (!window.petra) {
    alert("Petra wallet not found");
    return null;
  }
  
  try {
    console.log("Converting hash to bytes...");
    // Convert hex string to Uint8Array (browser-compatible)
    const hashBytes = new Uint8Array(fileHash.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    console.log("Hash bytes:", hashBytes.length, "bytes");
    
    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::DocumentStore::add_hash`,
      type_arguments: [],
      arguments: [Array.from(hashBytes)], // Only argument is the hash
    };
    
    console.log("Submitting transaction...", payload);
    const txn = await window.petra.signAndSubmitTransaction(payload);
    console.log("Transaction submitted:", txn);
    return txn.hash;
  } catch (err) {
    console.error("Transaction error:", err);
    if (err.message.includes("User rejected")) {
      alert("Transaction was rejected. Please approve the transaction in Petra Wallet.");
    } else if (err.message.includes("EHASH_ALREADY_EXISTS")) {
      alert("This document hash has already been stored on the blockchain.");
    } else {
      alert("Transaction failed: " + err.message);
    }
    return null;
  }
}

async function verifyHashOnAptos(fileHash) {
  try {
    console.log("=== VERIFICATION START ===");
    console.log("File hash (hex):", fileHash);
    
    // The view function expects hex string with 0x prefix
    const hexString = "0x" + fileHash;
    
    console.log("Hex string for API:", hexString);
    
    const payload = {
      function: `${MODULE_ADDRESS}::DocumentStore::verify_hash`,
      type_arguments: [],
      arguments: [hexString], // Only argument is the hash, no ownerAddress
    };
    
    console.log("Payload to send:", JSON.stringify(payload, null, 2));
    
    const res = await fetch(`${NODE_URL}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", JSON.stringify(data, null, 2));
    
    if (!res.ok) {
      console.error("API error:", data);
      if (data.message) {
        console.error("Error message:", data.message);
      }
      return false;
    }
    
    // The contract now returns [bool, address]
    const result = data[0] === true;
    if (result) {
        console.log("✅ VERIFIED: Hash was uploaded by:", data[1]);
    }
    
    console.log("Verification result:", result);
    console.log("=== VERIFICATION END ===");
    
    return result;
  } catch (err) {
    console.error("Verification error:", err);
    alert("Verification failed: " + err.message);
    return false;
  }
}