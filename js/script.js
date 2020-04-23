
// let header = new Headers({
//     'Access-Control-Allow-Origin':'*',
//     'Accept': 'application/json'
// });
// let sentData={
//     method: 'POST',
//     mode: 'cors',
//     header: header
// }; for production

let audio = new Audio()
let dot = document.getElementById("playeer_dot")
const trackBox = document.getElementById('playeer-inside-controls-length-tracks')
let domT = trackBox.getBoundingClientRect()
const movedTrack = document.getElementById('playeer-inside-controls-length-tracks-move')
let domMT = movedTrack.getBoundingClientRect()

let app = new Vue({
  el: '#app',
  data: {
    playeerIsOpened: false,
    albumReviewIsOpened: false,
    albumReview_img: 'none',
    albumReview_album_name: 'none',
    albumReview_artist_name: 'none',
    albumReview_songs: 'none',
    isShowPlayeerContainer: false,
    controlsLength: 0,
    trackMove: false,
    playeed_name: 'none',
    playeed_artist: 'none',
    playeed_img: 'none',
    playeed_id: 'none',
    playeed_repeat: false,
    playeed_shuffle: false,
    playeed_list: 'none',
    playeed_list_length: 'none',
    trackPlayed: false,
    new_album_musics : 1,
    new_album_item_toggle : true,
    trackTimeNow: "0:00",
    trackTimeEnd: "0:00"
  },
  methods: {
    openClosePlayeer : function(event)
    {
      this.playeerIsOpened = !this.playeerIsOpened
    },
    playSong: function()
    {
      if(this.trackPlayed)
      {
          audio.pause()
      }
      else
      {
        audio.play()
      }
      this.trackPlayed = !this.trackPlayed
    },
    nextSong: function()
    {
      if(this.playeed_list_length > this.playeed_id)
      {
        let newSong = this.playeed_list[this.playeed_id]
        this.change_music(newSong.song_url,newSong.song_name,this.albumReview_artist_name,newSong.id,this.albumReview_img)
      }
      else {
        let newSong = this.playeed_list[0]
        this.change_music(newSong.song_url,newSong.song_name,this.albumReview_artist_name,newSong.id,this.albumReview_img)
      }
    },
    preSong: function()
    {
      if(this.playeed_id == 1)
      {
        let newSong = this.playeed_list[this.playeed_list_length - 1]
        this.change_music(newSong.song_url,newSong.song_name,this.albumReview_artist_name,newSong.id,this.albumReview_img)
      }
      else {
        let newSong = this.playeed_list[this.playeed_id - 2]
        this.change_music(newSong.song_url,newSong.song_name,this.albumReview_artist_name,newSong.id,this.albumReview_img)
      }
    },
    startMove: function(event)
    {
      this.trackMove = true
    },
    doMove: function(event)
    {
      if(this.trackMove)
      {
        this.controlsLength = 100*(event.clientX - domMT.left)/domT.width;
        if(this.controlsLength > 100)
        {
          this.controlsLength = 100
        }
      }
    },
    endMove: function(event)
    {
      this.trackMove = false
    },
    startJumpMove: function(event)
    {
      this.trackMove = true
      this.controlsLength = 100*(event.clientX - domMT.left)/domT.width
      audio.currentTime = audio.duration * this.controlsLength/100
    },
    doJumpMove: function(event)
    {
      if(this.trackMove)
      {
      this.controlsLength = 100*(event.clientX - domMT.left)/domT.width;
      audio.currentTime = audio.duration * this.controlsLength/100
      }
    },
    updateCurrentTime: function(event)
    {
      if(Math.floor(audio.currentTime) % 60 < 10)
      {
        this.trackTimeNow = Math.floor(audio.currentTime/60) + ":0" + Math.floor(audio.currentTime) % 60
      }
      else
      {
        this.trackTimeNow = Math.floor(audio.currentTime/60) + ":" + Math.floor(audio.currentTime) % 60
      }
      this.controlsLength = Math.floor(audio.currentTime) * 100/audio.duration
      if(audio.currentTime == audio.duration)
      {
        this.nextSong()
      }
    },
    change_music: function(url,name,artist,id,img)
    {
      audio.pause()
      audio.currentTime = 0
      this.controlsLength = 0
      this.playeed_name = name
      this.playeed_artist = artist
      this.playeed_list = this.albumReview_songs
      audio = new Audio(url)
      audio.addEventListener("timeupdate", this.updateCurrentTime)
      audio.play()
      this.trackPlayed = true
      this.playeed_id = id
      this.playeed_list_length = this.playeed_list.length
      this.trackTimeEnd = "0:00"
      this.isShowPlayeerContainer = true
      this.playeed_img = img
    }
  },
  computed: {
  },
  mounted() {
    audio.addEventListener("timeupdate", this.updateCurrentTime);
  },
  beforeCreate() {
    fetch("./audio/new_album_musics.json").then(response => response.json()).then(json => app.new_album_musics = json)
  },
  created() {
    dot.addEventListener("touchstart", function(e){ this.startMove })
    dot.addEventListener("touchmove", function(e){ this.doMove })
    dot.addEventListener("touchend", function(e){ this.endMove })
  },
  updated() {
    this.trackTimeEnd = Math.floor(audio.duration/60) + ":" + Math.floor(audio.duration) % 60
  }
  })
