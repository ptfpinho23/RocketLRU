function benchmarkLRUCache(capacity: number, iterations: number) {
    console.log(`Benchmarking LRU cache with capacity ${capacity} and ${iterations} iterations`);
    const cache = new LRUCache<number>(capacity);
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
        cache.set(i.toString(), i);
    }
    const end = Date.now();
    console.log(`Elapsed time: ${end - start}ms`);
}

function benchmarkHashMap(capacity: number, iterations: number) {
    console.log(`Benchmarking hash map with capacity ${capacity} and ${iterations} iterations`);
    const cache: { [key: string]: number } = {};
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
        const key = i.toString();
        if (cache[key] !== undefined) {
            // Retrieve from cache
            console.log('Retrieved from cache:', cache[key]);
        } else {
            // Compute and store result
            const result = i * i;
            console.log('Setting cache:', result);
            cache[key] = result;
            // Evict least recently used entry if cache is full
            if (Object.keys(cache).length > capacity) {
                const lruKey = Object.keys(cache)[0];
                delete cache[lruKey];
            }
        }
    }
    const end = Date.now();
    console.log(`Elapsed time: ${end - start}ms`);
}

const capacity = 1000;
const iterations = 10000;

benchmarkLRUCache(capacity, iterations);
benchmarkHashMap(capacity, iterations);
