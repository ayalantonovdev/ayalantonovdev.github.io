
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
const trackBox = document.getElementById('playeer-inside-controls-length-tracks')
let domT = trackBox.getBoundingClientRect()
const movedTrack = document.getElementById('playeer-inside-controls-length-tracks-move')
let domMT = movedTrack.getBoundingClientRect()
const firstWidth = window.innerWidth
let deltaWidth = 0
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
    isTrackMoved: false,
    new_album_musics : 1,
    new_album_item_toggle : true,
    trackTimeNow: "0:00",
    trackTimeEnd: "0:00",
    isTouch: false
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
        if(event.type == "touchmove")
        {
          this.controlsLength = 100*(Math.floor(event.changedTouches[0].clientX) - domMT.left - deltaWidth/2)/domT.width
          this.isTrackMoved = true
          if(this.controlsLength > 100)
          {
            this.controlsLength = 100
          }
        }
        else
        {
          this.controlsLength = 100*(event.clientX - domMT.left - deltaWidth/2)/domT.width
          this.isTrackMoved = true
          if(this.controlsLength > 100)
          {
            this.controlsLength = 100
          }
        }
      }
    },
    endMove: function(event)
    {
      this.trackMove = false
      if(this.isTrackMoved)
      {
        audio.currentTime = audio.duration * this.controlsLength/100
        this.isTrackMoved = false
      }
      if(event.type == "touchend"){console.log(event.type)}
    },
    startJumpMove: function(event)
    {
      this.trackMove = true
    },
    doJumpMove: function(event)
    {
      if(this.trackMove)
      {
      this.controlsLength = 100*(event.clientX - domMT.left - deltaWidth/2)/domT.width
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
      if(!this.trackMove)
      {
      this.controlsLength = Math.floor(audio.currentTime) * 100/audio.duration
      }
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
    },
    resize_window: function(e)
    {
      deltaWidth = window.innerWidth - firstWidth
      console.log(domMT.left)
    }
  },
  computed: {
  },
  mounted() {
    audio.addEventListener("timeupdate", this.updateCurrentTime);
    let dot = document.getElementById('playeer_dot')
    dot.addEventListener('touchstart', function(e){ app.startMove(e) })
    dot.addEventListener('touchmove', function(e){ app.doMove(e) })
    dot.addEventListener('touchend', function(e){ app.endMove(e) })
    window.addEventListener('resize', function(e){ app.resize_window(e)})
  },
  beforeCreate() {
    fetch("./audio/new_album_musics.json").then(response => response.json()).then(json => app.new_album_musics = json)
  },
  updated() {
    this.trackTimeEnd = Math.floor(audio.duration/60) + ":" + Math.floor(audio.duration) % 60
  }
})
