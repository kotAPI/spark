<template>
  <div>
    Home
  </div>
</template>

<script>
import notification from '@/utils/notification'
export default {
  mounted(){
    notification.notifySongPlaying("Whats my life","","asdasd")
  }
}
</script>

