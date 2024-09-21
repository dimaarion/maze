export default class Loader{
    t;
    constructor(t) {
       this.t = t;
    }

    create(){
        let progressBar = this.t.add.graphics();
        let progressBox = this.t.add.graphics();
        let width = this.t.cameras.main.width;
        let height = this.t.cameras.main.height;
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((width / 2) - (250 / 1.5), height / 2, 320, 50);
        let loadingText = this.t.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Загрузка...',
            style: {font: '20px monospace', fill: '#ffffff'}
        });
        let percentText = this.t.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {font: '18px monospace', fill: '#ffffff'}

        });
        percentText.setOrigin(0.5, 0.5);
        let assetText = this.t.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {font: '18px monospace', fill: '#ffffff'}
        });
        assetText.setOrigin(0.5, 0.5);
        loadingText.setOrigin(0.5, 0.5);
        this.t.load.on('progress', function (value) {
            // console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((width / 2) - (250 / 1.5), height / 2 + 8, 300 * value, 30);
        });
        this.t.load.on('fileprogress', function (file) {
            //   console.log(file.src);
            // assetText.setText('Загрузка ресурса: ' + file.src);
        });

        this.t.load.on('complete', function () {
            // console.log('Завершено');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }
}