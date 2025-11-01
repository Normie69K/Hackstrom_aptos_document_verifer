async function generateFileHash(file) {
  console.log("Generating hash for file:", file.name, "Size:", file.size);
  
  try {
    // Check if crypto.subtle is available
    if (!window.crypto || !window.crypto.subtle) {
      console.error("Crypto API not available - using fallback");
      // Fallback to a simpler hash for non-HTTPS contexts
      return await generateSimpleHash(file);
    }
    
    const buffer = await file.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    console.log("Hash generated successfully:", hashHex.substring(0, 16) + "...");
    return hashHex;
  } catch (err) {
    console.error("Error in generateFileHash:", err);
    throw err;
  }
}

// Fallback hash function for non-HTTPS contexts
async function generateSimpleHash(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      let hash = 0;
      for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      // Convert to hex and pad to 64 characters (256 bits)
      const hexHash = Math.abs(hash).toString(16).padStart(64, '0');
      console.log("Simple hash generated:", hexHash);
      resolve(hexHash);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

console.log("hashUtils.js loaded");
console.log("Crypto API available:", !!(window.crypto && window.crypto.subtle));
