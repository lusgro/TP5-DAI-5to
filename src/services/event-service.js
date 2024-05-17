import EventRepository from "../repositories/event-repository.js"
import { getInteger, getString, getFloat, getDate, getBoolean } from "../helpers/validaciones-helper.js"

export default class EventService {
    constructor() {
        this.repo = new EventRepository();
    }

    getAllEvents() {
        return this.repo.getAllEvents();
    }

    getById(id) {
        return this.repo.getById(id);
    }

    getFilteredEvent(id, name, category, start_date, tag) {
        return this.repo.getFilteredEvent(id, name, category, start_date, tag);
    }

    getEnrollments(id, firstName, lastName, username, attended, rating) {
        return this.repo.getEnrollments(id, firstName, lastName, username, attended, rating);
    }

    validateEntity(entity) {
        const name = getString(entity.name);
        const description = getString(entity.description);
        const idEventCategory = getInteger(entity.id_event_category);
        const idEventLocation = getInteger(entity.id_event_location);
        const startDate = getDate(entity.start_date);
        const duration_in_minutes = getInteger(entity.duration_in_minutes);
        const price = getFloat(entity.price);
        const enabled_for_enrollment = getBoolean(entity.enabled_for_enrollment);
        const max_assistance = getInteger(entity.max_assistance);

        if (name === null || name.length < 3 ||
            description === null || description.length < 3 ||
            idEventCategory === null ||
            idEventLocation === null ||
            startDate === null ||
            duration_in_minutes === null ||
            price === null ||
            enabled_for_enrollment === null ||
            max_assistance === null) {
            return false;
        }

        return true;
    }

    createAsync(entity, userId) {
        if (!this.validateEntity(entity)) {
            return false;
        }
        return this.repo.createAsync(entity, userId);
    }

    updateAsync(entity, userId) {
        if (!this.validateEntity(entity)) {
            return false;
        }
        return this.repo.updateAsync(entity, userId);
    }

    deleteAsync(id, userId) {
        return this.repo.deleteAsync(id, userId);
    }

    enrollAsync(id, userId) {
        return this.repo.enrollAsync(id, userId);
    }

    unenrollAsync(id, userId) {
        return this.repo.unenrollAsync(id, userId);
    }

    rateAsync(id, userId, rating) {
        return this.repo.rateAsync(id, userId, rating);
    }
}