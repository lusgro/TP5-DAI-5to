import EventRepository from "../repositories/event-repository.js"

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
}