<template>
  <div>
    <button @click="getVideo()">Get Youtube Videos</button>
    <div class="youtube">
      <iframe width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/4ViQX-Kp05k" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      results: [],
      finalUrl: ''
    }
  },
  created() {
    let api = 'AIzaSyCG2NWJfi5CDyrV1rGTaJrB9aGOUSBEJH0';
    let channelID =  'UCb_tcCObDin7c17Y_nQdmBA';
    let result = 10;
    this.finalURL = `https://www.googleapis.com/youtube/v3/search?key=${api}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`;
    console.log(this.finalURL);
  },
  methods: {
    getVideos() {
    }
  }
}
</script>


<style>
body {
  background: #2980b9;
}

.youtube {
  border: 3px #2c3e50 dashed;
  margin-top: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  background-color: #e67e22;
}
</style>
