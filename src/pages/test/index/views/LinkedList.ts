/*
  @Author: lize
  @Date: 2021/4/6
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/6
 */

class CNode {
  element = null;
  next = null;
  constructor(element) {
    this.element = element; // 当前节点的元素
    this.next = null; // 下一个节点链接
  }
}

class LinkedList {
  head = null
  constructor() {
    this.head = new CNode('head');
  }

  // 查找节点
  find(item: any) {
    let currNode = this.head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // 插入节点
  insert(newElement: any, item?: any) {
    item = item ? item : 'head'; // eslint-disable-line
    const newNode = new CNode(newElement);
    const currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  }

  // 显示链表
  display(head?: any) {
    let currNode = head || this.head;
    console.log(currNode.element);
    while (currNode.next) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  // 查找带删除节点的前一个节点
  findPrev(item) {
    let currNode = this.head;
    while (currNode.next && (currNode.next.element !== item)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  // 删除节点
  remove(item) {
    const prevNode = this.findPrev(item);
    if (prevNode.next) {
      prevNode.next = prevNode.next.next;
    }
  }

  // 反转节点
  reverseList() {
    if (!this.head) return null;
    let newHead = this.head;
    const p = newHead;
    let q = null;
    while (p.next) {
      q = p.next;
      p.next = q.next;
      q.next = newHead;
      newHead = q;
    }
    this.display(newHead);
    console.log(newHead);
    return newHead;
  }

  // 删除倒数第n个链表；并返回头节点
  removeNthFromEnd(n: number) {
    const newNodeList = [this.head];
    let currNode = this.head;
    let t = 0;
    while (currNode.next) {
      newNodeList.push(currNode.next);
      currNode = currNode.next;
    }
    const index = newNodeList.length - n;
    if (index === 0) {
      this.head = this.head.next; // eslint-disable-line
      return this.head;
    }
    let p = this.head;
    while (p.next && t !== index - 1) {
      p = p.next;
      t += 1;
    }
    if (p.next) {
      p.next = p.next.next ? p.next.next : null;
    }
    return this.head;
  }
}
export default new LinkedList();
