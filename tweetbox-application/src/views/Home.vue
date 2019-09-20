<template>
  <div class="home">
    <b-container>
      <b-card>
        {{apiStatus.data}}
      </b-card>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import {getApiStatus} from '@/services'

export default {
  name: 'home',
  data: () => ({
    apiStatus: ''
  }),
  methods: {
    getStatus: async () => {
      try {
        return await getApiStatus()
      } catch(err) {
        console.log(err)
      }
    }
  },
  async mounted() {
    try {
      this.apiStatus = await (this.getStatus());
    } catch(err) {
      console.error(err);
    }
  }
}
</script>
