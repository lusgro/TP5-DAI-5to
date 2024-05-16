import UserRepository from '../repositories/user-repository.js';

export default class UserService {
    login(username, password) {
        const repo = new UserRepository();
        return repo.login(username, password);
    }

    register(username, password, firstName, lastName) {
        const repo = new UserRepository();
        return repo.register(username, password, firstName, lastName);
    }
}