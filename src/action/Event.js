export default class Event{

    CollisionStart(t){
        t.matter.world.on('collisionend', (event, bodyA, bodyB) => {
            if (bodyA.label === "alive" && bodyB.label === "right") {
                bodyA.gameObject.play("fugu_L")
                bodyA.direction = 1;
            }else if (bodyA.label === "alive" && bodyB.label === "left") {
                bodyA.direction = 0;
                bodyA.gameObject.play("fugu_R")
            }else if (bodyA.label === "alive" && bodyB.label === "up") {
                bodyA.direction = 2;
            }else if (bodyA.label === "alive" && bodyB.label === "down") {
                bodyA.direction = 3;
            }
        });
    }
}