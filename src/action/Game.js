export default class Game{
    setup(t){
        t.cameras.main.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);
        t.matter.world.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);
        t.map.setCollisionByExclusion([-1, 0]);
        t.map.setCollisionByProperty({collides: true});
        t.matter.world.createDebugGraphic();
        t.matter.world.drawDebug = true;
        t.money.setup(t,t.map);
        t.fugu.setup(t,t.map);
        t.point.setup(t,t.map);
        t.player.setup(t,t.map);
        t.cursor = t.input.keyboard.createCursorKeys();
        t.cam = t.cameras.main;
        t.cam.startFollow(t.player.body, true);
        t.eventColl.CollisionStart(t);
    }

    draw(t){
        t.fugu.draw(t)
        t.player.draw(t)
    }
}