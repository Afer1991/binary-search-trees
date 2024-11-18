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
}
