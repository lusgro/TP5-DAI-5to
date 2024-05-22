import EventCategoryRepository from '../repositories/event-category-repository.js';
import { getInteger, getString } from '../helpers/validaciones-helper.js';

export default class EventCategoryService {
    constructor() {
        this.repo = new EventCategoryRepository();
    }

    getAllAsync() {
        return this.repo.getAllAsync();
    }

    getByIdAsync(id) {
        return this.repo.getByIdAsync(id);
    }

    validateEntity(entity) {
        const name = getString(entity.name);
        const display_order = getInteger(entity.display_order);

        if (name === null || name.length < 3) {
            return false;
        }
        if (display_order === null) {
            return false;
        }

        return true;
    }

    createAsync(entity) {
        if (!this.validateEntity(entity)) {
            return false;
        }
        return this.repo.createAsync(entity);
    }

    updateAsync(entity) {
        if (!this.validateEntity(entity)) {
            return false;
        }
        return this.repo.updateAsync(entity);
    }

    deleteAsync(id) {
        return this.repo.deleteAsync(id);
    }
}