import {makeObservable, observable} from 'mobx';

class GlobalComponentsStore {
     _register = [];
    _components = {};

    constructor() {
        makeObservable(this, {
            _register: observable,
        })
        this._register = [];
        this._components = {};
    }

    register(globalComponents = []) {
        this._register = globalComponents.map(({key}) => key);
        this._components = globalComponents.reduce((o, {key, component}) => ({
            ...o,
            [key]: component
        }), {});
    }

    getComponent(key, required) {
        if (!this._register.includes(key) && required) {
            throw new Error(`Глобальный компонент ${key} не зарегистрирован`);
        }

        return this._components[key];
    }
}

export default GlobalComponentsStore;