Vue.component('color-picker',{
  props: ['colors','active'],
  data: function()
  {
    return {
      mainColors: ['#15E67F','#E3DE8C','#D8A076','#D83762','#76B6D8','#1C7A90','#249CB8','#FBD75B','#F8F3EB','#C3EBEA','#FC7E2F','#F40552','#FFFFFF','#000000'],
      opened: false,
      activeColor: this.colors
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
    }
  },
  template: `
  <div class="color-picker-wrap">
  <div class="color-picker">
    <div @click="opened = !opened" v-bind:style="{'background-color' : colors}" class="color-picker-btn"></div>
      <div v-if="opened" class="color-picker-window">
        <div class="color-picker-colors">
          <div v-for="mainColor in mainColors" @click="change_color(mainColor), opened = false" v-bind:class="{'color-picker-window-color-active' : activeColor == mainColor}" v-bind:style="{'background-color' : mainColor}" class="color-picker-window-color"></div>
        </div>
        <input type="text" @change="change_color(activeColor)" v-model="activeColor" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$">
      </div>
  </div>
  <span>{{colors}}</span>
  </div>`
})

let app = new Vue({
  el: "#app",
  data: {
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
    btnFontSize: 18,
    copied: false
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
    },
    copy: function()
    {
      app.copied = false
      let copied = document.querySelector('#copied-text')
      navigator.clipboard.writeText(copied.textContent).then(function() {
        app.copied = true
      }, function(err) {
        console.error('Async: Could not copy text: ', err);});
    }
  }
})
