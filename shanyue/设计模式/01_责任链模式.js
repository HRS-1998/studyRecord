class Creature {
    constructor(name, attack, defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }

    toString() {
        return `${this.name} （攻击值：${this.attack} / 防御值：${this.defense})`;
    }
}
class CreatureModifier {
    constructor(creature) {
        this.creature = creature;
        this.next = null;
    }

    add(modifier) {
        if (this.next) {
            this.next.add(modifier);
        } else {
            this.next = modifier;
        }
    }

    handle() {
        if (this.next) {
            this.next.handle();
        }
    }
}

// 增加攻击逻辑
class DoubleAttackModifier extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }

    handle() {
        console.log(`来自 ${this.creature.name} 的双重攻击！`);
        this.creature.attack *= 2;
        super.handle();
    }
}

// 增加防御逻辑
class IncreaseDefenseModifier extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }

    handle() {
        if (this.creature.attack <= 4) {
            console.log(`增加 ${this.creature.name} 的防御！`);
            this.creature.defense++;
        }
        super.handle();
    }
}


const bacteria = new Creature("Bacteria", 1, 1); 
// console.log(bacteria.toString()); // Bacteria （攻击值：1 / 防御值：1)
const root = new CreatureModifier(bacteria);
console.log(root,'111')
root.add(new DoubleAttackModifier(bacteria));
console.log(root,'222')
root.add(new IncreaseDefenseModifier(bacteria));
console.log(root,'333')
root.handle(); // 来自 Bacteria 的双重攻击！ // 增加 Bacteria 的防御！
// root.handle(); 
// console.log(bacteria.toString()); // Bacteria （攻击值：2 / 防御值：2)