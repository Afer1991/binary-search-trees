class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sortArray(arr), 0, this.sortArray(arr).length - 1);
  }

  print(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    };

    if (node.right !== null) {
      this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    };

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    };
  }

  sortArray(arr) {
    const sortedArr = [...new Set(arr)].sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      };
    });

    return sortedArr;
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    } else {
      const mid = Math.floor((start + end) / 2);
      const root = new Node(arr[mid]);

      root.left = this.buildTree(arr, start, mid - 1);
      root.right = this.buildTree(arr, mid + 1, end);

      return root;
    };
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    };

    if (root.data === value) {
      return root;
    };

    if (root.data > value) {
      root.left = this.insert(value, root.left);
    } else if (root.data < value) {
      root.right = this.insert(value, root.right);
    };

    return root;
  }

  deleteItem(value, root = this.root) {
          
    const nodeReplacement = (node) => {
      node = node.right;
      while (node !== null && node.left !== null) {
        node = node.left;
      };
      return node;
    };

    if (root === null) {
      return root;
    };

    if (root.data > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteItem(value, root.right);
    } else {

      if (root.left === null) {
        return root.right;
      };

      if (root.right === null) {
        return root.left;
      };

      let node = nodeReplacement(root);
      root.data = node.data;
      root.right = this.deleteItem(node.data, root.right);

    };
    return root;
  }

  find(value, root = this.root) {
    if (root && root.data === value) {
      return root;
    };

    if(!root) {
      return null;
    };

    if (root.data > value) {
      return this.find(value, root.left);
    } else if (root.data < value) {
      return this.find(value, root.right);
    };
  }

  levelOrder(callback, root = this.root) {
    if (callback instanceof Function) {
      if (root === null) {
        return;
      };

      const queue = new Array();
      queue.push(root);
      
      while(queue.length !== 0) {
        callback(queue[0]);
        
        if (queue[0].left !== null) {
          queue.push(queue[0].left);
        };

        if (queue[0].right !== null) {
          queue.push(queue[0].right);
        };

        queue.shift();

      };

    } else {
      throw new Error("Argument is not a function");
    };
  }

  preOrder(callback, root = this.root) {
    if (callback instanceof Function) {
      if (root === null) {
        return;
      };
      
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    } else {
      throw new Error("Argument is not a function");
    };
  }

  inOrder(callback, root = this.root) {
    if (callback instanceof Function) {
      if (root === null) {
        return;
      };
      
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    } else {
      throw new Error("Argument is not a function");
    };
  }

  postOrder(callback, root = this.root) {
    if (callback instanceof Function) {
      if (root === null) {
        return;
      };
      
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    } else {
      throw new Error("Argument is not a function");
    };
  }
}