import $ from "jquery";
import './css/index.css';
import './css/index.less';
$(function(){
    $('ul li:odd').css("background","blue");
    $('ul li:even').css("background","red");
})
//项目中配置babel-loader处理高级js语法
class Person{
    static info = 'person man';
}

console.log(Person.info)
consle.log(red)