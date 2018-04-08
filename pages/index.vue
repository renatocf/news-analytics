<template>
  <b-container fluid class="container px-4 px-md-5">
		<b-row class='w-100'>
			<b-col sm='12'>
				<h1>NewsAnalytics</h1>
			</b-col>

			<b-col sm='12'>
				<p class='lead text-center text-lg-left'>
					Analisamos notícias para você
				</p>
			</b-col>
		</b-row>

    <the-search-bar/>
		<the-dash-board v-if='processed'/>
  </b-container>
</template>

<script>
import TheSearchBar from '@/components/TheSearchBar.vue'
import TheDashBoard from '@/components/TheDashBoard.vue'

import { mapState } from 'vuex'

export default {
  components: {
    TheSearchBar,
		TheDashBoard
  },
  computed: {
		...mapState([
      'processed'
		])
  }
}
</script>

<style lang='scss'>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
	align-items: center;

  height: 100vh;
}
</style>
