
class Banner{
  constructor(id){
    //轮播区域
    this.bannerBox = document.querySelector(id);
    //轮播-ul区域
    this.ulBox = this.bannerBox.querySelector("ul");
    //轮播-指示器区域
    this.indicatorBox= this.bannerBox.querySelector(".banner_box_bottom_indicator");
    //定义当前轮播下标位置
    this.indicatorPostion = 1;
    //定义每个轮播页面的宽度(一张图片的宽度)   
    this.bannerPagWidth = this.bannerBox.clientWidth;
    //是否进行页面切换的标识
    this.flag =false;
    //总共多少banner页
    this.bannerPageLength = this.ulBox.children.length;
    this.init();
  }

  init(){
    this.initIndicator();
    this.copyImg();
    this.switchBanner();
  }
  /**
   * 初始化底部指示器
   */
  initIndicator(){
    //轮播页面ul中li的个数
    const num = this.ulBox.children.length;
    let frag = document.createDocumentFragment();
    for(let i =0;i<num;i++){
      let li =document.createElement("li");
      li.setAttribute("positon",i)
      //如果是指示器的第一个li元素，默认选中
      if(i == 0) li.className="active";
      frag.appendChild(li);
    }
    //给ol设置宽度,作用于li,使其有左右间距
    this.indicatorBox.children[0].style.width = num * 10 * 2 +"px"
    this.indicatorBox.children[0].appendChild(frag);

    //es6的箭头函数
    this.indicatorBox.children[0].addEventListener("click",(e)=>{
      let index =  (e.target).getAttribute("positon");
       console.log("点击的底部指示器下标"+index)
      let offset = (index - this.indicatorPostion) * this.bannerPagWidth
      this.indicatorPostion = index;
      this.moveBanner(offset)

    })
  }

/**
 * 给了轮播增加前后两张图片的方法
 */
  copyImg(){
    // 获取ul的第一个元素
    const firstChild = this.ulBox.firstElementChild.cloneNode(true);
    // 获取ul的第最后一个元素
    const lastChild =  this.ulBox.lastElementChild.cloneNode(true);
    //把第一个元素在放到最后面
    this.ulBox.appendChild(firstChild);
    //把最后一个元素在放到第一个的位置
    this.ulBox.insertBefore(lastChild,this.ulBox.firstElementChild)

    this.ulBox.style.width = this.bannerPagWidth * this.ulBox.children.length +"px";
    this.ulBox.left = -1 * this.bannerPagWidth + "px";
  }

/**
 * 切换轮播的方法
 */
  switchBanner(){
   // const left = this.bannerBox.querySelector(".banner_box_left_arrow");
   // const right = this.bannerBox.querySelector(".banner_box_right_arrow");

   this.bannerBox.querySelector(".banner_box_left_arrow").addEventListener("click",() =>{

      if(this.flag){
        return
      }

      if(this.indicatorPostion - 1 < 1){
        this.indicatorPostion = this.bannerPageLength
      }else{
        this.indicatorPostion --;
      }
      //左为负
      this.moveBanner(-this.bannerPagWidth);
     
    })
    this.bannerBox.querySelector(".banner_box_right_arrow").addEventListener("click",() =>{
      if(this.flag){
        return
      }

      if(this.indicatorPostion + 1 > this.bannerPageLength){
        this.indicatorPostion = 1;
      }else{
        this.indicatorPostion ++;
      }
      //右为正
      this.moveBanner(this.bannerPagWidth);
    })

  }


  /**
   * 图片移动的方法
   */
  moveBanner(offset){
     //加一个动画
     this.animation(offset)

     //改变底部指示器区域的选中状态
     const num= this.indicatorBox.children[0].children.length;
     for(let i =0;i<num;i++){
      this.indicatorBox.children[0].children[i].className ="";
     }
     this.indicatorBox.children[0].children[this.indicatorPostion - 1].className ="active";
  }


  /**
   * 图片移动的动画
   */
  animation(offset){
    //动画总时长
    const time = 1000;
    //动画每次执行时间
    const  perTime = 100;
   //动画的执行速度
   let speed = offset/(time/perTime)
   //最终ul的左侧要移动到的位置
  let goalLeft = parseFloat(this.ulBox.style.width) - offset;

  this.flag = true;
  let animation = setInterval(()=>{ 
    //如果已经到达ul的左侧要移动到的位置或者接近ul的左侧要移动到的位置
    //当前left -目标left < 单位时间的移动距离
    if(this.ulBox.style.width == goalLeft || Math.abs((Math.abs(parseFloat(this.ulBox.style.width)) - Math.abs(goalLeft))) < Math.abs(speed)){

      this.ulBox.style.left == goalLeft
      clearInterval(animation);
      this.flag = false;
    }else{
      this.ulBox.style.left  = parseFloat(this.ulBox.style.left) - speed +"px" ;

    }
  },perTime)

  }
}