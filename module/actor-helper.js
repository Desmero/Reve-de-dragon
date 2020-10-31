/**
 * All function used for actor's value calculations.
 */

export class ActorHelper {

    static tirednessArray = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4],
        [2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5],
        [3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6],
        [4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7],
        [5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8],
        [5, 5, 6, 6, 6, 6, 7, 7, 8, 8, 8, 8, 8, 8, 9],
        [5, 5, 6, 6, 6, 6, 7, 7, 8, 8, 8, 8, 9, 9, 10],
        [6, 6, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 10, 10, 11],
        [7, 7, 8, 8, 8, 8, 9, 9, 10, 10, 10, 10, 11, 11, 12],
        [8, 8, 9, 9, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 13],
        [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 14],
        [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15],
        [9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16],
        [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17],
        [10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18],
        [10, 11, 12, 12, 13, 13, 14, 15, 16, 16, 17, 17, 18, 18, 19],
        [10, 11, 12, 12, 13, 13, 14, 15, 16, 16, 17, 17, 18, 19, 20],
        [11, 12, 13, 13, 14, 14, 15, 16, 17, 17, 18, 18, 19, 20, 21],
        [12, 13, 14, 14, 15, 15, 16, 17, 18, 18, 19, 19, 20, 21, 22],
        [13, 14, 15, 15, 16, 16, 17, 18, 19, 19, 20, 20, 21, 22, 23],
        [13, 14, 15, 15, 16, 17, 18, 19, 20, 20, 21, 21, 22, 23, 24],
        [13, 14, 15, 15, 16, 17, 18, 19, 20, 20, 21, 22, 23, 24, 25],
        [14, 15, 16, 16, 17, 18, 19, 20, 21, 21, 22, 23, 24, 25, 26],
        [15, 16, 17, 17, 18, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27],
        [16, 17, 18, 18, 19, 20, 21, 22, 23, 23, 24, 25, 26, 27, 28],
        [16, 17, 18, 19, 20, 21, 22, 23, 24, 24, 25, 26, 27, 28, 29],
        [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        [18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        [18, 19, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34],
        [18, 19, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 35],
        [19, 20, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 36],
        [20, 21, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 37],
        [21, 22, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 38],
        [21, 22, 24, 25, 26, 27, 29, 30, 32, 33, 34, 35, 36, 37, 39],
        [21, 22, 24, 25, 26, 27, 29, 30, 32, 33, 34, 35, 37, 38, 40],
        [22, 23, 25, 26, 27, 28, 30, 31, 33, 34, 35, 36, 38, 39, 41],
        [23, 24, 26, 27, 28, 29, 31, 32, 34, 35, 36, 37, 39, 40, 42],
        [24, 25, 27, 28, 29, 30, 32, 33, 35, 36, 37, 38, 40, 41, 43],
        [24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 38, 39, 41, 42, 44],
        [24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40, 42, 43, 45],
        [25, 26, 28, 29, 31, 32, 34, 35, 37, 38, 40, 41, 43, 44, 46],
        [26, 27, 29, 30, 32, 33, 35, 36, 38, 39, 41, 42, 44, 45, 47],
        [26, 28, 30, 31, 33, 34, 36, 37, 39, 40, 42, 43, 45, 46, 48],
        [26, 28, 30, 31, 33, 34, 36, 38, 40, 41, 43, 44, 46, 47, 49],
        [26, 28, 30, 31, 33, 34, 36, 38, 40, 41, 43, 44, 46, 48, 50],
        [27, 29, 31, 32, 34, 35, 37, 39, 41, 42, 44, 45, 47, 49, 51],
        [28, 30, 32, 33, 35, 36, 38, 40, 42, 43, 45, 46, 48, 50, 52],
        [29, 31, 33, 34, 36, 37, 39, 41, 43, 44, 46, 47, 49, 51, 53],
        [29, 31, 33, 34, 36, 38, 40, 42, 44, 45, 47, 48, 50, 52, 54],
        [29, 31, 33, 34, 36, 38, 40, 42, 44, 45, 47, 49, 51, 53, 55],
        [30, 32, 34, 35, 37, 39, 41, 43, 45, 46, 48, 50, 52, 54, 56],
        [31, 33, 35, 36, 38, 40, 42, 44, 46, 47, 49, 51, 53, 55, 57],
        [32, 34, 36, 37, 39, 41, 43, 45, 47, 48, 50, 52, 54, 56, 58],
        [32, 34, 36, 38, 40, 42, 44, 46, 48, 49, 51, 53, 55, 57, 59],
        [32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60]];


    static att_melee(actor) {
        let strength = Number(actor.data.attributes.strength.value);
        let agility = Number(actor.data.attributes.agility.value);

        return Math.floor((strength + agility) / 2);
    }

    static att_shoot(actor) {
        let eyesight = Number(actor.data.attributes.eyesight.value);
        let dexterity = Number(actor.data.attributes.dexterity.value);

        return Math.floor((eyesight + dexterity) / 2);
    }

    static att_throw(actor) {
        let eyesight = Number(actor.data.attributes.eyesight.value);
        let dexterity = Number(actor.data.attributes.dexterity.value);
        let shoot = Math.floor((eyesight + dexterity) / 2);
        let strength = Number(actor.data.attributes.strength.value);

        return Math.floor((shoot + strength) / 2);
    }

    static att_stealth(actor) {
        let size = Number(actor.data.attributes.size.value);
        let agility = Number(actor.data.attributes.agility.value);

        return Math.floor((21 - size + agility) / 2);
    }

    static skl_min(skill) {
        switch (skill) {
            case "soft": return -4;
            case "special": return -8;
            case "specialized": return -11;
            case "knowledge": return -11;
            case "draconic": return -11;
            case "melee": return -6;
            case "distance": return -8;
        }
    }

    static vit_health(actor) {
        let size = Number(actor.data.attributes.size.value);
        let constitution = Number(actor.data.attributes.constitution.value);

        return Math.ceil((size + constitution) / 2);
    }

    static vit_endurance(actor) {
        let size = Number(actor.data.attributes.size.value);
        let constitution = Number(actor.data.attributes.constitution.value);
        let sc = size + constitution;

        let health = this.vit_health(actor);
        let willpower = Number(actor.data.attributes.willpower.value);
        let hw = health + willpower;

        return Math.max(sc, hw);
    }

    static vit_tiredness(actor) {
        let endurance = this.vit_endurance(actor);

        return endurance * 2;
    }

    static updateTiredness(actor, cbNum) {
        let endurance = this.vit_endurance(actor);
        let currentValue = Number(actor.data.vital.tiredness.current);
        let threshold = this.tirednessArray[Number(cbNum)-1][Number(endurance)-16];
        if (currentValue >= threshold) {
            return "checked";
        }
    }

    static setTiredness(actorId, value) {
        let test = value;
        let actor = this.actor;
    }

    static th_bulk(actor) {
        let size = Number(actor.data.attributes.size.value);
        let strength = Number(actor.data.attributes.strength.value);

        return Math.floor((size + strength) / 2);
    }

    static th_constitution(actor) {
        let constitution = Number(actor.data.attributes.constitution.value);

        return Math.floor((Number(constitution)) / 3);
    }

    static th_starvation(actor) {
        let size = Number(actor.data.attributes.size.value);

        return Math.floor((2 + Number(size)) / 4);
    }

    static damageBonus(actor) {
        let size = Number(actor.data.attributes.size.value);
        let strength = Number(actor.data.attributes.strength.value);

        let avg = Math.floor((Number(size) + Number(strength))/2);
        if (avg < 10) {
            avg +=2;
        }
        return Math.floor((avg-10) / 2);
    }

}