/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 * Software License: GNU GPLv3
 */

// Import Modules
import {SimpleActor} from "./actor.js";
import {SimpleItemSheet} from "./item-sheet.js";
import {SimpleActorSheet} from "./actor-sheet.js";
import {ActorHelper} from "./actor-helper.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
    console.log(`Initializing Simple Worldbuilding System`);

    /**
     * Set an initiative formula for the system. This will be updated later.
     * @type {String}
     */
    CONFIG.Combat.initiative = {
        formula: "1d20",
        decimals: 2
    };

    // Define custom Entity classes
    CONFIG.Actor.entityClass = SimpleActor;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("Reve-de-dragon", SimpleActorSheet, {makeDefault: true});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("Reve-de-dragon", SimpleItemSheet, {makeDefault: true});

    // Register system settings
    game.settings.register("Reve-de-dragon", "macroShorthand", {
        name: "SETTINGS.SimpleMacroShorthandN",
        hint: "SETTINGS.SimpleMacroShorthandL",
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });

    // Register initiative setting.
    game.settings.register("Reve-de-dragon", "initFormula", {
        name: "SETTINGS.SimpleInitFormulaN",
        hint: "SETTINGS.SimpleInitFormulaL",
        scope: "world",
        type: String,
        default: "1d20",
        config: true,
        onChange: formula => _simpleUpdateInit(formula, true)
    });

    // Retrieve and assign the initiative formula setting.
    const initFormula = game.settings.get("Reve-de-dragon", "initFormula");
    _simpleUpdateInit(initFormula);

    /**
     * Update the initiative formula.
     * @param {string} formula - Dice formula to evaluate.
     * @param {boolean} notify - Whether or not to post nofications.
     */
    function _simpleUpdateInit(formula, notify = false) {
        // If the formula is valid, use it.
        try {
            new Roll(formula).roll();
            CONFIG.Combat.initiative.formula = formula;
            if (notify) {
                ui.notifications.notify(game.i18n.localize("SIMPLE.NotifyInitFormulaUpdated") + ` ${formula}`);
            }
        }
            // Otherwise, fall back to a d20.
        catch (error) {
            CONFIG.Combat.initiative.formula = "1d20";
            if (notify) {
                ui.notifications.error(game.i18n.localize("SIMPLE.NotifyInitFormulaInvalid") + ` ${formula}`);
            }
        }
    }

    /**
     * Slugify a string.
     */
    Handlebars.registerHelper('slugify', function (value) {
        return value.slugify({strict: true});
    });

    Handlebars.registerHelper('concat', function (string1, string2) {
        return string1 + string2;
    })

    Handlebars.registerHelper('concat3', function (string1, string2, string3) {
        return string1 + string2 + string3;
    })

    Handlebars.registerHelper('concat4', function (string1, string2, string3, string4) {
        return string1 + string2 + string3 + string4;
    })

    Handlebars.registerHelper('equals', function (string1, string2) {
        return string1 === string2;
    })



    Handlebars.registerHelper('actorId', function () {
        return this.actor._id;
    })


    Handlebars.registerHelper('melee', function () {
        return ActorHelper.att_melee(this.actor);
    })

    Handlebars.registerHelper('shoot', function () {
        return ActorHelper.att_shoot(this.actor);
    })

    Handlebars.registerHelper('throw', function () {
        return ActorHelper.att_throw(this.actor);
    })

    Handlebars.registerHelper('stealth', function () {
        return ActorHelper.att_stealth(this.actor);
    })


    Handlebars.registerHelper('skillMin', function (skill) {
        return ActorHelper.skl_min(skill);
    })


    Handlebars.registerHelper('health', function () {
        return ActorHelper.vit_health(this.actor);
    })

    Handlebars.registerHelper('endurance', function () {
        return ActorHelper.vit_endurance(this.actor);
    })

    Handlebars.registerHelper('tiredness', function () {
        return ActorHelper.vit_tiredness(this.actor);
    })

    Handlebars.registerHelper('updateTiredness', function (min) {
        let endurance = ActorHelper.vit_endurance(this.actor);
        if(endurance < min) {
            return 'disabled'
        }
    })

    Handlebars.registerHelper('checkTiredness', function (cbNum) {
        return ActorHelper.updateTiredness(this.actor, cbNum);
    })



    Handlebars.registerHelper('bulk', function () {
        return ActorHelper.th_bulk(this.actor);
    })

    Handlebars.registerHelper('constitution', function () {
        return ActorHelper.th_constitution(this.actor);
    })

    Handlebars.registerHelper('starvation', function () {
        return ActorHelper.th_starvation(this.actor);
    })

    Handlebars.registerHelper('damageBonus', function () {
        return ActorHelper.damageBonus(this.actor);
    })

});
