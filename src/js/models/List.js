export default class List {
    constructor() {
        this.items = [];
    }

    addItem(id, title, tagline, poster_path) {
        let duplicateID = false;
        this.items.forEach(
            (item) => {
                if (item.id === id)
                    duplicateID = true;
            }
        );
        if (duplicateID)
            return;

        const item = {
            id: id,
            title,
            tagline,
            poster_path
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }
}