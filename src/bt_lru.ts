import { TreeNode } from "./interfaces";

export class BSTLruCache<T> {
    private capacity: number;
    private cache: Map<string, TreeNode<T>> = new Map();
    private head: TreeNode<T> | undefined;
    private tail: TreeNode<T> | undefined;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: string): T | undefined {
        const node = this.cache.get(key);
        if (!node) {
            return undefined;
        }
        this.moveToFront(node);
        return node.value;
    }

    set(key: string, value: T): void {
        let node = this.cache.get(key);
        if (node) {
            node.value = value;
            this.moveToFront(node);
        } else {
            node = { key, value };
            this.cache.set(key, node);
            this.addToFront(node);
            if (this.cache.size > this.capacity) {
                this.removeLRU();
            }
        }
    }

    private addToFront(node: TreeNode<T>): void {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }

    private removeLRU(): void {
        if (this.tail) {
            const key = this.tail.key;
            this.cache.delete(key);
            if (this.tail.prev) {
                this.tail = this.tail.prev;
                this.tail.next = undefined;
            } else {
                this.head = undefined;
                this.tail = undefined;
            }
        }
    }

    private moveToFront(node: TreeNode<T>): void {
        if (node === this.head) {
            return;
        } else if (node === this.tail) {
            this.tail = this.tail.prev;
            this.tail!.next = undefined;
        } else {
            node.prev!.next = node.next;
            node.next!.prev = node.prev;
        }

        node.prev = undefined;
        node.next = this.head;
        this.head!.prev = node;
        this.head = node;
    }
}

function BSTLruCacheDecorator<T>(capacity: number) {
    const cache = new BSTLruCache<T>(capacity);
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const cacheKey = `${propertyKey}_${JSON.stringify(args)}`;
            const cachedResult = cache.get(cacheKey);
            if (cachedResult !== undefined) {
                console.log('Retrieved from cache:', cachedResult);
                return cachedResult;
            } else {
                const result = originalMethod.apply(this, args);
                console.log('Setting cache:', result);
                cache.set(cacheKey, result);
                return result;
            }
        };
    };
}
