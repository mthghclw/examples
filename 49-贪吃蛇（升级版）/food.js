(function (global) {


  // 模块私有数组，保存食物
  var foods = [];

  function Food(x, y, width, height, color) {

    // 纵横坐标
    this.x = x || 0;
    this.y = y || 0;

    // 食物尺寸
    this.width = width || 20;
    this.height = height || 20;

    // 食物颜色
    this.color = color || 'red';
  }

  // 初始化食物
  Food.prototype.init = function (map) {

    // 生成随机颜色值
    // ['蓝色', '靛蓝', '紫色', '粉色', '红色', '橘色', '黄色', '绿色', '茶色', '青色']
    var colors = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };

  Food.prototype.show = function (map) {

    // 删除上一个食物
    this.remove(map);

    // 创建 div 元素，用来显示食物
    var div = document.createElement('div');

    // 设置食物的尺寸
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';

    // 设置食物的颜色
    div.style.backgroundColor = this.color;

    // 设置食物的定位方式
    div.style.position = 'absolute';

    // 生成随机坐标
    this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
    this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;

    // 设置食物的坐标
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';

    // 将食物绘制到游戏面板中
    map.appendChild(div);

    // 将食物记录到 foods 数组中，方便以后删除
    foods.push(div);
  };

  Food.prototype.remove = function (map) {
    for (var i = foods.length - 1; i >= 0; i--) {
      // 删除界面上食物
      map.removeChild(foods[i])

      // 删除食物在 foods 数组中的记录
      foods.splice(i, 1);
    }
  };

  global.Food = Food;

}(window));
