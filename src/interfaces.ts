interface TreeNode<T> {
    key: string;
    value: T;
    next?: TreeNode<T>;
    prev?: TreeNode<T>;
  }
