console.log("写script之前: \n" + document.getElementsByTagName('html')[0].innerHTML);

!function(){
    var ele = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.innerHTML = "console.log('111')"
    ele.appendChild(script)
}()
console.log("写script之后: \n" + document.getElementsByTagName('html')[0].innerHTML);