class projectSlider{
  constructor(){
    this.btnNext=document.querySelector('#btn-next')
    this.btnPrev=document.querySelector('#btn-prev')
    this.imgWrapper = document.querySelector('.images-container')
    this.mobileWrapper = document.querySelector('.mobile-wrapper')
    this.nbImg = this.mobileWrapper.childElementCount
    this.mobileTranslateIncrementUnit = 100 / this.nbImg
    this.mobileTranslateIncrement
    this.curIndex=0
    this.imgHeight = document.querySelector('.project-img').getBoundingClientRect().height
    this.imgWidth = document.querySelector('.project-img').getBoundingClientRect().width
    this.imgIncr = this.imgHeight/2
    this.info = document.querySelector('.info')
    this.headline = document.querySelector('.headline')
    this.context= document.querySelector('#context')
    this.tag = document.querySelector('#tag')
    this.year = document.querySelector('#year')
    this.title = document.querySelector('#title')
    this.desc = document.querySelector('#desc')
    this.data = [
      ["#branding","2020","Paralelle","In this school project, we had to write and design a press magazine from scratch.<br> We chose to write our magazine about the paralelle between sciences and arts."],
      ["#dev","2019","Karma","Our answer to a human problem : submarine pollution"],
      ["#ui","2018","tst","Our answer to a human problem : submarine pollution"],
      ["#3D","2017","tst2","bonjour merci aurevoir"]
    ]
  }
  init(){
    let that = this
    this.btnNext.addEventListener('click',function(){that.seek(that.curIndex+1,that)},false)
    this.btnPrev.addEventListener('click',function(){that.seek(that.curIndex-1,that)},false)
    this.setInfo(that)
  }
  setBtn(that){
    if(this.curIndex+2>this.nbImg){
      this.btnNext.classList.add('btn-hidden')
      this.btnPrev.classList.remove('btn-hidden')
    }
    else if (this.curIndex-1<0) {
      this.btnPrev.classList.add('btn-hidden')
      this.btnNext.classList.remove('btn-hidden')
    }
    else {
      this.btnNext.classList.remove('btn-hidden')
      this.btnPrev.classList.remove('btn-hidden')
    }
  }
  setInfo(that){
    that.setBtn(that)
    that.context.classList.toggle('hidden-context')
    that.title.classList.toggle('hidden-title')
    that.desc.classList.toggle('hidden-desc')

    setTimeout(function(){
      that.tag.innerHTML=that.data[that.curIndex][0]
      that.year.innerHTML=that.data[that.curIndex][1]
      that.title.innerHTML=that.data[that.curIndex][2]
      that.desc.innerHTML=that.data[that.curIndex][3]
    }, 330);
    setTimeout(function(){
      that.context.classList.toggle('hidden-context')
      that.title.classList.toggle('hidden-title')
      that.desc.classList.toggle('hidden-desc')
    }, 600);
    document.querySelector('.project-img[data-id="'+this.curIndex+'"]').classList.toggle('img-active')
  }
  seek(target,that){
    let oldIndex = that.curIndex
    if(document.body.offsetWidth < 960){
      this.mobileTranslateIncrement = 0
      document.querySelector('.project-img[data-id="'+this.curIndex+'"]').classList.toggle('img-active')
      if(target>=this.nbImg || target<0){
        this.mobileTranslateIncrement = 0
        this.curIndex =0
      }
      else{ 
        this.curIndex=target
        this.mobileTranslateIncrement = this.mobileTranslateIncrementUnit*target
      }
      this.setInfo(this)
      this.imgWrapper.setAttribute( "style", "transform: translateX(-"+this.mobileTranslateIncrement+"%)!important" );
    }
    else
    {
      this.imgHeight = document.querySelector('.project-img').getBoundingClientRect().height
      this.imgIncr = this.imgHeight/2
      document.querySelector('.project-img[data-id="'+this.curIndex+'"]').classList.toggle('img-active')
      if(target>=this.nbImg || target<0){
        this.imgIncr = this.imgHeight/2
        this.curIndex =0
      }
      else{
        this.curIndex=target
        this.imgIncr = (this.imgHeight/2)+this.imgHeight*target+25*target
      }
      this.setInfo(this)
      this.imgWrapper.setAttribute( "style", "transform: translateY(calc(50% - "+that.imgIncr+"px))!important" );
    }
  }
}
let slider = new projectSlider();
slider.init()

var resizeId;
window.addEventListener('resize', function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 1200);
    resizeId = setTimeout(doneResizing, 1201);
    resizeConcrete = setTimeout(doneResizing, 1205);
});

function doneResizing(){
  console.log('ok')
    slider.seek(slider.curIndex,slider)
}
