module AptosProof::DocumentStore {
    use std::signer;
    use std::vector;

    struct StoredHashes has key {
        hashes: vector<vector<u8>>,
    }

    public entry fun add_hash(account: &signer, doc_hash: vector<u8>) acquires StoredHashes {
        let owner = signer::address_of(account);
        if (!exists<StoredHashes>(owner)) {
            move_to(account, StoredHashes { hashes: vector::empty<vector<u8>>() });
        };
        let store = borrow_global_mut<StoredHashes>(owner);
        vector::push_back(&mut store.hashes, doc_hash);
    }

    #[view]
    public fun verify_hash(owner: address, doc_hash: vector<u8>): bool acquires StoredHashes {
        if (!exists<StoredHashes>(owner)) return false;
        let store = borrow_global<StoredHashes>(owner);
        let hashes_ref = &store.hashes;
        let len = vector::length(hashes_ref);
        let i = 0;
        while (i < len) {
            let existing = vector::borrow(hashes_ref, i);
            if (*existing == doc_hash) return true;
            i = i + 1;
        };
        false
    }
}
