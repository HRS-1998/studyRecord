// @ts-nocheck
/** js 链表操作 */
//1.定义单向链表的节点类
class Node {
    constructor(data) {
        this.data = data;
        this.next = null
    }
}

//2.定义单向链表类
class SingleLinked {
    constructor() {
        this.size = 0;
        this.head = new Node('head')
        this.currentNode = ''
    }
    //获取链表长度
    getLength() {
        return this.size
    }
    //判断是否为空
    isEmpty() {
        return this.size === 0
    }
    //遍历链表
    displayList() {
        let list = '';
        let currentNode = this.head   //指向链表的头指针
        while (currentNode) {
            list += currentNode.data;
            currentNode = currentNode.next;
            if (currentNode) {
                list += '->'
            }
        }
        console.log(list)
    }

    //获取链表最后一个节点
    findLast() {
        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next
        }
        return currentNode
    }

    //采用尾插法给链表插入元素
    appendNode(element) {
        let currentNode = this.findLast();
        let newNode = new Node(element)
        currentNode.next = newNode;
        newNode.next = null;
        this.size++
    }


    //查找节点
    findNode(element) {
        let currentNode = this.head;
        while (currentNode && (currentNode.data != element)) {
            currentNode = currentNode.next
        }
        return currentNode
    }



    //删除节点
    removeNode(element) {
        if (!this.findNode(element)) {

            return '节点不存在'
        }
        if ('head' === element) {
            this.head = null;
            this.size = 0;
            return '删除整个节点'
        }
        let currentNode = this.head;
        while (currentNode.next.data != element) {
            currentNode = currentNode.next
        }
        currentNode.next = currentNode.next.next
        this.size--
    }
}