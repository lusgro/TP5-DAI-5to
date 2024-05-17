import ProvinceRepository from '../repositories/province-repository.js';
import { getInteger, getString, getFloat } from '../helpers/validaciones-helper.js';

export default class ProvinceService {
    constructor() {
        this.repo = new ProvinceRepository();
    }

    validateEntity(entity) {
        const name = getString(entity.name);
        const fullName = getString(entity.full_name);
        const latitude = getFloat(entity.latitude);
        const longitude = getFloat(entity.longitude);
        const displayOrder = getInteger(entity.display_order);
        if (name === null || name.length < 3) {
            return false;
        }
        if (fullName === null || fullName.length < 3) {
            return false;
        }
        if (latitude === null) {
            return false;
        }
        if (longitude === null) {
            return false;
        }
        if (displayOrder === null) {
            return false;
        }
        return true;
    }

    getAllAsync() {
        return this.repo.getAllAsync();
    }

    getByIdAsync(id) {
        return this.repo.getByIdAsync(id);
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