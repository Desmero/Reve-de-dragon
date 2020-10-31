/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class SimpleActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["worldbuilding", "sheet", "actor"],
            template: "systems/revededragon/templates/actor-sheet.html",
            width: 800,
            height: 800,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "biography"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean", "Formula", "Resource"];
        data.shorthand = !!game.settings.get("worldbuilding", "macroShorthand");
        return data;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Handle rollable attributes.
        html.find('.items .rollable').click(ev => {
            let button = $(ev.currentTarget);
            let r = new Roll(button.data('roll'), this.actor.getRollData());
            const li = button.parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            r.roll().toMessage({
                user: game.user._id,
                speaker: ChatMessage.getSpeaker({actor: this.actor}),
                flavor: `<h2>${item.name}</h2><h3>${button.text()}</h3>`
            });
        });

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemId"));
            li.slideUp(200, () => this.render(false));
        });

    }

    /* -------------------------------------------- */

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

}
