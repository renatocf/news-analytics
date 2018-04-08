<template>
  <b-row>

		<b-col sm='12' class='pt-3'>
			<hr/>
			<h2>Score total: {{ score }}</h2>
		</b-col>

		<b-col sm='12'>
			<table class="table table-responsive-md">
				<thead>
					<tr>
						<th scope='col'>Status</th>
						<th scope='col'>Score</th>
						<th scope='col'>Categoria</th>
						<th scope='col'>Análise</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for='check in checklist' :key='check.category'>
						<td>
							<span v-if='check.weight === 0' class='fa fa-check'></span>
							<span v-else class='fa fa-times'></span>
						</td>
						<td>{{ check.weight }}</td>
						<td>{{ check.category }}</td>
						<td>
							<p v-for='problem in check.problems' :key='problem'>
								{{ problem }}
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</b-col>

  </b-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
		...mapState([
			'score',
      'checklist'
		])
  }
}
</script>
