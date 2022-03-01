ECS.Components.Position = function Position (cellIndex) {
    this.index = cellIndex;
    return this;
}
ECS.Components.Position.prototype.name = "Position";

ECS.Components.Appearance = function Appearance(value) {
    this.fill = value;
    return this;
}
ECS.Components.Appearance.prototype.name = "Appearance";