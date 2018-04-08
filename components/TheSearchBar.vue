<template>
  <b-row class='w-100'>
		<b-col sm='12'>
			<b-form-input class='search-bar'
										v-model="query"
										type="url"
										placeholder="https://"
										@input="lazySearchURL">
			</b-form-input>
		</b-col>
  </b-row>
</template>

<script>
const searchURLDelay = 500

export default {
	data () {
		return {
			query: '',
      typingTimer: false
		}
	},
  methods: {
    async lazySearchURL () {
      console.log("Lazy searching...")
      clearTimeout(this.typingTimer)
      if (this.query !== '') {
        this.typingTimer = setTimeout(this.searchURL, searchURLDelay)
      }
    },
    async searchURL () {
      console.log("Searching...")
      await this.$store.dispatch('searchURL', { url: this.query })
    }
  }
}
</script>

<style lang="scss">
@include media-breakpoint-up(md) {
	.search-bar {
		width: 70vw;
	}
}
</style>
