
// TODO: Update documentation

### Entity

The abstraction is that an entity is just an ID; a container of components.

```javascript
const entity = {
  id: 1,
  components: {}
}
```

We should be able to add a component or remove a component from the entity.


### Component

Components are just data. They don't have any logic inside them.

```javascript
const entity = {
  id: 1,
  components: {
    health: {
      points: 100
    },
    position: {
      x: 100,
      y: 50
    }
  }
}
```

### Systems

Systems run your game's logic. They take in entities and run operations on entities 
that have specific components the system requires. This way of thinking is a bit 
inverted from typical Class based programming.

NOTE: systems are just functions that take in entities.
NOTE: An optimization would be to have some layer which only feeds in relevant entities 
to the system.

As an example if an entity `dog` has a position. The `PositionSystem` would look
into all the entities that have the `PositionComponent` and do some logic with 
them. In our example if 

```javascript
const dog = {
  id: 1,
  components: {
    position: {
      x: 100,
      y: 50
    }
  }
}
```
