import UserRepository from '../repositories/user-repository.js';

export default class UserService {
    constructor() {
        this.repo = new UserRepository();
    }

    login(username, password) {
        return this.repo.login(username, password);
    }

    register(username, password, firstName, lastName) {
        return this.repo.register(username, password, firstName, lastName);
    }
}