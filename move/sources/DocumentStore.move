module AptosProof::DocumentStore {
    use std::signer;
    use std::vector;
    use aptos_std::table::{Self, Table};
    use aptos_framework::object::{Self, ObjectGroup};

    /// Error code for when store is not initialized
    const ESTORE_NOT_INITIALIZED: u64 = 1;
    /// Error code for when hash already exists
    const EHASH_ALREADY_EXISTS: u64 = 2;

    /// A global store for all document hashes.
    /// Stored in the ObjectGroup of the contract address.
    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct HashStore has key {
        hashes: Table<vector<u8>, address>,
    }

    /// Initializes the global hash store.
    /// This must be called once by the contract deployer.
    public entry fun initialize(account: &signer) {
        let deployer_addr = signer::address_of(account);
        // Only initialize if it doesn't exist at the contract address
        if (!exists<HashStore>(deployer_addr)) {
            move_to(account, HashStore {
                hashes: table::new()
            });
        }
    }

    /// Adds a document hash to the global store.
    /// The hash is associated with the signer's address.
    public entry fun add_hash(account: &signer, doc_hash: vector<u8>) acquires HashStore {
        let owner = signer::address_of(account);
        // The HashStore is stored at the module publisher's address (AptosProof address)
        let store_addr = @AptosProof;
        
        assert!(exists<HashStore>(store_addr), ESTORE_NOT_INITIALIZED);

        let store = borrow_global_mut<HashStore>(store_addr);
        
        // Ensure the hash doesn't already exist to prevent overwriting
        assert!(!table::contains(&store.hashes, doc_hash), EHASH_ALREADY_EXISTS);

        // Add the hash and map it to the uploader's address
        table::add(&mut store.hashes, doc_hash, owner);
    }

    /// Verifies if a hash exists in the global store.
    /// Returns a tuple: (bool: exists, address: uploader_address)
    #[view]
    public fun verify_hash(doc_hash: vector<u8>): (bool, address) acquires HashStore {
        let store_addr = @AptosProof;
        
        if (!exists<HashStore>(store_addr)) {
            return (false, @0x0) // Return false and a null address
        };

        let store = borrow_global<HashStore>(store_addr);
        
        if (table::contains(&store.hashes, doc_hash)) {
            let uploader_address = *table::borrow(&store.hashes, doc_hash);
            (true, uploader_address)
        } else {
            (false, @0x0)
        }
    }
}