class Task {
    constructor(id, level, fn) {
        this.id = id; //任务id
        this.level = level; //任务权重
        this.taskEvent = fn; //任务函数
        this.status = "pending"; //任务状态
        this.time = null;
    }
}

class TaskManager {
    constructor() {
        this.taskQueue = [];
    }
    addTask(id, level, fn) {
        let task = new Task(id, level, fn);
        task.time = Date.now();
        this.taskQueue.push(task);
    }
    async runTask() {
        this.taskQueue.sort((a, b) => {
            if (a.level === b.level) {
                return b.time - a.time;
            }
            return b.level - a.level;
        });

        // let taskObj = this.taskQueue.shift()
        for (let i = 0; i < this.taskQueue.length; i++) {
            this.taskQueue[i].status = "runnig";
            if (this.taskQueue[i].taskEvent instanceof Promise) {
                try {
                    await this.taskQueue[i].taskEvent();
                    this.taskQueue[i].status = "completed";
                } catch (e) {
                    this.taskQueue[i].status = "failed";
                    console.log(e);
                }
            } else {
                this.taskQueue[i].taskEvent();

            }
        }
    }
    cancelTask(id) {
        let task = this.taskQueue.filter((task) => task.id === id);
        if (task.length && task[0].status === "runnig") {
            task[0].status = "canceled";
        }
    }
    getTaskStatus(id) {
        let task = this.taskQueue.filter((task) => task.id === id);
        if (task.length) {
            return task[0].status;
        }
    }
}

