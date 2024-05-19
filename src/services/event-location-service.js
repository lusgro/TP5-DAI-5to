import EventLocationRepository from '../repositories/event-location-repository';
import { getInteger, getString, getFloat } from '../helpers/validaciones-helper';

export default class EventLocationService {
    constructor() {
        this.repo = new EventLocationRepository();
    }

    getAllAsync() {
        return this.repo.getAllAsync();
    }

    getByIdAsync(id) {
        return this.repo.getByIdAsync(id);
    }

    getByProvinceAsync(id) {
        return this.repo.getByProvinceAsync(id);
    }
}