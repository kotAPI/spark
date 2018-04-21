const actions = {
  LOAD_ARTISTS({commit}){
    // Your API calls need to be made here
    var data ={
            "charlie-puth":{
            "slug":"charlie-puth",
            "name":"Charlie Puth",
            "profile_pic":"assets/images/dp_charlieputh.jpg",
            "cover_pic":"assets/images/cover_charlieputh.jpg",
            "albums":[
                {
                    "album_art":"assets/images/singles.jpg",
                    "name":"Singles",
                    "songs":[
                        {
                            "name":"Attention",
                            "path":"assets/songs/charlieputh/attention.mp3"
                        }
                    ]
                },
                {
                    "album_art":"assets/images/album_art_voice_notes.jpg",
                    "name":"Voice Notes",
                    "year":"2018",
                    "songs":[
                        {
                            "name":"How Long",
                            "path":"assets/songs/charlieputh/how_long.mp3"
                        }
                    ]
                }
            ]
        },
        "linkin-park":{
            "slug":"linkin-park",
            "name":"Linkin Park",
            "profile_pic":"assets/images/dp_lp.png",
            "cover_pic":"assets/images/cover_lp.jpg",
            "albums":[
                {
                "album_art":"assets/images/lp-hybrid.jpg",
                    "name":"Hybrid Theory",
                    "songs":[
                        {
                            "name":"Papercut",
                            "path":"assets/songs/linkinpark/01papercut.mp3"
                        },
                        {
                            "name":"One Step Closer",
                            "path":"assets/songs/linkinpark/02onestepcloser.mp3"
                        },
                        {
                            "name":"With You",
                            "path":"assets/songs/linkinpark/03withyou.mp3"
                        },
                        {
                            "name":"Points of Authority",
                            "path":"assets/songs/linkinpark/04pointsofauthority.mp3"
                        },
                        {
                            "name":"Crawling",
                            "path":"assets/songs/linkinpark/05crawling.mp3"
                        },
                        {
                            "name":"By Myself",
                            "path":"assets/songs/linkinpark/06bymyself.mp3"
                        },
                        {
                            "name":"Runaway",
                            "path":"assets/songs/linkinpark/07runaway.mp3"
                        },
                        {
                            "name":"In The End",
                            "path":"assets/songs/linkinpark/08intheend.mp3"
                        },
                        {
                            "name":"Place for my head",
                            "path":"assets/songs/linkinpark/09aplaceformyhead.mp3"
                        },
                        {
                            "name":"Forgotten",
                            "path":"assets/songs/linkinpark/10Forgotten.mp3"
                        },
                        {
                            "name":"Cure For Itch",
                            "path":"assets/songs/linkinpark/11cureforitch.mp3"
                        },
                        {
                            "name":"Pushing Me Away",
                            "path":"assets/songs/linkinpark/12pushingmeawway.mp3"
                        }
                    ]
                },
                
            ]
        }
    }
    commit('SET_ARTISTS',data)
  }
}

export default actions