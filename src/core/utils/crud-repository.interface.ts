export interface CrudRepository<Entity> {
  create(data: Entity): Entity | Promise<Entity>;
  find(filter: Partial<Entity>): Entity[] | Promise<Entity[]>;
  findOne(filter: Partial<Entity>): Entity | Promise<Entity>;
  update(filter: Partial<Entity>, data: Partial<Entity>): Entity | Promise<Entity>;
  delete(filter: Partial<Entity>): void;
}
