

//es6语法
class CMenu{
    constructor(id){
     this.box =document.querySelector(id);
     this.ul=this.box.querySelector("ul");
     this.lis=this.box.querySelectorAll("li");
    // this.lis=this.ul.children;
     this.subMenu =this.box.querySelectorAll(".sub_menu");
     this.time1 =null;
     this.time2 = null;
     this.init();
    }

    init(){
      console.log("menu");
      //添加鼠标点击的监听
      this.lis.forEach((element) => {
        element.addEventListener("mouseenter" , (e) =>{
           let li =e.target;
           console.log("mouseenter");

           if(this.time1 != null){
              clearTimeout(this.time1);
           }

           this.time1 = setTimeout(() => {
             this.subMenu.forEach((item) => {
               item.classList.remove("active")
             })
             li.children[1].classList.add("active");
           },1000)
        })
      });
  
    //添加鼠标离开的监听
      this.lis.forEach((element) => {
        element.addEventListener("mouseleave" , (e) =>{
            let li =e.target;
            console.log("mouseleave");

            if(this.time2 != null){
              clearTimeout(this.time2);
           }

           this.time2 =setTimeout(() => {
             li.children[1].classList.remove("active")         
           }, 1000);


        })
      });
      



    }
}