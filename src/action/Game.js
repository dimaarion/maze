import Phaser from "phaser"
import Database from "../components/Database";
import Meduza from "../objects/Meduza";
import Crab from "../objects/Crab";
import Ej from "../objects/Ej";
import Player from "../objects/Player";
import Hp from "../objects/Hp";
import EjDirect from "../objects/EjDirect";
import Fugu from "../objects/Fugu";
import Money from "../objects/Money";
import Point from "../objects/Point";
import Platform from "../objects/Platform";
import Shark from "../objects/Shark";

export default class Game {
    db = new Database();
    platform = new Platform("platform")
    player = new Player(3);
    money = new Money("money");
    point = new Point("point");
    meduza = new Meduza("meduza", "alive", 1);
    fugu = new Fugu("fugu", "alive", 1);
    crab = new Crab("crab", "alive", 1);
    ej = new Ej("ej", "alive", 1);
    hp = new Hp("hp", "hp");

    shark = new Shark("shark", "alive", 1)
    ejDirect = new EjDirect("ej-direct", "alive", 5);

    setup(t) {
        this.player.money = this.db.getMoney();
        this.player.liveStatic = this.db.get().liveMax;
        this.player.live = this.db.getLive();

        t.scene.launch('InterFace', {player: this.player});
        t.cameras.main.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);
        t.matter.world.setBounds(0, 0, t.map.widthInPixels, t.map.heightInPixels);
        // t.map.setCollisionByExclusion([-1, 0]);
        // t.map.setCollisionByProperty({collides: true});
        t.matter.world.createDebugGraphic();
        t.matter.world.drawDebug = true;
        this.money.setup(t, t.map);
        this.point.setup(t, t.map);
        this.player.setup(t, t.map);
        t.cursor = t.input.keyboard.createCursorKeys();
        t.cam = t.cameras.main;
        t.cam.startFollow(this.player.body, true);
        t.eventColl.CollisionStart(t);
        t.cameras.main.zoom = 2;
        this.platform.setup(t, t.map)
        this.shark.setup(t, t.map);
        this.player.body.setScale(0.3, 0.3);
        this.fugu.setup(t, t.map);
        this.money.scale(0.5, 0.5);
        this.meduza.setup(t, t.map);
        this.crab.setup(t, t.map);
        this.ej.setup(t, t.map);
        this.hp.setup(t, t.map);
        this.ejDirect.setup(t, t.map);



    }

    draw(t) {

        this.player.draw(t);
        this.crab.gravity()
        this.fugu.view()
        this.ejDirect.persecute(t, this.player.body.body);
        this.shark.moveHorizontal()
        this.shark.persecute(t, this.player.body.body,false);
        this.shark.view(t);

    }
}