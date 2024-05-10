import EventRepository from "../repositories/event-repository.js"

export default class EventService {
    getAllEvents() {
        const repo = new EventRepository();
        return repo.getAllEvents();
    }
    getById(id) {
        const repo = new EventRepository();
        return repo.getById(id);
    }
    getFilteredEvent(id, name, category, start_date, tag) {
        const repo = new EventRepository();
        return repo.getFilteredEvent(id, name, category, start_date, tag);
    }
    getEnrollments(id, firstName, lastName, username, attended, rating) {
        const repo = new EventRepository();
        return repo.getEnrollments(id, firstName, lastName, username, attended, rating)
    }
}
