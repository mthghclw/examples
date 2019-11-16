(function () {

  // 记录蛇身体每一部分的数组
  var bodies = [];

  function Snake(width, height, direction) {
    // 蛇每部分的尺寸
    this.width = width || 20;
    this.height = height || 20;

    // 蛇身体每部分的信息
    this.body = [];

    // 爬行的方向
    this.direction = direction || 'down';
  }


  // 在界面上绘制小蛇
  Snake.prototype.init = function (map) {
    
    // 随机初始化小蛇移动的方向
    var directions = ['left', 'right', 'up', 'down'];
    this.direction = directions[Math.floor(Math.random() * directions.length)];

    // 随机生成小蛇 body 的信息
    // 纵横坐标的最大值
    var maxX = map.offsetWidth / this.width;
    var maxY = map.offsetHeight / this.height;

    // 随机生成蛇头的坐标
    var headX = Math.floor(Math.random() * maxX);
    var headY = Math.floor(Math.random() * maxY);

    // 根据蛇头坐标和蛇爬行的方向计算出蛇身坐标
    if (this.direction === 'right') {
      headX = 0;
      this.body.push({ x: headX + 2, y: headY, color: 'red' });
      this.body.push({ x: headX + 1, y: headY, color: 'green' });
      this.body.push({ x: headX, y: headY, color: 'green' });
    } else if (this.direction === 'left') {
      headX = maxX - 1;
      this.body.push({ x: headX - 2, y: headY, color: 'red' });
      this.body.push({ x: headX - 1, y: headY, color: 'green' });
      this.body.push({ x: headX, y: headY, color: 'green' });
    } else if (this.direction === 'up') {
      headY = maxY - 1;
      this.body.push({ x: headX, y: headY - 2, color: 'red' });
      this.body.push({ x: headX, y: headY - 1, color: 'green' });
      this.body.push({ x: headX, y: headY, color: 'green' });
    } else if (this.direction === 'down') {
      headY = 0;
      this.body.push({ x: headX, y: headY + 2, color: 'red' });
      this.body.push({ x: headX, y: headY + 1, color: 'green' });
      this.body.push({ x: headX, y: headY, color: 'green' });
    }
  };

  Snake.prototype.show = function (map) {

    console.log(this.body)
    // 删除上一条蛇
    this.remove(map);

    // 遍历 body 数组，创建🐍的身体
    for (var i = 0; i < this.body.length; i++) {

      // 创建 div 元素
      var div = document.createElement('div');

      // 为 div 元素添加样式
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      div.style.backgroundColor = this.body[i].color;
      div.style.position = 'absolute';
      div.style.left = this.body[i].x * this.width + 'px';
      div.style.top = this.body[i].y * this.height + 'px';

      // 将蛇绘制到界面上
      map.appendChild(div);

      // 记录蛇身体的位置
      bodies.push(div);
    }
  }



  // 改变小蛇的坐标
  Snake.prototype.move = function (food, map) {

    // 改变蛇身体的坐标
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    // 根据蛇运动的方向，移动蛇头
    switch (this.direction) {
      case 'right':
        this.body[0].x += 1;
        break;
      case 'left':
        this.body[0].x -= 1;
        break;
      case 'up':
        this.body[0].y -= 1;
        break;
      case 'down':
        this.body[0].y += 1;
        break;
    }

    // 计算蛇头目前的坐标
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;

    // 当蛇头坐标和食物的坐标重合时，说明蛇把把食物吃掉了。
    if (headX === food.x && headY === food.y) {
      // 获取蛇尾
      var last = this.body[this.body.length - 1];

      // 在蛇尾在追加一个小方块
      this.body.push({
        x: last.x,
        y: last.y,
        color: food.color
      });

      // 再次初始化食物
      food.init(map);
      food.show(map);
    }
  };

  // 删除小蛇
  Snake.prototype.remove = function (map) {
    for (var i = bodies.length - 1; i >= 0; i--) {

      // 删除界面上食物
      map.removeChild(bodies[i])

      // 删除食物在 bodies 数组中的记录
      bodies.splice(i, 1);
    }
  };

  window.Snake = Snake;


}());