document.body.style = "overflow: hidden";
Vue.component('color-picker',{
  props: ['colors','active'],
  data: function()
  {
    return {
      mainColors: ['#15E67F','#E3DE8C','#D8A076','#D83762','#76B6D8','#1C7A90','#249CB8','#FBD75B','#F8F3EB','#C3EBEA','#FC7E2F','#F40552','#FFFFFF','#000000'],
      opened: false,
      activeColor: this.colors,
      invalidColor: false
    }
  },
  methods:{
    change_color: function(color)
    {
        switch (this.active) {
          case "btnBgColor":
            app.btnBgColor = color
          break;
          case "btnTextColor":
            app.btnTextColor = color
          break;
          case "btnBorderColor":
            app.btnBorderColor = color
          break;
        }
        this.activeColor = color
    },
    validate_color: function(color)
    {
      let reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm
      if(reg.test(color))
      {
        this.change_color(color)
        this.opened = false
        this.invalidColor = false
      }
      else {
        this.invalidColor = true
        setTimeout(() => {this.invalidColor = false}, 500)
      }
    }
  },
  template: `
  <div class="color-picker-wrap">
  <div class="color-picker">
    <div @click="opened = !opened" v-bind:style="{'background-color' : colors}" class="color-picker-btn"></div>
      <div v-if="opened" class="color-picker-window">
        <div class="color-picker-colors">
          <div v-for="mainColor in mainColors" @click="change_color(mainColor),opened = false, invalidColor = false" v-bind:class="{'color-picker-window-color-active' : activeColor == mainColor}" v-bind:style="{'background-color' : mainColor}" class="color-picker-window-color"></div>
        </div>
        <input type="text" @change="validate_color(activeColor)" v-model="activeColor" v-bind:class="{'invalid-color' : invalidColor}">
      </div>
  </div>
  <span>{{colors}}</span>
  </div>`
})

let app = new Vue({
  el: "#app",
  data: {
    pageLoader: true,
    pageIsLoad: false,
    btnClassName: 'myFirstGenBtn',
    btnText: 'Button text',
    btnSize: 'ftf',
    btnVerticalPadding: 20,
    btnHorizontalPadding: 40,
    btnFullWidth: false,
    btnWidth: 150,
    btnHeight: 80,
    btnBrad: 20,
    btnBorder: false,
    btnBorderSize: 0,
    btnBorderColor: '#FBD75B',
    btnRound: false,
    btnBgColor: '#15E67F',
    btnTextColor: '#FFFFFF',
    btnFont: "'Roboto', sans-serif",
    btnFontBold: false,
    btnFontItalic: false,
    btnFontUppercase: false,
    btnFontSize: 18
  },
  methods: {
    btnSizeToggle: function(toggle)
    {
      this.btnSize = toggle
      switch (toggle) {
        case 'fixed':
        this.btnVerticalPadding = 0
        this.btnHorizontalPadding = 0
        this.btnWidth = 150
        this.btnHeight = 80
        break;
        case 'ftf':
        this.btnVerticalPadding = 20
        this.btnHorizontalPadding = 40
        this.btnWidth = 0
        this.btnHeight = 0
        break;
      }
    }
  },
  mounted: function() {
    setTimeout(function(){app.pageIsLoad = true; document.body.style = "overflow: auto"; window.scrollTo(pageXOffset, 0); setInterval(function(){app.pageLoader = false},2000)}, 1500)
  },
  updated: function(){

  }
})
