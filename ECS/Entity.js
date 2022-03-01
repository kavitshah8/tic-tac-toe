ECS.Entity = function Entity() {
    this.id = (+Date.now()).toString(16);
    this.components = {};
    ECS.Entities.push(this);
    return this;
}

ECS.Entity.prototype.addComponent = function addComponent(component) {
    this.components[component.name] = component;
    return this;
};

ECS.Entity.prototype.print = function print() {
    console.log(JSON.stringify(this, null, 4));
}