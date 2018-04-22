export default {
    notification:undefined,
    options:{
        body:"Notification"    
    },
    notifySongPlaying(title,iconURL,text){
        if (Notification.permission !== "granted")
        Notification.requestPermission();
        else {
            this.notification = new Notification(title, {
            icon: iconURL,
            body: text,
            });
            setTimeout(()=>{ this.notification.close() }, 2000);
        }
    }
}