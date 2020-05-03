let app = new Vue({
  el: "#app",
  data: {
    whatDoList: [{text : "прыгать на одной ноге", emoji : "🦘🦵"},
    {text : "смотреть в поталок", emoji : "🙄"},
    {text : "пить пиво", emoji : "🍺"},
    {text : "смеяться", emoji : "😂"},
    {text : "орать", emoji : "😲"},
    {text : "кукарекать", emoji : "🐓"},
    {text : "смотреть YouTube", emoji : "📺"},
    {text : "сидеть в Instagram", emoji : "📸"},
    {text : "переписываться с другом", emoji : "👯"}],
    howLongList: [{text : "пока не устанешь", emoji : "🥱"},
    {text : "минут пять", emoji : "⌛"},
    {text : "до конца дня", emoji : "🌇"},
    {text : "пару секунд", emoji : "⏱️"}],
    whereList: [{text : "в комнате", emoji : "🛏️"},
    {text : "в зале", emoji : "🛏️"},
    {text : "в ванной", emoji : "🛁"},
    {text : "в туалете", emoji : "🚽"},
    {text : "в кухне", emoji : "🍽️"},
    {text : "на балконе", emoji : "🏙️"},
    {text : "на стуле", emoji : "🪑"}],
    whatDo: 'none',
    howLong: 'none',
    where: 'none'
  },
  methods: {
    updating: function()
    {
      this.whatDo = this.whatDoList[Math.floor(Math.random() * (this.whatDoList.length - 1))]
      this.howLong = this.howLongList[Math.floor(Math.random() * (this.howLongList.length - 1))]
      this.where = this.whereList[Math.floor(Math.random() * (this.whereList.length - 1))]
    }
  },
  mounted(){
    this.whatDo = this.whatDoList[Math.floor(Math.random() * (this.whatDoList.length - 1))]
    this.howLong = this.howLongList[Math.floor(Math.random() * (this.howLongList.length - 1))]
    this.where = this.whereList[Math.floor(Math.random() * (this.whereList.length - 1))]
  }
})
