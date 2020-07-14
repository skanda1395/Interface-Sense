import searchMembers from './components/searchMembers.vue'
import memberView from './components/memberView.vue'

export default [
  { path: '/', component: searchMembers },
  { path: '/memberView', component: memberView, name: 'memberView', props: true }
]