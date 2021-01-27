<template>
  <div class="home">23333</div>
  <el-button
    type="primary"
    @click="handleOpenModal"
  >主要按钮</el-button>
  <EntSelect
    :entDialog="entDialog"
    @handleEntSelect="handleEntSelect"
    v-if="entDialog.visible"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import EntSelect from '../components/EntSelect/index.vue';

@Options({
  components: {
    EntSelect,
  },
  name: 'Index',
})
export default class Home extends Vue {
  private entDialog = {
    singleSelect: true,
    visible: false,
  };

  private handleOpenModal(): void {
    this.entDialog.visible = true;
  }

  private handleEntSelect(params: EntBackParam) {
    this.entDialog.visible = params.visible;
  }
}
</script>
