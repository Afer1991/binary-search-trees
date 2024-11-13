class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(sortArray(arr), 0, sortArray(arr).length - 1);
  }

  print() {
    prettyPrint(this.root);
  }
}

const buildTree = (arr, start, end) => {
  if (start > end) {
    return null;
  } else {
    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

    return root;
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  };
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  };
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  };
};

const sortArray = (arr) => {
  const sortedArr = arr.sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });

  const removeDupes = [...new Set(sortedArr)];

  return removeDupes;
};