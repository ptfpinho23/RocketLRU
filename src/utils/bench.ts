import { BSTLruCache } from "../bt_lru";

async function benchmarkLRUCache(capacity: number, iterations: number) {
    console.log(`Benchmarking LRU cache with capacity ${capacity} and ${iterations} iterations`);
    const cache = new BSTLruCache(capacity);


    // Add
    const startAdd = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
        cache.set(i.toString(), i);
    }
    const endAdd = process.hrtime.bigint();
    console.log(`LRU Cache took ${(endAdd - startAdd) / BigInt(1000000)}ms to add entries`);

    // Access
    const startAccess = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
        const val = cache.get(i.toString());
    }
    const endAccess = process.hrtime.bigint();
    console.log(`LRU Cache took ${(endAccess - startAccess) / BigInt(1000000)}ms to access entries`);
}

function benchmarkHashMap(capacity: number, iterations: number) {
    console.log(`Benchmarking hash map with capacity ${capacity} and ${iterations} iterations`);
    const cache: { [key: string]: number } = {};

    // Add
    const startAdd = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
        cache[i.toString()] = i;
    }
    const endAdd = process.hrtime.bigint();
    console.log(`Hash Map took ${(endAdd - startAdd) / BigInt(1000000)}ms to add entries`);

    // Access
    const startAccess = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) {
        const val = cache[i.toString()];
    }
    const endAccess = process.hrtime.bigint();
    console.log(`Hash Map took ${(endAccess - startAccess) / BigInt(1000000)}ms to access entries`);
}

const capacity = 100000;
const iterations = 100000;

benchmarkLRUCache(capacity, iterations);
benchmarkHashMap(capacity, iterations);
