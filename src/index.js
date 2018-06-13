import 'index.scss';
import 'index.html';  //这里引入html是为了hmr可以检测html的改动进行热重载

var span = document.querySelector('span');
span.onclick = function (){
  span.innerHTML = 'hello news';
}