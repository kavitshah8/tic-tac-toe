ECS.Systems.ViewSystem = function ViewSystem (entities) {
    // iterate over all the entities
    entities.forEach(element => {
        element.print();
    });
}