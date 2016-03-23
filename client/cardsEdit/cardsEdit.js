var getCards = function() {
    var title = Session.get('searchCardTitle') || '';
        var titleRe = new RegExp(title, 'i');
        return MeteorApp.Cards.find(
            { title: titleRe },
            { sort: {date: -1}}
        );
};


Template.cardsEdit.helpers({
    quantity: function() {
        return getCards().count();
    },
    cards: getCards
});

Template.cardsEdit.events({
    'click .add-card-btn': function() {
        MeteorApp.Cards.insert({
            title: 'Новая карта',
            health: 0,
            dmg: 0,
            mana: 0,
            type: 'creature',
            imageName: 'ninja',
            text: 'Описание',
            date: new Date(),
            hero: false
        });
    },
    'keyup .card-search': function(e) {
        Session.set('searchCardTitle', e.target.value);
    }

});


Template.cardEdit.helpers({
    cardTypes: ['creature', 'area', 'spell']

});

Template.cardEdit.events({
    "click .card-remove": function(e) {
        e.preventDefault();
        if (confirm("Точно точно удалить " + this.title + "?")) {
            MeteorApp.Cards.remove(this._id);
        }
    },


    "submit .cardEdit": function(event) {
        event.preventDefault();

        var card = lodash.assign(this, {
            title: event.target.title.value,
            health: Number(event.target.health.value),
            text: event.target.text.value,
            imageName: event.target.imageName.value,
            dmg: Number(event.target.dmg.value),
            mana: Number(event.target.mana.value),
            type: event.target.type.value,
            hero: Boolean(event.target.hero.checked)
        });

        MeteorApp.Cards.update(this._id, card);
    }
});
