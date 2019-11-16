(function () {

  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }

  Game.prototype.init = function () {
    // 初始化食物
    this.food.init(this.map);
    this.food.show(this.map);

    // 初始化蛇
    this.snake.init(this.map);
    this.snake.show(this.map);

    // 绑定键盘事件
    this.bindKey();

  };

  // 开始游戏
  Game.prototype.start = function () {

    var timer = setInterval(function () {

      
      // 改变蛇的坐标
      this.snake.move(this.food, this.map);

      // 绘制坐标改变之后的小蛇
      this.snake.show(this.map);

      // 获取蛇头的坐标
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;

      // 纵横坐标的最大值，索引从 0 开始，因此应该减一
      // offsetWidth = width + padding-left + padding-right + border-left + border-right
      var maxX = this.map.offsetWidth / this.snake.width - 1;
      var maxY = this.map.offsetHeight / this.snake.height - 1;


      // 判断水平方向上是否超出游戏界面
      if (headX < 0 || headX > maxX) {
        clearInterval(timer);
        alert('游戏结束')
      }
      // 判断垂直方向上是否超出游戏界面
      if (headY < 0 || headY > maxY) {
        clearInterval(timer);
        alert('游戏结束')
      }
    }.bind(this), 500);
  };

  Game.prototype.bindKey = function () {
 
    document.addEventListener('keydown', function (evt) {
      switch (evt.keyCode) {
        case 37:
          this.snake.direction = this.snake.direction === 'right' ? 'right' : 'left';
          break;
        case 38:
          this.snake.direction = this.snake.direction === 'down' ? 'down' : 'up';
          break;
        case 39:
          this.snake.direction = this.snake.direction === 'left' ? 'left' : 'right';
          break;
        case 40:
          this.snake.direction = this.snake.direction === 'up' ? 'up' : 'down';
          break;
        default:
          alert('请使用上下左右键来操作游戏。');
          break;
      }
    }.bind(this));
  };

  window.Game = Game;
}());