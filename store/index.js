import Vuex from 'vuex'

const diffbot_key = 'e3e24a52c3ce459c29f1b57fe546cb1b'
const google_key = 'AIzaSyDggpY9wrOppMHnC2tccMICbuk25m-gHTQ'

const createStore = () => {
  return new Vuex.Store({
    state: {
      url: '',
      score: 0,
      checklist: [],
      processed: false
    },

    mutations: {
      setURL (state, { url }) {
        state.url = url
        state.score = 0
        state.checklist = []
      },
      setProcessed (state, { processed }) {
        state.processed = processed
      },
      incrementScore (state, { weight }) {
        state.score += weight
      },
      addCheck (state, problem) {
        state.checklist.push(problem)
      }
    },

    actions: {
      async checkDomain ({ commit }, { url }) {
				const category = 'Domínio'

        let weight = 0
				let problems = []

        // Setup
				const regex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
        const match = regex.exec(url)
				const host = match[4]

        // Check br domain
        if (host.match(/^.*\.br$/) === null) {
          weight += 2,
					problems.push('Domínio não é .br')
        }

				commit('addCheck', { category, weight, problems })
        commit('incrementScore', { weight })
      },

      async checkTitle ({ commit }, { title }) {
				const category = 'Título'

        let weight = 0
				let problems = []

        // Setup
        const words = title.split(/\s+/)
        const allCaps = title.match(/\b\W+\b/)

        // Check text length
        if (words.length > 12 && words.length <= 15) {
          weight += 1
					problems.push('Título longo')
        } else if (words.length > 15) {
          weight += 2
					problems.push('Título muito longo')
        }

        // Check all caps percentage
        if (allCaps/words > 0.2) {
          weight += 5
					problems.push('Muitas palavras em caixa alta')
        }

        // Check exclamations
        if (title.match(/\!/)) {
          weight += 2
					problems.push('Título possui exclamações')
        }

				commit('addCheck', { category, weight, problems })
        commit('incrementScore', { weight })
      },

      // async checkImagesReference ({ commit }, { images }) {
			// 	const category = 'title'
      //
			// 	let weight = 0
			// 	let problems = 'Ok'
      //
      //   // Setup
			// 	const response = await this.$axios.$get(`https://www.googleapis.com/customsearch/v1?key=${google_key}&searchType='image'&q`)
			// 	console.log(response)
      //
      //   // Calculating weigth
      //   if (title.match(/\!/)) {
      //     weight = 2
			// 		problems = 'Título possui referências entre imagens'
      //   }
      //
			// 	commit('addCheck', { category, weight, problems })
      //   commit('incrementScore', { weight })
      // },

      async processArticle ({ commit, dispatch }, { article }) {
        dispatch('checkDomain', { url: article.pageUrl })
        dispatch('checkTitle', { title: article.title })
        // dispatch('checkImagesReference', { images: article.images })
      },

      async searchURL ({ commit, dispatch }, { url }) {
        commit('setProcessed', { processed: false })
        commit('setURL', { url })

        const encodedURL = encodeURI(url)
        const response = await this.$axios.$get(
          `https://api.diffbot.com/v3/article?token=${diffbot_key}&url=${encodedURL}`)

        const article = response.objects[0]
        console.log(article)
        dispatch('processArticle', { article })

        commit('setProcessed', { processed: true })
      }
    }
  })
}

export default createStore
