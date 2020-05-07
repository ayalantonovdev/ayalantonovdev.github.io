firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    app.userAuth = true
    app.userName = user.displayName
  } else {
    // No user is signed in.

  }
});


if(document.location.search == '')
{
  let db = firebase.firestore();
  db.collection("where").where("uid", "==", "none").get()
  .then(function(querySnapshot) {
    app.whereList = []
    querySnapshot.forEach(function(doc) {
      app.whereList.push({text : doc.data().text, emoji : doc.data().emoji})
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });

  db.collection("whatDo").where("uid", "==", "none").get()
  .then(function(querySnapshot) {
    app.whatDoList = []
    querySnapshot.forEach(function(doc) {
      app.whatDoList.push({text : doc.data().text, emoji : doc.data().emoji})
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });

  db.collection("howLong").where("uid", "==", "none").get()
  .then(function(querySnapshot) {
    app.howLongList = []
    querySnapshot.forEach(function(doc) {
      app.howLongList.push({text : doc.data().text, emoji : doc.data().emoji})
    });
    app.updating()
    app.cardLoader = false
    app.cardName = "DoRandom"
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}
else
{
  let db = firebase.firestore();
  db.collection("users").where("uid", "==", document.location.search.slice(1)).get()
  .then(function(querySnapshot) {
    if(querySnapshot.empty){document.location.href = 'file:///C:/Users/79841/Desktop/%D0%90%D1%8F%D0%BB/ayalantonovdev/ayalantonovdev.github.io/do_random/index.html'}
      let db = firebase.firestore();
      db.collection("whatDo").where("uid","==",document.location.search.slice(1)).get()
      .then(function(querySnapshot) {
        if(querySnapshot.empty){}
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error)
      })
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}

Vue.component('toggleui',{
  props: ['first','second','data'],
  data: function()
  {
    return {
      position: 'left',
      toggler:  true
    }
  },
  methods:{
    change_toggle : function(position)
    {
      if(this.position != position)
      {
        this.position = position
        if(this.data == 'signupSignin')
        {
          app.signupSignin = !app.signupSignin
          console.log(app.signupSignin)
        }
      }
    }
  },
  mounted(){
    app.signupSignin = true
  },
  template: `<div class="button-toggle">
    <div v-bind:class="{'right-toggle' : position == 'right'}" class="button-toggle-toggler"></div>
    <div class="button-toggle-items">
      <div @click="change_toggle('left')" class="button-toggle-items-item">
        <span>{{first}}</span>
      </div>
      <div @click="change_toggle('right')" class="button-toggle-items-item">
        <span>{{second}}</span>
      </div>
    </div>
  </div>`
})



let app = new Vue({
  el: "#app",
  data: {
    whatDoList: [{text : 'none', emoji : 'none'}],
    howLongList: [{text : 'none', emoji : 'none'}],
    whereList: [{text : 'none', emoji : 'none'}],
    whatDo: {text : 'none', emoji : 'none'},
    howLong: {text : 'none', emoji : 'none'},
    where: {text : 'none', emoji : 'none'},
    sign: false,
    signupSignin: true,
    signinEmail: "",
    signinPassword: "",
    userEmail: "",
    userPassword: "",
    userName: "",
    invalidEmail: false,
    validEmail: false,
    invalidName: false,
    validName: false,
    invalidPassword: false,
    validPassword: false,
    allValid: false,
    error: "",
    loader: false,
    cardLoader: true,
    canEdit: false,
    cardName: "none",
    userAuth: false,
    userProfile: false,
    userName: ""
  },
  methods: {
    updating: function()
    {
      this.whatDo = this.whatDoList[Math.floor(Math.random() * (this.whatDoList.length))]
      this.howLong = this.howLongList[Math.floor(Math.random() * (this.howLongList.length))]
      this.where = this.whereList[Math.floor(Math.random() * (this.whereList.length))]
    },
    email_validate: function(email)
    {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(reg.test(email))
      {
        console.log(email)
        this.validEmail = true
        this.invalidEmail = false
      }
      else
      {
        this.invalidEmail = false
        setTimeout(() => {this.invalidEmail = true}, 100)
        this.validEmail = false
      }
      this.isValid()
    },
    password_validate: function(password)
    {
      if(password.length >= 6 && password.length <= 12)
      {
        console.log(password)
        this.validPassword = true
        this.invalidPassword = false
      }
      else
      {
        this.invalidPassword = false
        setTimeout(() => {this.invalidPassword = true}, 100)
        this.validPassword = false
      }
      this.isValid()
    },
    name_validate: function(name)
    {
      if(name.length >= 3 && name.length <= 24)
      {
        console.log(name)
        this.validName = true
        this.invalidName = false
      }
      else
      {
        this.invalidName = false
        setTimeout(() => {this.invalidName = true}, 100)
        this.validName = false
      }
      this.isValid()
    },
    isValid: function()
    {
      if(this.validEmail && this.validPassword && this.validName)
      {
        this.allValid = true
      }
      else
      {
        this.allValid = false
      }
    },
    signup: function()
    {
      if(this.allValid)
      {
        this.loader = true
        let email = this.userEmail
        let password = this.userPassword
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( u => {
            let user = firebase.auth().currentUser;
            user.updateProfile({displayName: app.userName})
              .then(function() {
                let db = firebase.firestore();
                db.collection("users").add({
                  email: app.userEmail,
                  name: app.userName,
                  uid: user.uid
                  })
                  .then(function(docRef) {
                    document.location.href = "file:///C:/Users/79841/Desktop/%D0%90%D1%8F%D0%BB/ayalantonovdev/ayalantonovdev.github.io/do_random/index.html?" + user.uid
                  })
                  .catch(function(error) {
                    console.error("Error adding document: ", error);
                  });
                })
              .catch(function(error) {
          console.log(error)
        });
        })
        .catch(function(error) {
          switch (error.code) {
        case 'auth/email-already-in-use':
          app.error = "email " + email + " уже используют"
          break
        case 'auth/invalid-email':
          app.error = "Неправильный email"
          break
        case 'auth/operation-not-allowed':
          app.error = "Общая ошибка регистрации"
          break
        case 'auth/weak-password':
          app.error = "Слабый пароль"
          break
      }
        console.log(error.code)
        app.loader = false
        })
      }
      else
      {

      }
    },
    signin: function(email,password)
    {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(){
        let user = firebase.auth().currentUser;
        document.location.href = "file:///C:/Users/79841/Desktop/%D0%90%D1%8F%D0%BB/ayalantonovdev/ayalantonovdev.github.io/do_random/index.html?" + user.uid
      })
      .catch(function(error) {
        switch (error.code) {
      case 'auth/user-not-found':
        app.error = "Пользователь не найден"
        break
      case 'auth/invalid-email':
        app.error = "Неправильно email"
        break
      case 'auth/user-disabled':
        app.error = "Пользователь заблокирован"
        break
      case 'auth/wrong-password':
        app.error = "Неверный пароль"
        break
    }
      });
    },
    logout: function()
    {
      firebase.auth().signOut()
      .then(function() {
        document.location.href = "file:///C:/Users/79841/Desktop/%D0%90%D1%8F%D0%BB/ayalantonovdev/ayalantonovdev.github.io/do_random/index.html"
      })
      .catch(function(error) {

      });
    }
  },
  mounted(){
  }
})
