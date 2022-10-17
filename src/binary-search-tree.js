const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
      return;
    }

    let parentNode = this._root;
    const childNode = new Node(data);
    while (true) {
      if (data <= parentNode.data) {
        if (!parentNode.left) {
          parentNode.left = childNode;
          break;
        }

        parentNode = parentNode.left;
        continue;
      }

      if (!parentNode.right) {
        parentNode.right = childNode;
        break;
      }

      parentNode = parentNode.right;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let target = this._root;
    while(true) {
      if (!target) {
        return null;
      }

      if (data === target.data) {
        return target;
      }

      if (data > target.data) {
        target = target.right;
        continue;
      }

      target = target.left;
    }
  }

  remove(data) {
    let target = this.find(data);
    if (!target) {
      return;
    }

    // leaf
    if (!target.left && !target.right) {
      const parent = this._findParent(data);
      if (parent.data <= target.data) {
        parent.right = null;
      } else {
        parent.left = null;
      }
      return;
    }

    if (!target.left || !target.right) {
      let childNode = target.left ?? target.right;
      target.data = childNode.data;
      target.left = childNode.left;
      target.right = childNode.right;
      return;
    }

    const minNodeFromRight = this._minFrom(target.right);
    target.data = minNodeFromRight.data;
    
    this.remove(minNodeFromRight.data);
  }

  min() {
    let target = this._root;
    while(target) {
      if (!target.left) {
        return target;
      }

      target = target.left;
    }

    return null;
  }

  max() {
    let target = this._root;
    while(target) {
      if (!target.right) {
        return target;
      }

      target = target.right;
    }

    return null;
  }

  _minFrom(node) {
    let target = node;
    while(target) {
      if (!target.left) {
        return target;
      }

      target = target.left;
    }

    return null;
  }

  _findParent(data) {
    let target = this._root;
    let parent = null;
    while(target) {
      if (data === target.data) {
        return parent;
      }

      parent = target;
      if (data > target.data) {
        target = target.right;
        continue;
      }

      target = target.left;
    }

    return null;
  }
}

module.exports = {
  BinarySearchTree
};